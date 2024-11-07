package compiler

import (
	"path"
	"strings"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/utils"
)

type ParsingContext int

const (
	PCSourceElements           ParsingContext = iota // Elements in source file
	PCBlockStatements                                // Statements in block
	PCSwitchClauses                                  // Clauses in switch statement
	PCSwitchClauseStatements                         // Statements in switch clause
	PCTypeMembers                                    // Members in interface or type literal
	PCClassMembers                                   // Members in class declaration
	PCEnumMembers                                    // Members in enum declaration
	PCHeritageClauseElement                          // Elements in a heritage clause
	PCVariableDeclarations                           // Variable declarations in variable statement
	PCObjectBindingElements                          // Binding elements in object binding list
	PCArrayBindingElements                           // Binding elements in array binding list
	PCArgumentExpressions                            // Expressions in argument list
	PCObjectLiteralMembers                           // Members in object literal
	PCJsxAttributes                                  // Attributes in jsx element
	PCJsxChildren                                    // Things between opening and closing JSX tags
	PCArrayLiteralMembers                            // Members in array literal
	PCParameters                                     // Parameters in parameter list
	PCJSDocParameters                                // JSDoc parameters in parameter list of JSDoc function type
	PCRestProperties                                 // Property names in a rest type list
	PCTypeParameters                                 // Type parameters in type parameter list
	PCTypeArguments                                  // Type arguments in type argument list
	PCTupleElementTypes                              // Element types in tuple element type list
	PCHeritageClauses                                // Heritage clauses for a class or interface declaration.
	PCImportOrExportSpecifiers                       // Named import clause's import specifier list
	PCImportAttributes                               // Import attributes
	PCJSDocComment                                   // Parsing via JSDocParser
	PCCount                                          // Number of parsing contexts
)

type ParsingContexts int

type Parser struct {
	scanner               *Scanner
	factory               NodeFactory
	fileName              string
	sourceText            string
	languageVersion       ScriptTarget
	scriptKind            ScriptKind
	languageVariant       LanguageVariant
	contextFlags          NodeFlags
	token                 SyntaxKind
	parsingContexts       ParsingContexts
	diagnostics           []*Diagnostic
	identifiers           set[string]
	sourceFlags           NodeFlags
	notParenthesizedArrow set[int]
	identifierPool        Pool[Identifier]
}

func NewParser() *Parser {
	p := &Parser{}
	p.scanner = NewScanner()
	return p
}

func ParseSourceFile(fileName string, sourceText string, languageVersion ScriptTarget) *SourceFile {
	var p Parser
	p.initializeState(fileName, sourceText, languageVersion, ScriptKindUnknown)
	p.nextToken()
	return p.parseSourceFileWorker()
}

func ParseJSONText(fileName string, sourceText string) *SourceFile {
	var p Parser
	p.initializeState(fileName, sourceText, ScriptTargetES2015, ScriptKindJSON)
	p.nextToken()
	pos := p.nodePos()
	var expressions []*Node

	for p.token != SyntaxKindEndOfFile {
		var expression *Node
		switch p.token {
		case SyntaxKindOpenBracketToken:
			expression = p.parseArrayLiteralExpression()
		case SyntaxKindTrueKeyword, SyntaxKindFalseKeyword, SyntaxKindNullKeyword:
			expression = p.parseTokenNode()
		case SyntaxKindMinusToken:
			if p.lookAhead(func() bool { return p.nextToken() == SyntaxKindNumericLiteral && p.nextToken() != SyntaxKindColonToken }) {
				expression = p.parsePrefixUnaryExpression()
			} else {
				expression = p.parseObjectLiteralExpression()
			}
		case SyntaxKindNumericLiteral, SyntaxKindStringLiteral:
			if p.lookAhead(func() bool { return p.nextToken() != SyntaxKindColonToken }) {
				expression = p.parseLiteralExpression()
				break
			}
			fallthrough
		default:
			expression = p.parseObjectLiteralExpression()
		}

		// Error recovery: collect multiple top-level expressions
		expressions = append(expressions, expression)
		if p.token != SyntaxKindEndOfFile {
			p.parseErrorAtCurrentToken(diagnostics.Unexpected_token)
		}
	}

	var statement *Node
	if len(expressions) == 1 {
		statement = p.factory.NewExpressionStatement(expressions[0])
	} else {
		arr := p.factory.NewArrayLiteralExpression(expressions, false)
		p.finishNode(arr, pos)
		statement = p.factory.NewExpressionStatement(arr)
	}

	p.finishNode(statement, pos)
	p.parseExpectedToken(SyntaxKindEndOfFile)
	node := p.factory.NewSourceFile(p.sourceText, p.fileName, []*Node{statement})
	p.finishNode(node, pos)
	result := node.AsSourceFile()
	result.diagnostics = attachFileToDiagnostics(p.diagnostics, result)
	return result
}

func (p *Parser) initializeState(fileName string, sourceText string, languageVersion ScriptTarget, scriptKind ScriptKind) {
	p.scanner = NewScanner()
	p.fileName = path.Clean(fileName)
	p.sourceText = sourceText
	p.languageVersion = languageVersion
	p.scriptKind = ensureScriptKind(fileName, scriptKind)
	p.languageVariant = getLanguageVariant(p.scriptKind)
	switch p.scriptKind {
	case ScriptKindJS, ScriptKindJSX:
		p.contextFlags = NodeFlagsJavaScriptFile
	case ScriptKindJSON:
		p.contextFlags = NodeFlagsJavaScriptFile | NodeFlagsJsonFile
	default:
		p.contextFlags = NodeFlagsNone
	}
	p.scanner.SetText(p.sourceText)
	p.scanner.SetOnError(p.scanError)
	p.scanner.SetScriptTarget(p.languageVersion)
	p.scanner.SetLanguageVariant(p.languageVariant)
}

func (p *Parser) scanError(message *diagnostics.Message, pos int, len int, args ...any) {
	p.parseErrorAtRange(NewTextRange(pos, pos+len), message, args...)
}

func (p *Parser) parseErrorAt(pos int, end int, message *diagnostics.Message, args ...any) *Diagnostic {
	return p.parseErrorAtRange(NewTextRange(pos, end), message, args...)
}

func (p *Parser) parseErrorAtCurrentToken(message *diagnostics.Message, args ...any) *Diagnostic {
	return p.parseErrorAtRange(p.scanner.TokenRange(), message, args...)
}

func (p *Parser) parseErrorAtRange(loc TextRange, message *diagnostics.Message, args ...any) *Diagnostic {
	// Don't report another error if it would just be at the same location as the last error
	if len(p.diagnostics) == 0 || p.diagnostics[len(p.diagnostics)-1].Loc() != loc {
		result := NewDiagnostic(nil, loc, message, args...)
		p.diagnostics = append(p.diagnostics, result)
		return result
	}
	return nil
}

type ParserState struct {
	scannerState   ScannerState
	contextFlags   NodeFlags
	diagnosticsLen int
}

func (p *Parser) mark() ParserState {
	return ParserState{scannerState: p.scanner.Mark(), contextFlags: p.contextFlags, diagnosticsLen: len(p.diagnostics)}
}

func (p *Parser) rewind(state ParserState) {
	p.scanner.Rewind(state.scannerState)
	p.token = p.scanner.token
	p.contextFlags = state.contextFlags
	p.diagnostics = p.diagnostics[0:state.diagnosticsLen]
}

func (p *Parser) lookAhead(callback func() bool) bool {
	state := p.mark()
	result := callback()
	p.rewind(state)
	return result
}

func (p *Parser) nextToken() SyntaxKind {
	p.token = p.scanner.Scan()
	return p.token
}

func (p *Parser) nodePos() int {
	return p.scanner.TokenFullStart()
}

func (p *Parser) hasPrecedingLineBreak() bool {
	return p.scanner.HasPrecedingLineBreak()
}

func (p *Parser) hasPrecedingJSDocComment() bool {
	return false // !!!
}

func (p *Parser) parseSourceFileWorker() *SourceFile {
	isDeclarationFile := isDeclarationFileName(p.fileName)
	if isDeclarationFile {
		p.contextFlags |= NodeFlagsAmbient
	}
	pos := p.nodePos()
	statements := p.parseList(PCSourceElements, (*Parser).parseStatement)
	eof := p.parseTokenNode()
	if eof.kind != SyntaxKindEndOfFile {
		panic("Expected end of file token from scanner.")
	}
	node := p.factory.NewSourceFile(p.sourceText, p.fileName, statements)
	p.finishNode(node, pos)
	result := node.AsSourceFile()
	result.diagnostics = attachFileToDiagnostics(p.diagnostics, result)
	result.externalModuleIndicator = isFileProbablyExternalModule(result)
	result.isDeclarationFile = isDeclarationFile
	return result
}

func (p *Parser) parseList(kind ParsingContext, parseElement func(p *Parser) *Node) []*Node {
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << kind
	list := []*Node{}
	for !p.isListTerminator(kind) {
		if p.isListElement(kind, false /*inErrorRecovery*/) {
			list = append(list, parseElement(p))
			continue
		}
		if p.abortParsingListOrMoveToNextToken(kind) {
			break
		}
	}
	p.parsingContexts = saveParsingContexts
	return list
}

// Return a non-nil (but possibly empty) slice if parsing was successful, or nil if parseElement returned nil
func (p *Parser) parseDelimitedList(kind ParsingContext, parseElement func(p *Parser) *Node) []*Node {
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << kind
	list := []*Node{}
	for {
		if p.isListElement(kind, false /*inErrorRecovery*/) {
			startPos := p.nodePos()
			element := parseElement(p)
			if element == nil {
				p.parsingContexts = saveParsingContexts
				// Return nil list to indicate parseElement failed
				return nil
			}
			list = append(list, element)
			if p.parseOptional(SyntaxKindCommaToken) {
				// No need to check for a zero length node since we know we parsed a comma
				continue
			}
			if p.isListTerminator(kind) {
				break
			}
			// We didn't get a comma, and the list wasn't terminated, explicitly parse
			// out a comma so we give a good error message.
			if p.token != SyntaxKindCommaToken && kind == PCEnumMembers {
				p.parseErrorAtCurrentToken(diagnostics.An_enum_member_name_must_be_followed_by_a_or)
			} else {
				p.parseExpected(SyntaxKindCommaToken)
			}
			// If the token was a semicolon, and the caller allows that, then skip it and
			// continue.  This ensures we get back on track and don't result in tons of
			// parse errors.  For example, this can happen when people do things like use
			// a semicolon to delimit object literal members.   Note: we'll have already
			// reported an error when we called parseExpected above.
			if (kind == PCObjectLiteralMembers || kind == PCImportAttributes) && p.token == SyntaxKindSemicolonToken && !p.hasPrecedingLineBreak() {
				p.nextToken()
			}
			if startPos == p.nodePos() {
				// What we're parsing isn't actually remotely recognizable as a element and we've consumed no tokens whatsoever
				// Consume a token to advance the parser in some way and avoid an infinite loop
				// This can happen when we're speculatively parsing parenthesized expressions which we think may be arrow functions,
				// or when a modifier keyword which is disallowed as a parameter name (ie, `static` in strict mode) is supplied
				p.nextToken()
			}
			continue
		}
		if p.isListTerminator(kind) {
			break
		}
		if p.abortParsingListOrMoveToNextToken(kind) {
			break
		}
	}
	p.parsingContexts = saveParsingContexts
	return list
}

// Return a non-nil (but possibly empty) slice if parsing was successful, or nil if opening token wasn't found
// or parseElement returned nil
func (p *Parser) parseBracketedList(kind ParsingContext, parseElement func(p *Parser) *Node, open SyntaxKind, close SyntaxKind) []*Node {
	if p.parseExpected(open) {
		result := p.parseDelimitedList(kind, parseElement)
		p.parseExpected(close)
		return result
	}
	return nil
}

// Returns true if we should abort parsing.
func (p *Parser) abortParsingListOrMoveToNextToken(kind ParsingContext) bool {
	p.parsingContextErrors(kind)
	if p.isInSomeParsingContext() {
		return true
	}
	p.nextToken()
	return false
}

// True if positioned at element or terminator of the current list or any enclosing list
func (p *Parser) isInSomeParsingContext() bool {
	// We should be in at least one parsing context, be it SourceElements while parsing
	// a SourceFile, or JSDocComment when lazily parsing JSDoc.
	// Debug.assert(parsingContext, "Missing parsing context")
	for kind := ParsingContext(0); kind < PCCount; kind++ {
		if p.parsingContexts&(1<<kind) != 0 {
			if p.isListElement(kind, true /*inErrorRecovery*/) || p.isListTerminator(kind) {
				return true
			}
		}
	}
	return false
}

func (p *Parser) parsingContextErrors(context ParsingContext) {
	switch context {
	case PCSourceElements:
		if p.token == SyntaxKindDefaultKeyword {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, "export")
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Declaration_or_statement_expected)
		}
	case PCBlockStatements:
		p.parseErrorAtCurrentToken(diagnostics.Declaration_or_statement_expected)
	case PCSwitchClauses:
		p.parseErrorAtCurrentToken(diagnostics.X_case_or_default_expected)
	case PCSwitchClauseStatements:
		p.parseErrorAtCurrentToken(diagnostics.Statement_expected)
	case PCRestProperties, PCTypeMembers:
		p.parseErrorAtCurrentToken(diagnostics.Property_or_signature_expected)
	case PCClassMembers:
		p.parseErrorAtCurrentToken(diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected)
	case PCEnumMembers:
		p.parseErrorAtCurrentToken(diagnostics.Enum_member_expected)
	case PCHeritageClauseElement:
		p.parseErrorAtCurrentToken(diagnostics.Expression_expected)
	case PCVariableDeclarations:
		if isKeyword(p.token) {
			p.parseErrorAtCurrentToken(diagnostics.X_0_is_not_allowed_as_a_variable_declaration_name, TokenToString(p.token))
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Variable_declaration_expected)
		}
	case PCObjectBindingElements:
		p.parseErrorAtCurrentToken(diagnostics.Property_destructuring_pattern_expected)
	case PCArrayBindingElements:
		p.parseErrorAtCurrentToken(diagnostics.Array_element_destructuring_pattern_expected)
	case PCArgumentExpressions:
		p.parseErrorAtCurrentToken(diagnostics.Argument_expression_expected)
	case PCObjectLiteralMembers:
		p.parseErrorAtCurrentToken(diagnostics.Property_assignment_expected)
	case PCArrayLiteralMembers:
		p.parseErrorAtCurrentToken(diagnostics.Expression_or_comma_expected)
	case PCJSDocParameters:
		p.parseErrorAtCurrentToken(diagnostics.Parameter_declaration_expected)
	case PCParameters:
		if isKeyword(p.token) {
			p.parseErrorAtCurrentToken(diagnostics.X_0_is_not_allowed_as_a_parameter_name, TokenToString(p.token))
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Parameter_declaration_expected)
		}
	case PCTypeParameters:
		p.parseErrorAtCurrentToken(diagnostics.Type_parameter_declaration_expected)
	case PCTypeArguments:
		p.parseErrorAtCurrentToken(diagnostics.Type_argument_expected)
	case PCTupleElementTypes:
		p.parseErrorAtCurrentToken(diagnostics.Type_expected)
	case PCHeritageClauses:
		p.parseErrorAtCurrentToken(diagnostics.Unexpected_token_expected)
	case PCImportOrExportSpecifiers:
		if p.token == SyntaxKindFromKeyword {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, "}")
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
		}
	case PCJsxAttributes, PCJsxChildren, PCJSDocComment:
		p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
	case PCImportAttributes:
		p.parseErrorAtCurrentToken(diagnostics.Identifier_or_string_literal_expected)
	default:
		panic("Unhandled case in parsingContextErrors")
	}
}

func (p *Parser) isListElement(parsingContext ParsingContext, inErrorRecovery bool) bool {
	switch parsingContext {
	case PCSourceElements, PCBlockStatements, PCSwitchClauseStatements:
		// If we're in error recovery, then we don't want to treat ';' as an empty statement.
		// The problem is that ';' can show up in far too many contexts, and if we see one
		// and assume it's a statement, then we may bail out inappropriately from whatever
		// we're parsing.  For example, if we have a semicolon in the middle of a class, then
		// we really don't want to assume the class is over and we're on a statement in the
		// outer module.  We just want to consume and move on.
		return !(p.token == SyntaxKindSemicolonToken && inErrorRecovery) && p.isStartOfStatement()
	case PCSwitchClauses:
		return p.token == SyntaxKindCaseKeyword || p.token == SyntaxKindDefaultKeyword
	case PCTypeMembers:
		return p.lookAhead(p.scanTypeMemberStart)
	case PCClassMembers:
		// We allow semicolons as class elements (as specified by ES6) as long as we're
		// not in error recovery.  If we're in error recovery, we don't want an errant
		// semicolon to be treated as a class member (since they're almost always used
		// for statements.
		return p.lookAhead(p.scanClassMemberStart) || p.token == SyntaxKindSemicolonToken && !inErrorRecovery
	case PCEnumMembers:
		// Include open bracket computed properties. This technically also lets in indexers,
		// which would be a candidate for improved error reporting.
		return p.token == SyntaxKindOpenBracketToken || p.isLiteralPropertyName()
	case PCObjectLiteralMembers:
		switch p.token {
		case SyntaxKindOpenBracketToken, SyntaxKindAsteriskToken, SyntaxKindDotDotDotToken, SyntaxKindDotToken: // Not an object literal member, but don't want to close the object (see `tests/cases/fourslash/completionsDotInObjectLiteral.ts`)
			return true
		default:
			return p.isLiteralPropertyName()
		}
	case PCRestProperties:
		return p.isLiteralPropertyName()
	case PCObjectBindingElements:
		return p.token == SyntaxKindOpenBracketToken || p.token == SyntaxKindDotDotDotToken || p.isLiteralPropertyName()
	case PCImportAttributes:
		return p.isImportAttributeName()
	case PCHeritageClauseElement:
		// If we see `{ ... }` then only consume it as an expression if it is followed by `,` or `{`
		// That way we won't consume the body of a class in its heritage clause.
		if p.token == SyntaxKindOpenBraceToken {
			return p.isValidHeritageClauseObjectLiteral()
		}
		if !inErrorRecovery {
			return p.isStartOfLeftHandSideExpression() && !p.isHeritageClauseExtendsOrImplementsKeyword()
		}
		// If we're in error recovery we tighten up what we're willing to match.
		// That way we don't treat something like "this" as a valid heritage clause
		// element during recovery.
		return p.isIdentifier() && !p.isHeritageClauseExtendsOrImplementsKeyword()
	case PCVariableDeclarations:
		return p.isBindingIdentifierOrPrivateIdentifierOrPattern()
	case PCArrayBindingElements:
		return p.token == SyntaxKindCommaToken || p.token == SyntaxKindDotDotDotToken || p.isBindingIdentifierOrPrivateIdentifierOrPattern()
	case PCTypeParameters:
		return p.token == SyntaxKindInKeyword || p.token == SyntaxKindConstKeyword || p.isIdentifier()
	case PCArrayLiteralMembers:
		// Not an array literal member, but don't want to close the array (see `tests/cases/fourslash/completionsDotInArrayLiteralInObjectLiteral.ts`)
		if p.token == SyntaxKindCommaToken || p.token == SyntaxKindDotToken {
			return true
		}
		fallthrough
	case PCArgumentExpressions:
		return p.token == SyntaxKindDotDotDotToken || p.isStartOfExpression()
	case PCParameters:
		return p.isStartOfParameter(false /*isJSDocParameter*/)
	case PCJSDocParameters:
		return p.isStartOfParameter(true /*isJSDocParameter*/)
	case PCTypeArguments, PCTupleElementTypes:
		return p.token == SyntaxKindCommaToken || p.isStartOfType(false /*inStartOfParameter*/)
	case PCHeritageClauses:
		return p.isHeritageClause()
	case PCImportOrExportSpecifiers:
		// bail out if the next token is [FromKeyword StringLiteral].
		// That means we're in something like `import { from "mod"`. Stop here can give better error message.
		if p.token == SyntaxKindFromKeyword && p.lookAhead(p.nextTokenIsTokenStringLiteral) {
			return false
		}
		if p.token == SyntaxKindStringLiteral {
			return true // For "arbitrary module namespace identifiers"
		}
		return tokenIsIdentifierOrKeyword(p.token)
	case PCJsxAttributes:
		return tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindOpenBraceToken
	case PCJsxChildren:
		return true
	case PCJSDocComment:
		return true
	}
	panic("Unhandled case in isListElement")
}

func (p *Parser) isListTerminator(kind ParsingContext) bool {
	if p.token == SyntaxKindEndOfFile {
		return true
	}
	switch kind {
	case PCBlockStatements, PCSwitchClauses, PCTypeMembers, PCClassMembers, PCEnumMembers, PCObjectLiteralMembers,
		PCObjectBindingElements, PCImportOrExportSpecifiers, PCImportAttributes:
		return p.token == SyntaxKindCloseBraceToken
	case PCSwitchClauseStatements:
		return p.token == SyntaxKindCloseBraceToken || p.token == SyntaxKindCaseKeyword || p.token == SyntaxKindDefaultKeyword
	case PCHeritageClauseElement:
		return p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindExtendsKeyword || p.token == SyntaxKindImplementsKeyword
	case PCVariableDeclarations:
		// If we can consume a semicolon (either explicitly, or with ASI), then consider us done
		// with parsing the list of variable declarators.
		// In the case where we're parsing the variable declarator of a 'for-in' statement, we
		// are done if we see an 'in' keyword in front of us. Same with for-of
		// ERROR RECOVERY TWEAK:
		// For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
		// arrow function here and it's going to be very unlikely that we'll resynchronize and get
		// another variable declaration.
		return p.canParseSemicolon() || p.token == SyntaxKindInKeyword || p.token == SyntaxKindOfKeyword || p.token == SyntaxKindEqualsGreaterThanToken
	case PCTypeParameters:
		// Tokens other than '>' are here for better error recovery
		return p.token == SyntaxKindGreaterThanToken || p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindExtendsKeyword || p.token == SyntaxKindImplementsKeyword
	case PCArgumentExpressions:
		// Tokens other than ')' are here for better error recovery
		return p.token == SyntaxKindCloseParenToken || p.token == SyntaxKindSemicolonToken
	case PCArrayLiteralMembers, PCTupleElementTypes, PCArrayBindingElements:
		return p.token == SyntaxKindCloseBracketToken
	case PCJSDocParameters, PCParameters, PCRestProperties:
		// Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
		return p.token == SyntaxKindCloseParenToken || p.token == SyntaxKindCloseBracketToken /*|| token == SyntaxKindOpenBraceToken*/
	case PCTypeArguments:
		// All other tokens should cause the type-argument to terminate except comma token
		return p.token != SyntaxKindCommaToken
	case PCHeritageClauses:
		return p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindCloseBraceToken
	case PCJsxAttributes:
		return p.token == SyntaxKindGreaterThanToken || p.token == SyntaxKindSlashToken
	case PCJsxChildren:
		return p.token == SyntaxKindLessThanToken && p.lookAhead(p.nextTokenIsSlash)
	}
	return false
}

func (p *Parser) parseExpectedMatchingBrackets(openKind SyntaxKind, closeKind SyntaxKind, openParsed bool, openPosition int) {
	if p.token == closeKind {
		p.nextToken()
		return
	}
	lastError := p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(closeKind))
	if !openParsed {
		return
	}
	if lastError != nil {
		related := NewDiagnostic(nil, NewTextRange(openPosition, openPosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, TokenToString(openKind), TokenToString(closeKind))
		lastError.addRelatedInfo(related)
	}
}

func (p *Parser) parseOptional(token SyntaxKind) bool {
	if p.token == token {
		p.nextToken()
		return true
	}
	return false
}

func (p *Parser) parseExpected(kind SyntaxKind) bool {
	return p.parseExpectedWithDiagnostic(kind, nil, true)
}

func (p *Parser) parseExpectedWithoutAdvancing(kind SyntaxKind) bool {
	return p.parseExpectedWithDiagnostic(kind, nil, false)
}

func (p *Parser) parseExpectedWithDiagnostic(kind SyntaxKind, message *diagnostics.Message, shouldAdvance bool) bool {
	if p.token == kind {
		if shouldAdvance {
			p.nextToken()
		}
		return true
	}
	// Report specific message if provided with one.  Otherwise, report generic fallback message.
	if message != nil {
		p.parseErrorAtCurrentToken(message)
	} else {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(kind))
	}
	return false
}

func (p *Parser) parseStatement() *Statement {
	switch p.token {
	case SyntaxKindSemicolonToken:
		return p.parseEmptyStatement()
	case SyntaxKindOpenBraceToken:
		return p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	case SyntaxKindVarKeyword:
		return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case SyntaxKindLetKeyword:
		if p.isLetDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case SyntaxKindAwaitKeyword:
		if p.isAwaitUsingDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case SyntaxKindUsingKeyword:
		if p.isUsingDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case SyntaxKindFunctionKeyword:
		return p.parseFunctionDeclaration(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case SyntaxKindClassKeyword:
		return p.parseClassDeclaration(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case SyntaxKindIfKeyword:
		return p.parseIfStatement()
	case SyntaxKindDoKeyword:
		return p.parseDoStatement()
	case SyntaxKindWhileKeyword:
		return p.parseWhileStatement()
	case SyntaxKindForKeyword:
		return p.parseForOrForInOrForOfStatement()
	case SyntaxKindContinueKeyword:
		return p.parseContinueStatement()
	case SyntaxKindBreakKeyword:
		return p.parseBreakStatement()
	case SyntaxKindReturnKeyword:
		return p.parseReturnStatement()
	case SyntaxKindWithKeyword:
		return p.parseWithStatement()
	case SyntaxKindSwitchKeyword:
		return p.parseSwitchStatement()
	case SyntaxKindThrowKeyword:
		return p.parseThrowStatement()
	case SyntaxKindTryKeyword, SyntaxKindCatchKeyword, SyntaxKindFinallyKeyword:
		return p.parseTryStatement()
	case SyntaxKindDebuggerKeyword:
		return p.parseDebuggerStatement()
	case SyntaxKindAtToken:
		return p.parseDeclaration()
	case SyntaxKindAsyncKeyword, SyntaxKindInterfaceKeyword, SyntaxKindTypeKeyword, SyntaxKindModuleKeyword, SyntaxKindNamespaceKeyword,
		SyntaxKindDeclareKeyword, SyntaxKindConstKeyword, SyntaxKindEnumKeyword, SyntaxKindExportKeyword, SyntaxKindImportKeyword,
		SyntaxKindPrivateKeyword, SyntaxKindProtectedKeyword, SyntaxKindPublicKeyword, SyntaxKindAbstractKeyword, SyntaxKindAccessorKeyword,
		SyntaxKindStaticKeyword, SyntaxKindReadonlyKeyword, SyntaxKindGlobalKeyword:
		if p.isStartOfDeclaration() {
			return p.parseDeclaration()
		}
	}
	return p.parseExpressionOrLabeledStatement()
}

func (p *Parser) parseDeclaration() *Statement {
	// `parseListElement` attempted to get the reused node at this position,
	// but the ambient context flag was not yet set, so the node appeared
	// not reusable in that context.
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifierList := p.parseModifiersWithOptions( /*allowDecorators*/ true, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	isAmbient := modifierList != nil && utils.Some(modifierList.AsModifierList().modifiers, isDeclareModifier)
	if isAmbient {
		// !!! incremental parsing
		// node := p.tryReuseAmbientDeclaration(pos)
		// if node {
		// 	return node
		// }
		for _, m := range modifierList.AsModifierList().modifiers {
			m.flags |= NodeFlagsAmbient
		}
		saveContextFlags := p.contextFlags
		p.setContextFlags(NodeFlagsAmbient, true)
		result := p.parseDeclarationWorker(pos, hasJSDoc, modifierList)
		p.contextFlags = saveContextFlags
		return result
	} else {
		return p.parseDeclarationWorker(pos, hasJSDoc, modifierList)
	}
}

func (p *Parser) parseDeclarationWorker(pos int, hasJSDoc bool, modifierList *Node) *Statement {
	switch p.token {
	case SyntaxKindVarKeyword, SyntaxKindLetKeyword, SyntaxKindConstKeyword, SyntaxKindUsingKeyword, SyntaxKindAwaitKeyword:
		return p.parseVariableStatement(pos, hasJSDoc, modifierList)
	case SyntaxKindFunctionKeyword:
		return p.parseFunctionDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindClassKeyword:
		return p.parseClassDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindInterfaceKeyword:
		return p.parseInterfaceDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindTypeKeyword:
		return p.parseTypeAliasDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindEnumKeyword:
		return p.parseEnumDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindGlobalKeyword, SyntaxKindModuleKeyword, SyntaxKindNamespaceKeyword:
		return p.parseModuleDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindImportKeyword:
		return p.parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifierList)
	case SyntaxKindExportKeyword:
		p.nextToken()
		switch p.token {
		case SyntaxKindDefaultKeyword, SyntaxKindEqualsToken:
			return p.parseExportAssignment(pos, hasJSDoc, modifierList)
		case SyntaxKindAsKeyword:
			return p.parseNamespaceExportDeclaration(pos, hasJSDoc, modifierList)
		default:
			return p.parseExportDeclaration(pos, hasJSDoc, modifierList)
		}
	}
	if modifierList != nil {
		// We reached this point because we encountered decorators and/or modifiers and assumed a declaration
		// would follow. For recovery and error reporting purposes, return an incomplete declaration.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Declaration_expected)
		result := p.factory.NewMissingDeclaration(modifierList)
		p.finishNode(result, pos)
		return result
	}
	panic("Unhandled case in parseDeclarationWorker")
}

func isDeclareModifier(modifier *Node) bool {
	return modifier.kind == SyntaxKindDeclareKeyword
}

func (p *Parser) isLetDeclaration() bool {
	// In ES6 'let' always starts a lexical declaration if followed by an identifier or {
	// or [.
	return p.lookAhead(p.nextTokenIsBindingIdentifierOrStartOfDestructuring)
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuring() bool {
	p.nextToken()
	return p.isBindingIdentifier() || p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindOpenBracketToken
}

func (p *Parser) parseBlock(ignoreMissingOpenBrace bool, diagnosticMessage *diagnostics.Message) *Node {
	pos := p.nodePos()
	// !!! JSDOC
	openBracePosition := p.scanner.TokenStart()
	openBraceParsed := p.parseExpectedWithDiagnostic(SyntaxKindOpenBraceToken, diagnosticMessage, true /*shouldAdvance*/)
	multiline := false
	var statements []*Statement
	if openBraceParsed || ignoreMissingOpenBrace {
		multiline = p.hasPrecedingLineBreak()
		statements = p.parseList(PCBlockStatements, (*Parser).parseStatement)
		p.parseExpectedMatchingBrackets(SyntaxKindOpenBraceToken, SyntaxKindCloseBraceToken, openBraceParsed, openBracePosition)
		if p.token == SyntaxKindEqualsToken {
			p.parseErrorAtCurrentToken(diagnostics.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_whole_assignment_in_parentheses)
			p.nextToken()
		}
	}
	result := p.factory.NewBlock(statements, multiline)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseEmptyStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindSemicolonToken)
	result := p.factory.NewEmptyStatement()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseIfStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindIfKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(SyntaxKindOpenParenToken, SyntaxKindCloseParenToken, openParenParsed, openParenPosition)
	thenStatement := p.parseStatement()
	var elseStatement *Statement
	if p.parseOptional(SyntaxKindElseKeyword) {
		elseStatement = p.parseStatement()
	}
	result := p.factory.NewIfStatement(expression, thenStatement, elseStatement)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDoStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindDoKeyword)
	statement := p.parseStatement()
	p.parseExpected(SyntaxKindWhileKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(SyntaxKindOpenParenToken, SyntaxKindCloseParenToken, openParenParsed, openParenPosition)
	// From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
	// 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
	// spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
	//  do;while(0)x will have a semicolon inserted before x.
	p.parseOptional(SyntaxKindSemicolonToken)
	result := p.factory.NewDoStatement(statement, expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseWhileStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindWhileKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(SyntaxKindOpenParenToken, SyntaxKindCloseParenToken, openParenParsed, openParenPosition)
	statement := p.parseStatement()
	result := p.factory.NewWhileStatement(expression, statement)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseForOrForInOrForOfStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindForKeyword)
	awaitToken := p.parseOptionalToken(SyntaxKindAwaitKeyword)
	p.parseExpected(SyntaxKindOpenParenToken)
	var initializer *ForInitializer
	if p.token != SyntaxKindSemicolonToken {
		if p.token == SyntaxKindVarKeyword || p.token == SyntaxKindLetKeyword || p.token == SyntaxKindConstKeyword ||
			p.token == SyntaxKindUsingKeyword && p.lookAhead(p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf) ||
			// this one is meant to allow of
			p.token == SyntaxKindAwaitKeyword && p.lookAhead(p.nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine) {
			initializer = p.parseVariableDeclarationList(true /*inForStatementInitializer*/)
		} else {
			initializer = doInContext(p, NodeFlagsDisallowInContext, true, (*Parser).parseExpression)
		}
	}
	var result *Statement
	switch {
	case awaitToken != nil && p.parseExpected(SyntaxKindOfKeyword) || awaitToken == nil && p.parseOptional(SyntaxKindOfKeyword):
		expression := doInContext(p, NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		p.parseExpected(SyntaxKindCloseParenToken)
		result = p.factory.NewForInOrOfStatement(SyntaxKindForOfStatement, awaitToken, initializer, expression, p.parseStatement())
	case p.parseOptional(SyntaxKindInKeyword):
		expression := p.parseExpressionAllowIn()
		p.parseExpected(SyntaxKindCloseParenToken)
		result = p.factory.NewForInOrOfStatement(SyntaxKindForInStatement, nil /*awaitToken*/, initializer, expression, p.parseStatement())
	default:
		p.parseExpected(SyntaxKindSemicolonToken)
		var condition *Expression
		if p.token != SyntaxKindSemicolonToken && p.token != SyntaxKindCloseParenToken {
			condition = p.parseExpressionAllowIn()
		}
		p.parseExpected(SyntaxKindSemicolonToken)
		var incrementor *Expression
		if p.token != SyntaxKindCloseParenToken {
			incrementor = p.parseExpressionAllowIn()
		}
		p.parseExpected(SyntaxKindCloseParenToken)
		result = p.factory.NewForStatement(initializer, condition, incrementor, p.parseStatement())
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseBreakStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindBreakKeyword)
	label := p.parseIdentifierUnlessAtSemicolon()
	p.parseSemicolon()
	result := p.factory.NewBreakStatement(label)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseContinueStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindContinueKeyword)
	label := p.parseIdentifierUnlessAtSemicolon()
	p.parseSemicolon()
	result := p.factory.NewContinueStatement(label)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseIdentifierUnlessAtSemicolon() *Node {
	if !p.canParseSemicolon() {
		return p.parseIdentifier()
	}
	return nil
}

func (p *Parser) parseReturnStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindReturnKeyword)
	var expression *Expression
	if !p.canParseSemicolon() {
		expression = p.parseExpressionAllowIn()
	}
	p.parseSemicolon()
	result := p.factory.NewReturnStatement(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseWithStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindWithKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(SyntaxKindOpenParenToken, SyntaxKindCloseParenToken, openParenParsed, openParenPosition)
	statement := doInContext(p, NodeFlagsInWithStatement, true, (*Parser).parseStatement)
	result := p.factory.NewWithStatement(expression, statement)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseCaseClause() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindCaseKeyword)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(SyntaxKindColonToken)
	statements := p.parseList(PCSwitchClauseStatements, (*Parser).parseStatement)
	result := p.factory.NewCaseOrDefaultClause(SyntaxKindCaseClause, expression, statements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDefaultClause() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindDefaultKeyword)
	p.parseExpected(SyntaxKindColonToken)
	statements := p.parseList(PCSwitchClauseStatements, (*Parser).parseStatement)
	result := p.factory.NewCaseOrDefaultClause(SyntaxKindDefaultClause, nil /*expression*/, statements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseCaseOrDefaultClause() *Node {
	if p.token == SyntaxKindCaseKeyword {
		return p.parseCaseClause()
	}
	return p.parseDefaultClause()
}

func (p *Parser) parseCaseBlock() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBraceToken)
	clauses := p.parseList(PCSwitchClauses, (*Parser).parseCaseOrDefaultClause)
	p.parseExpected(SyntaxKindCloseBraceToken)
	result := p.factory.NewCaseBlock(clauses)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseSwitchStatement() *Node {
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindSwitchKeyword)
	p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(SyntaxKindCloseParenToken)
	caseBlock := p.parseCaseBlock()
	result := p.factory.NewSwitchStatement(expression, caseBlock)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseThrowStatement() *Node {
	// ThrowStatement[Yield] :
	//      throw [no LineTerminator here]Expression[In, ?Yield];
	pos := p.nodePos()
	//const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindThrowKeyword)
	// Because of automatic semicolon insertion, we need to report error if this
	// throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
	// directly as that might consume an expression on the following line.
	// Instead, we create a "missing" identifier, but don't report an error. The actual error
	// will be reported in the grammar walker.
	var expression *Expression
	if !p.hasPrecedingLineBreak() {
		expression = p.parseExpressionAllowIn()
	} else {
		expression = p.createMissingIdentifier()
	}
	if !p.tryParseSemicolon() {
		p.parseErrorForMissingSemicolonAfter(expression)
	}
	result := p.factory.NewThrowStatement(expression)
	p.finishNode(result, pos)
	return result
}

// TODO: Review for error recovery
func (p *Parser) parseTryStatement() *Node {
	pos := p.nodePos()
	// const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindTryKeyword)
	tryBlock := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	var catchClause *Node
	if p.token == SyntaxKindCatchKeyword {
		catchClause = p.parseCatchClause()
	}
	// If we don't have a catch clause, then we must have a finally clause.  Try to parse
	// one out no matter what.
	var finallyBlock *Node
	if catchClause == nil || p.token == SyntaxKindFinallyKeyword {
		p.parseExpectedWithDiagnostic(SyntaxKindFinallyKeyword, diagnostics.X_catch_or_finally_expected, true /*shouldAdvance*/)
		finallyBlock = p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	}
	result := p.factory.NewTryStatement(tryBlock, catchClause, finallyBlock)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseCatchClause() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindCatchKeyword)
	var variableDeclaration *Node
	if p.parseOptional(SyntaxKindOpenParenToken) {
		variableDeclaration = p.parseVariableDeclaration()
		p.parseExpected(SyntaxKindCloseParenToken)
	}
	block := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	result := p.factory.NewCatchClause(variableDeclaration, block)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDebuggerStatement() *Node {
	pos := p.nodePos()
	// const hasJSDoc = hasPrecedingJSDocComment();
	p.parseExpected(SyntaxKindDebuggerKeyword)
	p.parseSemicolon()
	result := p.factory.NewDebuggerStatement()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExpressionOrLabeledStatement() *Statement {
	// Avoiding having to do the lookahead for a labeled statement by just trying to parse
	// out an expression, seeing if it is identifier and then seeing if it is followed by
	// a colon.
	pos := p.nodePos()
	// !!! JSDoc
	expression := p.parseExpression()
	if expression.kind == SyntaxKindIdentifier && p.parseOptional(SyntaxKindColonToken) {
		result := p.factory.NewLabeledStatement(expression, p.parseStatement())
		p.finishNode(result, pos)
		return result
	}
	// if !p.tryParseSemicolon() {
	// 	p.parseErrorForMissingSemicolonAfter(expression)
	// }
	p.parseSemicolon()
	result := p.factory.NewExpressionStatement(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseVariableStatement(pos int, hasJSDoc bool, modifiers *Node) *Node {
	declarationList := p.parseVariableDeclarationList(false /*inForStatementInitializer*/)
	p.parseSemicolon()
	result := p.factory.NewVariableStatement(modifiers, declarationList)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseVariableDeclarationList(inForStatementInitializer bool) *Node {
	pos := p.nodePos()
	var flags NodeFlags
	switch p.token {
	case SyntaxKindVarKeyword:
		flags = NodeFlagsNone
	case SyntaxKindLetKeyword:
		flags = NodeFlagsLet
	case SyntaxKindConstKeyword:
		flags = NodeFlagsConst
	case SyntaxKindUsingKeyword:
		flags = NodeFlagsUsing
	case SyntaxKindAwaitKeyword:
		//Debug.assert(isAwaitUsingDeclaration());
		flags = NodeFlagsAwaitUsing
		p.nextToken()
	default:
		panic("Unhandled case in parseVariableDeclarationList")
	}
	p.nextToken()
	// The user may have written the following:
	//
	//    for (let of X) { }
	//
	// In this case, we want to parse an empty declaration list, and then parse 'of'
	// as a keyword. The reason this is not automatic is that 'of' is a valid identifier.
	// So we need to look ahead to determine if 'of' should be treated as a keyword in
	// this context.
	// The checker will then give an error that there is an empty declaration list.
	var declarations []*Node
	if p.token == SyntaxKindOfKeyword && p.lookAhead(p.nextIsIdentifierAndCloseParen) {
		declarations = []*Node{}
	} else {
		saveContextFlags := p.contextFlags
		p.setContextFlags(NodeFlagsDisallowInContext, inForStatementInitializer)
		declarations = p.parseDelimitedList(PCVariableDeclarations, ifElse(inForStatementInitializer, (*Parser).parseVariableDeclaration, (*Parser).parseVariableDeclarationAllowExclamation))
		p.contextFlags = saveContextFlags
	}
	result := p.factory.NewVariableDeclarationList(flags, declarations)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) nextIsIdentifierAndCloseParen() bool {
	return p.nextTokenIsIdentifier() && p.nextToken() == SyntaxKindCloseParenToken
}

func (p *Parser) nextTokenIsIdentifier() bool {
	p.nextToken()
	return p.isIdentifier()
}

func (p *Parser) parseVariableDeclaration() *Node {
	return p.parseVariableDeclarationWorker(false /*allowExclamation*/)
}

func (p *Parser) parseVariableDeclarationAllowExclamation() *Node {
	return p.parseVariableDeclarationWorker(true /*allowExclamation*/)
}

func (p *Parser) parseVariableDeclarationWorker(allowExclamation bool) *Node {
	pos := p.nodePos()
	// !!! jsDoc
	name := p.parseIdentifierOrPatternWithDiagnostic(diagnostics.Private_identifiers_are_not_allowed_in_variable_declarations)
	var exclamationToken *Node
	if allowExclamation && name.kind == SyntaxKindIdentifier && p.token == SyntaxKindExclamationToken && !p.hasPrecedingLineBreak() {
		exclamationToken = p.parseTokenNode()
	}
	typeNode := p.parseTypeAnnotation()
	var initializer *Expression
	if p.token != SyntaxKindInKeyword && p.token != SyntaxKindOfKeyword {
		initializer = p.parseInitializer()
	}
	result := p.factory.NewVariableDeclaration(name, exclamationToken, typeNode, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseIdentifierOrPattern() *Node {
	return p.parseIdentifierOrPatternWithDiagnostic(nil)
}

func (p *Parser) parseIdentifierOrPatternWithDiagnostic(privateIdentifierDiagnosticMessage *diagnostics.Message) *Node {
	if p.token == SyntaxKindOpenBracketToken {
		return p.parseArrayBindingPattern()
	}
	if p.token == SyntaxKindOpenBraceToken {
		return p.parseObjectBindingPattern()
	}
	return p.parseBindingIdentifierWithDiagnostic(privateIdentifierDiagnosticMessage)
}

func (p *Parser) parseArrayBindingPattern() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBracketToken)
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsDisallowInContext, false)
	elements := p.parseDelimitedList(PCArrayBindingElements, (*Parser).parseArrayBindingElement)
	p.contextFlags = saveContextFlags
	p.parseExpected(SyntaxKindCloseBracketToken)
	result := p.factory.NewBindingPattern(SyntaxKindArrayBindingPattern, elements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseArrayBindingElement() *Node {
	pos := p.nodePos()
	var dotDotDotToken *Node
	var name *Node
	var initializer *Expression
	if p.token != SyntaxKindCommaToken {
		// These are all nil for a missing element
		dotDotDotToken = p.parseOptionalToken(SyntaxKindDotDotDotToken)
		name = p.parseIdentifierOrPattern()
		initializer = p.parseInitializer()
	}
	result := p.factory.NewBindingElement(dotDotDotToken, nil /*propertyName*/, name, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectBindingPattern() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBraceToken)
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsDisallowInContext, false)
	elements := p.parseDelimitedList(PCObjectBindingElements, (*Parser).parseObjectBindingElement)
	p.contextFlags = saveContextFlags
	p.parseExpected(SyntaxKindCloseBraceToken)
	result := p.factory.NewBindingPattern(SyntaxKindObjectBindingPattern, elements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectBindingElement() *Node {
	pos := p.nodePos()
	dotDotDotToken := p.parseOptionalToken(SyntaxKindDotDotDotToken)
	tokenIsIdentifier := p.isBindingIdentifier()
	propertyName := p.parsePropertyName()
	var name *Node
	if tokenIsIdentifier && p.token != SyntaxKindColonToken {
		name = propertyName
		propertyName = nil
	} else {
		p.parseExpected(SyntaxKindColonToken)
		name = p.parseIdentifierOrPattern()
	}
	initializer := p.parseInitializer()
	result := p.factory.NewBindingElement(dotDotDotToken, propertyName, name, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTokenNode() *Node {
	pos := p.nodePos()
	kind := p.token
	p.nextToken()
	result := p.factory.NewToken(kind)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExpectedToken(kind SyntaxKind) *Node {
	token := p.parseOptionalToken(kind)
	if token == nil {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(kind))
		token = p.factory.NewToken(kind)
		p.finishNode(token, p.nodePos())
	}
	return token
}

func (p *Parser) parseOptionalToken(kind SyntaxKind) *Node {
	if p.token == kind {
		return p.parseTokenNode()
	}
	return nil
}

func (p *Parser) parseInitializer() *Expression {
	if p.parseOptional(SyntaxKindEqualsToken) {
		return p.parseAssignmentExpressionOrHigher()
	}
	return nil
}

func (p *Parser) parseTypeAnnotation() *TypeNode {
	if p.parseOptional(SyntaxKindColonToken) {
		return p.parseType()
	}
	return nil
}

func (p *Parser) parseFunctionDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	modifierFlags := modifiersToFlags(modifiers)
	p.parseExpected(SyntaxKindFunctionKeyword)
	asteriskToken := p.parseOptionalToken(SyntaxKindAsteriskToken)
	// We don't parse the name here in await context, instead we will report a grammar error in the checker.
	var name *Node
	if modifierFlags&ModifierFlagsDefault == 0 || p.isBindingIdentifier() {
		name = p.parseBindingIdentifier()
	}
	signatureFlags := ifElse(asteriskToken != nil, ParseFlagsYield, ParseFlagsNone) | ifElse(modifierFlags&ModifierFlagsAsync != 0, ParseFlagsAwait, ParseFlagsNone)
	typeParameters := p.parseTypeParameters()
	saveContextFlags := p.contextFlags
	if modifierFlags&ModifierFlagsExport != 0 {
		p.setContextFlags(NodeFlagsAwaitContext, true)
	}
	parameters := p.parseParameters(signatureFlags)
	returnType := p.parseReturnType(SyntaxKindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(signatureFlags, diagnostics.X_or_expected)
	p.contextFlags = saveContextFlags
	result := p.factory.NewFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseClassDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	return p.parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, SyntaxKindClassDeclaration)
}

func (p *Parser) parseClassExpression() *Node {
	return p.parseClassDeclarationOrExpression(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/, SyntaxKindClassExpression)
}

func (p *Parser) parseClassDeclarationOrExpression(pos int, hasJSDoc bool, modifiers *Node, kind SyntaxKind) *Node {
	saveContextFlags := p.contextFlags
	p.parseExpected(SyntaxKindClassKeyword)
	// We don't parse the name here in await context, instead we will report a grammar error in the checker.
	name := p.parseNameOfClassDeclarationOrExpression()
	typeParameters := p.parseTypeParameters()
	if modifiers != nil && utils.Some(modifiers.AsModifierList().modifiers, isExportModifier) {
		p.setContextFlags(NodeFlagsAwaitContext, true /*value*/)
	}
	heritageClauses := p.parseHeritageClauses()
	var members []*Node
	if p.parseExpected(SyntaxKindOpenBraceToken) {
		// ClassTail[Yield,Await] : (Modified) See 14.5
		//      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
		members = p.parseList(PCClassMembers, (*Parser).parseClassElement)
		p.parseExpected(SyntaxKindCloseBraceToken)
	}
	p.contextFlags = saveContextFlags
	var result *Node
	if kind == SyntaxKindClassDeclaration {
		result = p.factory.NewClassDeclaration(modifiers, name, typeParameters, heritageClauses, members)
	} else {
		result = p.factory.NewClassExpression(modifiers, name, typeParameters, heritageClauses, members)
	}
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseNameOfClassDeclarationOrExpression() *Node {
	// implements is a future reserved word so
	// 'class implements' might mean either
	// - class expression with omitted name, 'implements' starts heritage clause
	// - class with name 'implements'
	// 'isImplementsClause' helps to disambiguate between these two cases
	if p.isBindingIdentifier() && !p.isImplementsClause() {
		return p.createIdentifier(p.isBindingIdentifier())
	}
	return nil
}

func (p *Parser) isImplementsClause() bool {
	return p.token == SyntaxKindImplementsKeyword && p.lookAhead(p.nextTokenIsIdentifierOrKeyword)
}

func isExportModifier(modifier *Node) bool {
	return modifier.kind == SyntaxKindExportKeyword
}

func isAsyncModifier(modifier *Node) bool {
	return modifier.kind == SyntaxKindAsyncKeyword
}

func (p *Parser) parseHeritageClauses() []*Node {
	// ClassTail[Yield,Await] : (Modified) See 14.5
	//      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
	if p.isHeritageClause() {
		return p.parseList(PCHeritageClauses, (*Parser).parseHeritageClause)
	}
	return []*Node{}
}

func (p *Parser) parseHeritageClause() *Node {
	pos := p.nodePos()
	kind := p.token
	p.nextToken()
	types := p.parseDelimitedList(PCHeritageClauseElement, (*Parser).parseExpressionWithTypeArguments)
	result := p.factory.NewHeritageClause(kind, types)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExpressionWithTypeArguments() *Node {
	pos := p.nodePos()
	expression := p.parseLeftHandSideExpressionOrHigher()
	if isExpressionWithTypeArguments(expression) {
		return expression
	}
	typeArguments := p.parseTypeArguments()
	result := p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseClassElement() *Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	if p.token == SyntaxKindSemicolonToken {
		p.nextToken()
		result := p.factory.NewSemicolonClassElement()
		p.finishNode(result, pos)
		return result
	}
	modifierList := p.parseModifiersWithOptions(true /*allowDecorators*/, true /*permitConstAsModifier*/, true /*stopOnStartOfClassStaticBlock*/)
	if p.token == SyntaxKindStaticKeyword && p.lookAhead(p.nextTokenIsOpenBrace) {
		return p.parseClassStaticBlockDeclaration(pos, hasJSDoc, modifierList)
	}
	if p.parseContextualModifier(SyntaxKindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifierList, SyntaxKindGetAccessor, ParseFlagsNone)
	}
	if p.parseContextualModifier(SyntaxKindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifierList, SyntaxKindSetAccessor, ParseFlagsNone)
	}
	if p.token == SyntaxKindConstructorKeyword || p.token == SyntaxKindStringLiteral {
		constructorDeclaration := p.tryParseConstructorDeclaration(pos, hasJSDoc, modifierList)
		if constructorDeclaration != nil {
			return constructorDeclaration
		}
	}
	if p.isIndexSignature() {
		return p.parseIndexSignatureDeclaration(pos, hasJSDoc, modifierList)
	}
	// It is very important that we check this *after* checking indexers because
	// the [ token can start an index signature or a computed property name
	if tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindStringLiteral || p.token == SyntaxKindNumericLiteral || p.token == SyntaxKindBigIntLiteral || p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBracketToken {
		isAmbient := modifierList != nil && utils.Some(modifierList.AsModifierList().modifiers, isDeclareModifier)
		if isAmbient {
			for _, m := range modifierList.AsModifierList().modifiers {
				m.flags |= NodeFlagsAmbient
			}
			saveContextFlags := p.contextFlags
			p.setContextFlags(NodeFlagsAmbient, true)
			result := p.parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifierList)
			p.contextFlags = saveContextFlags
			return result
		} else {
			return p.parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifierList)
		}
	}
	if modifierList != nil {
		// treat this as a property declaration with a missing name.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Declaration_expected)
		name := p.newIdentifier("")
		return p.parsePropertyDeclaration(pos, hasJSDoc, modifierList, name, nil /*questionToken*/)
	}
	// 'isClassMemberStart' should have hinted not to attempt parsing.
	panic("Should not have attempted to parse class member declaration.")
}

func (p *Parser) parseClassStaticBlockDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	p.parseExpectedToken(SyntaxKindStaticKeyword)
	body := p.parseClassStaticBlockBody()
	result := p.factory.NewClassStaticBlockDeclaration(modifiers, body)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseClassStaticBlockBody() *Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsYieldContext, false)
	p.setContextFlags(NodeFlagsAwaitContext, true)
	body := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil /*diagnosticMessage*/)
	p.contextFlags = saveContextFlags
	return body
}

func (p *Parser) tryParseConstructorDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	state := p.mark()
	if p.token == SyntaxKindConstructorKeyword || p.token == SyntaxKindStringLiteral && p.scanner.tokenValue == "constructor" && p.lookAhead(p.nextTokenIsOpenParen) {
		p.nextToken()
		typeParameters := p.parseTypeParameters()
		parameters := p.parseParameters(ParseFlagsNone)
		returnType := p.parseReturnType(SyntaxKindColonToken, false /*isType*/)
		body := p.parseFunctionBlockOrSemicolon(ParseFlagsNone, diagnostics.X_or_expected)
		result := p.factory.NewConstructorDeclaration(modifiers, typeParameters, parameters, returnType, body)
		p.finishNode(result, pos)
		_ = hasJSDoc
		return result
	}
	p.rewind(state)
	return nil
}

func (p *Parser) nextTokenIsOpenParen() bool {
	return p.nextToken() == SyntaxKindOpenParenToken
}

func (p *Parser) parsePropertyOrMethodDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	asteriskToken := p.parseOptionalToken(SyntaxKindAsteriskToken)
	name := p.parsePropertyName()
	// Note: this is not legal as per the grammar.  But we allow it in the parser and
	// report an error in the grammar checker.
	questionToken := p.parseOptionalToken(SyntaxKindQuestionToken)
	if asteriskToken != nil || p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken {
		return p.parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, diagnostics.X_or_expected)
	}
	return p.parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, questionToken)
}

func (p *Parser) parseMethodDeclaration(pos int, hasJSDoc bool, modifiers *Node, asteriskToken *Node, name *Node, questionToken *Node, diagnosticMessage *diagnostics.Message) *Node {
	signatureFlags := ifElse(asteriskToken != nil, ParseFlagsYield, ParseFlagsNone) | ifElse(hasAsyncModifier(modifiers), ParseFlagsAwait, ParseFlagsNone)
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(signatureFlags)
	typeNode := p.parseReturnType(SyntaxKindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(signatureFlags, diagnosticMessage)
	result := p.factory.NewMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, typeNode, body)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func hasAsyncModifier(modifiers *Node) bool {
	return modifiers != nil && utils.Some(modifiers.AsModifierList().modifiers, isAsyncModifier)
}

func (p *Parser) parsePropertyDeclaration(pos int, hasJSDoc bool, modifiers *Node, name *Node, questionToken *Node) *Node {
	postfixToken := questionToken
	if postfixToken == nil && !p.hasPrecedingLineBreak() {
		postfixToken = p.parseOptionalToken(SyntaxKindExclamationToken)
	}
	typeNode := p.parseTypeAnnotation()
	initializer := doInContext(p, NodeFlagsYieldContext|NodeFlagsAwaitContext|NodeFlagsDisallowInContext, false, (*Parser).parseInitializer)
	p.parseSemicolonAfterPropertyName(name, typeNode, initializer)
	result := p.factory.NewPropertyDeclaration(modifiers, name, postfixToken, typeNode, initializer)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseSemicolonAfterPropertyName(name *Node, typeNode *TypeNode, initializer *Expression) {
	if p.token == SyntaxKindAtToken && !p.hasPrecedingLineBreak() {
		p.parseErrorAtCurrentToken(diagnostics.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations)
		return
	}
	if p.token == SyntaxKindOpenParenToken {
		p.parseErrorAtCurrentToken(diagnostics.Cannot_start_a_function_call_in_a_type_annotation)
		p.nextToken()
		return
	}
	if typeNode != nil && !p.canParseSemicolon() {
		if initializer != nil {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindSemicolonToken))
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Expected_for_property_initializer)
		}
		return
	}
	if p.tryParseSemicolon() {
		return
	}
	if initializer != nil {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindSemicolonToken))
		return
	}
	p.parseErrorForMissingSemicolonAfter(name)
}

func (p *Parser) parseErrorForMissingSemicolonAfter(node *Node) {
	// Tagged template literals are sometimes used in places where only simple strings are allowed, i.e.:
	//   module `M1` {
	//   ^^^^^^^^^^^ This block is parsed as a template literal like module`M1`.
	if node.kind == SyntaxKindTaggedTemplateExpression {
		p.parseErrorAtRange(p.skipRangeTrivia(node.AsTaggedTemplateExpression().template.loc), diagnostics.Module_declaration_names_may_only_use_or_quoted_strings)
		return
	}
	// Otherwise, if this isn't a well-known keyword-like identifier, give the generic fallback message.
	var expressionText string
	if node.kind == SyntaxKindIdentifier {
		expressionText = node.AsIdentifier().text
	}
	// !!! Also call isIdentifierText(expressionText, languageVersion)
	if expressionText == "" {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindSemicolonToken))
		return
	}
	pos := skipTrivia(p.sourceText, node.Pos())
	// Some known keywords are likely signs of syntax being used improperly.
	switch expressionText {
	case "const", "let", "var":
		p.parseErrorAt(pos, node.End(), diagnostics.Variable_declaration_not_allowed_at_this_location)
		return
	case "declare":
		// If a declared node failed to parse, it would have emitted a diagnostic already.
		return
	case "interface":
		p.parseErrorForInvalidName(diagnostics.Interface_name_cannot_be_0, diagnostics.Interface_must_be_given_a_name, SyntaxKindOpenBraceToken)
		return
	case "is":
		p.parseErrorAt(pos, p.scanner.TokenStart(), diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods)
		return
	case "module", "namespace":
		p.parseErrorForInvalidName(diagnostics.Namespace_name_cannot_be_0, diagnostics.Namespace_must_be_given_a_name, SyntaxKindOpenBraceToken)
		return
	case "type":
		p.parseErrorForInvalidName(diagnostics.Type_alias_name_cannot_be_0, diagnostics.Type_alias_must_be_given_a_name, SyntaxKindEqualsToken)
		return
	}
	// !!! The user alternatively might have misspelled or forgotten to add a space after a common keyword.
	// const suggestion = getSpellingSuggestion(expressionText, viableKeywordSuggestions, identity) ?? getSpaceSuggestion(expressionText);
	// if (suggestion) {
	// 	parseErrorAt(pos, node.end, Diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion);
	// 	return;
	// }
	// Unknown tokens are handled with their own errors in the scanner
	if p.token == SyntaxKindUnknown {
		return
	}
	// Otherwise, we know this some kind of unknown word, not just a missing expected semicolon.
	p.parseErrorAt(pos, node.End(), diagnostics.Unexpected_keyword_or_identifier)
}

func (p *Parser) parseErrorForInvalidName(nameDiagnostic *diagnostics.Message, blankDiagnostic *diagnostics.Message, tokenIfBlankName SyntaxKind) {
	if p.token == tokenIfBlankName {
		p.parseErrorAtCurrentToken(blankDiagnostic)
	} else {
		p.parseErrorAtCurrentToken(nameDiagnostic, p.scanner.TokenValue())
	}
}

func (p *Parser) parseInterfaceDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	p.parseExpected(SyntaxKindInterfaceKeyword)
	name := p.parseIdentifier()
	typeParameters := p.parseTypeParameters()
	heritageClauses := p.parseHeritageClauses()
	members := p.parseObjectTypeMembers()
	result := p.factory.NewInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseTypeAliasDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	p.parseExpected(SyntaxKindTypeKeyword)
	if p.hasPrecedingLineBreak() {
		p.parseErrorAtCurrentToken(diagnostics.Line_break_not_permitted_here)
	}
	name := p.parseIdentifier()
	typeParameters := p.parseTypeParameters()
	p.parseExpected(SyntaxKindEqualsToken)
	var typeNode *TypeNode
	if p.token == SyntaxKindIntrinsicKeyword && p.lookAhead(p.nextIsNotDot) {
		typeNode = p.parseKeywordTypeNode()
	} else {
		typeNode = p.parseType()
	}
	p.parseSemicolon()
	result := p.factory.NewTypeAliasDeclaration(modifiers, name, typeParameters, typeNode)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) nextIsNotDot() bool {
	return p.nextToken() != SyntaxKindDotToken
}

// In an ambient declaration, the grammar only allows integer literals as initializers.
// In a non-ambient declaration, the grammar allows uninitialized members only in a
// ConstantEnumMemberSection, which starts at the beginning of an enum declaration
// or any time an integer literal initializer is encountered.
func (p *Parser) parseEnumMember() *Node {
	pos := p.nodePos()
	// hasJSDoc := p.hasPrecedingJSDocComment()
	name := p.parsePropertyName()
	initializer := doInContext(p, NodeFlagsDisallowInContext, false, (*Parser).parseInitializer)
	result := p.factory.NewEnumMember(name, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseEnumDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	p.parseExpected(SyntaxKindEnumKeyword)
	name := p.parseIdentifier()
	var members []*Node
	if p.parseExpected(SyntaxKindOpenBraceToken) {
		saveContextFlags := p.contextFlags
		p.setContextFlags(NodeFlagsYieldContext|NodeFlagsAwaitContext, false)
		members = p.parseDelimitedList(PCEnumMembers, (*Parser).parseEnumMember)
		p.contextFlags = saveContextFlags
		p.parseExpected(SyntaxKindCloseBraceToken)
	}
	result := p.factory.NewEnumDeclaration(modifiers, name, members)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseModuleDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Statement {
	var flags NodeFlags
	if p.token == SyntaxKindGlobalKeyword {
		// global augmentation
		return p.parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiers)
	} else if p.parseOptional(SyntaxKindNamespaceKeyword) {
		flags |= NodeFlagsNamespace
	} else {
		p.parseExpected(SyntaxKindModuleKeyword)
		if p.token == SyntaxKindStringLiteral {
			return p.parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiers)
		}
	}
	return p.parseModuleOrNamespaceDeclaration(pos, hasJSDoc, modifiers, flags)
}

func (p *Parser) parseAmbientExternalModuleDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	var flags NodeFlags
	var name *Node
	if p.token == SyntaxKindGlobalKeyword {
		// parse 'global' as name of global scope augmentation
		name = p.parseIdentifier()
		flags |= NodeFlagsGlobalAugmentation
	} else {
		// parse string literal
		name = p.parseLiteralExpression()
		p.internIdentifier(name.Text())
	}
	var body *Node
	if p.token == SyntaxKindOpenBraceToken {
		body = p.parseModuleBlock()
	} else {
		p.parseSemicolon()
	}
	result := p.factory.NewModuleDeclaration(modifiers, name, body, flags)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseModuleBlock() *Node {
	pos := p.nodePos()
	var statements []*Statement
	if p.parseExpected(SyntaxKindOpenBraceToken) {
		statements = p.parseList(PCBlockStatements, (*Parser).parseStatement)
		p.parseExpected(SyntaxKindCloseBraceToken)
	}
	result := p.factory.NewModuleBlock(statements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseModuleOrNamespaceDeclaration(pos int, hasJSDoc bool, modifiers *Node, flags NodeFlags) *Node {
	// If we are parsing a dotted namespace name, we want to
	// propagate the 'Namespace' flag across the names if set.
	namespaceFlag := flags & NodeFlagsNamespace
	var name *Node
	if flags&NodeFlagsNestedNamespace != 0 {
		name = p.parseIdentifierName()
	} else {
		name = p.parseIdentifier()
	}
	var body *Node
	if p.parseOptional(SyntaxKindDotToken) {
		body = p.parseModuleOrNamespaceDeclaration(p.nodePos(), false /*hasJSDoc*/, nil /*modifiers*/, NodeFlagsNestedNamespace|namespaceFlag)
	} else {
		body = p.parseModuleBlock()
	}
	result := p.factory.NewModuleDeclaration(modifiers, name, body, flags)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseImportDeclarationOrImportEqualsDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Statement {
	p.parseExpected(SyntaxKindImportKeyword)
	afterImportPos := p.nodePos()
	// We don't parse the identifier here in await context, instead we will report a grammar error in the checker.
	var identifier *Node
	if p.isIdentifier() {
		identifier = p.parseIdentifier()
	}
	isTypeOnly := false
	if identifier != nil && identifier.AsIdentifier().text == "type" &&
		(p.token != SyntaxKindFromKeyword || p.isIdentifier() && p.lookAhead(p.nextTokenIsFromKeywordOrEqualsToken)) &&
		(p.isIdentifier() || p.tokenAfterImportDefinitelyProducesImportDeclaration()) {
		isTypeOnly = true
		identifier = nil
		if p.isIdentifier() {
			identifier = p.parseIdentifier()
		}
	}
	if identifier != nil && !p.tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() {
		return p.parseImportEqualsDeclaration(pos, hasJSDoc, modifiers, identifier, isTypeOnly)
	}
	importClause := p.tryParseImportClause(identifier, afterImportPos, isTypeOnly, false /*skipJsDocLeadingAsterisks*/)
	moduleSpecifier := p.parseModuleSpecifier()
	attributes := p.tryParseImportAttributes()
	p.parseSemicolon()
	result := p.factory.NewImportDeclaration(modifiers, importClause, moduleSpecifier, attributes)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) nextTokenIsFromKeywordOrEqualsToken() bool {
	p.nextToken()
	return p.token == SyntaxKindFromKeyword || p.token == SyntaxKindEqualsToken
}

func (p *Parser) tokenAfterImportDefinitelyProducesImportDeclaration() bool {
	return p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBraceToken
}

func (p *Parser) tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() bool {
	// In `import id ___`, the current token decides whether to produce
	// an ImportDeclaration or ImportEqualsDeclaration.
	return p.token == SyntaxKindCommaToken || p.token == SyntaxKindFromKeyword
}

func (p *Parser) parseImportEqualsDeclaration(pos int, hasJSDoc bool, modifiers *Node, identifier *Node, isTypeOnly bool) *Node {
	p.parseExpected(SyntaxKindEqualsToken)
	moduleReference := p.parseModuleReference()
	p.parseSemicolon()
	result := p.factory.NewImportEqualsDeclaration(modifiers, isTypeOnly, identifier, moduleReference)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseModuleReference() *Node {
	if p.token == SyntaxKindRequireKeyword && p.lookAhead(p.nextTokenIsOpenParen) {
		return p.parseExternalModuleReference()
	}
	return p.parseEntityName(false /*allowReservedWords*/, nil /*diagnosticMessage*/)
}

func (p *Parser) parseExternalModuleReference() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindRequireKeyword)
	p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseModuleSpecifier()
	p.parseExpected(SyntaxKindCloseParenToken)
	result := p.factory.NewExternalModuleReference(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseModuleSpecifier() *Expression {
	if p.token == SyntaxKindStringLiteral {
		result := p.parseLiteralExpression()
		p.internIdentifier(result.Text())
		return result
	}
	// We allow arbitrary expressions here, even though the grammar only allows string
	// literals.  We check to ensure that it is only a string literal later in the grammar
	// check pass.
	return p.parseExpression()
}

func (p *Parser) tryParseImportClause(identifier *Node, pos int, isTypeOnly bool, skipJsDocLeadingAsterisks bool) *Node {
	// ImportDeclaration:
	//  import ImportClause from ModuleSpecifier ;
	//  import ModuleSpecifier;
	if identifier != nil || p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBraceToken {
		importClause := p.parseImportClause(identifier, pos, isTypeOnly, skipJsDocLeadingAsterisks)
		p.parseExpected(SyntaxKindFromKeyword)
		return importClause
	}
	return nil
}

func (p *Parser) parseImportClause(identifier *Node, pos int, isTypeOnly bool, skipJsDocLeadingAsterisks bool) *Node {
	// ImportClause:
	//  ImportedDefaultBinding
	//  NameSpaceImport
	//  NamedImports
	//  ImportedDefaultBinding, NameSpaceImport
	//  ImportedDefaultBinding, NamedImports
	// If there was no default import or if there is comma token after default import
	// parse namespace or named imports
	var namedBindings *Node
	if identifier == nil || p.parseOptional(SyntaxKindCommaToken) {
		_ = skipJsDocLeadingAsterisks
		// !!! if (skipJsDocLeadingAsterisks) scanner.setSkipJsDocLeadingAsterisks(true);
		if p.token == SyntaxKindAsteriskToken {
			namedBindings = p.parseNamespaceImport()
		} else {
			namedBindings = p.parseNamedImports()
		}
		// !!! if (skipJsDocLeadingAsterisks) scanner.setSkipJsDocLeadingAsterisks(false);
	}
	result := p.factory.NewImportClause(isTypeOnly, identifier, namedBindings)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNamespaceImport() *Node {
	// NameSpaceImport:
	//  * as ImportedBinding
	pos := p.nodePos()
	p.parseExpected(SyntaxKindAsteriskToken)
	p.parseExpected(SyntaxKindAsKeyword)
	name := p.parseIdentifier()
	result := p.factory.NewNamespaceImport(name)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNamedImports() *Node {
	pos := p.nodePos()
	// NamedImports:
	//  { }
	//  { ImportsList }
	//  { ImportsList, }
	imports := p.parseBracketedList(PCImportOrExportSpecifiers, (*Parser).parseImportSpecifier, SyntaxKindOpenBraceToken, SyntaxKindCloseBraceToken)
	result := p.factory.NewNamedImports(imports)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportSpecifier() *Node {
	pos := p.nodePos()
	isTypeOnly, propertyName, name := p.parseImportOrExportSpecifier(SyntaxKindImportSpecifier)
	var identifierName *Node
	if name.kind == SyntaxKindIdentifier {
		identifierName = name
	} else {
		p.parseErrorAtRange(p.skipRangeTrivia(name.loc), diagnostics.Identifier_expected)
		identifierName = p.newIdentifier("")
		p.finishNode(identifierName, name.Pos())
	}
	result := p.factory.NewImportSpecifier(isTypeOnly, propertyName, identifierName)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportOrExportSpecifier(kind SyntaxKind) (isTypeOnly bool, propertyName *Node, name *Node) {
	// ImportSpecifier:
	//   BindingIdentifier
	//   ModuleExportName as BindingIdentifier
	// ExportSpecifier:
	//   ModuleExportName
	//   ModuleExportName as ModuleExportName
	// let checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier();
	// let checkIdentifierStart = scanner.getTokenStart();
	// let checkIdentifierEnd = scanner.getTokenEnd();
	canParseAsKeyword := true
	name = p.parseModuleExportName(false /*disallowKeywords*/)
	if name.kind == SyntaxKindIdentifier && name.AsIdentifier().text == "type" {
		// If the first token of an import specifier is 'type', there are a lot of possibilities,
		// especially if we see 'as' afterwards:
		//
		// import { type } from "mod";          - isTypeOnly: false,   name: type
		// import { type as } from "mod";       - isTypeOnly: true,    name: as
		// import { type as as } from "mod";    - isTypeOnly: false,   name: as,    propertyName: type
		// import { type as as as } from "mod"; - isTypeOnly: true,    name: as,    propertyName: as
		if p.token == SyntaxKindAsKeyword {
			// { type as ...? }
			firstAs := p.parseIdentifierName()
			if p.token == SyntaxKindAsKeyword {
				// { type as as ...? }
				secondAs := p.parseIdentifierName()
				if p.canParseModuleExportName() {
					// { type as as something }
					// { type as as "something" }
					isTypeOnly = true
					propertyName = firstAs
					name = p.parseModuleExportName(true /*disallowKeywords*/)
					canParseAsKeyword = false
				} else {
					// { type as as }
					propertyName = name
					name = secondAs
					canParseAsKeyword = false
				}
			} else if p.canParseModuleExportName() {
				// { type as something }
				// { type as "something" }
				propertyName = name
				canParseAsKeyword = false
				name = p.parseModuleExportName(true /*disallowKeywords*/)
			} else {
				// { type as }
				isTypeOnly = true
				name = firstAs
			}
		} else if p.canParseModuleExportName() {
			// { type something ...? }
			// { type "something" ...? }
			isTypeOnly = true
			name = p.parseModuleExportName(true /*disallowKeywords*/)
		}
	}
	if canParseAsKeyword && p.token == SyntaxKindAsKeyword {
		propertyName = name
		p.parseExpected(SyntaxKindAsKeyword)
		name = p.parseModuleExportName(kind == SyntaxKindImportSpecifier /*disallowKeywords*/)
	}
	return
}

func (p *Parser) canParseModuleExportName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindStringLiteral
}

func (p *Parser) parseModuleExportName(disallowKeywords bool) *Node {
	if p.token == SyntaxKindStringLiteral {
		return p.parseLiteralExpression()
	}
	if disallowKeywords && isKeyword(p.token) && !p.isIdentifier() {
		p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
	}
	return p.parseIdentifierName()
}

func (p *Parser) tryParseImportAttributes() *Node {
	if (p.token == SyntaxKindWithKeyword || p.token == SyntaxKindAssertKeyword) && !p.hasPrecedingLineBreak() {
		return p.parseImportAttributes(p.token, true /*skipKeyword*/)
	}
	return nil
}

func (p *Parser) parseExportAssignment(pos int, hasJSDoc bool, modifiers *Node) *Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsAwaitContext, true)
	isExportEquals := false
	if p.parseOptional(SyntaxKindEqualsToken) {
		isExportEquals = true
	} else {
		p.parseExpected(SyntaxKindDefaultKeyword)
	}
	expression := p.parseAssignmentExpressionOrHigher()
	p.parseSemicolon()
	p.contextFlags = saveContextFlags
	result := p.factory.NewExportAssignment(modifiers, isExportEquals, expression)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseNamespaceExportDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	p.parseExpected(SyntaxKindAsKeyword)
	p.parseExpected(SyntaxKindNamespaceKeyword)
	name := p.parseIdentifier()
	p.parseSemicolon()
	// NamespaceExportDeclaration nodes cannot have decorators or modifiers, we attach them here so we can report them in the grammar checker
	result := p.factory.NewNamespaceExportDeclaration(modifiers, name)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseExportDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsAwaitContext, true)
	var exportClause *Node
	var moduleSpecifier *Expression
	var attributes *Node
	isTypeOnly := p.parseOptional(SyntaxKindTypeKeyword)
	namespaceExportPos := p.nodePos()
	if p.parseOptional(SyntaxKindAsteriskToken) {
		if p.parseOptional(SyntaxKindAsKeyword) {
			exportClause = p.parseNamespaceExport(namespaceExportPos)
		}
		p.parseExpected(SyntaxKindFromKeyword)
		moduleSpecifier = p.parseModuleSpecifier()
	} else {
		exportClause = p.parseNamedExports()
		// It is not uncommon to accidentally omit the 'from' keyword. Additionally, in editing scenarios,
		// the 'from' keyword can be parsed as a named export when the export clause is unterminated (i.e. `export { from "moduleName";`)
		// If we don't have a 'from' keyword, see if we have a string literal such that ASI won't take effect.
		if p.token == SyntaxKindFromKeyword || (p.token == SyntaxKindStringLiteral && !p.hasPrecedingLineBreak()) {
			p.parseExpected(SyntaxKindFromKeyword)
			moduleSpecifier = p.parseModuleSpecifier()
		}
	}
	if moduleSpecifier != nil && (p.token == SyntaxKindWithKeyword || p.token == SyntaxKindAssertKeyword) && !p.hasPrecedingLineBreak() {
		attributes = p.parseImportAttributes(p.token, true /*skipKeyword*/)
	}
	p.parseSemicolon()
	p.contextFlags = saveContextFlags
	result := p.factory.NewExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseNamespaceExport(pos int) *Node {
	result := p.factory.NewNamespaceExport(p.parseModuleExportName(false /*disallowKeywords*/))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNamedExports() *Node {
	pos := p.nodePos()
	// NamedImports:
	//  { }
	//  { ImportsList }
	//  { ImportsList, }
	exports := p.parseBracketedList(PCImportOrExportSpecifiers, (*Parser).parseExportSpecifier, SyntaxKindOpenBraceToken, SyntaxKindCloseBraceToken)
	result := p.factory.NewNamedExports(exports)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExportSpecifier() *Node {
	pos := p.nodePos()
	isTypeOnly, propertyName, name := p.parseImportOrExportSpecifier(SyntaxKindExportSpecifier)
	result := p.factory.NewExportSpecifier(isTypeOnly, propertyName, name)
	p.finishNode(result, pos)
	return result
}

// TYPES

func (p *Parser) parseType() *TypeNode {
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsTypeExcludesFlags, false)
	var typeNode *TypeNode
	if p.isStartOfFunctionTypeOrConstructorType() {
		typeNode = p.parseFunctionOrConstructorType()
	} else {
		pos := p.nodePos()
		typeNode = p.parseUnionTypeOrHigher()
		if !p.inDisallowConditionalTypesContext() && !p.hasPrecedingLineBreak() && p.parseOptional(SyntaxKindExtendsKeyword) {
			// The type following 'extends' is not permitted to be another conditional type
			extendsType := doInContext(p, NodeFlagsDisallowConditionalTypesContext, true, (*Parser).parseType)
			p.parseExpected(SyntaxKindQuestionToken)
			trueType := doInContext(p, NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseType)
			p.parseExpected(SyntaxKindColonToken)
			falseType := doInContext(p, NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseType)
			conditionalType := p.factory.NewConditionalTypeNode(typeNode, extendsType, trueType, falseType)
			p.finishNode(conditionalType, pos)
			typeNode = conditionalType
		}
	}
	p.contextFlags = saveContextFlags
	return typeNode
}

func (p *Parser) parseUnionTypeOrHigher() *TypeNode {
	return p.parseUnionOrIntersectionType(SyntaxKindBarToken, (*Parser).parseIntersectionTypeOrHigher)
}

func (p *Parser) parseIntersectionTypeOrHigher() *TypeNode {
	return p.parseUnionOrIntersectionType(SyntaxKindAmpersandToken, (*Parser).parseTypeOperatorOrHigher)
}

func (p *Parser) parseUnionOrIntersectionType(operator SyntaxKind, parseConstituentType func(p *Parser) *TypeNode) *TypeNode {
	pos := p.nodePos()
	isUnionType := operator == SyntaxKindBarToken
	hasLeadingOperator := p.parseOptional(operator)
	var typeNode *TypeNode
	if hasLeadingOperator {
		typeNode = p.parseFunctionOrConstructorTypeToError(isUnionType, parseConstituentType)
	} else {
		typeNode = parseConstituentType(p)
	}
	if p.token == operator || hasLeadingOperator {
		types := []*TypeNode{typeNode}
		for p.parseOptional(operator) {
			types = append(types, p.parseFunctionOrConstructorTypeToError(isUnionType, parseConstituentType))
		}
		typeNode = p.createUnionOrIntersectionTypeNode(operator, types)
		p.finishNode(typeNode, pos)
	}
	return typeNode
}

func (p *Parser) createUnionOrIntersectionTypeNode(operator SyntaxKind, types []*TypeNode) *Node {
	switch operator {
	case SyntaxKindBarToken:
		return p.factory.NewUnionTypeNode(types)
	case SyntaxKindAmpersandToken:
		return p.factory.NewIntersectionTypeNode(types)
	default:
		panic("Unhandled case in createUnionOrIntersectionType")
	}
}

func (p *Parser) parseTypeOperatorOrHigher() *TypeNode {
	operator := p.token
	switch operator {
	case SyntaxKindKeyOfKeyword, SyntaxKindUniqueKeyword, SyntaxKindReadonlyKeyword:
		return p.parseTypeOperator(operator)
	case SyntaxKindInferKeyword:
		return p.parseInferType()
	}
	return doInContext(p, NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parsePostfixTypeOrHigher)
}

func (p *Parser) parseTypeOperator(operator SyntaxKind) *Node {
	pos := p.nodePos()
	p.parseExpected(operator)
	result := p.factory.NewTypeOperatorNode(operator, p.parseTypeOperatorOrHigher())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseInferType() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindInferKeyword)
	result := p.factory.NewInferTypeNode(p.parseTypeParameterOfInferType())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeParameterOfInferType() *Node {
	pos := p.nodePos()
	name := p.parseIdentifier()
	constraint := p.tryParseConstraintOfInferType()
	result := p.factory.NewTypeParameterDeclaration(nil /*modifiers*/, name, constraint, nil /*defaultType*/)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) tryParseConstraintOfInferType() *Node {
	state := p.mark()
	if p.parseOptional(SyntaxKindExtendsKeyword) {
		constraint := doInContext(p, NodeFlagsDisallowConditionalTypesContext, true, (*Parser).parseType)
		if p.inDisallowConditionalTypesContext() || p.token != SyntaxKindQuestionToken {
			return constraint
		}
	}
	p.rewind(state)
	return nil
}

func (p *Parser) parsePostfixTypeOrHigher() *Node {
	pos := p.nodePos()
	typeNode := p.parseNonArrayType()
	for !p.hasPrecedingLineBreak() {
		switch p.token {
		case SyntaxKindExclamationToken:
			p.nextToken()
			typeNode = p.factory.NewJSDocNonNullableType(typeNode, true /*postfix*/)
			p.finishNode(typeNode, pos)
		case SyntaxKindQuestionToken:
			// If next token is start of a type we have a conditional type
			if p.lookAhead(p.nextIsStartOfType) {
				return typeNode
			}
			p.nextToken()
			typeNode = p.factory.NewJSDocNullableType(typeNode, true /*postfix*/)
			p.finishNode(typeNode, pos)
		case SyntaxKindOpenBracketToken:
			p.parseExpected(SyntaxKindOpenBracketToken)
			if p.isStartOfType(false /*isStartOfParameter*/) {
				indexType := p.parseType()
				p.parseExpected(SyntaxKindCloseBracketToken)
				typeNode = p.factory.NewIndexedAccessTypeNode(typeNode, indexType)
				p.finishNode(typeNode, pos)
			} else {
				p.parseExpected(SyntaxKindCloseBracketToken)
				typeNode = p.factory.NewArrayTypeNode(typeNode)
				p.finishNode(typeNode, pos)
			}
		default:
			return typeNode
		}
	}
	return typeNode
}

func (p *Parser) nextIsStartOfType() bool {
	p.nextToken()
	return p.isStartOfType(false /*inStartOfParameter*/)
}

func (p *Parser) parseNonArrayType() *Node {
	switch p.token {
	case SyntaxKindAnyKeyword, SyntaxKindUnknownKeyword, SyntaxKindStringKeyword, SyntaxKindNumberKeyword, SyntaxKindBigIntKeyword,
		SyntaxKindSymbolKeyword, SyntaxKindBooleanKeyword, SyntaxKindUndefinedKeyword, SyntaxKindNeverKeyword, SyntaxKindObjectKeyword:
		state := p.mark()
		keywordTypeNode := p.parseKeywordTypeNode()
		// If these are followed by a dot then parse these out as a dotted type reference instead
		if p.token != SyntaxKindDotToken {
			return keywordTypeNode
		}
		p.rewind(state)
		return p.parseTypeReference()
		// !!!
		// case SyntaxKindAsteriskEqualsToken:
		// 	// If there is '*=', treat it as * followed by postfix =
		// 	p.scanner.reScanAsteriskEqualsToken()
		// 	fallthrough
		// case SyntaxKindAsteriskToken:
		// 	return p.parseJSDocAllType()
		// case SyntaxKindQuestionQuestionToken:
		// 	// If there is '??', treat it as prefix-'?' in JSDoc type.
		// 	p.scanner.reScanQuestionToken()
		// 	fallthrough
		// case SyntaxKindQuestionToken:
		// 	return p.parseJSDocUnknownOrNullableType()
		// case SyntaxKindFunctionKeyword:
		// 	return p.parseJSDocFunctionType()
		// case SyntaxKindExclamationToken:
		// 	return p.parseJSDocNonNullableType()
	case SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindStringLiteral, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindTrueKeyword,
		SyntaxKindFalseKeyword, SyntaxKindNullKeyword:
		return p.parseLiteralTypeNode(false /*negative*/)
	case SyntaxKindMinusToken:
		if p.lookAhead(p.nextTokenIsNumericOrBigIntLiteral) {
			return p.parseLiteralTypeNode(true /*negative*/)
		}
		return p.parseTypeReference()
	case SyntaxKindVoidKeyword:
		return p.parseKeywordTypeNode()
	case SyntaxKindThisKeyword:
		thisKeyword := p.parseThisTypeNode()
		if p.token == SyntaxKindIsKeyword && !p.hasPrecedingLineBreak() {
			return p.parseThisTypePredicate(thisKeyword)
		}
		return thisKeyword
	case SyntaxKindTypeOfKeyword:
		if p.lookAhead(p.nextIsStartOfTypeOfImportType) {
			return p.parseImportType()
		}
		return p.parseTypeQuery()
	case SyntaxKindOpenBraceToken:
		if p.lookAhead(p.nextIsStartOfMappedType) {
			return p.parseMappedType()
		}
		return p.parseTypeLiteral()
	case SyntaxKindOpenBracketToken:
		return p.parseTupleType()
	case SyntaxKindOpenParenToken:
		return p.parseParenthesizedType()
	case SyntaxKindImportKeyword:
		return p.parseImportType()
	case SyntaxKindAssertsKeyword:
		if p.lookAhead(p.nextTokenIsIdentifierOrKeywordOnSameLine) {
			return p.parseAssertsTypePredicate()
		}
		return p.parseTypeReference()
	case SyntaxKindTemplateHead:
		return p.parseTemplateType()
	default:
		return p.parseTypeReference()
	}
}

func (p *Parser) parseKeywordTypeNode() *Node {
	pos := p.nodePos()
	result := p.factory.NewKeywordTypeNode(p.token)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseThisTypeNode() *Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewThisTypeNode()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseThisTypePredicate(lhs *Node) *Node {
	p.nextToken()
	result := p.factory.NewTypePredicateNode(nil /*assertsModifier*/, lhs, p.parseType())
	p.finishNode(result, lhs.Pos())
	return result
}

func (p *Parser) parseLiteralTypeNode(negative bool) *Node {
	pos := p.nodePos()
	if negative {
		p.nextToken()
	}
	var expression *Expression
	if p.token == SyntaxKindTrueKeyword || p.token == SyntaxKindFalseKeyword || p.token == SyntaxKindNullKeyword {
		expression = p.parseKeywordExpression()
	} else {
		expression = p.parseLiteralExpression()
	}
	if negative {
		expression = p.factory.NewPrefixUnaryExpression(SyntaxKindMinusToken, expression)
		p.finishNode(expression, pos)
	}
	result := p.factory.NewLiteralTypeNode(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeReference() *Node {
	pos := p.nodePos()
	result := p.factory.NewTypeReferenceNode(p.parseEntityNameOfTypeReference(), p.parseTypeArgumentsOfTypeReference())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseEntityNameOfTypeReference() *Node {
	return p.parseEntityName(true /*allowReservedWords*/, diagnostics.Type_expected)
}

func (p *Parser) parseEntityName(allowReservedWords bool, diagnosticMessage *diagnostics.Message) *Node {
	pos := p.nodePos()
	var entity *Node
	if allowReservedWords {
		entity = p.parseIdentifierNameWithDiagnostic(diagnosticMessage)
	} else {
		entity = p.parseIdentifierWithDiagnostic(diagnosticMessage, nil)
	}
	for p.parseOptional(SyntaxKindDotToken) {
		if p.token == SyntaxKindLessThanToken {
			// The entity is part of a JSDoc-style generic. We will use the gap between `typeName` and
			// `typeArguments` to report it as a grammar error in the checker.
			break
		}
		entity = p.factory.NewQualifiedName(entity, p.parseRightSideOfDot(allowReservedWords, false /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/))
		p.finishNode(entity, pos)
	}
	return entity
}

func (p *Parser) parseRightSideOfDot(allowIdentifierNames bool, allowPrivateIdentifiers bool, allowUnicodeEscapeSequenceInIdentifierName bool) *Node {
	// Technically a keyword is valid here as all identifiers and keywords are identifier names.
	// However, often we'll encounter this in error situations when the identifier or keyword
	// is actually starting another valid construct.
	//
	// So, we check for the following specific case:
	//
	//      name.
	//      identifierOrKeyword identifierNameOrKeyword
	//
	// Note: the newlines are important here.  For example, if that above code
	// were rewritten into:
	//
	//      name.identifierOrKeyword
	//      identifierNameOrKeyword
	//
	// Then we would consider it valid.  That's because ASI would take effect and
	// the code would be implicitly: "name.identifierOrKeyword; identifierNameOrKeyword".
	// In the first case though, ASI will not take effect because there is not a
	// line terminator after the identifier or keyword.
	if p.hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(p.token) && p.lookAhead(p.nextTokenIsIdentifierOrKeywordOnSameLine) {
		// Report that we need an identifier.  However, report it right after the dot,
		// and not on the next token.  This is because the next token might actually
		// be an identifier and the error would be quite confusing.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Identifier_expected)
		return p.createMissingIdentifier()
	}
	if p.token == SyntaxKindPrivateIdentifier {
		node := p.parsePrivateIdentifier()
		if allowPrivateIdentifiers {
			return node
		}
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Identifier_expected)
		return p.createMissingIdentifier()
	}
	if allowIdentifierNames {
		if allowUnicodeEscapeSequenceInIdentifierName {
			return p.parseIdentifierName()
		}
		return p.parseIdentifierNameErrorOnUnicodeEscapeSequence()
	}

	return p.parseIdentifier()
}

func (p *Parser) newIdentifier(text string) *Node {
	return p.factory.NewIdentifier(text)
}

func (p *Parser) createMissingIdentifier() *Node {
	result := p.newIdentifier("")
	p.finishNode(result, p.nodePos())
	return result
}

func (p *Parser) parsePrivateIdentifier() *Node {
	pos := p.nodePos()
	text := p.scanner.TokenValue()
	p.internIdentifier(text)
	p.nextToken()
	result := p.factory.NewPrivateIdentifier(text)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) reScanLessThanToken() SyntaxKind {
	p.token = p.scanner.ReScanLessThanToken()
	return p.token
}

func (p *Parser) reScanGreaterThanToken() SyntaxKind {
	p.token = p.scanner.ReScanGreaterThanToken()
	return p.token
}

func (p *Parser) reScanSlashToken() SyntaxKind {
	p.token = p.scanner.ReScanSlashToken()
	return p.token
}

func (p *Parser) reScanTemplateToken(isTaggedTemplate bool) SyntaxKind {
	p.token = p.scanner.ReScanTemplateToken(isTaggedTemplate)
	return p.token
}

func (p *Parser) parseTypeArgumentsOfTypeReference() *Node {
	if !p.hasPrecedingLineBreak() && p.reScanLessThanToken() == SyntaxKindLessThanToken {
		return p.parseTypeArguments()
	}
	return nil
}

func (p *Parser) parseTypeArguments() *Node {
	if p.token == SyntaxKindLessThanToken {
		pos := p.nodePos()
		typeArguments := p.parseBracketedList(PCTypeArguments, (*Parser).parseType, SyntaxKindLessThanToken, SyntaxKindGreaterThanToken)
		if typeArguments != nil {
			result := p.factory.NewTypeArgumentList(typeArguments)
			p.finishNode(result, pos)
			return result
		}
	}
	return nil
}

func (p *Parser) nextIsStartOfTypeOfImportType() bool {
	p.nextToken()
	return p.token == SyntaxKindImportKeyword
}

func (p *Parser) parseImportType() *Node {
	p.sourceFlags |= NodeFlagsPossiblyContainsDynamicImport
	pos := p.nodePos()
	isTypeOf := p.parseOptional(SyntaxKindTypeOfKeyword)
	p.parseExpected(SyntaxKindImportKeyword)
	p.parseExpected(SyntaxKindOpenParenToken)
	typeNode := p.parseType()
	var attributes *Node
	if p.parseOptional(SyntaxKindCommaToken) {
		openBracePosition := p.scanner.TokenStart()
		p.parseExpected(SyntaxKindOpenBraceToken)
		currentToken := p.token
		if currentToken == SyntaxKindWithKeyword || currentToken == SyntaxKindAssertKeyword {
			p.nextToken()
		} else {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindWithKeyword))
		}
		p.parseExpected(SyntaxKindColonToken)
		attributes = p.parseImportAttributes(currentToken, true /*skipKeyword*/)
		if !p.parseExpected(SyntaxKindCloseBraceToken) {
			if len(p.diagnostics) != 0 {
				lastDiagnostic := p.diagnostics[len(p.diagnostics)-1]
				if lastDiagnostic.Code() == diagnostics.X_0_expected.Code() {
					related := NewDiagnostic(nil, NewTextRange(openBracePosition, openBracePosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
					lastDiagnostic.addRelatedInfo(related)
				}
			}
		}
	}
	p.parseExpected(SyntaxKindCloseParenToken)
	var qualifier *Node
	if p.parseOptional(SyntaxKindDotToken) {
		qualifier = p.parseEntityNameOfTypeReference()
	}
	typeArguments := p.parseTypeArgumentsOfTypeReference()
	result := p.factory.NewImportTypeNode(isTypeOf, typeNode, attributes, qualifier, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportAttribute() *Node {
	pos := p.nodePos()
	var name *Node
	if tokenIsIdentifierOrKeyword(p.token) {
		name = p.parseIdentifierName()
	} else if p.token == SyntaxKindStringLiteral {
		name = p.parseLiteralExpression()
	}
	if name != nil {
		p.parseExpected(SyntaxKindColonToken)
	} else {
		p.parseErrorAtCurrentToken(diagnostics.Identifier_or_string_literal_expected)
	}
	value := p.parseAssignmentExpressionOrHigher()
	result := p.factory.NewImportAttribute(name, value)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportAttributes(token SyntaxKind, skipKeyword bool) *Node {
	pos := p.nodePos()
	if !skipKeyword {
		p.parseExpected(token)
	}
	var elements []*Node
	var multiLine bool
	openBracePosition := p.scanner.TokenStart()
	if p.parseExpected(SyntaxKindOpenBraceToken) {
		multiLine = p.hasPrecedingLineBreak()
		elements = p.parseDelimitedList(PCImportAttributes, (*Parser).parseImportAttribute)
		if !p.parseExpected(SyntaxKindCloseBraceToken) {
			if len(p.diagnostics) != 0 {
				lastDiagnostic := p.diagnostics[len(p.diagnostics)-1]
				if lastDiagnostic.Code() == diagnostics.X_0_expected.Code() {
					related := NewDiagnostic(nil, NewTextRange(openBracePosition, openBracePosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
					lastDiagnostic.addRelatedInfo(related)
				}
			}
		}
	}
	result := p.factory.NewImportAttributes(token, elements, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeQuery() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindTypeOfKeyword)
	entityName := p.parseEntityName(true /*allowReservedWords*/, nil)
	// Make sure we perform ASI to prevent parsing the next line's type arguments as part of an instantiation expression
	var typeArguments *Node
	if !p.hasPrecedingLineBreak() {
		typeArguments = p.parseTypeArguments()
	}
	result := p.factory.NewTypeQueryNode(entityName, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) nextIsStartOfMappedType() bool {
	p.nextToken()
	if p.token == SyntaxKindPlusToken || p.token == SyntaxKindMinusToken {
		return p.nextToken() == SyntaxKindReadonlyKeyword
	}
	if p.token == SyntaxKindReadonlyKeyword {
		p.nextToken()
	}
	return p.token == SyntaxKindOpenBracketToken && p.nextTokenIsIdentifier() && p.nextToken() == SyntaxKindInKeyword
}

func (p *Parser) parseMappedType() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBraceToken)
	var readonlyToken *Node // ReadonlyKeyword | PlusToken | MinusToken
	if p.token == SyntaxKindReadonlyKeyword || p.token == SyntaxKindPlusToken || p.token == SyntaxKindMinusToken {
		readonlyToken = p.parseTokenNode()
		if readonlyToken.kind != SyntaxKindReadonlyKeyword {
			p.parseExpected(SyntaxKindReadonlyKeyword)
		}
	}
	p.parseExpected(SyntaxKindOpenBracketToken)
	typeParameter := p.parseMappedTypeParameter()
	var nameType *TypeNode
	if p.parseOptional(SyntaxKindAsKeyword) {
		nameType = p.parseType()
	}
	p.parseExpected(SyntaxKindCloseBracketToken)
	var questionToken *Node // QuestionToken | PlusToken | MinusToken
	if p.token == SyntaxKindQuestionToken || p.token == SyntaxKindPlusToken || p.token == SyntaxKindMinusToken {
		questionToken = p.parseTokenNode()
		if questionToken.kind != SyntaxKindQuestionToken {
			p.parseExpected(SyntaxKindQuestionToken)
		}
	}
	typeNode := p.parseTypeAnnotation()
	p.parseSemicolon()
	members := p.parseList(PCTypeMembers, (*Parser).parseTypeMember)
	p.parseExpected(SyntaxKindCloseBraceToken)
	result := p.factory.NewMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, typeNode, members)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseMappedTypeParameter() *Node {
	pos := p.nodePos()
	name := p.parseIdentifierName()
	p.parseExpected(SyntaxKindInKeyword)
	typeNode := p.parseType()
	result := p.factory.NewTypeParameterDeclaration(nil /*modifiers*/, name, typeNode, nil /*defaultType*/)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeMember() *Node {
	if p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken {
		return p.parseSignatureMember(SyntaxKindCallSignature)
	}
	if p.token == SyntaxKindNewKeyword && p.lookAhead(p.nextTokenIsOpenParenOrLessThan) {
		return p.parseSignatureMember(SyntaxKindConstructSignature)
	}
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiers()
	if p.parseContextualModifier(SyntaxKindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKindGetAccessor, ParseFlagsType)
	}
	if p.parseContextualModifier(SyntaxKindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKindSetAccessor, ParseFlagsType)
	}
	if p.isIndexSignature() {
		return p.parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers)
	}
	return p.parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers)
}

func (p *Parser) nextTokenIsOpenParenOrLessThan() bool {
	p.nextToken()
	return p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken
}

func (p *Parser) parseSignatureMember(kind SyntaxKind) *Node {
	pos := p.nodePos()
	// hasJSDoc := p.hasPrecedingJSDocComment()
	if kind == SyntaxKindConstructSignature {
		p.parseExpected(SyntaxKindNewKeyword)
	}
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsType)
	typeNode := p.parseReturnType(SyntaxKindColonToken /*isType*/, true)
	p.parseTypeMemberSemicolon()
	var result *Node
	if kind == SyntaxKindCallSignature {
		result = p.factory.NewCallSignatureDeclaration(typeParameters, parameters, typeNode)
	} else {
		result = p.factory.NewConstructSignatureDeclaration(typeParameters, parameters, typeNode)
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeParameters() *Node {
	if p.token == SyntaxKindLessThanToken {
		pos := p.nodePos()
		typeParameters := p.parseBracketedList(PCTypeParameters, (*Parser).parseTypeParameter, SyntaxKindLessThanToken, SyntaxKindGreaterThanToken)
		if typeParameters != nil {
			result := p.factory.NewTypeParameterList(typeParameters)
			p.finishNode(result, pos)
			return result
		}
	}
	return nil
}

func (p *Parser) parseTypeParameter() *Node {
	pos := p.nodePos()
	modifiers := p.parseModifiersWithOptions(false /*allowDecorators*/, true /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	name := p.parseIdentifier()
	var constraint *TypeNode
	var expression *Expression
	if p.parseOptional(SyntaxKindExtendsKeyword) {
		// It's not uncommon for people to write improper constraints to a generic.  If the
		// user writes a constraint that is an expression and not an actual type, then parse
		// it out as an expression (so we can recover well), but report that a type is needed
		// instead.
		if p.isStartOfType(false /*inStartOfParameter*/) || !p.isStartOfExpression() {
			constraint = p.parseType()
		} else {
			// It was not a type, and it looked like an expression.  Parse out an expression
			// here so we recover well.  Note: it is important that we call parseUnaryExpression
			// and not parseExpression here.  If the user has:
			//
			//      <T extends "">
			//
			// We do *not* want to consume the `>` as we're consuming the expression for "".
			expression = p.parseUnaryExpressionOrHigher()
		}
	}
	var defaultType *TypeNode
	if p.parseOptional(SyntaxKindEqualsToken) {
		defaultType = p.parseType()
	}
	result := p.factory.NewTypeParameterDeclaration(modifiers, name, constraint, defaultType)
	result.AsTypeParameter().expression = expression
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseParameters(flags ParseFlags) []*Node {
	// FormalParameters [Yield,Await]: (modified)
	//      [empty]
	//      FormalParameterList[?Yield,Await]
	//
	// FormalParameter[Yield,Await]: (modified)
	//      BindingElement[?Yield,Await]
	//
	// BindingElement [Yield,Await]: (modified)
	//      SingleNameBinding[?Yield,?Await]
	//      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
	//
	// SingleNameBinding [Yield,Await]:
	//      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
	if p.parseExpected(SyntaxKindOpenParenToken) {
		parameters := p.parseParametersWorker(flags, true /*allowAmbiguity*/)
		p.parseExpected(SyntaxKindCloseParenToken)
		return parameters
	}
	return nil
}

func (p *Parser) parseParametersWorker(flags ParseFlags, allowAmbiguity bool) []*Node {
	// FormalParameters [Yield,Await]: (modified)
	//      [empty]
	//      FormalParameterList[?Yield,Await]
	//
	// FormalParameter[Yield,Await]: (modified)
	//      BindingElement[?Yield,Await]
	//
	// BindingElement [Yield,Await]: (modified)
	//      SingleNameBinding[?Yield,?Await]
	//      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
	//
	// SingleNameBinding [Yield,Await]:
	//      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
	inAwaitContext := p.contextFlags&NodeFlagsAwaitContext != 0
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsYieldContext, flags&ParseFlagsYield != 0)
	p.setContextFlags(NodeFlagsAwaitContext, flags&ParseFlagsAwait != 0)
	// const parameters = flags & SignatureFlags.JSDoc ?
	// 	parseDelimitedList(ParsingContext.JSDocParameters, parseJSDocParameter) :
	parameters := p.parseDelimitedList(PCParameters, func(p *Parser) *Node {
		return p.parseParameterWithOptions(inAwaitContext, allowAmbiguity)
	})
	p.contextFlags = saveContextFlags
	return parameters

}

func (p *Parser) parseParameter() *Node {
	return p.parseParameterWithOptions(false /*inOuterAwaitContext*/, true /*allowAmbiguity*/)
}

func (p *Parser) parseParameterWithOptions(inOuterAwaitContext bool, allowAmbiguity bool) *Node {
	pos := p.nodePos()
	// hasJSDoc := p.hasPrecedingJSDocComment()
	// FormalParameter [Yield,Await]:
	//      BindingElement[?Yield,?Await]
	// Decorators are parsed in the outer [Await] context, the rest of the parameter is parsed in the function's [Await] context.
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsAwaitContext, inOuterAwaitContext)
	modifiers := p.parseModifiersWithOptions(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	p.contextFlags = saveContextFlags
	if p.token == SyntaxKindThisKeyword {
		result := p.factory.NewParameterDeclaration(
			modifiers,
			nil, /*dotDotDotToken*/
			p.createIdentifier(true /*isIdentifier*/),
			nil, /*questionToken*/
			p.parseTypeAnnotation(),
			nil /*initializer*/)
		if modifiers != nil {
			p.parseErrorAtRange(modifiers.loc, diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters)
		}
		p.finishNode(result, pos)
		return result
	}
	dotDotDotToken := p.parseOptionalToken(SyntaxKindDotDotDotToken)
	if !allowAmbiguity && !p.isParameterNameStart() {
		return nil
	}
	result := p.factory.NewParameterDeclaration(
		modifiers,
		dotDotDotToken,
		p.parseNameOfParameter(modifiers),
		p.parseOptionalToken(SyntaxKindQuestionToken),
		p.parseTypeAnnotation(),
		p.parseInitializer())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isParameterNameStart() bool {
	// Be permissive about await and yield by calling isBindingIdentifier instead of isIdentifier; disallowing
	// them during a speculative parse leads to many more follow-on errors than allowing the function to parse then later
	// complaining about the use of the keywords.
	return p.isBindingIdentifier() || p.token == SyntaxKindOpenBracketToken || p.token == SyntaxKindOpenBraceToken
}

func (p *Parser) parseNameOfParameter(modifiers *Node) *Node {
	// FormalParameter [Yield,Await]:
	//      BindingElement[?Yield,?Await]
	name := p.parseIdentifierOrPatternWithDiagnostic(diagnostics.Private_identifiers_cannot_be_used_as_parameters)
	if name.loc.Len() == 0 && modifiers == nil && isModifierKind(p.token) {
		// in cases like
		// 'use strict'
		// function foo(static)
		// isParameter('static') == true, because of isModifier('static')
		// however 'static' is not a legal identifier in a strict mode.
		// so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
		// and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
		// to avoid this we'll advance cursor to the next token.
		p.nextToken()
	}
	return name
}

func (p *Parser) parseReturnType(returnToken SyntaxKind, isType bool) *TypeNode {
	if p.shouldParseReturnType(returnToken, isType) {
		return doInContext(p, NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseTypeOrTypePredicate)
	}
	return nil
}

func (p *Parser) shouldParseReturnType(returnToken SyntaxKind, isType bool) bool {
	if returnToken == SyntaxKindEqualsGreaterThanToken {
		p.parseExpected(returnToken)
		return true
	} else if p.parseOptional(SyntaxKindColonToken) {
		return true
	} else if isType && p.token == SyntaxKindEqualsGreaterThanToken {
		// This is easy to get backward, especially in type contexts, so parse the type anyway
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindColonToken))
		p.nextToken()
		return true
	}
	return false
}

func (p *Parser) parseTypeOrTypePredicate() *TypeNode {
	if p.isIdentifier() {
		state := p.mark()
		pos := p.nodePos()
		id := p.parseIdentifier()
		if p.token == SyntaxKindIsKeyword && !p.hasPrecedingLineBreak() {
			p.nextToken()
			result := p.factory.NewTypePredicateNode(nil /*assertsModifier*/, id, p.parseType())
			p.finishNode(result, pos)
			return result
		}
		p.rewind(state)
	}
	return p.parseType()
}

func (p *Parser) parseTypeMemberSemicolon() {
	// We allow type members to be separated by commas or (possibly ASI) semicolons.
	// First check if it was a comma.  If so, we're done with the member.
	if p.parseOptional(SyntaxKindCommaToken) {
		return
	}
	// Didn't have a comma.  We must have a (possible ASI) semicolon.
	p.parseSemicolon()
}

func (p *Parser) parseAccessorDeclaration(pos int, hasJSDoc bool, modifiers *Node, kind SyntaxKind, flags ParseFlags) *Node {
	name := p.parsePropertyName()
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsNone)
	returnType := p.parseReturnType(SyntaxKindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(flags, nil /*diagnosticMessage*/)
	var result *Node
	// Keep track of `typeParameters` (for both) and `type` (for setters) if they were parsed those indicate grammar errors
	if kind == SyntaxKindGetAccessor {
		result = p.factory.NewGetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body)
	} else {
		result = p.factory.NewSetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body)
	}
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parsePropertyName() *Node {
	return p.parsePropertyNameWorker(true /*allowComputedPropertyNames*/)
}

func (p *Parser) parsePropertyNameWorker(allowComputedPropertyNames bool) *Node {
	if p.token == SyntaxKindStringLiteral || p.token == SyntaxKindNumericLiteral || p.token == SyntaxKindBigIntLiteral {
		literal := p.parseLiteralExpression()
		p.internIdentifier(literal.Text())
		return literal
	}
	if allowComputedPropertyNames && p.token == SyntaxKindOpenBracketToken {
		return p.parseComputedPropertyName()
	}
	if p.token == SyntaxKindPrivateIdentifier {
		return p.parsePrivateIdentifier()
	}
	return p.parseIdentifierName()
}

func (p *Parser) parseComputedPropertyName() *Node {
	// PropertyName [Yield]:
	//      LiteralPropertyName
	//      ComputedPropertyName[?Yield]
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBracketToken)
	// We parse any expression (including a comma expression). But the grammar
	// says that only an assignment expression is allowed, so the grammar checker
	// will error if it sees a comma expression.
	expression := p.parseExpressionAllowIn()
	p.parseExpected(SyntaxKindCloseBracketToken)
	result := p.factory.NewComputedPropertyName(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseFunctionBlockOrSemicolon(flags ParseFlags, diagnosticMessage *diagnostics.Message) *Node {
	if p.token != SyntaxKindOpenBraceToken {
		if flags&ParseFlagsType != 0 {
			p.parseTypeMemberSemicolon()
			return nil
		}
		if p.canParseSemicolon() {
			p.parseSemicolon()
			return nil
		}
	}
	return p.parseFunctionBlock(flags, diagnosticMessage)
}

func (p *Parser) parseFunctionBlock(flags ParseFlags, diagnosticMessage *diagnostics.Message) *Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsYieldContext, flags&ParseFlagsYield != 0)
	p.setContextFlags(NodeFlagsAwaitContext, flags&ParseFlagsAwait != 0)
	// We may be in a [Decorator] context when parsing a function expression or
	// arrow function. The body of the function is not in [Decorator] context.
	p.setContextFlags(NodeFlagsDecoratorContext, false)
	block := p.parseBlock(flags&ParseFlagsIgnoreMissingOpenBrace != 0, diagnosticMessage)
	p.contextFlags = saveContextFlags
	return block
}

func (p *Parser) isIndexSignature() bool {
	return p.token == SyntaxKindOpenBracketToken && p.lookAhead(p.nextIsUnambiguouslyIndexSignature)
}

func (p *Parser) nextIsUnambiguouslyIndexSignature() bool {
	// The only allowed sequence is:
	//
	//   [id:
	//
	// However, for error recovery, we also check the following cases:
	//
	//   [...
	//   [id,
	//   [id?,
	//   [id?:
	//   [id?]
	//   [public id
	//   [private id
	//   [protected id
	//   []
	//
	p.nextToken()
	if p.token == SyntaxKindDotDotDotToken || p.token == SyntaxKindCloseBracketToken {
		return true
	}
	if isModifierKind(p.token) {
		p.nextToken()
		if p.isIdentifier() {
			return true
		}
	} else if !p.isIdentifier() {
		return false
	} else {
		// Skip the identifier
		p.nextToken()
	}
	// A colon signifies a well formed indexer
	// A comma should be a badly formed indexer because comma expressions are not allowed
	// in computed properties.
	if p.token == SyntaxKindColonToken || p.token == SyntaxKindCommaToken {
		return true
	}
	// Question mark could be an indexer with an optional property,
	// or it could be a conditional expression in a computed property.
	if p.token != SyntaxKindQuestionToken {
		return false
	}
	// If any of the following tokens are after the question mark, it cannot
	// be a conditional expression, so treat it as an indexer.
	p.nextToken()
	return p.token == SyntaxKindColonToken || p.token == SyntaxKindCommaToken || p.token == SyntaxKindCloseBracketToken
}

func (p *Parser) parseIndexSignatureDeclaration(pos int, hasJSDoc bool, modifiers *Node) *Node {
	parameters := p.parseBracketedList(PCParameters, (*Parser).parseParameter, SyntaxKindOpenBracketToken, SyntaxKindCloseBracketToken)
	typeNode := p.parseTypeAnnotation()
	p.parseTypeMemberSemicolon()
	result := p.factory.NewIndexSignatureDeclaration(modifiers, parameters, typeNode)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parsePropertyOrMethodSignature(pos int, hasJSDoc bool, modifiers *Node) *Node {
	_ = hasJSDoc
	name := p.parsePropertyName()
	questionToken := p.parseOptionalToken(SyntaxKindQuestionToken)
	var result *Node
	if p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken {
		// Method signatures don't exist in expression contexts.  So they have neither
		// [Yield] nor [Await]
		typeParameters := p.parseTypeParameters()
		parameters := p.parseParameters(ParseFlagsType)
		returnType := p.parseReturnType(SyntaxKindColonToken /*isType*/, true)
		result = p.factory.NewMethodSignatureDeclaration(modifiers, name, questionToken, typeParameters, parameters, returnType)
	} else {
		typeNode := p.parseTypeAnnotation()
		// Although type literal properties cannot not have initializers, we attempt
		// to parse an initializer so we can report in the checker that an interface
		// property or type literal property cannot have an initializer.
		var initializer *Expression
		if p.token == SyntaxKindEqualsToken {
			initializer = p.parseInitializer()
		}
		result = p.factory.NewPropertySignatureDeclaration(modifiers, name, questionToken, typeNode, initializer)
	}
	p.parseTypeMemberSemicolon()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeLiteral() *Node {
	pos := p.nodePos()
	result := p.factory.NewTypeLiteralNode(p.parseObjectTypeMembers())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectTypeMembers() []*Node {
	var members []*Node
	if p.parseExpected(SyntaxKindOpenBraceToken) {
		members = p.parseList(PCTypeMembers, (*Parser).parseTypeMember)
		p.parseExpected(SyntaxKindCloseBraceToken)
	}
	return members
}

func (p *Parser) parseTupleType() *Node {
	pos := p.nodePos()
	result := p.factory.NewTupleTypeNode(p.parseBracketedList(PCTupleElementTypes, (*Parser).parseTupleElementNameOrTupleElementType, SyntaxKindOpenBracketToken, SyntaxKindCloseBracketToken))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTupleElementNameOrTupleElementType() *Node {
	if p.lookAhead(p.scanStartOfNamedTupleElement) {
		pos := p.nodePos()
		//hasJSDoc := hasPrecedingJSDocComment();
		dotDotDotToken := p.parseOptionalToken(SyntaxKindDotDotDotToken)
		name := p.parseIdentifierName()
		questionToken := p.parseOptionalToken(SyntaxKindQuestionToken)
		p.parseExpected(SyntaxKindColonToken)
		typeNode := p.parseTupleElementType()
		result := p.factory.NewNamedTupleTypeMember(dotDotDotToken, name, questionToken, typeNode)
		p.finishNode(result, pos)
		return result
	}
	return p.parseTupleElementType()
}

func (p *Parser) scanStartOfNamedTupleElement() bool {
	if p.token == SyntaxKindDotDotDotToken {
		return tokenIsIdentifierOrKeyword(p.nextToken()) && p.nextTokenIsColonOrQuestionColon()
	}
	return tokenIsIdentifierOrKeyword(p.token) && p.nextTokenIsColonOrQuestionColon()
}

func (p *Parser) nextTokenIsColonOrQuestionColon() bool {
	return p.nextToken() == SyntaxKindColonToken || p.token == SyntaxKindQuestionToken && p.nextToken() == SyntaxKindColonToken
}

func (p *Parser) parseTupleElementType() *TypeNode {
	if p.parseOptional(SyntaxKindDotDotDotToken) {
		pos := p.nodePos()
		result := p.factory.NewRestTypeNode(p.parseType())
		p.finishNode(result, pos)
		return result
	}
	typeNode := p.parseType()
	if typeNode.kind == SyntaxKindJSDocNullableType {
		nullableType := typeNode.data.(*JSDocNullableType)
		if typeNode.loc.pos == nullableType.typeNode.loc.pos {
			result := p.factory.NewOptionalTypeNode(nullableType.typeNode)
			result.loc = typeNode.loc
			result.flags = typeNode.flags
			return result
		}
	}
	return typeNode
}

func (p *Parser) parseParenthesizedType() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenParenToken)
	typeNode := p.parseType()
	p.parseExpected(SyntaxKindCloseParenToken)
	result := p.factory.NewParenthesizedTypeNode(typeNode)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseAssertsTypePredicate() *TypeNode {
	pos := p.nodePos()
	assertsModifier := p.parseExpectedToken(SyntaxKindAssertsKeyword)
	var parameterName *Node
	if p.token == SyntaxKindThisKeyword {
		parameterName = p.parseThisTypeNode()
	} else {
		parameterName = p.parseIdentifier()
	}
	var typeNode *TypeNode
	if p.parseOptional(SyntaxKindIsKeyword) {
		typeNode = p.parseType()
	}
	result := p.factory.NewTypePredicateNode(assertsModifier, parameterName, typeNode)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateType() *Node {
	pos := p.nodePos()
	result := p.factory.NewTemplateLiteralTypeNode(p.parseTemplateHead(false /*isTaggedTemplate*/), p.parseTemplateTypeSpans())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateHead(isTaggedTemplate bool) *Node {
	if !isTaggedTemplate && p.scanner.tokenFlags&TokenFlagsIsInvalid != 0 {
		p.reScanTemplateToken(false /*isTaggedTemplate*/)
	}
	pos := p.nodePos()
	result := p.factory.NewTemplateHead(p.scanner.tokenValue, p.getTemplateLiteralRawText(2 /*endLength*/), p.scanner.tokenFlags&TokenFlagsTemplateLiteralLikeFlags)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) getTemplateLiteralRawText(endLength int) string {
	tokenText := p.scanner.TokenText()
	if p.scanner.tokenFlags&TokenFlagsUnterminated != 0 {
		endLength = 0
	}
	return tokenText[1 : len(tokenText)-endLength]

}

func (p *Parser) parseTemplateTypeSpans() []*Node {
	list := []*Node{}
	for {
		span := p.parseTemplateTypeSpan()
		list = append(list, span)
		if span.AsTemplateLiteralTypeSpan().literal.kind != SyntaxKindTemplateMiddle {
			break
		}
	}
	return list
}

func (p *Parser) parseTemplateTypeSpan() *Node {
	pos := p.nodePos()
	result := p.factory.NewTemplateLiteralTypeSpan(p.parseType(), p.parseLiteralOfTemplateSpan(false /*isTaggedTemplate*/))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLiteralOfTemplateSpan(isTaggedTemplate bool) *Node {
	if p.token == SyntaxKindCloseBraceToken {
		p.reScanTemplateToken(isTaggedTemplate)
		return p.parseTemplateMiddleOrTail()
	}
	p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindCloseBraceToken))
	result := p.factory.NewTemplateTail("", "", TokenFlagsNone)
	p.finishNode(result, p.nodePos())
	return result
}

func (p *Parser) parseTemplateMiddleOrTail() *Node {
	pos := p.nodePos()
	var result *Node
	if p.token == SyntaxKindTemplateMiddle {
		result = p.factory.NewTemplateMiddle(p.scanner.tokenValue, p.getTemplateLiteralRawText(2 /*endLength*/), p.scanner.tokenFlags&TokenFlagsTemplateLiteralLikeFlags)
	} else {
		result = p.factory.NewTemplateTail(p.scanner.tokenValue, p.getTemplateLiteralRawText(1 /*endLength*/), p.scanner.tokenFlags&TokenFlagsTemplateLiteralLikeFlags)
	}
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseFunctionOrConstructorTypeToError(isInUnionType bool, parseConstituentType func(p *Parser) *TypeNode) *TypeNode {
	// the function type and constructor type shorthand notation
	// are not allowed directly in unions and intersections, but we'll
	// try to parse them gracefully and issue a helpful message.
	if p.isStartOfFunctionTypeOrConstructorType() {
		typeNode := p.parseFunctionOrConstructorType()
		var diagnostic *diagnostics.Message
		if typeNode.kind == SyntaxKindFunctionType {
			diagnostic = ifElse(isInUnionType,
				diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type,
				diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type)
		} else {
			diagnostic = ifElse(isInUnionType,
				diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type,
				diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type)
		}
		p.parseErrorAtRange(typeNode.loc, diagnostic)
		return typeNode
	}
	return parseConstituentType(p)
}

func (p *Parser) isStartOfFunctionTypeOrConstructorType() bool {
	return p.token == SyntaxKindLessThanToken ||
		p.token == SyntaxKindOpenParenToken && p.lookAhead(p.nextIsUnambiguouslyStartOfFunctionType) ||
		p.token == SyntaxKindNewKeyword ||
		p.token == SyntaxKindAbstractKeyword && p.lookAhead(p.nextTokenIsNewKeyword)
}

func (p *Parser) parseFunctionOrConstructorType() *TypeNode {
	pos := p.nodePos()
	// hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersForConstructorType()
	isConstructorType := p.parseOptional(SyntaxKindNewKeyword)
	// Debug.assert(!modifiers || isConstructorType, "Per isStartOfFunctionOrConstructorType, a function type cannot have modifiers.")
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsType)
	returnType := p.parseReturnType(SyntaxKindEqualsGreaterThanToken, false /*isType*/)
	var result *TypeNode
	if isConstructorType {
		result = p.factory.NewConstructorTypeNode(modifiers, typeParameters, parameters, returnType)
	} else {
		result = p.factory.NewFunctionTypeNode(typeParameters, parameters, returnType)
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseModifiersForConstructorType() *Node {
	if p.token == SyntaxKindAbstractKeyword {
		pos := p.nodePos()
		modifier := p.factory.NewModifier(p.token)
		p.nextToken()
		p.finishNode(modifier, pos)
		result := p.factory.NewModifierList([]*Node{modifier}, ModifierFlagsAbstract)
		p.finishNode(result, pos)
		return result
	}
	return nil
}

func (p *Parser) nextTokenIsNewKeyword() bool {
	return p.nextToken() == SyntaxKindNewKeyword
}

func (p *Parser) nextIsUnambiguouslyStartOfFunctionType() bool {
	p.nextToken()
	if p.token == SyntaxKindCloseParenToken || p.token == SyntaxKindDotDotDotToken {
		// ( )
		// ( ...
		return true
	}
	if p.skipParameterStart() {
		// We successfully skipped modifiers (if any) and an identifier or binding pattern,
		// now see if we have something that indicates a parameter declaration
		if p.token == SyntaxKindColonToken || p.token == SyntaxKindCommaToken || p.token == SyntaxKindQuestionToken || p.token == SyntaxKindEqualsToken {
			// ( xxx :
			// ( xxx ,
			// ( xxx ?
			// ( xxx =
			return true
		}
		if p.token == SyntaxKindCloseParenToken && p.nextToken() == SyntaxKindEqualsGreaterThanToken {
			// ( xxx ) =>
			return true
		}
	}
	return false
}

func (p *Parser) skipParameterStart() bool {
	if isModifierKind(p.token) {
		// Skip modifiers
		p.parseModifiers()
	}
	p.parseOptional(SyntaxKindDotDotDotToken)
	if p.isIdentifier() || p.token == SyntaxKindThisKeyword {
		p.nextToken()
		return true
	}
	if p.token == SyntaxKindOpenBracketToken || p.token == SyntaxKindOpenBraceToken {
		// Return true if we can parse an array or object binding pattern with no errors
		previousErrorCount := len(p.diagnostics)
		p.parseIdentifierOrPattern()
		return previousErrorCount == len(p.diagnostics)
	}
	return false
}

func (p *Parser) parseModifiers() *Node {
	return p.parseModifiersWithOptions(false, false, false)
}

func (p *Parser) parseModifiersWithOptions(allowDecorators bool, permitConstAsModifier bool, stopOnStartOfClassStaticBlock bool) *Node {
	pos := p.nodePos()
	list := []*Node{}
	preModifierFlags := ModifierFlagsNone
	decoratorFlag := ModifierFlagsNone
	postModifierFlags := ModifierFlagsNone
	// Decorators should be contiguous in a list of modifiers but can potentially appear in two places (i.e., `[...leadingDecorators, ...leadingModifiers, ...trailingDecorators, ...trailingModifiers]`).
	// The leading modifiers *should* only contain `export` and `default` when trailingDecorators are present, but we'll handle errors for any other leading modifiers in the checker.
	// It is illegal to have both leadingDecorators and trailingDecorators, but we will report that as a grammar check in the checker.
	// parse leading decorators
	for {
		if allowDecorators && p.token == SyntaxKindAtToken && postModifierFlags == ModifierFlagsNone {
			decorator := p.parseDecorator()
			list = append(list, decorator)
			decoratorFlag |= ModifierFlagsDecorator
		} else {
			modifier := p.tryParseModifier((preModifierFlags|postModifierFlags)&ModifierFlagsStatic != 0, permitConstAsModifier, stopOnStartOfClassStaticBlock)
			if modifier == nil {
				break
			}
			list = append(list, modifier)
			flag := modifierToFlag(modifier.kind)
			if decoratorFlag == ModifierFlagsNone {
				preModifierFlags |= flag
			} else {
				postModifierFlags |= flag
			}
		}
	}
	if len(list) > 0 {
		result := p.factory.NewModifierList(list, preModifierFlags|decoratorFlag|postModifierFlags)
		p.finishNode(result, pos)
		return result
	}
	return nil
}

func (p *Parser) parseDecorator() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindAtToken)
	expression := doInContext(p, NodeFlagsDecoratorContext, true, (*Parser).parseDecoratorExpression)
	result := p.factory.NewDecorator(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDecoratorExpression() *Expression {
	if p.inAwaitContext() && p.token == SyntaxKindAwaitKeyword {
		// `@await` is is disallowed in an [Await] context, but can cause parsing to go off the rails
		// This simply parses the missing identifier and moves on.
		pos := p.nodePos()
		awaitExpression := p.parseIdentifierWithDiagnostic(diagnostics.Expression_expected, nil)
		p.nextToken()
		memberExpression := p.parseMemberExpressionRest(pos, awaitExpression /*allowOptionalChain*/, true)
		return p.parseCallExpressionRest(pos, memberExpression)
	}
	return p.parseLeftHandSideExpressionOrHigher()
}

func (p *Parser) tryParseModifier(hasSeenStaticModifier bool, permitConstAsModifier bool, stopOnStartOfClassStaticBlock bool) *Node {
	pos := p.nodePos()
	kind := p.token
	if p.token == SyntaxKindConstKeyword && permitConstAsModifier {
		// We need to ensure that any subsequent modifiers appear on the same line
		// so that when 'const' is a standalone declaration, we don't issue an error.
		if !p.lookAhead(p.nextTokenIsOnSameLineAndCanFollowModifier) {
			return nil
		} else {
			p.nextToken()
		}
	} else if stopOnStartOfClassStaticBlock && p.token == SyntaxKindStaticKeyword && p.lookAhead(p.nextTokenIsOpenBrace) {
		return nil
	} else if hasSeenStaticModifier && p.token == SyntaxKindStaticKeyword {
		return nil
	} else {
		if !p.parseAnyContextualModifier() {
			return nil
		}
	}
	result := p.factory.NewModifier(kind)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseContextualModifier(t SyntaxKind) bool {
	state := p.mark()
	if p.token == t && p.nextTokenCanFollowModifier() {
		return true
	}
	p.rewind(state)
	return false
}

func (p *Parser) parseAnyContextualModifier() bool {
	state := p.mark()
	if isModifierKind(p.token) && p.nextTokenCanFollowModifier() {
		return true
	}
	p.rewind(state)
	return false
}

func (p *Parser) nextTokenCanFollowModifier() bool {
	switch p.token {
	case SyntaxKindConstKeyword:
		// 'const' is only a modifier if followed by 'enum'.
		return p.nextToken() == SyntaxKindEnumKeyword
	case SyntaxKindExportKeyword:
		p.nextToken()
		if p.token == SyntaxKindDefaultKeyword {
			return p.lookAhead(p.nextTokenCanFollowDefaultKeyword)
		}
		if p.token == SyntaxKindTypeKeyword {
			return p.lookAhead(p.nextTokenCanFollowExportModifier)
		}
		return p.canFollowExportModifier()
	case SyntaxKindDefaultKeyword:
		return p.nextTokenCanFollowDefaultKeyword()
	case SyntaxKindStaticKeyword, SyntaxKindGetKeyword, SyntaxKindSetKeyword:
		p.nextToken()
		return p.canFollowModifier()
	default:
		return p.nextTokenIsOnSameLineAndCanFollowModifier()
	}
}

func (p *Parser) nextTokenCanFollowDefaultKeyword() bool {
	switch p.nextToken() {
	case SyntaxKindClassKeyword, SyntaxKindFunctionKeyword, SyntaxKindInterfaceKeyword, SyntaxKindAtToken:
		return true
	case SyntaxKindAbstractKeyword:
		return p.lookAhead(p.nextTokenIsClassKeywordOnSameLine)
	case SyntaxKindAsyncKeyword:
		return p.lookAhead(p.nextTokenIsFunctionKeywordOnSameLine)
	}
	return false
}

func (p *Parser) nextTokenIsIdentifierOrKeyword() bool {
	return tokenIsIdentifierOrKeyword(p.nextToken())
}

func (p *Parser) nextTokenIsIdentifierOrKeywordOrGreaterThan() bool {
	return tokenIsIdentifierOrKeywordOrGreaterThan(p.nextToken())
}

func (p *Parser) nextTokenIsIdentifierOrKeywordOnSameLine() bool {
	return p.nextTokenIsIdentifierOrKeyword() && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine() bool {
	return (p.nextTokenIsIdentifierOrKeyword() || p.token == SyntaxKindNumericLiteral || p.token == SyntaxKindBigIntLiteral || p.token == SyntaxKindStringLiteral) && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsClassKeywordOnSameLine() bool {
	return p.nextToken() == SyntaxKindClassKeyword && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsFunctionKeywordOnSameLine() bool {
	return p.nextToken() == SyntaxKindFunctionKeyword && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenCanFollowExportModifier() bool {
	p.nextToken()
	return p.canFollowExportModifier()
}

func (p *Parser) canFollowExportModifier() bool {
	return p.token == SyntaxKindAtToken || p.token != SyntaxKindAsteriskToken && p.token != SyntaxKindAsKeyword && p.token != SyntaxKindOpenBraceToken && p.canFollowModifier()
}

func (p *Parser) canFollowModifier() bool {
	return p.token == SyntaxKindOpenBracketToken || p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindDotDotDotToken || p.isLiteralPropertyName()
}

func (p *Parser) nextTokenIsOnSameLineAndCanFollowModifier() bool {
	p.nextToken()
	if p.hasPrecedingLineBreak() {
		return false
	}
	return p.canFollowModifier()
}

func (p *Parser) nextTokenIsOpenBrace() bool {
	return p.nextToken() == SyntaxKindOpenBraceToken
}

func (p *Parser) parseExpression() *Expression {
	// Expression[in]:
	//      AssignmentExpression[in]
	//      Expression[in] , AssignmentExpression[in]

	// clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
	saveContextFlags := p.contextFlags
	p.contextFlags &= ^NodeFlagsDecoratorContext
	pos := p.nodePos()
	expr := p.parseAssignmentExpressionOrHigher()
	for {
		operatorToken := p.parseOptionalToken(SyntaxKindCommaToken)
		if operatorToken == nil {
			break
		}
		expr = p.makeBinaryExpression(expr, operatorToken, p.parseAssignmentExpressionOrHigher(), pos)
	}
	p.contextFlags = saveContextFlags
	return expr
}

func (p *Parser) parseExpressionAllowIn() *Expression {
	return doInContext(p, NodeFlagsDisallowInContext, false, (*Parser).parseExpression)
}

func (p *Parser) parseAssignmentExpressionOrHigher() *Expression {
	return p.parseAssignmentExpressionOrHigherWorker(true /*allowReturnTypeInArrowFunction*/)
}

func (p *Parser) parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction bool) *Expression {
	//  AssignmentExpression[in,yield]:
	//      1) ConditionalExpression[?in,?yield]
	//      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
	//      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
	//      4) ArrowFunctionExpression[?in,?yield]
	//      5) AsyncArrowFunctionExpression[in,yield,await]
	//      6) [+Yield] YieldExpression[?In]
	//
	// Note: for ease of implementation we treat productions '2' and '3' as the same thing.
	// (i.e. they're both BinaryExpressions with an assignment operator in it).
	// First, do the simple check if we have a YieldExpression (production '6').
	if p.isYieldExpression() {
		return p.parseYieldExpression()
	}
	// Then, check if we have an arrow function (production '4' and '5') that starts with a parenthesized
	// parameter list or is an async arrow function.
	// AsyncArrowFunctionExpression:
	//      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
	//      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
	// Production (1) of AsyncArrowFunctionExpression is parsed in "tryParseAsyncSimpleArrowFunctionExpression".
	// And production (2) is parsed in "tryParseParenthesizedArrowFunctionExpression".
	//
	// If we do successfully parse arrow-function, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
	// not a LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done
	// with AssignmentExpression if we see one.
	arrowExpression := p.tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction)
	if arrowExpression != nil {
		return arrowExpression
	}
	arrowExpression = p.tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction)
	if arrowExpression != nil {
		return arrowExpression
	}
	// arrowExpression2 := p.tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction)
	// if arrowExpression2 != nil {
	// 	return arrowExpression2
	// }
	// Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
	// start with a LogicalOrExpression, while the assignment productions can only start with
	// LeftHandSideExpressions.
	//
	// So, first, we try to just parse out a BinaryExpression.  If we get something that is a
	// LeftHandSide or higher, then we can try to parse out the assignment expression part.
	// Otherwise, we try to parse out the conditional expression bit.  We want to allow any
	// binary expression here, so we pass in the 'lowest' precedence here so that it matches
	// and consumes anything.
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	expr := p.parseBinaryExpressionOrHigher(OperatorPrecedenceLowest)
	// To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
	// parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
	// identifier and the current token is an arrow.
	if expr.kind == SyntaxKindIdentifier && p.token == SyntaxKindEqualsGreaterThanToken {
		return p.parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, hasJSDoc, nil /*asyncModifier*/)
	}
	// Now see if we might be in cases '2' or '3'.
	// If the expression was a LHS expression, and we have an assignment operator, then
	// we're in '2' or '3'. Consume the assignment and return.
	//
	// Note: we call reScanGreaterToken so that we get an appropriately merged token
	// for cases like `> > =` becoming `>>=`
	if isLeftHandSideExpressionKind(expr.kind) && isAssignmentOperator(p.reScanGreaterThanToken()) {
		return p.makeBinaryExpression(expr, p.parseTokenNode(), p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction), pos)
	}
	// It wasn't an assignment or a lambda.  This is a conditional expression:
	return p.parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction)
}

func (p *Parser) isYieldExpression() bool {
	if p.token == SyntaxKindYieldKeyword {
		// If we have a 'yield' keyword, and this is a context where yield expressions are
		// allowed, then definitely parse out a yield expression.
		if p.inYieldContext() {
			return true
		}

		// We're in a context where 'yield expr' is not allowed.  However, if we can
		// definitely tell that the user was trying to parse a 'yield expr' and not
		// just a normal expr that start with a 'yield' identifier, then parse out
		// a 'yield expr'.  We can then report an error later that they are only
		// allowed in generator expressions.
		//
		// for example, if we see 'yield(foo)', then we'll have to treat that as an
		// invocation expression of something called 'yield'.  However, if we have
		// 'yield foo' then that is not legal as a normal expression, so we can
		// definitely recognize this as a yield expression.
		//
		// for now we just check if the next token is an identifier.  More heuristics
		// can be added here later as necessary.  We just need to make sure that we
		// don't accidentally consume something legal.
		return p.lookAhead(p.nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine)
	}
	return false
}

func (p *Parser) parseYieldExpression() *Node {
	pos := p.nodePos()
	// YieldExpression[In] :
	//      yield
	//      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
	//      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
	p.nextToken()
	var result *Node
	if !p.hasPrecedingLineBreak() && (p.token == SyntaxKindAsteriskToken || p.isStartOfExpression()) {
		result = p.factory.NewYieldExpression(p.parseOptionalToken(SyntaxKindAsteriskToken), p.parseAssignmentExpressionOrHigher())
	} else {
		// if the next token is not on the same line as yield.  or we don't have an '*' or
		// the start of an expression, then this is just a simple "yield" expression.
		result = p.factory.NewYieldExpression(nil /*asteriskToken*/, nil /*expression*/)
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isParenthesizedArrowFunctionExpression() Tristate {
	if p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken || p.token == SyntaxKindAsyncKeyword {
		state := p.mark()
		result := p.nextIsParenthesizedArrowFunctionExpression()
		p.rewind(state)
		return result
	}
	if p.token == SyntaxKindEqualsGreaterThanToken {
		// ERROR RECOVERY TWEAK:
		// If we see a standalone => try to parse it as an arrow function expression as that's
		// likely what the user intended to write.
		return TSTrue
	}
	// Definitely not a parenthesized arrow function.
	return TSFalse
}

func (p *Parser) nextIsParenthesizedArrowFunctionExpression() Tristate {
	if p.token == SyntaxKindAsyncKeyword {
		p.nextToken()
		if p.hasPrecedingLineBreak() {
			return TSFalse
		}
		if p.token != SyntaxKindOpenParenToken && p.token != SyntaxKindLessThanToken {
			return TSFalse
		}
	}
	first := p.token
	second := p.nextToken()
	if first == SyntaxKindOpenParenToken {
		if second == SyntaxKindCloseParenToken {
			// Simple cases: "() =>", "(): ", and "() {".
			// This is an arrow function with no parameters.
			// The last one is not actually an arrow function,
			// but this is probably what the user intended.
			third := p.nextToken()
			switch third {
			case SyntaxKindEqualsGreaterThanToken, SyntaxKindColonToken, SyntaxKindOpenBraceToken:
				return TSTrue
			}
			return TSFalse
		}
		// If encounter "([" or "({", this could be the start of a binding pattern.
		// Examples:
		//      ([ x ]) => { }
		//      ({ x }) => { }
		//      ([ x ])
		//      ({ x })
		if second == SyntaxKindOpenBracketToken || second == SyntaxKindOpenBraceToken {
			return TSUnknown
		}
		// Simple case: "(..."
		// This is an arrow function with a rest parameter.
		if second == SyntaxKindDotDotDotToken {
			return TSTrue
		}
		// Check for "(xxx yyy", where xxx is a modifier and yyy is an identifier. This
		// isn't actually allowed, but we want to treat it as a lambda so we can provide
		// a good error message.
		if isModifierKind(second) && second != SyntaxKindAsyncKeyword && p.lookAhead(p.nextTokenIsIdentifier) {
			if p.nextToken() == SyntaxKindAsKeyword {
				// https://github.com/microsoft/TypeScript/issues/44466
				return TSFalse
			}
			return TSTrue
		}
		// If we had "(" followed by something that's not an identifier,
		// then this definitely doesn't look like a lambda.  "this" is not
		// valid, but we want to parse it and then give a semantic error.
		if !p.isIdentifier() && second != SyntaxKindThisKeyword {
			return TSFalse
		}
		switch p.nextToken() {
		case SyntaxKindColonToken:
			// If we have something like "(a:", then we must have a
			// type-annotated parameter in an arrow function expression.
			return TSTrue
		case SyntaxKindQuestionToken:
			p.nextToken()
			// If we have "(a?:" or "(a?," or "(a?=" or "(a?)" then it is definitely a lambda.
			if p.token == SyntaxKindColonToken || p.token == SyntaxKindCommaToken || p.token == SyntaxKindEqualsToken || p.token == SyntaxKindCloseParenToken {
				return TSTrue
			}
			// Otherwise it is definitely not a lambda.
			return TSFalse
		case SyntaxKindCommaToken, SyntaxKindEqualsToken, SyntaxKindCloseParenToken:
			// If we have "(a," or "(a=" or "(a)" this *could* be an arrow function
			return TSUnknown
		}
		// It is definitely not an arrow function
		return TSFalse
	} else {
		// !!! Debug.assert(first == SyntaxKindLessThanToken)
		// If we have "<" not followed by an identifier,
		// then this definitely is not an arrow function.
		if !p.isIdentifier() && p.token != SyntaxKindConstKeyword {
			return TSFalse
		}
		// JSX overrides
		if p.languageVariant == LanguageVariantJSX {
			isArrowFunctionInJsx := p.lookAhead(func() bool {
				p.parseOptional(SyntaxKindConstKeyword)
				third := p.nextToken()
				if third == SyntaxKindExtendsKeyword {
					fourth := p.nextToken()
					switch fourth {
					case SyntaxKindEqualsToken, SyntaxKindGreaterThanToken, SyntaxKindSlashToken:
						return false
					}
					return true
				} else if third == SyntaxKindCommaToken || third == SyntaxKindEqualsToken {
					return true
				}
				return false
			})
			if isArrowFunctionInJsx {
				return TSTrue
			}
			return TSFalse
		}
		// This *could* be a parenthesized arrow function.
		return TSUnknown
	}
}

func (p *Parser) tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *Node {
	tristate := p.isParenthesizedArrowFunctionExpression()
	if tristate == TSFalse {
		// It's definitely not a parenthesized arrow function expression.
		return nil
	}
	// If we definitely have an arrow function, then we can just parse one, not requiring a
	// following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
	// it out, but don't allow any ambiguity, and return 'undefined' if this could be an
	// expression instead.
	if tristate == TSTrue {
		return p.parseParenthesizedArrowFunctionExpression(true /*allowAmbiguity*/, true /*allowReturnTypeInArrowFunction*/)
	}
	state := p.mark()
	result := p.parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction)
	if result == nil {
		p.rewind(state)
	}
	return result
}

func (p *Parser) parseParenthesizedArrowFunctionExpression(allowAmbiguity bool, allowReturnTypeInArrowFunction bool) *Node {
	pos := p.nodePos()
	// hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersForArrowFunction()
	isAsync := hasAsyncModifier(modifiers)
	signatureFlags := ifElse(isAsync, ParseFlagsAwait, ParseFlagsNone)
	// Arrow functions are never generators.
	//
	// If we're speculatively parsing a signature for a parenthesized arrow function, then
	// we have to have a complete parameter list.  Otherwise we might see something like
	// a => (b => c)
	// And think that "(b =>" was actually a parenthesized arrow function with a missing
	// close paren.
	typeParameters := p.parseTypeParameters()
	var parameters []*Node
	if !p.parseExpected(SyntaxKindOpenParenToken) {
		if !allowAmbiguity {
			return nil
		}
	} else {
		if !allowAmbiguity {
			maybeParameters := p.parseParametersWorker(signatureFlags, allowAmbiguity)
			if maybeParameters == nil {
				return nil
			}
			parameters = maybeParameters
		} else {
			parameters = p.parseParametersWorker(signatureFlags, allowAmbiguity)
		}
		if !p.parseExpected(SyntaxKindCloseParenToken) && !allowAmbiguity {
			return nil
		}
	}
	hasReturnColon := p.token == SyntaxKindColonToken
	returnType := p.parseReturnType(SyntaxKindColonToken /*isType*/, false)
	if returnType != nil && !allowAmbiguity && typeHasArrowFunctionBlockingParseError(returnType) {
		return nil
	}
	// Parsing a signature isn't enough.
	// Parenthesized arrow signatures often look like other valid expressions.
	// For instance:
	//  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
	//  - "(x,y)" is a comma expression parsed as a signature with two parameters.
	//  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
	//  - "a ? (b): function() {}" will too, since function() is a valid JSDoc function type.
	//  - "a ? (b): (function() {})" as well, but inside of a parenthesized type with an arbitrary amount of nesting.
	//
	// So we need just a bit of lookahead to ensure that it can only be a signature.
	unwrappedType := returnType
	for unwrappedType != nil && unwrappedType.kind == SyntaxKindParenthesizedType {
		unwrappedType = unwrappedType.AsParenthesizedTypeNode().typeNode // Skip parens if need be
	}
	hasJSDocFunctionType := unwrappedType != nil && unwrappedType.kind == SyntaxKindJSDocFunctionType
	if !allowAmbiguity && p.token != SyntaxKindEqualsGreaterThanToken && (hasJSDocFunctionType || p.token != SyntaxKindOpenBraceToken) {
		// Returning undefined here will cause our caller to rewind to where we started from.
		return nil
	}
	// If we have an arrow, then try to parse the body. Even if not, try to parse if we
	// have an opening brace, just in case we're in an error state.
	lastToken := p.token
	equalsGreaterThanToken := p.parseExpectedToken(SyntaxKindEqualsGreaterThanToken)
	var body *Node
	if lastToken == SyntaxKindEqualsGreaterThanToken || lastToken == SyntaxKindOpenBraceToken {
		body = p.parseArrowFunctionExpressionBody(isAsync, allowReturnTypeInArrowFunction)
	} else {
		body = p.parseIdentifier()
	}
	// Given:
	//     x ? y => ({ y }) : z => ({ z })
	// We try to parse the body of the first arrow function by looking at:
	//     ({ y }) : z => ({ z })
	// This is a valid arrow function with "z" as the return type.
	//
	// But, if we're in the true side of a conditional expression, this colon
	// terminates the expression, so we cannot allow a return type if we aren't
	// certain whether or not the preceding text was parsed as a parameter list.
	//
	// For example,
	//     a() ? (b: number, c?: string): void => d() : e
	// is determined by isParenthesizedArrowFunctionExpression to unambiguously
	// be an arrow expression, so we allow a return type.
	if !allowReturnTypeInArrowFunction && hasReturnColon {
		// However, if the arrow function we were able to parse is followed by another colon
		// as in:
		//     a ? (x): string => x : null
		// Then allow the arrow function, and treat the second colon as terminating
		// the conditional expression. It's okay to do this because this code would
		// be a syntax error in JavaScript (as the second colon shouldn't be there).
		if p.token != SyntaxKindColonToken {
			return nil
		}
	}
	result := p.factory.NewArrowFunction(modifiers, typeParameters, parameters, returnType, equalsGreaterThanToken, body)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseModifiersForArrowFunction() *Node {
	if p.token == SyntaxKindAsyncKeyword {
		pos := p.nodePos()
		p.nextToken()
		modifier := p.factory.NewModifier(SyntaxKindAsyncKeyword)
		p.finishNode(modifier, pos)
		result := p.factory.NewModifierList([]*Node{modifier}, ModifierFlagsAsync)
		p.finishNode(modifier, pos)
		return result
	}
	return nil
}

// If true, we should abort parsing an error function.
func typeHasArrowFunctionBlockingParseError(node *TypeNode) bool {
	switch node.kind {
	case SyntaxKindTypeReference:
		return nodeIsMissing(node.AsTypeReference().typeName)
	case SyntaxKindFunctionType, SyntaxKindConstructorType:
		return len(node.Parameters()) == 0 || typeHasArrowFunctionBlockingParseError(node.ReturnType())
	case SyntaxKindParenthesizedType:
		return typeHasArrowFunctionBlockingParseError(node.AsParenthesizedTypeNode().typeNode)
	}
	return false
}

func (p *Parser) parseArrowFunctionExpressionBody(isAsync bool, allowReturnTypeInArrowFunction bool) *Node {
	if p.token == SyntaxKindOpenBraceToken {
		return p.parseFunctionBlock(ifElse(isAsync, ParseFlagsAwait, ParseFlagsNone), nil /*diagnosticMessage*/)
	}
	if p.token != SyntaxKindSemicolonToken && p.token != SyntaxKindFunctionKeyword && p.token != SyntaxKindClassKeyword && p.isStartOfStatement() && !p.isStartOfExpressionStatement() {
		// Check if we got a plain statement (i.e. no expression-statements, no function/class expressions/declarations)
		//
		// Here we try to recover from a potential error situation in the case where the
		// user meant to supply a block. For example, if the user wrote:
		//
		//  a =>
		//      let v = 0;
		//  }
		//
		// they may be missing an open brace.  Check to see if that's the case so we can
		// try to recover better.  If we don't do this, then the next close curly we see may end
		// up preemptively closing the containing construct.
		//
		// Note: even when 'IgnoreMissingOpenBrace' is passed, parseBody will still error.
		return p.parseFunctionBlock(ParseFlagsIgnoreMissingOpenBrace|ifElse(isAsync, ParseFlagsAwait, ParseFlagsNone), nil /*diagnosticMessage*/)
	}
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsAwaitContext, isAsync)
	node := p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction)
	p.contextFlags = saveContextFlags
	return node
}

func (p *Parser) isStartOfExpressionStatement() bool {
	// As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
	return p.token != SyntaxKindOpenBraceToken && p.token != SyntaxKindFunctionKeyword && p.token != SyntaxKindClassKeyword && p.token != SyntaxKindAtToken && p.isStartOfExpression()
}

func (p *Parser) parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *Node {
	tokenPos := p.scanner.TokenStart()
	if p.notParenthesizedArrow.has(tokenPos) {
		return nil
	}
	result := p.parseParenthesizedArrowFunctionExpression(false /*allowAmbiguity*/, allowReturnTypeInArrowFunction)
	if result == nil {
		p.notParenthesizedArrow.add(tokenPos)
	}
	return result
}

func (p *Parser) tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *Node {
	// We do a check here so that we won't be doing unnecessarily call to "lookAhead"
	if p.token == SyntaxKindAsyncKeyword && p.lookAhead(p.nextIsUnParenthesizedAsyncArrowFunction) {
		pos := p.nodePos()
		hasJSDoc := p.hasPrecedingJSDocComment()
		asyncModifier := p.parseModifiersForArrowFunction()
		expr := p.parseBinaryExpressionOrHigher(OperatorPrecedenceLowest)
		return p.parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, hasJSDoc, asyncModifier)
	}
	return nil
}

func (p *Parser) nextIsUnParenthesizedAsyncArrowFunction() bool {
	// AsyncArrowFunctionExpression:
	//      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
	//      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
	if p.token == SyntaxKindAsyncKeyword {
		p.nextToken()
		// If the "async" is followed by "=>" token then it is not a beginning of an async arrow-function
		// but instead a simple arrow-function which will be parsed inside "parseAssignmentExpressionOrHigher"
		if p.hasPrecedingLineBreak() || p.token == SyntaxKindEqualsGreaterThanToken {
			return false
		}
		// Check for un-parenthesized AsyncArrowFunction
		expr := p.parseBinaryExpressionOrHigher(OperatorPrecedenceLowest)
		if !p.hasPrecedingLineBreak() && expr.kind == SyntaxKindIdentifier && p.token == SyntaxKindEqualsGreaterThanToken {
			return true
		}
	}
	return false
}

func (p *Parser) parseSimpleArrowFunctionExpression(pos int, identifier *Node, allowReturnTypeInArrowFunction bool, hasJSDoc bool, asyncModifier *Node) *Node {
	//Debug.assert(token() == SyntaxKindEqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
	parameter := p.factory.NewParameterDeclaration(nil /*modifiers*/, nil /*dotDotDotToken*/, identifier, nil /*questionToken*/, nil /*typeNode*/, nil /*initializer*/)
	p.finishNode(parameter, identifier.Pos())
	parameters := []*Node{parameter}
	equalsGreaterThanToken := p.parseExpectedToken(SyntaxKindEqualsGreaterThanToken)
	body := p.parseArrowFunctionExpressionBody(asyncModifier != nil /*isAsync*/, allowReturnTypeInArrowFunction)
	result := p.factory.NewArrowFunction(asyncModifier, nil /*typeParameters*/, parameters, nil /*returnType*/, equalsGreaterThanToken, body)
	p.finishNode(result, pos)
	_ = hasJSDoc
	return result
}

func (p *Parser) parseConditionalExpressionRest(leftOperand *Expression, pos int, allowReturnTypeInArrowFunction bool) *Expression {
	// Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
	questionToken := p.parseOptionalToken(SyntaxKindQuestionToken)
	if questionToken == nil {
		return leftOperand
	}
	// Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
	// we do not that for the 'whenFalse' part.
	saveContextFlags := p.contextFlags
	p.setContextFlags(NodeFlagsDisallowInContext, false)
	trueExpression := p.parseAssignmentExpressionOrHigherWorker(false /*allowReturnTypeInArrowFunction*/)
	p.contextFlags = saveContextFlags
	colonToken := p.parseExpectedToken(SyntaxKindColonToken)
	var falseExpression *Expression
	if colonToken != nil {
		falseExpression = p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction)
	} else {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, TokenToString(SyntaxKindColonToken))
		falseExpression = p.createMissingIdentifier()
	}
	result := p.factory.NewConditionalExpression(leftOperand, questionToken, trueExpression, colonToken, falseExpression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseBinaryExpressionOrHigher(precedence OperatorPrecedence) *Expression {
	pos := p.nodePos()
	leftOperand := p.parseUnaryExpressionOrHigher()
	return p.parseBinaryExpressionRest(precedence, leftOperand, pos)
}

func (p *Parser) parseBinaryExpressionRest(precedence OperatorPrecedence, leftOperand *Expression, pos int) *Expression {
	for {
		// We either have a binary operator here, or we're finished.  We call
		// reScanGreaterToken so that we merge token sequences like > and = into >=
		p.reScanGreaterThanToken()
		newPrecedence := getBinaryOperatorPrecedence(p.token)
		// Check the precedence to see if we should "take" this operator
		// - For left associative operator (all operator but **), consume the operator,
		//   recursively call the function below, and parse binaryExpression as a rightOperand
		//   of the caller if the new precedence of the operator is greater then or equal to the current precedence.
		//   For example:
		//      a - b - c;
		//            ^token; leftOperand = b. Return b to the caller as a rightOperand
		//      a * b - c
		//            ^token; leftOperand = b. Return b to the caller as a rightOperand
		//      a - b * c;
		//            ^token; leftOperand = b. Return b * c to the caller as a rightOperand
		// - For right associative operator (**), consume the operator, recursively call the function
		//   and parse binaryExpression as a rightOperand of the caller if the new precedence of
		//   the operator is strictly grater than the current precedence
		//   For example:
		//      a ** b ** c;
		//             ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
		//      a - b ** c;
		//            ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
		//      a ** b - c
		//             ^token; leftOperand = b. Return b to the caller as a rightOperand
		var consumeCurrentOperator bool
		if p.token == SyntaxKindAsteriskAsteriskToken {
			consumeCurrentOperator = newPrecedence >= precedence
		} else {
			consumeCurrentOperator = newPrecedence > precedence
		}
		if !consumeCurrentOperator {
			break
		}
		if p.token == SyntaxKindInKeyword && p.inDisallowInContext() {
			break
		}
		if p.token == SyntaxKindAsKeyword || p.token == SyntaxKindSatisfiesKeyword {
			// Make sure we *do* perform ASI for constructs like this:
			//    var x = foo
			//    as (Bar)
			// This should be parsed as an initialized variable, followed
			// by a function call to 'as' with the argument 'Bar'
			if p.hasPrecedingLineBreak() {
				break
			} else {
				keywordKind := p.token
				p.nextToken()
				if keywordKind == SyntaxKindSatisfiesKeyword {
					leftOperand = p.makeSatisfiesExpression(leftOperand, p.parseType())
				} else {
					leftOperand = p.makeAsExpression(leftOperand, p.parseType())
				}
			}
		} else {
			leftOperand = p.makeBinaryExpression(leftOperand, p.parseTokenNode(), p.parseBinaryExpressionOrHigher(newPrecedence), pos)
		}
	}
	return leftOperand
}

func (p *Parser) makeSatisfiesExpression(expression *Expression, typeNode *TypeNode) *Node {
	result := p.factory.NewSatisfiesExpression(expression, typeNode)
	p.finishNode(result, expression.Pos())
	return result
}

func (p *Parser) makeAsExpression(left *Expression, right *TypeNode) *Node {
	result := p.factory.NewAsExpression(left, right)
	p.finishNode(result, left.Pos())
	return result
}

func (p *Parser) makeBinaryExpression(left *Expression, operatorToken *Node, right *Expression, pos int) *Node {
	result := p.factory.NewBinaryExpression(left, operatorToken, right)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseUnaryExpressionOrHigher() *Expression {
	// ES7 UpdateExpression:
	//      1) LeftHandSideExpression[?Yield]
	//      2) LeftHandSideExpression[?Yield][no LineTerminator here]++
	//      3) LeftHandSideExpression[?Yield][no LineTerminator here]--
	//      4) ++UnaryExpression[?Yield]
	//      5) --UnaryExpression[?Yield]
	if p.isUpdateExpression() {
		pos := p.nodePos()
		updateExpression := p.parseUpdateExpression()
		if p.token == SyntaxKindAsteriskAsteriskToken {
			return p.parseBinaryExpressionRest(getBinaryOperatorPrecedence(p.token), updateExpression, pos)
		}
		return updateExpression
	}
	// ES7 UnaryExpression:
	//      1) UpdateExpression[?yield]
	//      2) delete UpdateExpression[?yield]
	//      3) void UpdateExpression[?yield]
	//      4) typeof UpdateExpression[?yield]
	//      5) + UpdateExpression[?yield]
	//      6) - UpdateExpression[?yield]
	//      7) ~ UpdateExpression[?yield]
	//      8) ! UpdateExpression[?yield]
	unaryOperator := p.token
	simpleUnaryExpression := p.parseSimpleUnaryExpression()
	if p.token == SyntaxKindAsteriskAsteriskToken {
		pos := skipTrivia(p.sourceText, simpleUnaryExpression.Pos())
		end := simpleUnaryExpression.End()
		if simpleUnaryExpression.kind == SyntaxKindTypeAssertionExpression {
			p.parseErrorAt(pos, end, diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses)
		} else {
			//Debug.assert(isKeywordOrPunctuation(unaryOperator))
			p.parseErrorAt(pos, end, diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, TokenToString(unaryOperator))
		}
	}
	return simpleUnaryExpression
}

func (p *Parser) isUpdateExpression() bool {
	switch p.token {
	case SyntaxKindPlusToken, SyntaxKindMinusToken, SyntaxKindTildeToken, SyntaxKindExclamationToken, SyntaxKindDeleteKeyword, SyntaxKindTypeOfKeyword, SyntaxKindVoidKeyword, SyntaxKindAwaitKeyword:
		return false
	case SyntaxKindLessThanToken:
		return p.languageVariant == LanguageVariantJSX
	}
	return true
}

func (p *Parser) parseUpdateExpression() *Expression {
	pos := p.nodePos()
	if p.token == SyntaxKindPlusPlusToken || p.token == SyntaxKindMinusMinusToken {
		operator := p.token
		p.nextToken()
		result := p.factory.NewPrefixUnaryExpression(operator, p.parseLeftHandSideExpressionOrHigher())
		p.finishNode(result, pos)
		return result
	} else if p.languageVariant == LanguageVariantJSX && p.token == SyntaxKindLessThanToken && p.lookAhead(p.nextTokenIsIdentifierOrKeywordOrGreaterThan) {
		// JSXElement is part of primaryExpression
		return p.parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, nil /*openingTag*/, false /*mustBeUnary*/)
	}
	expression := p.parseLeftHandSideExpressionOrHigher()
	if (p.token == SyntaxKindPlusPlusToken || p.token == SyntaxKindMinusMinusToken) && !p.hasPrecedingLineBreak() {
		operator := p.token
		p.nextToken()
		result := p.factory.NewPostfixUnaryExpression(expression, operator)
		p.finishNode(result, pos)
		return result
	}
	return expression
}

func (p *Parser) parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext bool, topInvalidNodePosition int, openingTag *Node, mustBeUnary bool) *Expression {
	pos := p.nodePos()
	opening := p.parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext)
	var result *Expression
	switch opening.kind {
	case SyntaxKindJsxOpeningElement:
		children := p.parseJsxChildren(opening)
		var closingElement *Node
		lastChild := lastElement(children)
		if lastChild != nil && lastChild.kind == SyntaxKindJsxElement &&
			!tagNamesAreEquivalent(lastChild.AsJsxElement().openingElement.AsJsxOpeningElement().tagName, lastChild.AsJsxElement().closingElement.AsJsxClosingElement().tagName) &&
			tagNamesAreEquivalent(opening.AsJsxOpeningElement().tagName, lastChild.AsJsxElement().closingElement.AsJsxClosingElement().tagName) {
			// when an unclosed JsxOpeningElement incorrectly parses its parent's JsxClosingElement,
			// restructure (<div>(...<span>...</div>)) --> (<div>(...<span>...</>)</div>)
			// (no need to error; the parent will error)
			newClosingElement := p.factory.NewJsxClosingElement(p.createMissingIdentifier())
			p.finishNode(newClosingElement, p.nodePos())
			newLast := p.factory.NewJsxElement(lastChild.AsJsxElement().openingElement, lastChild.AsJsxElement().children, newClosingElement)
			p.finishNode(newLast, lastChild.AsJsxElement().openingElement.Pos())
			children = append(children[0:len(children)-1], newLast)
			closingElement = lastChild.AsJsxElement().closingElement
		} else {
			closingElement = p.parseJsxClosingElement(opening, inExpressionContext)
			if !tagNamesAreEquivalent(opening.AsJsxOpeningElement().tagName, closingElement.AsJsxClosingElement().tagName) {
				if openingTag != nil && isJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.AsJsxClosingElement().tagName, openingTag.AsJsxOpeningElement().tagName) {
					// opening incorrectly matched with its parent's closing -- put error on opening
					p.parseErrorAtRange(opening.AsJsxOpeningElement().tagName.loc, diagnostics.JSX_element_0_has_no_corresponding_closing_tag, getTextOfNodeFromSourceText(p.sourceText, opening.AsJsxOpeningElement().tagName))
				} else {
					// other opening/closing mismatches -- put error on closing
					p.parseErrorAtRange(closingElement.AsJsxClosingElement().tagName.loc, diagnostics.Expected_corresponding_JSX_closing_tag_for_0, getTextOfNodeFromSourceText(p.sourceText, opening.AsJsxOpeningElement().tagName))
				}
			}
		}
		result = p.factory.NewJsxElement(opening, children, closingElement)
		p.finishNode(result, pos)
	case SyntaxKindJsxOpeningFragment:
		result = p.factory.NewJsxFragment(opening, p.parseJsxChildren(opening), p.parseJsxClosingFragment(inExpressionContext))
		p.finishNode(result, pos)
	case SyntaxKindJsxSelfClosingElement:
		// Nothing else to do for self-closing elements
		result = opening
	default:
		panic("Unhandled case in parseJsxElementOrSelfClosingElementOrFragment")
	}
	// If the user writes the invalid code '<div></div><div></div>' in an expression context (i.e. not wrapped in
	// an enclosing tag), we'll naively try to parse   ^ this as a 'less than' operator and the remainder of the tag
	// as garbage, which will cause the formatter to badly mangle the JSX. Perform a speculative parse of a JSX
	// element if we see a < token so that we can wrap it in a synthetic binary expression so the formatter
	// does less damage and we can report a better error.
	// Since JSX elements are invalid < operands anyway, this lookahead parse will only occur in error scenarios
	// of one sort or another.
	// If we are in a unary context, we can't do this recovery; the binary expression we return here is not
	// a valid UnaryExpression and will cause problems later.
	if !mustBeUnary && inExpressionContext && p.token == SyntaxKindLessThanToken {
		topBadPos := topInvalidNodePosition
		if topBadPos < 0 {
			topBadPos = result.Pos()
		}
		invalidElement := p.parseJsxElementOrSelfClosingElementOrFragment( /*inExpressionContext*/ true, topBadPos, nil, false)
		operatorToken := p.factory.NewToken(SyntaxKindCommaToken)
		operatorToken.loc = NewTextRange(invalidElement.Pos(), invalidElement.Pos())
		p.parseErrorAt(skipTrivia(p.sourceText, topBadPos), invalidElement.End(), diagnostics.JSX_expressions_must_have_one_parent_element)
		result = p.factory.NewBinaryExpression(result, operatorToken, invalidElement)
		p.finishNode(result, pos)
	}
	return result
}

func (p *Parser) parseJsxChildren(openingTag *Expression) []*Expression {
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << PCJsxChildren
	list := []*Expression{}
	for {
		currentToken := p.scanner.reScanJsxToken(true /*allowMultilineJsxText*/)
		child := p.parseJsxChild(openingTag, currentToken)
		if child == nil {
			break
		}
		list = append(list, child)
		if isJsxOpeningElement(openingTag) && child.kind == SyntaxKindJsxElement &&
			!tagNamesAreEquivalent(child.AsJsxElement().openingElement.AsJsxOpeningElement().tagName, child.AsJsxElement().closingElement.AsJsxClosingElement().tagName) &&
			tagNamesAreEquivalent(openingTag.AsJsxOpeningElement().tagName, child.AsJsxElement().closingElement.AsJsxClosingElement().tagName) {
			// stop after parsing a mismatched child like <div>...(<span></div>) in order to reattach the </div> higher
			break
		}
	}
	p.parsingContexts = saveParsingContexts
	return list
}

func (p *Parser) parseJsxChild(openingTag *Node, token SyntaxKind) *Expression {
	switch token {
	case SyntaxKindEndOfFile:
		// If we hit EOF, issue the error at the tag that lacks the closing element
		// rather than at the end of the file (which is useless)
		if isJsxOpeningFragment(openingTag) {
			p.parseErrorAtRange(openingTag.loc, diagnostics.JSX_fragment_has_no_corresponding_closing_tag)
		} else {
			// We want the error span to cover only 'Foo.Bar' in < Foo.Bar >
			// or to cover only 'Foo' in < Foo >
			tag := openingTag.AsJsxOpeningElement().tagName
			start := min(skipTrivia(p.sourceText, tag.Pos()), tag.End())
			p.parseErrorAt(start, tag.End(), diagnostics.JSX_element_0_has_no_corresponding_closing_tag,
				getTextOfNodeFromSourceText(p.sourceText, openingTag.AsJsxOpeningElement().tagName))
		}
		return nil
	case SyntaxKindLessThanSlashToken, SyntaxKindConflictMarkerTrivia:
		return nil
	case SyntaxKindJsxText, SyntaxKindJsxTextAllWhiteSpaces:
		return p.parseJsxText()
	case SyntaxKindOpenBraceToken:
		return p.parseJsxExpression(false /*inExpressionContext*/)
	case SyntaxKindLessThanToken:
		return p.parseJsxElementOrSelfClosingElementOrFragment(false /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, openingTag, false)
	}
	panic("Unhandled case in parseJsxChild")
}

func (p *Parser) parseJsxText() *Node {
	pos := p.nodePos()
	result := p.factory.NewJsxText(p.scanner.tokenValue, p.token == SyntaxKindJsxTextAllWhiteSpaces)
	p.scanJsxText()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxExpression(inExpressionContext bool) *Node {
	pos := p.nodePos()
	if !p.parseExpected(SyntaxKindOpenBraceToken) {
		return nil
	}
	var dotDotDotToken *Node
	var expression *Expression
	if p.token != SyntaxKindCloseBraceToken {
		if !inExpressionContext {
			dotDotDotToken = p.parseOptionalToken(SyntaxKindDotDotDotToken)
		}
		// Only an AssignmentExpression is valid here per the JSX spec,
		// but we can unambiguously parse a comma sequence and provide
		// a better error message in grammar checking.
		expression = p.parseExpression()
	}
	if inExpressionContext {
		p.parseExpected(SyntaxKindCloseBraceToken)
	} else if p.parseExpectedWithoutAdvancing(SyntaxKindCloseBraceToken) {
		p.scanJsxText()
	}
	result := p.factory.NewJsxExpression(dotDotDotToken, expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) scanJsxText() SyntaxKind {
	p.token = p.scanner.scanJsxToken()
	return p.token
}

func (p *Parser) scanJsxIdentifier() SyntaxKind {
	p.token = p.scanner.scanJsxIdentifier()
	return p.token
}

func (p *Parser) scanJsxAttributeValue() SyntaxKind {
	p.token = p.scanner.scanJsxAttributeValue()
	return p.token
}

func (p *Parser) parseJsxClosingElement(open *Node, inExpressionContext bool) *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindLessThanSlashToken)
	tagName := p.parseJsxElementName()
	if p.parseExpectedWithDiagnostic(SyntaxKindGreaterThanToken, nil /*diagnosticMessage*/, false /*shouldAdvance*/) {
		// manually advance the scanner in order to look for jsx text inside jsx
		if inExpressionContext || !tagNamesAreEquivalent(open.AsJsxOpeningElement().tagName, tagName) {
			p.nextToken()
		} else {
			p.scanJsxText()
		}
	}
	result := p.factory.NewJsxClosingElement(tagName)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext bool) *Expression {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindLessThanToken)
	if p.token == SyntaxKindGreaterThanToken {
		// See below for explanation of scanJsxText
		p.scanJsxText()
		result := p.factory.NewJsxOpeningFragment()
		p.finishNode(result, pos)
		return result
	}
	tagName := p.parseJsxElementName()
	var typeArguments *Node
	if p.contextFlags&NodeFlagsJavaScriptFile == 0 {
		typeArguments = p.parseTypeArguments()
	}
	attributes := p.parseJsxAttributes()
	var result *Expression
	if p.token == SyntaxKindGreaterThanToken {
		// Closing tag, so scan the immediately-following text with the JSX scanning instead
		// of regular scanning to avoid treating illegal characters (e.g. '#') as immediate
		// scanning errors
		p.scanJsxText()
		result = p.factory.NewJsxOpeningElement(tagName, typeArguments, attributes)
	} else {
		p.parseExpected(SyntaxKindSlashToken)
		if p.parseExpectedWithoutAdvancing(SyntaxKindGreaterThanToken) {
			if inExpressionContext {
				p.nextToken()
			} else {
				p.scanJsxText()
			}
		}
		result = p.factory.NewJsxSelfClosingElement(tagName, typeArguments, attributes)
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxElementName() *Expression {
	pos := p.nodePos()
	// JsxElement can have name in the form of
	//      propertyAccessExpression
	//      primaryExpression in the form of an identifier and "this" keyword
	// We can't just simply use parseLeftHandSideExpressionOrHigher because then we will start consider class,function etc as a keyword
	// We only want to consider "this" as a primaryExpression
	initialExpression := p.parseJsxTagName()
	if isJsxNamespacedName(initialExpression) {
		return initialExpression // `a:b.c` is invalid syntax, don't even look for the `.` if we parse `a:b`, and let `parseAttribute` report "unexpected :" instead.
	}
	expression := initialExpression
	for p.parseOptional(SyntaxKindDotToken) {
		expression = p.factory.NewPropertyAccessExpression(expression, nil, p.parseRightSideOfDot(true /*allowIdentifierNames*/, false /*allowPrivateIdentifiers*/, false /*allowUnicodeEscapeSequenceInIdentifierName*/), NodeFlagsNone)
		p.finishNode(expression, pos)
	}
	return expression
}

func (p *Parser) parseJsxTagName() *Expression {
	pos := p.nodePos()
	p.scanJsxIdentifier()
	isThis := p.token == SyntaxKindThisKeyword
	tagName := p.parseIdentifierNameErrorOnUnicodeEscapeSequence()
	if p.parseOptional(SyntaxKindColonToken) {
		p.scanJsxIdentifier()
		result := p.factory.NewJsxNamespacedName(tagName, p.parseIdentifierNameErrorOnUnicodeEscapeSequence())
		p.finishNode(result, pos)
		return result
	}
	if isThis {
		result := p.factory.NewKeywordExpression(SyntaxKindThisKeyword)
		p.finishNode(result, pos)
		return result
	}
	return tagName
}

func (p *Parser) parseJsxAttributes() *Node {
	pos := p.nodePos()
	result := p.factory.NewJsxAttributes(p.parseList(PCJsxAttributes, (*Parser).parseJsxAttribute))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxAttribute() *Node {
	if p.token == SyntaxKindOpenBraceToken {
		return p.parseJsxSpreadAttribute()
	}
	pos := p.nodePos()
	result := p.factory.NewJsxAttribute(p.parseJsxAttributeName(), p.parseJsxAttributeValue())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxSpreadAttribute() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindOpenBraceToken)
	p.parseExpected(SyntaxKindDotDotDotToken)
	expression := p.parseExpression()
	p.parseExpected(SyntaxKindCloseBraceToken)
	result := p.factory.NewJsxSpreadAttribute(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxAttributeName() *Node {
	pos := p.nodePos()
	p.scanJsxIdentifier()
	attrName := p.parseIdentifierNameErrorOnUnicodeEscapeSequence()
	if p.parseOptional(SyntaxKindColonToken) {
		p.scanJsxIdentifier()
		result := p.factory.NewJsxNamespacedName(attrName, p.parseIdentifierNameErrorOnUnicodeEscapeSequence())
		p.finishNode(result, pos)
		return result
	}
	return attrName
}

func (p *Parser) parseJsxAttributeValue() *Expression {
	if p.token == SyntaxKindEqualsToken {
		if p.scanJsxAttributeValue() == SyntaxKindStringLiteral {
			return p.parseLiteralExpression()
		}
		if p.token == SyntaxKindOpenBraceToken {
			return p.parseJsxExpression( /*inExpressionContext*/ true)
		}
		if p.token == SyntaxKindLessThanToken {
			return p.parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1, nil, false)
		}
		p.parseErrorAtCurrentToken(diagnostics.X_or_JSX_element_expected)
	}
	return nil
}

func (p *Parser) parseJsxClosingFragment(inExpressionContext bool) *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindLessThanSlashToken)
	if p.parseExpectedWithDiagnostic(SyntaxKindGreaterThanToken, diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment, false /*shouldAdvance*/) {
		// manually advance the scanner in order to look for jsx text inside jsx
		if inExpressionContext {
			p.nextToken()
		} else {
			p.scanJsxText()
		}
	}
	result := p.factory.NewJsxClosingFragment()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseSimpleUnaryExpression() *Expression {
	switch p.token {
	case SyntaxKindPlusToken, SyntaxKindMinusToken, SyntaxKindTildeToken, SyntaxKindExclamationToken:
		return p.parsePrefixUnaryExpression()
	case SyntaxKindDeleteKeyword:
		return p.parseDeleteExpression()
	case SyntaxKindTypeOfKeyword:
		return p.parseTypeOfExpression()
	case SyntaxKindVoidKeyword:
		return p.parseVoidExpression()
	case SyntaxKindLessThanToken:
		// !!!
		// // Just like in parseUpdateExpression, we need to avoid parsing type assertions when
		// // in JSX and we see an expression like "+ <foo> bar".
		// if (languageVariant == LanguageVariant.JSX) {
		// 	return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true, /*topInvalidNodePosition*/ undefined, /*openingTag*/ undefined, /*mustBeUnary*/ true);
		// }
		// // This is modified UnaryExpression grammar in TypeScript
		// //  UnaryExpression (modified):
		// //      < type > UnaryExpression
		return p.parseTypeAssertion()
	case SyntaxKindAwaitKeyword:
		if p.isAwaitExpression() {
			return p.parseAwaitExpression()
		}
		fallthrough
	default:
		return p.parseUpdateExpression()
	}
}

func (p *Parser) parsePrefixUnaryExpression() *Node {
	pos := p.nodePos()
	operator := p.token
	p.nextToken()
	result := p.factory.NewPrefixUnaryExpression(operator, p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDeleteExpression() *Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewDeleteExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeOfExpression() *Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewTypeOfExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseVoidExpression() *Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewVoidExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isAwaitExpression() bool {
	if p.token == SyntaxKindAwaitKeyword {
		if p.inAwaitContext() {
			return true
		}
		// here we are using similar heuristics as 'isYieldExpression'
		return p.lookAhead(p.nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine)
	}
	return false
}

func (p *Parser) parseAwaitExpression() *Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewAwaitExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeAssertion() *Node {
	// !!! Debug.assert(languageVariant !== LanguageVariant.JSX, "Type assertions should never be parsed in JSX; they should be parsed as comparisons or JSX elements/fragments.");
	pos := p.nodePos()
	p.parseExpected(SyntaxKindLessThanToken)
	typeNode := p.parseType()
	p.parseExpected(SyntaxKindGreaterThanToken)
	expression := p.parseSimpleUnaryExpression()
	result := p.factory.NewTypeAssertion(typeNode, expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLeftHandSideExpressionOrHigher() *Expression {
	// Original Ecma:
	// LeftHandSideExpression: See 11.2
	//      NewExpression
	//      CallExpression
	//
	// Our simplification:
	//
	// LeftHandSideExpression: See 11.2
	//      MemberExpression
	//      CallExpression
	//
	// See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
	// MemberExpression to make our lives easier.
	//
	// to best understand the below code, it's important to see how CallExpression expands
	// out into its own productions:
	//
	// CallExpression:
	//      MemberExpression Arguments
	//      CallExpression Arguments
	//      CallExpression[Expression]
	//      CallExpression.IdentifierName
	//      import (AssignmentExpression)
	//      super Arguments
	//      super.IdentifierName
	//
	// Because of the recursion in these calls, we need to bottom out first. There are three
	// bottom out states we can run into: 1) We see 'super' which must start either of
	// the last two CallExpression productions. 2) We see 'import' which must start import call.
	// 3)we have a MemberExpression which either completes the LeftHandSideExpression,
	// or starts the beginning of the first four CallExpression productions.
	pos := p.nodePos()
	var expression *Expression
	if p.token == SyntaxKindImportKeyword {
		if p.lookAhead(p.nextTokenIsOpenParenOrLessThan) {
			// We don't want to eagerly consume all import keyword as import call expression so we look ahead to find "("
			// For example:
			//      var foo3 = require("subfolder
			//      import * as foo1 from "module-from-node
			// We want this import to be a statement rather than import call expression
			p.sourceFlags |= NodeFlagsPossiblyContainsDynamicImport
			expression = p.parseKeywordExpression()
		} else if p.lookAhead(p.nextTokenIsDot) {
			// This is an 'import.*' metaproperty (i.e. 'import.meta')
			p.nextToken() // advance past the 'import'
			p.nextToken() // advance past the dot
			expression = p.factory.NewMetaProperty(SyntaxKindImportKeyword, p.parseIdentifierName())
			p.finishNode(expression, pos)
			p.sourceFlags |= NodeFlagsPossiblyContainsImportMeta
		} else {
			expression = p.parseMemberExpressionOrHigher()
		}
	} else if p.token == SyntaxKindSuperKeyword {
		expression = p.parseSuperExpression()
	} else {
		expression = p.parseMemberExpressionOrHigher()
	}
	// Now, we *may* be complete.  However, we might have consumed the start of a
	// CallExpression or OptionalExpression.  As such, we need to consume the rest
	// of it here to be complete.
	return p.parseCallExpressionRest(pos, expression)
}

func (p *Parser) nextTokenIsDot() bool {
	return p.nextToken() == SyntaxKindDotToken
}

func (p *Parser) parseSuperExpression() *Expression {
	pos := p.nodePos()
	expression := p.parseKeywordExpression()
	if p.token == SyntaxKindLessThanToken {
		startPos := p.nodePos()
		typeArguments := p.tryParseTypeArgumentsInExpression()
		if typeArguments != nil {
			p.parseErrorAt(startPos, p.nodePos(), diagnostics.X_super_may_not_use_type_arguments)
			if !p.isTemplateStartOfTaggedTemplate() {
				expression := p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
				p.finishNode(expression, pos)
			}
		}
	}
	if p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindDotToken || p.token == SyntaxKindOpenBracketToken {
		return expression
	}
	// If we have seen "super" it must be followed by '(' or '.'.
	// If it wasn't then just try to parse out a '.' and report an error.
	p.parseErrorAtCurrentToken(diagnostics.X_super_must_be_followed_by_an_argument_list_or_member_access)
	// private names will never work with `super` (`super.#foo`), but that's a semantic error, not syntactic
	result := p.factory.NewPropertyAccessExpression(expression, nil /*questionDotToken*/, p.parseRightSideOfDot(true /*allowIdentifierNames*/, true /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/), NodeFlagsNone)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isTemplateStartOfTaggedTemplate() bool {
	return p.token == SyntaxKindNoSubstitutionTemplateLiteral || p.token == SyntaxKindTemplateHead
}

func (p *Parser) tryParseTypeArgumentsInExpression() *Node {
	// TypeArguments must not be parsed in JavaScript files to avoid ambiguity with binary operators.
	state := p.mark()
	if p.contextFlags&NodeFlagsJavaScriptFile == 0 && p.reScanLessThanToken() == SyntaxKindLessThanToken {
		pos := p.nodePos()
		p.nextToken()
		typeArguments := p.parseDelimitedList(PCTypeArguments, (*Parser).parseType)
		// If it doesn't have the closing `>` then it's definitely not an type argument list.
		if p.reScanGreaterThanToken() == SyntaxKindGreaterThanToken {
			p.nextToken()
			// We successfully parsed a type argument list. The next token determines whether we want to
			// treat it as such. If the type argument list is followed by `(` or a template literal, as in
			// `f<number>(42)`, we favor the type argument interpretation even though JavaScript would view
			// it as a relational expression.
			if p.canFollowTypeArgumentsInExpression() {
				result := p.factory.NewTypeArgumentList(typeArguments)
				p.finishNode(result, pos)
				return result
			}
		}
	}
	p.rewind(state)
	return nil
}

func (p *Parser) canFollowTypeArgumentsInExpression() bool {
	switch p.token {
	// These tokens can follow a type argument list in a call expression:
	// foo<x>(
	// foo<T> `...`
	// foo<T> `...${100}...`
	case SyntaxKindOpenParenToken, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindTemplateHead:
		return true
	// A type argument list followed by `<` never makes sense, and a type argument list followed
	// by `>` is ambiguous with a (re-scanned) `>>` operator, so we disqualify both. Also, in
	// this context, `+` and `-` are unary operators, not binary operators.
	case SyntaxKindLessThanToken, SyntaxKindGreaterThanToken, SyntaxKindPlusToken, SyntaxKindMinusToken:
		return false
	}
	// We favor the type argument list interpretation when it is immediately followed by
	// a line break, a binary operator, or something that can't start an expression.
	return p.hasPrecedingLineBreak() || p.isBinaryOperator() || !p.isStartOfExpression()
}

func (p *Parser) parseMemberExpressionOrHigher() *Node {
	// Note: to make our lives simpler, we decompose the NewExpression productions and
	// place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
	// like so:
	//
	//   PrimaryExpression : See 11.1
	//      this
	//      Identifier
	//      Literal
	//      ArrayLiteral
	//      ObjectLiteral
	//      (Expression)
	//      FunctionExpression
	//      new MemberExpression Arguments?
	//
	//   MemberExpression : See 11.2
	//      PrimaryExpression
	//      MemberExpression[Expression]
	//      MemberExpression.IdentifierName
	//
	//   CallExpression : See 11.2
	//      MemberExpression
	//      CallExpression Arguments
	//      CallExpression[Expression]
	//      CallExpression.IdentifierName
	//
	// Technically this is ambiguous.  i.e. CallExpression defines:
	//
	//   CallExpression:
	//      CallExpression Arguments
	//
	// If you see: "new Foo()"
	//
	// Then that could be treated as a single ObjectCreationExpression, or it could be
	// treated as the invocation of "new Foo".  We disambiguate that in code (to match
	// the original grammar) by making sure that if we see an ObjectCreationExpression
	// we always consume arguments if they are there. So we treat "new Foo()" as an
	// object creation only, and not at all as an invocation.  Another way to think
	// about this is that for every "new" that we see, we will consume an argument list if
	// it is there as part of the *associated* object creation node.  Any additional
	// argument lists we see, will become invocation expressions.
	//
	// Because there are no other places in the grammar now that refer to FunctionExpression
	// or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
	// production.
	//
	// Because CallExpression and MemberExpression are left recursive, we need to bottom out
	// of the recursion immediately.  So we parse out a primary expression to start with.
	pos := p.nodePos()
	expression := p.parsePrimaryExpression()
	return p.parseMemberExpressionRest(pos, expression, true /*allowOptionalChain*/)
}

func (p *Parser) parseMemberExpressionRest(pos int, expression *Expression, allowOptionalChain bool) *Expression {
	for {
		var questionDotToken *Node
		isPropertyAccess := false
		if allowOptionalChain && p.isStartOfOptionalPropertyOrElementAccessChain() {
			questionDotToken = p.parseExpectedToken(SyntaxKindQuestionDotToken)
			isPropertyAccess = tokenIsIdentifierOrKeyword(p.token)
		} else {
			isPropertyAccess = p.parseOptional(SyntaxKindDotToken)
		}
		if isPropertyAccess {
			expression = p.parsePropertyAccessExpressionRest(pos, expression, questionDotToken)
			continue
		}
		// when in the [Decorator] context, we do not parse ElementAccess as it could be part of a ComputedPropertyName
		if (questionDotToken != nil || !p.inDecoratorContext()) && p.parseOptional(SyntaxKindOpenBracketToken) {
			expression = p.parseElementAccessExpressionRest(pos, expression, questionDotToken)
			continue
		}
		if p.isTemplateStartOfTaggedTemplate() {
			// Absorb type arguments into TemplateExpression when preceding expression is ExpressionWithTypeArguments
			if questionDotToken == nil && isExpressionWithTypeArguments(expression) {
				expression = p.parseTaggedTemplateRest(pos, expression.AsExpressionWithTypeArguments().expression, questionDotToken, expression.AsExpressionWithTypeArguments().typeArguments)
			} else {
				expression = p.parseTaggedTemplateRest(pos, expression, questionDotToken, nil /*typeArguments*/)
			}
			continue
		}
		if questionDotToken == nil {
			if p.token == SyntaxKindExclamationToken && !p.hasPrecedingLineBreak() {
				p.nextToken()
				expression = p.factory.NewNonNullExpression(expression)
				p.finishNode(expression, pos)
				continue
			}
			typeArguments := p.tryParseTypeArgumentsInExpression()
			if typeArguments != nil {
				expression = p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
				p.finishNode(expression, pos)
				continue
			}
		}
		return expression
	}
}

func (p *Parser) isStartOfOptionalPropertyOrElementAccessChain() bool {
	return p.token == SyntaxKindQuestionDotToken && p.lookAhead(p.nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate)
}

func (p *Parser) nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate() bool {
	p.nextToken()
	return tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindOpenBracketToken || p.isTemplateStartOfTaggedTemplate()
}

func (p *Parser) parsePropertyAccessExpressionRest(pos int, expression *Expression, questionDotToken *Node) *Node {
	name := p.parseRightSideOfDot(true /*allowIdentifierNames*/, true /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/)
	isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
	propertyAccess := p.factory.NewPropertyAccessExpression(expression, questionDotToken, name, ifElse(isOptionalChain, NodeFlagsOptionalChain, NodeFlagsNone))
	if isOptionalChain && isPrivateIdentifier(name) {
		p.parseErrorAtRange(p.skipRangeTrivia(name.loc), diagnostics.An_optional_chain_cannot_contain_private_identifiers)
	}
	if isExpressionWithTypeArguments(expression) && expression.AsExpressionWithTypeArguments().typeArguments != nil {
		loc := p.skipRangeTrivia(expression.AsExpressionWithTypeArguments().typeArguments.loc)
		p.parseErrorAtRange(loc, diagnostics.An_instantiation_expression_cannot_be_followed_by_a_property_access)
	}
	p.finishNode(propertyAccess, pos)
	return propertyAccess
}

func (p *Parser) tryReparseOptionalChain(node *Expression) bool {
	if node.flags&NodeFlagsOptionalChain != 0 {
		return true
	}
	// check for an optional chain in a non-null expression
	if isNonNullExpression(node) {
		expr := node.AsNonNullExpression().expression
		for isNonNullExpression(expr) && expr.flags&NodeFlagsOptionalChain == 0 {
			expr = expr.AsNonNullExpression().expression
		}
		if expr.flags&NodeFlagsOptionalChain != 0 {
			// this is part of an optional chain. Walk down from `node` to `expression` and set the flag.
			for isNonNullExpression(node) {
				node.flags |= NodeFlagsOptionalChain
				node = node.AsNonNullExpression().expression
			}
			return true
		}
	}
	return false
}

func (p *Parser) parseElementAccessExpressionRest(pos int, expression *Expression, questionDotToken *Node) *Node {
	var argumentExpression *Expression
	if p.token == SyntaxKindCloseBracketToken {
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.An_element_access_expression_should_take_an_argument)
		argumentExpression = p.createMissingIdentifier()
	} else {
		argument := p.parseExpressionAllowIn()
		if isStringOrNumericLiteralLike(argument) {
			p.internIdentifier(argument.Text())
		}
		argumentExpression = argument
	}
	p.parseExpected(SyntaxKindCloseBracketToken)
	isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
	elementAccess := p.factory.NewElementAccessExpression(expression, questionDotToken, argumentExpression, ifElse(isOptionalChain, NodeFlagsOptionalChain, NodeFlagsNone))
	p.finishNode(elementAccess, pos)
	return elementAccess
}

func (p *Parser) parseCallExpressionRest(pos int, expression *Expression) *Expression {
	for {
		expression = p.parseMemberExpressionRest(pos, expression /*allowOptionalChain*/, true)
		var typeArguments *Node
		questionDotToken := p.parseOptionalToken(SyntaxKindQuestionDotToken)
		if questionDotToken != nil {
			typeArguments = p.tryParseTypeArgumentsInExpression()
			if p.isTemplateStartOfTaggedTemplate() {
				expression = p.parseTaggedTemplateRest(pos, expression, questionDotToken, typeArguments)
				continue
			}
		}
		if typeArguments != nil || p.token == SyntaxKindOpenParenToken {
			// Absorb type arguments into CallExpression when preceding expression is ExpressionWithTypeArguments
			if questionDotToken == nil && expression.kind == SyntaxKindExpressionWithTypeArguments {
				typeArguments = expression.AsExpressionWithTypeArguments().typeArguments
				expression = expression.AsExpressionWithTypeArguments().expression
			}
			argumentList := p.parseArgumentList()
			isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
			expression = p.factory.NewCallExpression(expression, questionDotToken, typeArguments, argumentList, ifElse(isOptionalChain, NodeFlagsOptionalChain, NodeFlagsNone))
			p.finishNode(expression, pos)
			continue
		}
		if questionDotToken != nil {
			// We parsed `?.` but then failed to parse anything, so report a missing identifier here.
			p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
			expression = p.createMissingIdentifier()
			p.finishNode(expression, pos)
		}
		break
	}
	return expression
}

func (p *Parser) parseArgumentList() []*Expression {
	p.parseExpected(SyntaxKindOpenParenToken)
	result := p.parseDelimitedList(PCArgumentExpressions, (*Parser).parseArgumentExpression)
	p.parseExpected(SyntaxKindCloseParenToken)
	return result
}

func (p *Parser) parseArgumentExpression() *Expression {
	return doInContext(p, NodeFlagsDisallowInContext|NodeFlagsDecoratorContext, false, (*Parser).parseArgumentOrArrayLiteralElement)
}

func (p *Parser) parseArgumentOrArrayLiteralElement() *Expression {
	switch p.token {
	case SyntaxKindDotDotDotToken:
		return p.parseSpreadElement()
	case SyntaxKindCommaToken:
		result := p.factory.NewOmittedExpression()
		p.finishNode(result, p.nodePos())
		return result
	}
	return p.parseAssignmentExpressionOrHigher()
}

func (p *Parser) parseSpreadElement() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindDotDotDotToken)
	expression := p.parseAssignmentExpressionOrHigher()
	result := p.factory.NewSpreadElement(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTaggedTemplateRest(pos int, tag *Expression, questionDotToken *Node, typeArguments *Node) *Node {
	var template *Expression
	if p.token == SyntaxKindNoSubstitutionTemplateLiteral {
		p.reScanTemplateToken(true /*isTaggedTemplate*/)
		template = p.parseLiteralExpression()
	} else {
		template = p.parseTemplateExpression(true /*isTaggedTemplate*/)
	}
	isOptionalChain := questionDotToken != nil || tag.flags&NodeFlagsOptionalChain != 0
	result := p.factory.NewTaggedTemplateExpression(tag, questionDotToken, typeArguments, template, ifElse(isOptionalChain, NodeFlagsOptionalChain, NodeFlagsNone))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateExpression(isTaggedTemplate bool) *Expression {
	pos := p.nodePos()
	result := p.factory.NewTemplateExpression(p.parseTemplateHead(isTaggedTemplate), p.parseTemplateSpans(isTaggedTemplate))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateSpans(isTaggedTemplate bool) []*Node {
	list := []*Node{}
	for {
		span := p.parseTemplateSpan(isTaggedTemplate)
		list = append(list, span)
		if span.AsTemplateSpan().literal.kind != SyntaxKindTemplateMiddle {
			break
		}
	}
	return list
}

func (p *Parser) parseTemplateSpan(isTaggedTemplate bool) *Node {
	pos := p.nodePos()
	expression := p.parseExpressionAllowIn()
	literal := p.parseLiteralOfTemplateSpan(isTaggedTemplate)
	result := p.factory.NewTemplateSpan(expression, literal)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parsePrimaryExpression() *Expression {
	switch p.token {
	case SyntaxKindNoSubstitutionTemplateLiteral:
		if p.scanner.tokenFlags&TokenFlagsIsInvalid != 0 {
			p.reScanTemplateToken(false /*isTaggedTemplate*/)
		}
		fallthrough
	case SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindStringLiteral:
		return p.parseLiteralExpression()
	case SyntaxKindThisKeyword, SyntaxKindSuperKeyword, SyntaxKindNullKeyword, SyntaxKindTrueKeyword, SyntaxKindFalseKeyword:
		return p.parseKeywordExpression()
	case SyntaxKindOpenParenToken:
		return p.parseParenthesizedExpression()
	case SyntaxKindOpenBracketToken:
		return p.parseArrayLiteralExpression()
	case SyntaxKindOpenBraceToken:
		return p.parseObjectLiteralExpression()
	case SyntaxKindAsyncKeyword:
		// Async arrow functions are parsed earlier in parseAssignmentExpressionOrHigher.
		// If we encounter `async [no LineTerminator here] function` then this is an async
		// function; otherwise, its an identifier.
		if !p.lookAhead(p.nextTokenIsFunctionKeywordOnSameLine) {
			break
		}
		return p.parseFunctionExpression()
	case SyntaxKindAtToken:
		return p.parseDecoratedExpression()
	case SyntaxKindClassKeyword:
		return p.parseClassExpression()
	case SyntaxKindFunctionKeyword:
		return p.parseFunctionExpression()
	case SyntaxKindNewKeyword:
		return p.parseNewExpressionOrNewDotTarget()
	case SyntaxKindSlashToken, SyntaxKindSlashEqualsToken:
		if p.reScanSlashToken() == SyntaxKindRegularExpressionLiteral {
			return p.parseLiteralExpression()
		}
	case SyntaxKindTemplateHead:
		return p.parseTemplateExpression(false /*isTaggedTemplate*/)
	case SyntaxKindPrivateIdentifier:
		return p.parsePrivateIdentifier()
	}
	return p.parseIdentifierWithDiagnostic(diagnostics.Expression_expected, nil)
}

func (p *Parser) parseParenthesizedExpression() *Expression {
	pos := p.nodePos()
	// !!! JSDoc
	p.parseExpected(SyntaxKindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(SyntaxKindCloseParenToken)
	result := p.factory.NewParenthesizedExpression(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseArrayLiteralExpression() *Expression {
	pos := p.nodePos()
	openBracketPosition := p.scanner.TokenStart()
	openBracketParsed := p.parseExpected(SyntaxKindOpenBracketToken)
	multiLine := p.hasPrecedingLineBreak()
	elements := p.parseDelimitedList(PCArrayLiteralMembers, (*Parser).parseArgumentOrArrayLiteralElement)
	p.parseExpectedMatchingBrackets(SyntaxKindOpenBracketToken, SyntaxKindCloseBracketToken, openBracketParsed, openBracketPosition)
	result := p.factory.NewArrayLiteralExpression(elements, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectLiteralExpression() *Expression {
	pos := p.nodePos()
	openBracePosition := p.scanner.TokenStart()
	openBraceParsed := p.parseExpected(SyntaxKindOpenBraceToken)
	multiLine := p.hasPrecedingLineBreak()
	properties := p.parseDelimitedList(PCObjectLiteralMembers, (*Parser).parseObjectLiteralElement)
	p.parseExpectedMatchingBrackets(SyntaxKindOpenBraceToken, SyntaxKindCloseBraceToken, openBraceParsed, openBracePosition)
	result := p.factory.NewObjectLiteralExpression(properties, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectLiteralElement() *Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	if p.parseOptional(SyntaxKindDotDotDotToken) {
		expression := p.parseAssignmentExpressionOrHigher()
		result := p.factory.NewSpreadAssignment(expression)
		p.finishNode(result, pos)
		return result
	}
	modifiers := p.parseModifiersWithOptions(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	if p.parseContextualModifier(SyntaxKindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKindGetAccessor, ParseFlagsNone)
	}
	if p.parseContextualModifier(SyntaxKindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKindSetAccessor, ParseFlagsNone)
	}
	asteriskToken := p.parseOptionalToken(SyntaxKindAsteriskToken)
	tokenIsIdentifier := p.isIdentifier()
	name := p.parsePropertyName()
	// Disallowing of optional property assignments and definite assignment assertion happens in the grammar checker.
	postfixToken := p.parseOptionalToken(SyntaxKindQuestionToken)
	// Decorators, Modifiers, questionToken, and exclamationToken are not supported by property assignments and are reported in the grammar checker
	if postfixToken == nil {
		postfixToken = p.parseOptionalToken(SyntaxKindExclamationToken)
	}
	if asteriskToken != nil || p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken {
		return p.parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, postfixToken, nil /*diagnosticMessage*/)
	}
	// check if it is short-hand property assignment or normal property assignment
	// NOTE: if token is EqualsToken it is interpreted as CoverInitializedName production
	// CoverInitializedName[Yield] :
	//     IdentifierReference[?Yield] Initializer[In, ?Yield]
	// this is necessary because ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern
	var node *Node
	isShorthandPropertyAssignment := tokenIsIdentifier && p.token != SyntaxKindColonToken
	if isShorthandPropertyAssignment {
		var initializer *Expression
		if p.parseOptional(SyntaxKindEqualsToken) {
			initializer = doInContext(p, NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		}
		node = p.factory.NewShorthandPropertyAssignment(modifiers, name, postfixToken, initializer)
	} else {
		p.parseExpected(SyntaxKindColonToken)
		initializer := doInContext(p, NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		node = p.factory.NewPropertyAssignment(modifiers, name, postfixToken, initializer)
	}
	p.finishNode(node, pos)
	return node
}

func (p *Parser) parseFunctionExpression() *Expression {
	// GeneratorExpression:
	//      function* BindingIdentifier [Yield][opt](FormalParameters[Yield]){ GeneratorBody }
	//
	// FunctionExpression:
	//      function BindingIdentifier[opt](FormalParameters){ FunctionBody }
	saveContexFlags := p.contextFlags
	p.setContextFlags(NodeFlagsDecoratorContext, false)
	pos := p.nodePos()
	// !!! JSDoc
	modifiers := p.parseModifiers()
	p.parseExpected(SyntaxKindFunctionKeyword)
	asteriskToken := p.parseOptionalToken(SyntaxKindAsteriskToken)
	isGenerator := asteriskToken != nil
	isAsync := hasAsyncModifier(modifiers)
	signatureFlags := ifElse(isGenerator, ParseFlagsYield, ParseFlagsNone) | ifElse(isAsync, ParseFlagsAwait, ParseFlagsNone)
	var name *Node
	switch {
	case isGenerator && isAsync:
		name = doInContext(p, NodeFlagsYieldContext|NodeFlagsAwaitContext, true, (*Parser).parseOptionalBindingIdentifier)
	case isGenerator:
		name = doInContext(p, NodeFlagsYieldContext, true, (*Parser).parseOptionalBindingIdentifier)
	case isAsync:
		name = doInContext(p, NodeFlagsAwaitContext, true, (*Parser).parseOptionalBindingIdentifier)
	default:
		name = p.parseOptionalBindingIdentifier()
	}
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(signatureFlags)
	returnType := p.parseReturnType(SyntaxKindColonToken, false /*isType*/)
	body := p.parseFunctionBlock(signatureFlags, nil /*diagnosticMessage*/)
	p.contextFlags = saveContexFlags
	result := p.factory.NewFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseOptionalBindingIdentifier() *Node {
	if p.isBindingIdentifier() {
		return p.parseBindingIdentifier()
	}
	return nil
}

func (p *Parser) parseDecoratedExpression() *Expression {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersWithOptions(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	if p.token == SyntaxKindClassKeyword {
		return p.parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, SyntaxKindClassExpression)
	}
	p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Expression_expected)
	result := p.factory.NewMissingDeclaration(modifiers)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNewExpressionOrNewDotTarget() *Node {
	pos := p.nodePos()
	p.parseExpected(SyntaxKindNewKeyword)
	if p.parseOptional(SyntaxKindDotToken) {
		name := p.parseIdentifierName()
		result := p.factory.NewMetaProperty(SyntaxKindNewKeyword, name)
		p.finishNode(result, pos)
		return result
	}
	expressionPos := p.nodePos()
	expression := p.parseMemberExpressionRest(expressionPos, p.parsePrimaryExpression(), false /*allowOptionalChain*/)
	var typeArguments *Node
	// Absorb type arguments into NewExpression when preceding expression is ExpressionWithTypeArguments
	if expression.kind == SyntaxKindExpressionWithTypeArguments {
		typeArguments = expression.AsExpressionWithTypeArguments().typeArguments
		expression = expression.AsExpressionWithTypeArguments().expression
	}
	if p.token == SyntaxKindQuestionDotToken {
		p.parseErrorAtCurrentToken(diagnostics.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0, getTextOfNodeFromSourceText(p.sourceText, expression))
	}
	var argumentList []*Expression
	if p.token == SyntaxKindOpenParenToken {
		argumentList = p.parseArgumentList()
	}
	result := p.factory.NewNewExpression(expression, typeArguments, argumentList)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseKeywordExpression() *Node {
	pos := p.nodePos()
	result := p.factory.NewKeywordExpression(p.token)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLiteralExpression() *Node {
	pos := p.nodePos()
	text := p.scanner.TokenValue()
	var result *Node
	switch p.token {
	case SyntaxKindStringLiteral:
		result = p.factory.NewStringLiteral(text)
	case SyntaxKindNumericLiteral:
		result = p.factory.NewNumericLiteral(text)
	case SyntaxKindBigIntLiteral:
		result = p.factory.NewBigIntLiteral(text)
	case SyntaxKindRegularExpressionLiteral:
		result = p.factory.NewRegularExpressionLiteral(text)
	case SyntaxKindNoSubstitutionTemplateLiteral:
		result = p.factory.NewNoSubstitutionTemplateLiteral(text)
	default:
		panic("Unhandled case in parseLiteralExpression")
	}
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseIdentifierNameErrorOnUnicodeEscapeSequence() *Node {
	if p.scanner.HasUnicodeEscape() || p.scanner.HasExtendedUnicodeEscape() {
		p.parseErrorAtCurrentToken(diagnostics.Unicode_escape_sequence_cannot_appear_here)
	}
	return p.createIdentifier(tokenIsIdentifierOrKeyword(p.token))
}

func (p *Parser) parseBindingIdentifier() *Node {
	return p.parseBindingIdentifierWithDiagnostic(nil)
}

func (p *Parser) parseBindingIdentifierWithDiagnostic(privateIdentifierDiagnosticMessage *diagnostics.Message) *Node {
	return p.createIdentifierWithDiagnostic(p.isBindingIdentifier(), nil /*diagnosticMessage*/, privateIdentifierDiagnosticMessage)
}

func (p *Parser) parseIdentifierName() *Node {
	return p.parseIdentifierNameWithDiagnostic(nil)
}

func (p *Parser) parseIdentifierNameWithDiagnostic(diagnosticMessage *diagnostics.Message) *Node {
	return p.createIdentifierWithDiagnostic(tokenIsIdentifierOrKeyword(p.token), diagnosticMessage, nil)
}

func (p *Parser) parseIdentifier() *Node {
	return p.parseIdentifierWithDiagnostic(nil, nil)
}

func (p *Parser) parseIdentifierWithDiagnostic(diagnosticMessage *diagnostics.Message, privateIdentifierDiagnosticMessage *diagnostics.Message) *Node {
	return p.createIdentifierWithDiagnostic(p.isIdentifier(), diagnosticMessage, privateIdentifierDiagnosticMessage)
}

func (p *Parser) createIdentifier(isIdentifier bool) *Node {
	return p.createIdentifierWithDiagnostic(isIdentifier, nil, nil)
}

func (p *Parser) createIdentifierWithDiagnostic(isIdentifier bool, diagnosticMessage *diagnostics.Message, privateIdentifierDiagnosticMessage *diagnostics.Message) *Node {
	if isIdentifier {
		pos := p.nodePos()
		text := p.scanner.TokenValue()
		p.internIdentifier(text)
		p.nextToken()
		result := p.newIdentifier(text)
		p.finishNode(result, pos)
		return result
	}
	if p.token == SyntaxKindPrivateIdentifier {
		if privateIdentifierDiagnosticMessage != nil {
			p.parseErrorAtCurrentToken(privateIdentifierDiagnosticMessage)
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies)
		}
		return p.createIdentifier(true /*isIdentifier*/)
	}
	if diagnosticMessage != nil {
		p.parseErrorAtCurrentToken(diagnosticMessage)
	} else if isReservedWord(p.token) {
		p.parseErrorAtCurrentToken(diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, p.scanner.TokenText())
	} else {
		p.parseErrorAtCurrentToken(diagnostics.Identifier_expected)
	}
	result := p.newIdentifier("")
	p.finishNode(result, p.nodePos())
	return result
}

func (p *Parser) internIdentifier(text string) {
	p.identifiers.add(text)
}

func (p *Parser) finishNode(node *Node, pos int) {
	node.loc = NewTextRange(pos, p.nodePos())
	node.flags |= p.contextFlags
}

func (p *Parser) nextTokenIsSlash() bool {
	return p.nextToken() == SyntaxKindSlashToken
}

func (p *Parser) scanTypeMemberStart() bool {
	// Return true if we have the start of a signature member
	if p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken || p.token == SyntaxKindGetKeyword || p.token == SyntaxKindSetKeyword {
		return true
	}
	idToken := false
	// Eat up all modifiers, but hold on to the last one in case it is actually an identifier
	for isModifierKind(p.token) {
		idToken = true
		p.nextToken()
	}
	// Index signatures and computed property names are type members
	if p.token == SyntaxKindOpenBracketToken {
		return true
	}
	// Try to get the first property-like token following all modifiers
	if p.isLiteralPropertyName() {
		idToken = true
		p.nextToken()
	}
	// If we were able to get any potential identifier, check that it is
	// the start of a member declaration
	if idToken {
		return p.token == SyntaxKindOpenParenToken || p.token == SyntaxKindLessThanToken || p.token == SyntaxKindQuestionToken || p.token == SyntaxKindColonToken || p.token == SyntaxKindCommaToken || p.canParseSemicolon()
	}
	return false
}

func (p *Parser) scanClassMemberStart() bool {
	idToken := SyntaxKindUnknown
	if p.token == SyntaxKindAtToken {
		return true
	}
	// Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
	for isModifierKind(p.token) {
		idToken = p.token
		// If the idToken is a class modifier (protected, private, public, and static), it is
		// certain that we are starting to parse class member. This allows better error recovery
		// Example:
		//      public foo() ...     // true
		//      public @dec blah ... // true; we will then report an error later
		//      export public ...    // true; we will then report an error later
		if isClassMemberModifier(idToken) {
			return true
		}
		p.nextToken()
	}
	if p.token == SyntaxKindAsteriskToken {
		return true
	}
	// Try to get the first property-like token following all modifiers.
	// This can either be an identifier or the 'get' or 'set' keywords.
	if p.isLiteralPropertyName() {
		idToken = p.token
		p.nextToken()
	}
	// Index signatures and computed properties are class members; we can parse.
	if p.token == SyntaxKindOpenBracketToken {
		return true
	}
	// If we were able to get any potential identifier...
	if idToken != SyntaxKindUnknown {
		// If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
		if !isKeyword(idToken) || idToken == SyntaxKindSetKeyword || idToken == SyntaxKindGetKeyword {
			return true
		}
		// If it *is* a keyword, but not an accessor, check a little farther along
		// to see if it should actually be parsed as a class member.
		switch p.token {
		case SyntaxKindOpenParenToken, // Method declaration
			SyntaxKindLessThanToken,    // Generic Method declaration
			SyntaxKindExclamationToken, // Non-null assertion on property name
			SyntaxKindColonToken,       // Type Annotation for declaration
			SyntaxKindEqualsToken,      // Initializer for declaration
			SyntaxKindQuestionToken:    // Not valid, but permitted so that it gets caught later on.
			return true
		}
		// Covers
		//  - Semicolons     (declaration termination)
		//  - Closing braces (end-of-class, must be declaration)
		//  - End-of-files   (not valid, but permitted so that it gets caught later on)
		//  - Line-breaks    (enabling *automatic semicolon insertion*)
		return p.canParseSemicolon()
	}
	return false
}

func (p *Parser) canParseSemicolon() bool {
	// If there's a real semicolon, then we can always parse it out.
	// We can parse out an optional semicolon in ASI cases in the following cases.
	return p.token == SyntaxKindSemicolonToken || p.token == SyntaxKindCloseBraceToken || p.token == SyntaxKindEndOfFile || p.hasPrecedingLineBreak()
}

func (p *Parser) tryParseSemicolon() bool {
	if !p.canParseSemicolon() {
		return false
	}
	if p.token == SyntaxKindSemicolonToken {
		// consume the semicolon if it was explicitly provided.
		p.nextToken()
	}
	return true
}

func (p *Parser) parseSemicolon() bool {
	return p.tryParseSemicolon() || p.parseExpected(SyntaxKindSemicolonToken)
}

func (p *Parser) isLiteralPropertyName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindStringLiteral || p.token == SyntaxKindNumericLiteral || p.token == SyntaxKindBigIntLiteral
}

func (p *Parser) isStartOfStatement() bool {
	switch p.token {
	// 'catch' and 'finally' do not actually indicate that the code is part of a statement,
	// however, we say they are here so that we may gracefully parse them and error later.
	case SyntaxKindAtToken, SyntaxKindSemicolonToken, SyntaxKindOpenBraceToken, SyntaxKindVarKeyword, SyntaxKindLetKeyword,
		SyntaxKindUsingKeyword, SyntaxKindFunctionKeyword, SyntaxKindClassKeyword, SyntaxKindEnumKeyword, SyntaxKindIfKeyword,
		SyntaxKindDoKeyword, SyntaxKindWhileKeyword, SyntaxKindForKeyword, SyntaxKindContinueKeyword, SyntaxKindBreakKeyword,
		SyntaxKindReturnKeyword, SyntaxKindWithKeyword, SyntaxKindSwitchKeyword, SyntaxKindThrowKeyword, SyntaxKindTryKeyword,
		SyntaxKindDebuggerKeyword, SyntaxKindCatchKeyword, SyntaxKindFinallyKeyword:
		return true
	case SyntaxKindImportKeyword:
		return p.isStartOfDeclaration() || p.isNextTokenOpenParenOrLessThanOrDot()
	case SyntaxKindConstKeyword, SyntaxKindExportKeyword:
		return p.isStartOfDeclaration()
	case SyntaxKindAsyncKeyword, SyntaxKindDeclareKeyword, SyntaxKindInterfaceKeyword, SyntaxKindModuleKeyword, SyntaxKindNamespaceKeyword,
		SyntaxKindTypeKeyword, SyntaxKindGlobalKeyword:
		// When these don't start a declaration, they're an identifier in an expression statement
		return true
	case SyntaxKindAccessorKeyword, SyntaxKindPublicKeyword, SyntaxKindPrivateKeyword, SyntaxKindProtectedKeyword, SyntaxKindStaticKeyword,
		SyntaxKindReadonlyKeyword:
		// When these don't start a declaration, they may be the start of a class member if an identifier
		// immediately follows. Otherwise they're an identifier in an expression statement.
		return p.isStartOfDeclaration() || !p.lookAhead(p.nextTokenIsIdentifierOrKeywordOnSameLine)

	default:
		return p.isStartOfExpression()
	}
}

func (p *Parser) isStartOfDeclaration() bool {
	return p.lookAhead(p.scanStartOfDeclaration)
}

func (p *Parser) scanStartOfDeclaration() bool {
	for {
		switch p.token {
		case SyntaxKindVarKeyword, SyntaxKindLetKeyword, SyntaxKindConstKeyword, SyntaxKindFunctionKeyword, SyntaxKindClassKeyword,
			SyntaxKindEnumKeyword:
			return true
		case SyntaxKindUsingKeyword:
			return p.isUsingDeclaration()
		case SyntaxKindAwaitKeyword:
			return p.isAwaitUsingDeclaration()
		// 'declare', 'module', 'namespace', 'interface'* and 'type' are all legal JavaScript identifiers;
		// however, an identifier cannot be followed by another identifier on the same line. This is what we
		// count on to parse out the respective declarations. For instance, we exploit this to say that
		//
		//    namespace n
		//
		// can be none other than the beginning of a namespace declaration, but need to respect that JavaScript sees
		//
		//    namespace
		//    n
		//
		// as the identifier 'namespace' on one line followed by the identifier 'n' on another.
		// We need to look one token ahead to see if it permissible to try parsing a declaration.
		//
		// *Note*: 'interface' is actually a strict mode reserved word. So while
		//
		//   "use strict"
		//   interface
		//   I {}
		//
		// could be legal, it would add complexity for very little gain.
		case SyntaxKindInterfaceKeyword, SyntaxKindTypeKeyword:
			return p.nextTokenIsIdentifierOnSameLine()
		case SyntaxKindModuleKeyword, SyntaxKindNamespaceKeyword:
			return p.nextTokenIsIdentifierOrStringLiteralOnSameLine()
		case SyntaxKindAbstractKeyword, SyntaxKindAccessorKeyword, SyntaxKindAsyncKeyword, SyntaxKindDeclareKeyword, SyntaxKindPrivateKeyword,
			SyntaxKindProtectedKeyword, SyntaxKindPublicKeyword, SyntaxKindReadonlyKeyword:
			previousToken := p.token
			p.nextToken()
			// ASI takes effect for this modifier.
			if p.hasPrecedingLineBreak() {
				return false
			}
			if previousToken == SyntaxKindDeclareKeyword && p.token == SyntaxKindTypeKeyword {
				// If we see 'declare type', then commit to parsing a type alias. parseTypeAliasDeclaration will
				// report Line_break_not_permitted_here if needed.
				return true
			}
			continue
		case SyntaxKindGlobalKeyword:
			p.nextToken()
			return p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindIdentifier || p.token == SyntaxKindExportKeyword
		case SyntaxKindImportKeyword:
			p.nextToken()
			return p.token == SyntaxKindStringLiteral || p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBraceToken || tokenIsIdentifierOrKeyword(p.token)
		case SyntaxKindExportKeyword:
			p.nextToken()
			if p.token == SyntaxKindEqualsToken || p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBraceToken ||
				p.token == SyntaxKindDefaultKeyword || p.token == SyntaxKindAsKeyword || p.token == SyntaxKindAtToken {
				return true
			}
			if p.token == SyntaxKindTypeKeyword {
				p.nextToken()
				return p.token == SyntaxKindAsteriskToken || p.token == SyntaxKindOpenBraceToken || p.isIdentifier() && !p.hasPrecedingLineBreak()
			}
			continue
		case SyntaxKindStaticKeyword:
			p.nextToken()
			continue
		}
		return false
	}
}

func (p *Parser) isStartOfExpression() bool {
	if p.isStartOfLeftHandSideExpression() {
		return true
	}
	switch p.token {
	case SyntaxKindPlusToken, SyntaxKindMinusToken, SyntaxKindTildeToken, SyntaxKindExclamationToken, SyntaxKindDeleteKeyword,
		SyntaxKindTypeOfKeyword, SyntaxKindVoidKeyword, SyntaxKindPlusPlusToken, SyntaxKindMinusMinusToken, SyntaxKindLessThanToken,
		SyntaxKindAwaitKeyword, SyntaxKindYieldKeyword, SyntaxKindPrivateIdentifier, SyntaxKindAtToken:
		// Yield/await always starts an expression.  Either it is an identifier (in which case
		// it is definitely an expression).  Or it's a keyword (either because we're in
		// a generator or async function, or in strict mode (or both)) and it started a yield or await expression.
		return true
	}
	// Error tolerance.  If we see the start of some binary operator, we consider
	// that the start of an expression.  That way we'll parse out a missing identifier,
	// give a good message about an identifier being missing, and then consume the
	// rest of the binary expression.
	if p.isBinaryOperator() {
		return true
	}
	return p.isIdentifier()
}

func (p *Parser) isStartOfLeftHandSideExpression() bool {
	switch p.token {
	case SyntaxKindThisKeyword, SyntaxKindSuperKeyword, SyntaxKindNullKeyword, SyntaxKindTrueKeyword, SyntaxKindFalseKeyword,
		SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindStringLiteral, SyntaxKindNoSubstitutionTemplateLiteral, SyntaxKindTemplateHead,
		SyntaxKindOpenParenToken, SyntaxKindOpenBracketToken, SyntaxKindOpenBraceToken, SyntaxKindFunctionKeyword, SyntaxKindClassKeyword,
		SyntaxKindNewKeyword, SyntaxKindSlashToken, SyntaxKindSlashEqualsToken, SyntaxKindIdentifier:
		return true
	case SyntaxKindImportKeyword:
		return p.isNextTokenOpenParenOrLessThanOrDot()
	}
	return p.isIdentifier()
}

func (p *Parser) isStartOfType(inStartOfParameter bool) bool {
	switch p.token {
	case SyntaxKindAnyKeyword, SyntaxKindUnknownKeyword, SyntaxKindStringKeyword, SyntaxKindNumberKeyword, SyntaxKindBigIntKeyword,
		SyntaxKindBooleanKeyword, SyntaxKindReadonlyKeyword, SyntaxKindSymbolKeyword, SyntaxKindUniqueKeyword, SyntaxKindVoidKeyword,
		SyntaxKindUndefinedKeyword, SyntaxKindNullKeyword, SyntaxKindThisKeyword, SyntaxKindTypeOfKeyword, SyntaxKindNeverKeyword,
		SyntaxKindOpenBraceToken, SyntaxKindOpenBracketToken, SyntaxKindLessThanToken, SyntaxKindBarToken, SyntaxKindAmpersandToken,
		SyntaxKindNewKeyword, SyntaxKindStringLiteral, SyntaxKindNumericLiteral, SyntaxKindBigIntLiteral, SyntaxKindTrueKeyword,
		SyntaxKindFalseKeyword, SyntaxKindObjectKeyword, SyntaxKindAsteriskToken, SyntaxKindQuestionToken, SyntaxKindExclamationToken,
		SyntaxKindDotDotDotToken, SyntaxKindInferKeyword, SyntaxKindImportKeyword, SyntaxKindAssertsKeyword, SyntaxKindNoSubstitutionTemplateLiteral,
		SyntaxKindTemplateHead:
		return true
	case SyntaxKindFunctionKeyword:
		return !inStartOfParameter
	case SyntaxKindMinusToken:
		return !inStartOfParameter && p.lookAhead(p.nextTokenIsNumericOrBigIntLiteral)
	case SyntaxKindOpenParenToken:
		// Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
		// or something that starts a type. We don't want to consider things like '(1)' a type.
		return !inStartOfParameter && p.lookAhead(p.nextIsParenthesizedOrFunctionType)
	}
	return p.isIdentifier()
}

func (p *Parser) nextTokenIsNumericOrBigIntLiteral() bool {
	p.nextToken()
	return p.token == SyntaxKindNumericLiteral || p.token == SyntaxKindBigIntLiteral
}

func (p *Parser) nextIsParenthesizedOrFunctionType() bool {
	p.nextToken()
	return p.token == SyntaxKindCloseParenToken || p.isStartOfParameter(false /*isJSDocParameter*/) || p.isStartOfType(false /*inStartOfParameter*/)
}

func (p *Parser) isStartOfParameter(isJSDocParameter bool) bool {
	return p.token == SyntaxKindDotDotDotToken ||
		p.isBindingIdentifierOrPrivateIdentifierOrPattern() ||
		isModifierKind(p.token) ||
		p.token == SyntaxKindAtToken ||
		p.isStartOfType(!isJSDocParameter /*inStartOfParameter*/)
}

func (p *Parser) isBindingIdentifierOrPrivateIdentifierOrPattern() bool {
	return p.token == SyntaxKindOpenBraceToken || p.token == SyntaxKindOpenBracketToken || p.token == SyntaxKindPrivateIdentifier || p.isBindingIdentifier()
}

func (p *Parser) isNextTokenOpenParenOrLessThanOrDot() bool {
	return p.lookAhead(p.nextTokenIsOpenParenOrLessThanOrDot)
}

func (p *Parser) nextTokenIsOpenParenOrLessThanOrDot() bool {
	switch p.nextToken() {
	case SyntaxKindOpenParenToken, SyntaxKindLessThanToken, SyntaxKindDotToken:
		return true
	}
	return false
}

func (p *Parser) nextTokenIsIdentifierOnSameLine() bool {
	p.nextToken()
	return p.isIdentifier() && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsIdentifierOrStringLiteralOnSameLine() bool {
	p.nextToken()
	return (p.isIdentifier() || p.token == SyntaxKindStringLiteral) && !p.hasPrecedingLineBreak()
}

// Ignore strict mode flag because we will report an error in type checker instead.
func (p *Parser) isIdentifier() bool {
	if p.token == SyntaxKindIdentifier {
		return true
	}
	// If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
	// considered a keyword and is not an identifier.
	// If we have a 'await' keyword, and we're in the [Await] context, then 'await' is
	// considered a keyword and is not an identifier.
	if p.token == SyntaxKindYieldKeyword && p.inYieldContext() || p.token == SyntaxKindAwaitKeyword && p.inAwaitContext() {
		return false
	}
	return p.token > SyntaxKindLastReservedWord
}

func (p *Parser) isBindingIdentifier() bool {
	// `let await`/`let yield` in [Yield] or [Await] are allowed here and disallowed in the binder.
	return p.token == SyntaxKindIdentifier || p.token > SyntaxKindLastReservedWord
}

func (p *Parser) isImportAttributeName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == SyntaxKindStringLiteral
}

func (p *Parser) isBinaryOperator() bool {
	if p.inDisallowInContext() && p.token == SyntaxKindInKeyword {
		return false
	}
	return getBinaryOperatorPrecedence(p.token) != OperatorPrecedenceInvalid
}

func (p *Parser) isValidHeritageClauseObjectLiteral() bool {
	return p.lookAhead(p.nextIsValidHeritageClauseObjectLiteral)
}

func (p *Parser) nextIsValidHeritageClauseObjectLiteral() bool {
	if p.nextToken() == SyntaxKindCloseBraceToken {
		// if we see "extends {}" then only treat the {} as what we're extending (and not
		// the class body) if we have:
		//
		//      extends {} {
		//      extends {},
		//      extends {} extends
		//      extends {} implements
		next := p.nextToken()
		return next == SyntaxKindCommaToken || next == SyntaxKindOpenBraceToken || next == SyntaxKindExtendsKeyword || next == SyntaxKindImplementsKeyword
	}
	return true
}

func (p *Parser) isHeritageClause() bool {
	return p.token == SyntaxKindExtendsKeyword || p.token == SyntaxKindImplementsKeyword
}

func (p *Parser) isHeritageClauseExtendsOrImplementsKeyword() bool {
	return p.isHeritageClause() && p.lookAhead(p.nextIsStartOfExpression)
}

func (p *Parser) nextIsStartOfExpression() bool {
	p.nextToken()
	return p.isStartOfExpression()
}

func (p *Parser) isUsingDeclaration() bool {
	// 'using' always starts a lexical declaration if followed by an identifier. We also eagerly parse
	// |ObjectBindingPattern| so that we can report a grammar error during check. We don't parse out
	// |ArrayBindingPattern| since it potentially conflicts with element access (i.e., `using[x]`).
	return p.lookAhead(p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine)
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine() bool {
	p.nextToken()
	return p.isBindingIdentifier() || p.token == SyntaxKindOpenBraceToken && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf() bool {
	return p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine() && p.token != SyntaxKindOfKeyword
}

func (p *Parser) isAwaitUsingDeclaration() bool {
	return p.lookAhead(p.nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine)
}

func (p *Parser) nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine() bool {
	return p.nextToken() == SyntaxKindUsingKeyword && p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine()
}

func (p *Parser) nextTokenIsTokenStringLiteral() bool {
	return p.nextToken() == SyntaxKindStringLiteral
}

func (p *Parser) setContextFlags(flags NodeFlags, value bool) {
	if value {
		p.contextFlags |= flags
	} else {
		p.contextFlags &= ^flags
	}
}

func doInContext[T any](p *Parser, flags NodeFlags, value bool, f func(p *Parser) T) T {
	saveContextFlags := p.contextFlags
	p.setContextFlags(flags, value)
	result := f(p)
	p.contextFlags = saveContextFlags
	return result
}

func (p *Parser) inYieldContext() bool {
	return p.contextFlags&NodeFlagsYieldContext != 0
}

func (p *Parser) inDisallowInContext() bool {
	return p.contextFlags&NodeFlagsDisallowInContext != 0
}

func (p *Parser) inDisallowConditionalTypesContext() bool {
	return p.contextFlags&NodeFlagsDisallowConditionalTypesContext != 0
}

func (p *Parser) inDecoratorContext() bool {
	return p.contextFlags&NodeFlagsDecoratorContext != 0
}

func (p *Parser) inAwaitContext() bool {
	return p.contextFlags&NodeFlagsAwaitContext != 0
}

func (p *Parser) skipRangeTrivia(textRange TextRange) TextRange {
	return NewTextRange(skipTrivia(p.sourceText, textRange.Pos()), textRange.End())
}

func isModifierKind(token SyntaxKind) bool {
	switch token {
	case SyntaxKindAbstractKeyword, SyntaxKindAccessorKeyword, SyntaxKindAsyncKeyword, SyntaxKindConstKeyword, SyntaxKindDeclareKeyword,
		SyntaxKindDefaultKeyword, SyntaxKindExportKeyword, SyntaxKindImmediateKeyword, SyntaxKindInKeyword, SyntaxKindPublicKeyword,
		SyntaxKindPrivateKeyword, SyntaxKindProtectedKeyword, SyntaxKindReadonlyKeyword, SyntaxKindStaticKeyword, SyntaxKindOutKeyword,
		SyntaxKindOverrideKeyword:
		return true
	}
	return false
}

func isClassMemberModifier(token SyntaxKind) bool {
	return isParameterPropertyModifier(token) || token == SyntaxKindStaticKeyword || token == SyntaxKindOverrideKeyword || token == SyntaxKindAccessorKeyword
}

func isParameterPropertyModifier(kind SyntaxKind) bool {
	return modifierToFlag(kind)&ModifierFlagsParameterPropertyModifier != 0
}

func isKeyword(token SyntaxKind) bool {
	return SyntaxKindFirstKeyword <= token && token <= SyntaxKindLastKeyword
}

func isReservedWord(token SyntaxKind) bool {
	return SyntaxKindFirstReservedWord <= token && token <= SyntaxKindLastReservedWord
}

func isFileProbablyExternalModule(sourceFile *SourceFile) *Node {
	for _, statement := range sourceFile.statements {
		if isAnExternalModuleIndicatorNode(statement) {
			return statement
		}
	}
	return getImportMetaIfNecessary(sourceFile)
}

func isAnExternalModuleIndicatorNode(node *Statement) bool {
	return hasSyntacticModifier(node, ModifierFlagsExport) ||
		isImportEqualsDeclaration(node) && isExternalModuleReference(node.AsImportEqualsDeclaration().moduleReference) ||
		isImportDeclaration(node) || isExportAssignment(node) || isExportDeclaration(node)
}

func getImportMetaIfNecessary(sourceFile *SourceFile) *Node {
	if sourceFile.AsNode().flags&NodeFlagsPossiblyContainsImportMeta != 0 {
		return findChildNode(sourceFile.AsNode(), isImportMeta)
	}
	return nil
}

func findChildNode(root *Node, check func(*Node) bool) *Node {
	var result *Node
	var visit func(*Node) bool
	visit = func(node *Node) bool {
		if check(node) {
			result = node
			return true
		}
		return node.ForEachChild(visit)
	}
	visit(root)
	return result
}

func tagNamesAreEquivalent(lhs *Expression, rhs *Expression) bool {
	if lhs.kind != rhs.kind {
		return false
	}
	switch lhs.kind {
	case SyntaxKindIdentifier:
		return lhs.AsIdentifier().text == rhs.AsIdentifier().text
	case SyntaxKindThisKeyword:
		return true
	case SyntaxKindJsxNamespacedName:
		return lhs.AsJsxNamespacedName().namespace.AsIdentifier().text == rhs.AsJsxNamespacedName().namespace.AsIdentifier().text &&
			lhs.AsJsxNamespacedName().name.AsIdentifier().text == rhs.AsJsxNamespacedName().name.AsIdentifier().text
	case SyntaxKindPropertyAccessExpression:
		return lhs.AsPropertyAccessExpression().name.Text() == rhs.AsPropertyAccessExpression().name.Text() &&
			tagNamesAreEquivalent(lhs.AsPropertyAccessExpression().expression, rhs.AsPropertyAccessExpression().expression)
	}
	panic("Unhandled case in tagNamesAreEquivalent")
}

func attachFileToDiagnostics(diagnostics []*Diagnostic, file *SourceFile) []*Diagnostic {
	for _, d := range diagnostics {
		d.file = file
	}
	return diagnostics
}

func isDeclarationFileName(fileName string) bool {
	return getDeclarationFileExtension(fileName) != ""
}

func getDeclarationFileExtension(fileName string) string {
	_, base := path.Split(fileName)
	for _, ext := range supportedDeclarationExtensions {
		if strings.HasSuffix(base, ext) {
			return ext
		}
	}
	if strings.HasSuffix(base, ExtensionTs) {
		index := strings.Index(base, ".d.")
		if index >= 0 {
			return base[index:]
		}
	}
	return ""
}
