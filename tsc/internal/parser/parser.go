package parser

import (
	"fmt"
	"regexp"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
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
	scanner *scanner.Scanner
	factory ast.NodeFactory

	fileName         string
	path             tspath.Path
	sourceText       string
	languageVersion  core.ScriptTarget
	scriptKind       core.ScriptKind
	languageVariant  core.LanguageVariant
	diagnostics      []*ast.Diagnostic
	jsdocDiagnostics []*ast.Diagnostic

	token                       ast.Kind
	sourceFlags                 ast.NodeFlags
	contextFlags                ast.NodeFlags
	parsingContexts             ParsingContexts
	statementHasAwaitIdentifier bool
	hasDeprecatedTag            bool
	hasParseError               bool

	identifiers             map[string]string
	identifierCount         int
	notParenthesizedArrow   core.Set[int]
	nodeSlicePool           core.Pool[*ast.Node]
	jsdocCache              map[*ast.Node][]*ast.Node
	possibleAwaitSpans      []int
	jsdocCommentsSpace      []string
	jsdocCommentRangesSpace []ast.CommentRange
	jsdocTagCommentsSpace   []string
}

var viableKeywordSuggestions = scanner.GetViableKeywordSuggestions()

var parserPool = sync.Pool{
	New: func() any {
		return &Parser{}
	},
}

func getParser() *Parser {
	return parserPool.Get().(*Parser)
}

func putParser(p *Parser) {
	*p = Parser{scanner: p.scanner}
	parserPool.Put(p)
}

func ParseSourceFile(fileName string, path tspath.Path, sourceText string, languageVersion core.ScriptTarget, jsdocParsingMode scanner.JSDocParsingMode) *ast.SourceFile {
	p := getParser()
	defer putParser(p)
	p.initializeState(fileName, path, sourceText, languageVersion, core.ScriptKindUnknown, jsdocParsingMode)
	p.nextToken()
	return p.parseSourceFileWorker()
}

func ParseJSONText(fileName string, path tspath.Path, sourceText string) *ast.SourceFile {
	p := getParser()
	defer putParser(p)
	p.initializeState(fileName, path, sourceText, core.ScriptTargetES2015, core.ScriptKindJSON, scanner.JSDocParsingModeParseAll)
	p.nextToken()
	pos := p.nodePos()
	var statements *ast.NodeList

	if p.token == ast.KindEndOfFile {
		statements = p.newNodeList(core.NewTextRange(pos, p.nodePos()), nil)
		p.parseTokenNode()
	} else {
		var expressions any // []*ast.Expression | *ast.Expression

		for p.token != ast.KindEndOfFile {
			var expression *ast.Expression
			switch p.token {
			case ast.KindOpenBracketToken:
				expression = p.parseArrayLiteralExpression()
			case ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNullKeyword:
				expression = p.parseTokenNode()
			case ast.KindMinusToken:
				if p.lookAhead(func(p *Parser) bool {
					return p.nextToken() == ast.KindNumericLiteral && p.nextToken() != ast.KindColonToken
				}) {
					expression = p.parsePrefixUnaryExpression()
				} else {
					expression = p.parseObjectLiteralExpression()
				}
			case ast.KindNumericLiteral, ast.KindStringLiteral:
				if p.lookAhead(func(p *Parser) bool { return p.nextToken() != ast.KindColonToken }) {
					expression = p.parseLiteralExpression(false /*intern*/)
					break
				}
				fallthrough
			default:
				expression = p.parseObjectLiteralExpression()
			}

			// Error recovery: collect multiple top-level expressions
			if expressions != nil {
				if es, ok := expressions.([]*ast.Expression); ok {
					expressions = append(es, expression)
				} else {
					expressions = []*ast.Expression{expressions.(*ast.Expression), expression}
				}
			} else {
				expressions = expression
				if p.token != ast.KindEndOfFile {
					p.parseErrorAtCurrentToken(diagnostics.Unexpected_token)
				}
			}
		}

		var expression *ast.Expression
		if es, ok := expressions.([]*ast.Expression); ok {
			expression = p.factory.NewArrayLiteralExpression(p.newNodeList(core.NewTextRange(pos, p.nodePos()), es), false)
		} else {
			expression = expressions.(*ast.Expression)
		}
		statement := p.factory.NewExpressionStatement(expression)
		p.finishNode(statement, pos)
		statements = p.newNodeList(core.NewTextRange(pos, p.nodePos()), []*ast.Node{statement})
		p.parseExpectedToken(ast.KindEndOfFile)
	}
	node := p.factory.NewSourceFile(p.sourceText, p.fileName, p.path, statements)
	p.finishNode(node, pos)
	result := node.AsSourceFile()
	result.ScriptKind = core.ScriptKindJSON
	result.LanguageVersion = core.ScriptTargetES2015
	result.Flags |= p.sourceFlags
	result.SetDiagnostics(attachFileToDiagnostics(p.diagnostics, result))
	result.SetJSDocDiagnostics(attachFileToDiagnostics(p.jsdocDiagnostics, result))
	return result
}

func (p *Parser) initializeState(fileName string, path tspath.Path, sourceText string, languageVersion core.ScriptTarget, scriptKind core.ScriptKind, jsdocParsingMode scanner.JSDocParsingMode) {
	if p.scanner == nil {
		p.scanner = scanner.NewScanner()
	} else {
		p.scanner.Reset()
	}
	p.fileName = fileName
	p.path = path
	p.sourceText = sourceText
	p.languageVersion = languageVersion
	p.scriptKind = ensureScriptKind(fileName, scriptKind)
	p.languageVariant = getLanguageVariant(p.scriptKind)
	switch p.scriptKind {
	case core.ScriptKindJS, core.ScriptKindJSX:
		p.contextFlags = ast.NodeFlagsJavaScriptFile
	case core.ScriptKindJSON:
		p.contextFlags = ast.NodeFlagsJavaScriptFile | ast.NodeFlagsJsonFile
	default:
		p.contextFlags = ast.NodeFlagsNone
	}
	p.hasParseError = false
	p.scanner.SetText(p.sourceText)
	p.scanner.SetOnError(p.scanError)
	p.scanner.SetScriptTarget(p.languageVersion)
	p.scanner.SetLanguageVariant(p.languageVariant)
	p.scanner.SetScriptKind(p.scriptKind)
	p.scanner.SetJSDocParsingMode(jsdocParsingMode)
}

func (p *Parser) scanError(message *diagnostics.Message, pos int, length int, args ...any) {
	p.parseErrorAtRange(core.NewTextRange(pos, pos+length), message, args...)
}

func (p *Parser) parseErrorAt(pos int, end int, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return p.parseErrorAtRange(core.NewTextRange(pos, end), message, args...)
}

func (p *Parser) parseErrorAtCurrentToken(message *diagnostics.Message, args ...any) *ast.Diagnostic {
	return p.parseErrorAtRange(p.scanner.TokenRange(), message, args...)
}

func (p *Parser) parseErrorAtRange(loc core.TextRange, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	// Don't report another error if it would just be at the same location as the last error
	var result *ast.Diagnostic
	if len(p.diagnostics) == 0 || p.diagnostics[len(p.diagnostics)-1].Pos() != loc.Pos() {
		result = ast.NewDiagnostic(nil, loc, message, args...)
		p.diagnostics = append(p.diagnostics, result)
	}
	p.hasParseError = true
	return result
}

type ParserState struct {
	scannerState                scanner.ScannerState
	contextFlags                ast.NodeFlags
	diagnosticsLen              int
	statementHasAwaitIdentifier bool
	hasParseError               bool
}

func (p *Parser) mark() ParserState {
	return ParserState{
		scannerState:                p.scanner.Mark(),
		contextFlags:                p.contextFlags,
		diagnosticsLen:              len(p.diagnostics),
		statementHasAwaitIdentifier: p.statementHasAwaitIdentifier,
		hasParseError:               p.hasParseError,
	}
}

func (p *Parser) rewind(state ParserState) {
	p.scanner.Rewind(state.scannerState)
	p.token = p.scanner.Token()
	p.contextFlags = state.contextFlags
	p.diagnostics = p.diagnostics[0:state.diagnosticsLen]
	p.statementHasAwaitIdentifier = state.statementHasAwaitIdentifier
	p.hasParseError = state.hasParseError
}

func (p *Parser) lookAhead(callback func(p *Parser) bool) bool {
	state := p.mark()
	result := callback(p)
	p.rewind(state)
	return result
}

func (p *Parser) nextToken() ast.Kind {
	// if the keyword had an escape
	if isKeyword(p.token) && (p.scanner.HasUnicodeEscape() || p.scanner.HasExtendedUnicodeEscape()) {
		// issue a parse error for the escape
		p.parseErrorAtCurrentToken(diagnostics.Keywords_cannot_contain_escape_characters)
	}
	p.token = p.scanner.Scan()
	return p.token
}

func (p *Parser) nextTokenWithoutCheck() ast.Kind {
	p.token = p.scanner.Scan()
	return p.token
}

func (p *Parser) nextTokenJSDoc() ast.Kind {
	p.token = p.scanner.ScanJSDocToken()
	return p.token
}

func (p *Parser) nextJSDocCommentTextToken(inBackticks bool) ast.Kind {
	p.token = p.scanner.ScanJSDocCommentTextToken(inBackticks)
	return p.token
}

func (p *Parser) nodePos() int {
	return p.scanner.TokenFullStart()
}

func (p *Parser) hasPrecedingLineBreak() bool {
	return p.scanner.HasPrecedingLineBreak()
}

func (p *Parser) hasPrecedingJSDocComment() bool {
	return p.scanner.HasPrecedingJSDocComment()
}

func (p *Parser) parseSourceFileWorker() *ast.SourceFile {
	isDeclarationFile := tspath.IsDeclarationFileName(p.fileName)
	if isDeclarationFile {
		p.contextFlags |= ast.NodeFlagsAmbient
	}
	pos := p.nodePos()
	statements := p.parseListIndex(PCSourceElements, (*Parser).parseToplevelStatement)
	eof := p.parseTokenNode()
	if eof.Kind != ast.KindEndOfFile {
		panic("Expected end of file token from scanner.")
	}
	node := p.factory.NewSourceFile(p.sourceText, p.fileName, p.path, statements)
	p.finishNode(node, pos)
	result := node.AsSourceFile()
	p.finishSourceFile(result, isDeclarationFile)
	if !result.IsDeclarationFile && result.ExternalModuleIndicator != nil && len(p.possibleAwaitSpans) > 0 {
		reparse := p.reparseTopLevelAwait(result)
		if node != reparse {
			p.finishNode(reparse, pos)
			result = reparse.AsSourceFile()
			p.finishSourceFile(result, isDeclarationFile)
		}
	}
	p.jsdocCache = nil
	p.possibleAwaitSpans = []int{}
	collectExternalModuleReferences(result)
	return result
}

func (p *Parser) finishSourceFile(result *ast.SourceFile, isDeclarationFile bool) {
	result.CommentDirectives = p.scanner.CommentDirectives()
	result.Pragmas = getCommentPragmas(&p.factory, p.sourceText)
	processPragmasIntoFields(result)
	result.SetDiagnostics(attachFileToDiagnostics(p.diagnostics, result))
	result.ExternalModuleIndicator = isFileProbablyExternalModule(result)
	result.IsDeclarationFile = isDeclarationFile
	result.LanguageVersion = p.languageVersion
	result.LanguageVariant = p.languageVariant
	result.ScriptKind = p.scriptKind
	result.Flags |= p.sourceFlags
	result.Identifiers = p.identifiers
	result.IdentifierCount = p.identifierCount
	result.SetJSDocCache(p.jsdocCache)
	p.jsdocCache = nil
	p.identifiers = nil
}

func (p *Parser) parseToplevelStatement(i int) *ast.Node {
	p.statementHasAwaitIdentifier = false
	statement := p.parseStatement()
	if p.statementHasAwaitIdentifier && statement.Flags&ast.NodeFlagsAwaitContext == 0 {
		if len(p.possibleAwaitSpans) == 0 || p.possibleAwaitSpans[len(p.possibleAwaitSpans)-1] != i {
			p.possibleAwaitSpans = append(p.possibleAwaitSpans, i, i+1)
		} else {
			p.possibleAwaitSpans[len(p.possibleAwaitSpans)-1] = i + 1
		}
	}
	return statement
}

func (p *Parser) reparseTopLevelAwait(sourceFile *ast.SourceFile) *ast.Node {
	if len(p.possibleAwaitSpans)%2 == 1 {
		panic("possibleAwaitSpans malformed: odd number of indices, not paired into spans.")
	}
	statements := []*ast.Statement{}
	savedParseDiagnostics := p.diagnostics
	p.diagnostics = []*ast.Diagnostic{}

	afterAwaitStatement := 0
	for i := 0; i < len(p.possibleAwaitSpans); i += 2 {
		nextAwaitStatement := p.possibleAwaitSpans[i]
		// append all non-await statements between afterAwaitStatement and nextAwaitStatement
		prevStatement := sourceFile.Statements.Nodes[afterAwaitStatement]
		nextStatement := sourceFile.Statements.Nodes[nextAwaitStatement]
		statements = append(statements, sourceFile.Statements.Nodes[afterAwaitStatement:nextAwaitStatement]...)

		// append all diagnostics associated with the copied range
		diagnosticStart := core.FindIndex(savedParseDiagnostics, func(diagnostic *ast.Diagnostic) bool {
			return diagnostic.Pos() >= prevStatement.Pos()
		})
		var diagnosticEnd int
		if diagnosticStart >= 0 {
			diagnosticEnd = core.FindIndex(savedParseDiagnostics[:diagnosticStart], func(diagnostic *ast.Diagnostic) bool {
				return diagnostic.Pos() >= nextStatement.Pos()
			})
		} else {
			diagnosticEnd = -1
		}
		if diagnosticStart >= 0 {
			var slice []*ast.Diagnostic
			if diagnosticEnd >= 0 {
				slice = savedParseDiagnostics[diagnosticStart : diagnosticStart+diagnosticEnd]
			} else {
				slice = savedParseDiagnostics[diagnosticStart:]
			}
			p.diagnostics = append(p.diagnostics, slice...)
		}

		state := p.mark()
		// reparse all statements between start and pos. We skip existing diagnostics for the same range and allow the parser to generate new ones.
		p.contextFlags |= ast.NodeFlagsAwaitContext
		p.scanner.ResetPos(nextStatement.Pos())
		p.nextToken()

		afterAwaitStatement = p.possibleAwaitSpans[i+1]
		for p.token != ast.KindEndOfFile {
			startPos := p.scanner.TokenFullStart()
			statement := p.parseStatement()
			statements = append(statements, statement)
			if startPos == p.scanner.TokenFullStart() {
				p.nextToken()
			}
			if afterAwaitStatement < len(sourceFile.Statements.Nodes) {
				nonAwaitStatement := sourceFile.Statements.Nodes[afterAwaitStatement]
				if statement.End() == nonAwaitStatement.Pos() {
					// done reparsing this section
					break
				}
				if statement.End() > nonAwaitStatement.Pos() {
					// we ate into the next statement, so we must continue reparsing the next span
					i += 2
					if i < len(p.possibleAwaitSpans) {
						afterAwaitStatement = p.possibleAwaitSpans[i+1]
					} else {
						afterAwaitStatement = len(sourceFile.Statements.Nodes)
					}
				}
			}
		}

		// Keep diagnostics from the reparse
		state.diagnosticsLen = len(p.diagnostics)
		p.rewind(state)
	}

	// append all statements between pos and the end of the list
	if afterAwaitStatement < len(sourceFile.Statements.Nodes) {
		prevStatement := sourceFile.Statements.Nodes[afterAwaitStatement]
		statements = append(statements, sourceFile.Statements.Nodes[afterAwaitStatement:]...)

		// append all diagnostics associated with the copied range
		diagnosticStart := core.FindIndex(savedParseDiagnostics, func(diagnostic *ast.Diagnostic) bool {
			return diagnostic.Pos() >= prevStatement.Pos()
		})
		if diagnosticStart >= 0 {
			p.diagnostics = append(p.diagnostics, savedParseDiagnostics[diagnosticStart:]...)
		}
	}

	return p.factory.NewSourceFile(sourceFile.Text, sourceFile.FileName(), sourceFile.Path(), p.newNodeList(sourceFile.Statements.Loc, statements))
}

func (p *Parser) parseListIndex(kind ParsingContext, parseElement func(p *Parser, index int) *ast.Node) *ast.NodeList {
	pos := p.nodePos()
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << kind
	list := make([]*ast.Node, 0, 16)
	for i := 0; !p.isListTerminator(kind); i++ {
		if p.isListElement(kind, false /*inErrorRecovery*/) {
			list = append(list, parseElement(p, i))
			continue
		}
		if p.abortParsingListOrMoveToNextToken(kind) {
			break
		}
	}
	p.parsingContexts = saveParsingContexts
	slice := p.nodeSlicePool.NewSlice(len(list))
	copy(slice, list)
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), slice)
}

func (p *Parser) parseList(kind ParsingContext, parseElement func(p *Parser) *ast.Node) *ast.NodeList {
	return p.parseListIndex(kind, func(p *Parser, _ int) *ast.Node { return parseElement(p) })
}

// Return a non-nil (but possibly empty) slice if parsing was successful, or nil if parseElement returned nil
func (p *Parser) parseDelimitedList(kind ParsingContext, parseElement func(p *Parser) *ast.Node) *ast.NodeList {
	pos := p.nodePos()
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << kind
	list := make([]*ast.Node, 0, 16)
	for {
		if p.isListElement(kind, false /*inErrorRecovery*/) {
			startPos := p.nodePos()
			element := parseElement(p)
			if element == nil {
				p.parsingContexts = saveParsingContexts
				// Return nil to indicate parseElement failed
				return nil
			}
			list = append(list, element)
			if p.parseOptional(ast.KindCommaToken) {
				// No need to check for a zero length node since we know we parsed a comma
				continue
			}
			if p.isListTerminator(kind) {
				break
			}
			// We didn't get a comma, and the list wasn't terminated, explicitly parse
			// out a comma so we give a good error message.
			if p.token != ast.KindCommaToken && kind == PCEnumMembers {
				p.parseErrorAtCurrentToken(diagnostics.An_enum_member_name_must_be_followed_by_a_or)
			} else {
				p.parseExpected(ast.KindCommaToken)
			}
			// If the token was a semicolon, and the caller allows that, then skip it and
			// continue.  This ensures we get back on track and don't result in tons of
			// parse errors.  For example, this can happen when people do things like use
			// a semicolon to delimit object literal members.   Note: we'll have already
			// reported an error when we called parseExpected above.
			if (kind == PCObjectLiteralMembers || kind == PCImportAttributes) && p.token == ast.KindSemicolonToken && !p.hasPrecedingLineBreak() {
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
	slice := p.nodeSlicePool.NewSlice(len(list))
	copy(slice, list)
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), slice)
}

// Return a non-nil (but possibly empty) NodeList if parsing was successful, or nil if opening token wasn't found
// or parseElement returned nil.
func (p *Parser) parseBracketedList(kind ParsingContext, parseElement func(p *Parser) *ast.Node, opening ast.Kind, closing ast.Kind) *ast.NodeList {
	if p.parseExpected(opening) {
		result := p.parseDelimitedList(kind, parseElement)
		p.parseExpected(closing)
		return result
	}
	return p.parseEmptyNodeList()
}

func (p *Parser) parseEmptyNodeList() *ast.NodeList {
	return p.newNodeList(core.NewTextRange(p.nodePos(), p.nodePos()), nil)
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
		if p.token == ast.KindDefaultKeyword {
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
			p.parseErrorAtCurrentToken(diagnostics.X_0_is_not_allowed_as_a_variable_declaration_name, scanner.TokenToString(p.token))
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
			p.parseErrorAtCurrentToken(diagnostics.X_0_is_not_allowed_as_a_parameter_name, scanner.TokenToString(p.token))
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
		if p.token == ast.KindFromKeyword {
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
		return !(p.token == ast.KindSemicolonToken && inErrorRecovery) && p.isStartOfStatement()
	case PCSwitchClauses:
		return p.token == ast.KindCaseKeyword || p.token == ast.KindDefaultKeyword
	case PCTypeMembers:
		return p.lookAhead((*Parser).scanTypeMemberStart)
	case PCClassMembers:
		// We allow semicolons as class elements (as specified by ES6) as long as we're
		// not in error recovery.  If we're in error recovery, we don't want an errant
		// semicolon to be treated as a class member (since they're almost always used
		// for statements.
		return p.lookAhead((*Parser).scanClassMemberStart) || p.token == ast.KindSemicolonToken && !inErrorRecovery
	case PCEnumMembers:
		// Include open bracket computed properties. This technically also lets in indexers,
		// which would be a candidate for improved error reporting.
		return p.token == ast.KindOpenBracketToken || p.isLiteralPropertyName()
	case PCObjectLiteralMembers:
		switch p.token {
		case ast.KindOpenBracketToken, ast.KindAsteriskToken, ast.KindDotDotDotToken, ast.KindDotToken: // Not an object literal member, but don't want to close the object (see `tests/cases/fourslash/completionsDotInObjectLiteral.ts`)
			return true
		default:
			return p.isLiteralPropertyName()
		}
	case PCRestProperties:
		return p.isLiteralPropertyName()
	case PCObjectBindingElements:
		return p.token == ast.KindOpenBracketToken || p.token == ast.KindDotDotDotToken || p.isLiteralPropertyName()
	case PCImportAttributes:
		return p.isImportAttributeName()
	case PCHeritageClauseElement:
		// If we see `{ ... }` then only consume it as an expression if it is followed by `,` or `{`
		// That way we won't consume the body of a class in its heritage clause.
		if p.token == ast.KindOpenBraceToken {
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
		return p.token == ast.KindCommaToken || p.token == ast.KindDotDotDotToken || p.isBindingIdentifierOrPrivateIdentifierOrPattern()
	case PCTypeParameters:
		return p.token == ast.KindInKeyword || p.token == ast.KindConstKeyword || p.isIdentifier()
	case PCArrayLiteralMembers:
		// Not an array literal member, but don't want to close the array (see `tests/cases/fourslash/completionsDotInArrayLiteralInObjectLiteral.ts`)
		if p.token == ast.KindCommaToken || p.token == ast.KindDotToken {
			return true
		}
		fallthrough
	case PCArgumentExpressions:
		return p.token == ast.KindDotDotDotToken || p.isStartOfExpression()
	case PCParameters:
		return p.isStartOfParameter(false /*isJSDocParameter*/)
	case PCJSDocParameters:
		return p.isStartOfParameter(true /*isJSDocParameter*/)
	case PCTypeArguments, PCTupleElementTypes:
		return p.token == ast.KindCommaToken || p.isStartOfType(false /*inStartOfParameter*/)
	case PCHeritageClauses:
		return p.isHeritageClause()
	case PCImportOrExportSpecifiers:
		// bail out if the next token is [FromKeyword StringLiteral].
		// That means we're in something like `import { from "mod"`. Stop here can give better error message.
		if p.token == ast.KindFromKeyword && p.lookAhead((*Parser).nextTokenIsTokenStringLiteral) {
			return false
		}
		if p.token == ast.KindStringLiteral {
			return true // For "arbitrary module namespace identifiers"
		}
		return tokenIsIdentifierOrKeyword(p.token)
	case PCJsxAttributes:
		return tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindOpenBraceToken
	case PCJsxChildren:
		return true
	case PCJSDocComment:
		return true
	}
	panic("Unhandled case in isListElement")
}

func (p *Parser) isListTerminator(kind ParsingContext) bool {
	if p.token == ast.KindEndOfFile {
		return true
	}
	switch kind {
	case PCBlockStatements, PCSwitchClauses, PCTypeMembers, PCClassMembers, PCEnumMembers, PCObjectLiteralMembers,
		PCObjectBindingElements, PCImportOrExportSpecifiers, PCImportAttributes:
		return p.token == ast.KindCloseBraceToken
	case PCSwitchClauseStatements:
		return p.token == ast.KindCloseBraceToken || p.token == ast.KindCaseKeyword || p.token == ast.KindDefaultKeyword
	case PCHeritageClauseElement:
		return p.token == ast.KindOpenBraceToken || p.token == ast.KindExtendsKeyword || p.token == ast.KindImplementsKeyword
	case PCVariableDeclarations:
		// If we can consume a semicolon (either explicitly, or with ASI), then consider us done
		// with parsing the list of variable declarators.
		// In the case where we're parsing the variable declarator of a 'for-in' statement, we
		// are done if we see an 'in' keyword in front of us. Same with for-of
		// ERROR RECOVERY TWEAK:
		// For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
		// arrow function here and it's going to be very unlikely that we'll resynchronize and get
		// another variable declaration.
		return p.canParseSemicolon() || p.token == ast.KindInKeyword || p.token == ast.KindOfKeyword || p.token == ast.KindEqualsGreaterThanToken
	case PCTypeParameters:
		// Tokens other than '>' are here for better error recovery
		return p.token == ast.KindGreaterThanToken || p.token == ast.KindOpenParenToken || p.token == ast.KindOpenBraceToken || p.token == ast.KindExtendsKeyword || p.token == ast.KindImplementsKeyword
	case PCArgumentExpressions:
		// Tokens other than ')' are here for better error recovery
		return p.token == ast.KindCloseParenToken || p.token == ast.KindSemicolonToken
	case PCArrayLiteralMembers, PCTupleElementTypes, PCArrayBindingElements:
		return p.token == ast.KindCloseBracketToken
	case PCJSDocParameters, PCParameters, PCRestProperties:
		// Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
		return p.token == ast.KindCloseParenToken || p.token == ast.KindCloseBracketToken /*|| token == ast.KindOpenBraceToken*/
	case PCTypeArguments:
		// All other tokens should cause the type-argument to terminate except comma token
		return p.token != ast.KindCommaToken
	case PCHeritageClauses:
		return p.token == ast.KindOpenBraceToken || p.token == ast.KindCloseBraceToken
	case PCJsxAttributes:
		return p.token == ast.KindGreaterThanToken || p.token == ast.KindSlashToken
	case PCJsxChildren:
		return p.token == ast.KindLessThanToken && p.lookAhead((*Parser).nextTokenIsSlash)
	}
	return false
}

func (p *Parser) parseExpectedJSDoc(kind ast.Kind) bool {
	if p.token == kind {
		p.nextTokenJSDoc()
		return true
	}
	if !isKeywordOrPunctuation(kind) {
		panic("Invalid JSDoc kind: expected keyword or punctuation")
	}
	p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(kind))
	return false
}

func (p *Parser) parseExpectedMatchingBrackets(openKind ast.Kind, closeKind ast.Kind, openParsed bool, openPosition int) {
	if p.token == closeKind {
		p.nextToken()
		return
	}
	lastError := p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(closeKind))
	if !openParsed {
		return
	}
	if lastError != nil {
		related := ast.NewDiagnostic(nil, core.NewTextRange(openPosition, openPosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, scanner.TokenToString(openKind), scanner.TokenToString(closeKind))
		lastError.AddRelatedInfo(related)
	}
}

func (p *Parser) parseOptional(token ast.Kind) bool {
	if p.token == token {
		p.nextToken()
		return true
	}
	return false
}

func (p *Parser) parseExpected(kind ast.Kind) bool {
	return p.parseExpectedWithDiagnostic(kind, nil, true)
}

func (p *Parser) parseExpectedWithoutAdvancing(kind ast.Kind) bool {
	return p.parseExpectedWithDiagnostic(kind, nil, false)
}

func (p *Parser) parseExpectedWithDiagnostic(kind ast.Kind, message *diagnostics.Message, shouldAdvance bool) bool {
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
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(kind))
	}
	return false
}

func (p *Parser) parseTokenNode() *ast.Node {
	pos := p.nodePos()
	kind := p.token
	p.nextToken()
	result := p.factory.NewToken(kind)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExpectedToken(kind ast.Kind) *ast.Node {
	token := p.parseOptionalToken(kind)
	if token == nil {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(kind))
		token = p.factory.NewToken(kind)
		p.finishNode(token, p.nodePos())
	}
	return token
}

func (p *Parser) parseOptionalToken(kind ast.Kind) *ast.Node {
	if p.token == kind {
		return p.parseTokenNode()
	}
	return nil
}

func (p *Parser) parseExpectedTokenJSDoc(kind ast.Kind) *ast.Node {
	optional := p.parseOptionalTokenJSDoc(kind)
	if optional == nil {
		if !isKeywordOrPunctuation(kind) {
			panic("expected keyword or punctuation")
		}
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(kind))
		optional = p.factory.NewToken(kind)
		p.finishNode(optional, p.nodePos())
	}
	return optional
}

func (p *Parser) parseOptionalTokenJSDoc(kind ast.Kind) *ast.Node {
	if p.token == kind {
		return p.parseTokenNode()
	}
	return nil
}

func (p *Parser) parseStatement() *ast.Statement {
	switch p.token {
	case ast.KindSemicolonToken:
		return p.parseEmptyStatement()
	case ast.KindOpenBraceToken:
		return p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	case ast.KindVarKeyword:
		return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case ast.KindLetKeyword:
		if p.isLetDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case ast.KindAwaitKeyword:
		if p.isAwaitUsingDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case ast.KindUsingKeyword:
		if p.isUsingDeclaration() {
			return p.parseVariableStatement(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
		}
	case ast.KindFunctionKeyword:
		return p.parseFunctionDeclaration(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case ast.KindClassKeyword:
		return p.parseClassDeclaration(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/)
	case ast.KindIfKeyword:
		return p.parseIfStatement()
	case ast.KindDoKeyword:
		return p.parseDoStatement()
	case ast.KindWhileKeyword:
		return p.parseWhileStatement()
	case ast.KindForKeyword:
		return p.parseForOrForInOrForOfStatement()
	case ast.KindContinueKeyword:
		return p.parseContinueStatement()
	case ast.KindBreakKeyword:
		return p.parseBreakStatement()
	case ast.KindReturnKeyword:
		return p.parseReturnStatement()
	case ast.KindWithKeyword:
		return p.parseWithStatement()
	case ast.KindSwitchKeyword:
		return p.parseSwitchStatement()
	case ast.KindThrowKeyword:
		return p.parseThrowStatement()
	case ast.KindTryKeyword, ast.KindCatchKeyword, ast.KindFinallyKeyword:
		return p.parseTryStatement()
	case ast.KindDebuggerKeyword:
		return p.parseDebuggerStatement()
	case ast.KindAtToken:
		return p.parseDeclaration()
	case ast.KindAsyncKeyword, ast.KindInterfaceKeyword, ast.KindTypeKeyword, ast.KindModuleKeyword, ast.KindNamespaceKeyword,
		ast.KindDeclareKeyword, ast.KindConstKeyword, ast.KindEnumKeyword, ast.KindExportKeyword, ast.KindImportKeyword,
		ast.KindPrivateKeyword, ast.KindProtectedKeyword, ast.KindPublicKeyword, ast.KindAbstractKeyword, ast.KindAccessorKeyword,
		ast.KindStaticKeyword, ast.KindReadonlyKeyword, ast.KindGlobalKeyword:
		if p.isStartOfDeclaration() {
			return p.parseDeclaration()
		}
	}
	return p.parseExpressionOrLabeledStatement()
}

func (p *Parser) parseDeclaration() *ast.Statement {
	// `parseListElement` attempted to get the reused node at this position,
	// but the ambient context flag was not yet set, so the node appeared
	// not reusable in that context.
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersEx( /*allowDecorators*/ true, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	isAmbient := modifiers != nil && core.Some(modifiers.Nodes, isDeclareModifier)
	if isAmbient {
		// !!! incremental parsing
		// node := p.tryReuseAmbientDeclaration(pos)
		// if node {
		// 	return node
		// }
		for _, m := range modifiers.Nodes {
			m.Flags |= ast.NodeFlagsAmbient
		}
		saveContextFlags := p.contextFlags
		p.setContextFlags(ast.NodeFlagsAmbient, true)
		result := p.parseDeclarationWorker(pos, hasJSDoc, modifiers)
		p.contextFlags = saveContextFlags
		return result
	} else {
		return p.parseDeclarationWorker(pos, hasJSDoc, modifiers)
	}
}

func (p *Parser) parseDeclarationWorker(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Statement {
	switch p.token {
	case ast.KindVarKeyword, ast.KindLetKeyword, ast.KindConstKeyword, ast.KindUsingKeyword, ast.KindAwaitKeyword:
		return p.parseVariableStatement(pos, hasJSDoc, modifiers)
	case ast.KindFunctionKeyword:
		return p.parseFunctionDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindClassKeyword:
		return p.parseClassDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindInterfaceKeyword:
		return p.parseInterfaceDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindTypeKeyword:
		return p.parseTypeAliasDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindEnumKeyword:
		return p.parseEnumDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindGlobalKeyword, ast.KindModuleKeyword, ast.KindNamespaceKeyword:
		return p.parseModuleDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindImportKeyword:
		return p.parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifiers)
	case ast.KindExportKeyword:
		p.nextToken()
		switch p.token {
		case ast.KindDefaultKeyword, ast.KindEqualsToken:
			return p.parseExportAssignment(pos, hasJSDoc, modifiers)
		case ast.KindAsKeyword:
			return p.parseNamespaceExportDeclaration(pos, hasJSDoc, modifiers)
		default:
			return p.parseExportDeclaration(pos, hasJSDoc, modifiers)
		}
	}
	if modifiers != nil {
		// We reached this point because we encountered decorators and/or modifiers and assumed a declaration
		// would follow. For recovery and error reporting purposes, return an incomplete declaration.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Declaration_expected)
		result := p.factory.NewMissingDeclaration(modifiers)
		p.finishNode(result, pos)
		return result
	}
	panic("Unhandled case in parseDeclarationWorker")
}

func isDeclareModifier(modifier *ast.Node) bool {
	return modifier.Kind == ast.KindDeclareKeyword
}

func (p *Parser) isLetDeclaration() bool {
	// In ES6 'let' always starts a lexical declaration if followed by an identifier or {
	// or [.
	return p.lookAhead((*Parser).nextTokenIsBindingIdentifierOrStartOfDestructuring)
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuring() bool {
	p.nextToken()
	return p.isBindingIdentifier() || p.token == ast.KindOpenBraceToken || p.token == ast.KindOpenBracketToken
}

func (p *Parser) parseBlock(ignoreMissingOpenBrace bool, diagnosticMessage *diagnostics.Message) *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	openBracePosition := p.scanner.TokenStart()
	openBraceParsed := p.parseExpectedWithDiagnostic(ast.KindOpenBraceToken, diagnosticMessage, true /*shouldAdvance*/)
	multiline := false
	if openBraceParsed || ignoreMissingOpenBrace {
		multiline = p.hasPrecedingLineBreak()
		statements := p.parseList(PCBlockStatements, (*Parser).parseStatement)
		p.parseExpectedMatchingBrackets(ast.KindOpenBraceToken, ast.KindCloseBraceToken, openBraceParsed, openBracePosition)
		result := p.factory.NewBlock(statements, multiline)
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		if p.token == ast.KindEqualsToken {
			p.parseErrorAtCurrentToken(diagnostics.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_whole_assignment_in_parentheses)
			p.nextToken()
		}
		return result
	}
	result := p.factory.NewBlock(p.parseEmptyNodeList(), multiline)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseEmptyStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindSemicolonToken)
	result := p.factory.NewEmptyStatement()
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseIfStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindIfKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(ast.KindOpenParenToken, ast.KindCloseParenToken, openParenParsed, openParenPosition)
	thenStatement := p.parseStatement()
	var elseStatement *ast.Statement
	if p.parseOptional(ast.KindElseKeyword) {
		elseStatement = p.parseStatement()
	}
	result := p.factory.NewIfStatement(expression, thenStatement, elseStatement)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseDoStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindDoKeyword)
	statement := p.parseStatement()
	p.parseExpected(ast.KindWhileKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(ast.KindOpenParenToken, ast.KindCloseParenToken, openParenParsed, openParenPosition)
	// From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
	// 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
	// spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
	//  do;while(0)x will have a semicolon inserted before x.
	p.parseOptional(ast.KindSemicolonToken)
	result := p.factory.NewDoStatement(statement, expression)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseWhileStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindWhileKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(ast.KindOpenParenToken, ast.KindCloseParenToken, openParenParsed, openParenPosition)
	statement := p.parseStatement()
	result := p.factory.NewWhileStatement(expression, statement)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseForOrForInOrForOfStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindForKeyword)
	awaitToken := p.parseOptionalToken(ast.KindAwaitKeyword)
	p.parseExpected(ast.KindOpenParenToken)
	var initializer *ast.ForInitializer
	if p.token != ast.KindSemicolonToken {
		if p.token == ast.KindVarKeyword || p.token == ast.KindLetKeyword || p.token == ast.KindConstKeyword ||
			p.token == ast.KindUsingKeyword && p.lookAhead((*Parser).nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf) ||
			// this one is meant to allow of
			p.token == ast.KindAwaitKeyword && p.lookAhead((*Parser).nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine) {
			initializer = p.parseVariableDeclarationList(true /*inForStatementInitializer*/)
		} else {
			initializer = doInContext(p, ast.NodeFlagsDisallowInContext, true, (*Parser).parseExpression)
		}
	}
	var result *ast.Statement
	switch {
	case awaitToken != nil && p.parseExpected(ast.KindOfKeyword) || awaitToken == nil && p.parseOptional(ast.KindOfKeyword):
		expression := doInContext(p, ast.NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		p.parseExpected(ast.KindCloseParenToken)
		result = p.factory.NewForInOrOfStatement(ast.KindForOfStatement, awaitToken, initializer, expression, p.parseStatement())
	case p.parseOptional(ast.KindInKeyword):
		expression := p.parseExpressionAllowIn()
		p.parseExpected(ast.KindCloseParenToken)
		result = p.factory.NewForInOrOfStatement(ast.KindForInStatement, nil /*awaitToken*/, initializer, expression, p.parseStatement())
	default:
		p.parseExpected(ast.KindSemicolonToken)
		var condition *ast.Expression
		if p.token != ast.KindSemicolonToken && p.token != ast.KindCloseParenToken {
			condition = p.parseExpressionAllowIn()
		}
		p.parseExpected(ast.KindSemicolonToken)
		var incrementor *ast.Expression
		if p.token != ast.KindCloseParenToken {
			incrementor = p.parseExpressionAllowIn()
		}
		p.parseExpected(ast.KindCloseParenToken)
		result = p.factory.NewForStatement(initializer, condition, incrementor, p.parseStatement())
	}
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseBreakStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindBreakKeyword)
	label := p.parseIdentifierUnlessAtSemicolon()
	p.parseSemicolon()
	result := p.factory.NewBreakStatement(label)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseContinueStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindContinueKeyword)
	label := p.parseIdentifierUnlessAtSemicolon()
	p.parseSemicolon()
	result := p.factory.NewContinueStatement(label)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseIdentifierUnlessAtSemicolon() *ast.Node {
	if !p.canParseSemicolon() {
		return p.parseIdentifier()
	}
	return nil
}

func (p *Parser) parseReturnStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindReturnKeyword)
	var expression *ast.Expression
	if !p.canParseSemicolon() {
		expression = p.parseExpressionAllowIn()
	}
	p.parseSemicolon()
	result := p.factory.NewReturnStatement(expression)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseWithStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindWithKeyword)
	openParenPosition := p.scanner.TokenStart()
	openParenParsed := p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpectedMatchingBrackets(ast.KindOpenParenToken, ast.KindCloseParenToken, openParenParsed, openParenPosition)
	statement := doInContext(p, ast.NodeFlagsInWithStatement, true, (*Parser).parseStatement)
	result := p.factory.NewWithStatement(expression, statement)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseCaseClause() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindCaseKeyword)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(ast.KindColonToken)
	statements := p.parseList(PCSwitchClauseStatements, (*Parser).parseStatement)
	result := p.factory.NewCaseOrDefaultClause(ast.KindCaseClause, expression, statements)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseDefaultClause() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindDefaultKeyword)
	p.parseExpected(ast.KindColonToken)
	statements := p.parseList(PCSwitchClauseStatements, (*Parser).parseStatement)
	result := p.factory.NewCaseOrDefaultClause(ast.KindDefaultClause, nil /*expression*/, statements)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseCaseOrDefaultClause() *ast.Node {
	if p.token == ast.KindCaseKeyword {
		return p.parseCaseClause()
	}
	return p.parseDefaultClause()
}

func (p *Parser) parseCaseBlock() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindOpenBraceToken)
	clauses := p.parseList(PCSwitchClauses, (*Parser).parseCaseOrDefaultClause)
	p.parseExpected(ast.KindCloseBraceToken)
	result := p.factory.NewCaseBlock(clauses)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseSwitchStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindSwitchKeyword)
	p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(ast.KindCloseParenToken)
	caseBlock := p.parseCaseBlock()
	result := p.factory.NewSwitchStatement(expression, caseBlock)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseThrowStatement() *ast.Node {
	// ThrowStatement[Yield] :
	//      throw [no LineTerminator here]Expression[In, ?Yield];
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindThrowKeyword)
	// Because of automatic semicolon insertion, we need to report error if this
	// throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
	// directly as that might consume an expression on the following line.
	// Instead, we create a "missing" identifier, but don't report an error. The actual error
	// will be reported in the grammar walker.
	var expression *ast.Expression
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
	p.withJSDoc(result, hasJSDoc)
	return result
}

// TODO: Review for error recovery
func (p *Parser) parseTryStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindTryKeyword)
	tryBlock := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	var catchClause *ast.Node
	if p.token == ast.KindCatchKeyword {
		catchClause = p.parseCatchClause()
	}
	// If we don't have a catch clause, then we must have a finally clause.  Try to parse
	// one out no matter what.
	var finallyBlock *ast.Node
	if catchClause == nil || p.token == ast.KindFinallyKeyword {
		p.parseExpectedWithDiagnostic(ast.KindFinallyKeyword, diagnostics.X_catch_or_finally_expected, true /*shouldAdvance*/)
		finallyBlock = p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	}
	result := p.factory.NewTryStatement(tryBlock, catchClause, finallyBlock)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseCatchClause() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindCatchKeyword)
	var variableDeclaration *ast.Node
	if p.parseOptional(ast.KindOpenParenToken) {
		variableDeclaration = p.parseVariableDeclaration()
		p.parseExpected(ast.KindCloseParenToken)
	}
	block := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil)
	result := p.factory.NewCatchClause(variableDeclaration, block)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDebuggerStatement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindDebuggerKeyword)
	p.parseSemicolon()
	result := p.factory.NewDebuggerStatement()
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseExpressionOrLabeledStatement() *ast.Statement {
	// Avoiding having to do the lookahead for a labeled statement by just trying to parse
	// out an expression, seeing if it is identifier and then seeing if it is followed by
	// a colon.
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	hasParen := p.token == ast.KindOpenParenToken
	expression := p.parseExpression()

	if expression.Kind == ast.KindIdentifier && p.parseOptional(ast.KindColonToken) {
		result := p.factory.NewLabeledStatement(expression, p.parseStatement())
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}

	if !p.tryParseSemicolon() {
		p.parseErrorForMissingSemicolonAfter(expression)
	}
	result := p.factory.NewExpressionStatement(expression)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc && !hasParen)
	return result
}

func (p *Parser) parseVariableStatement(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	declarationList := p.parseVariableDeclarationList(false /*inForStatementInitializer*/)
	p.parseSemicolon()
	result := p.factory.NewVariableStatement(modifiers, declarationList)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseVariableDeclarationList(inForStatementInitializer bool) *ast.Node {
	pos := p.nodePos()
	var flags ast.NodeFlags
	switch p.token {
	case ast.KindVarKeyword:
		flags = ast.NodeFlagsNone
	case ast.KindLetKeyword:
		flags = ast.NodeFlagsLet
	case ast.KindConstKeyword:
		flags = ast.NodeFlagsConst
	case ast.KindUsingKeyword:
		flags = ast.NodeFlagsUsing
	case ast.KindAwaitKeyword:
		// Debug.assert(isAwaitUsingDeclaration());
		flags = ast.NodeFlagsAwaitUsing
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
	var declarations *ast.NodeList
	if p.token == ast.KindOfKeyword && p.lookAhead((*Parser).nextIsIdentifierAndCloseParen) {
		declarations = p.parseEmptyNodeList()
	} else {
		saveContextFlags := p.contextFlags
		p.setContextFlags(ast.NodeFlagsDisallowInContext, inForStatementInitializer)
		declarations = p.parseDelimitedList(PCVariableDeclarations, core.IfElse(inForStatementInitializer, (*Parser).parseVariableDeclaration, (*Parser).parseVariableDeclarationAllowExclamation))
		p.contextFlags = saveContextFlags
	}
	result := p.factory.NewVariableDeclarationList(flags, declarations)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) nextIsIdentifierAndCloseParen() bool {
	return p.nextTokenIsIdentifier() && p.nextToken() == ast.KindCloseParenToken
}

func (p *Parser) nextTokenIsIdentifier() bool {
	p.nextToken()
	return p.isIdentifier()
}

func (p *Parser) parseVariableDeclaration() *ast.Node {
	return p.parseVariableDeclarationWorker(false /*allowExclamation*/)
}

func (p *Parser) parseVariableDeclarationAllowExclamation() *ast.Node {
	return p.parseVariableDeclarationWorker(true /*allowExclamation*/)
}

func (p *Parser) parseVariableDeclarationWorker(allowExclamation bool) *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	name := p.parseIdentifierOrPatternWithDiagnostic(diagnostics.Private_identifiers_are_not_allowed_in_variable_declarations)
	var exclamationToken *ast.Node
	if allowExclamation && name.Kind == ast.KindIdentifier && p.token == ast.KindExclamationToken && !p.hasPrecedingLineBreak() {
		exclamationToken = p.parseTokenNode()
	}
	typeNode := p.parseTypeAnnotation()
	var initializer *ast.Expression
	if p.token != ast.KindInKeyword && p.token != ast.KindOfKeyword {
		initializer = p.parseInitializer()
	}
	result := p.factory.NewVariableDeclaration(name, exclamationToken, typeNode, initializer)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseIdentifierOrPattern() *ast.Node {
	return p.parseIdentifierOrPatternWithDiagnostic(nil)
}

func (p *Parser) parseIdentifierOrPatternWithDiagnostic(privateIdentifierDiagnosticMessage *diagnostics.Message) *ast.Node {
	if p.token == ast.KindOpenBracketToken {
		return p.parseArrayBindingPattern()
	}
	if p.token == ast.KindOpenBraceToken {
		return p.parseObjectBindingPattern()
	}
	return p.parseBindingIdentifierWithDiagnostic(privateIdentifierDiagnosticMessage)
}

func (p *Parser) parseArrayBindingPattern() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenBracketToken)
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsDisallowInContext, false)
	elements := p.parseDelimitedList(PCArrayBindingElements, (*Parser).parseArrayBindingElement)
	p.contextFlags = saveContextFlags
	p.parseExpected(ast.KindCloseBracketToken)
	result := p.factory.NewBindingPattern(ast.KindArrayBindingPattern, elements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseArrayBindingElement() *ast.Node {
	pos := p.nodePos()
	var dotDotDotToken *ast.Node
	var name *ast.Node
	var initializer *ast.Expression
	if p.token != ast.KindCommaToken {
		// These are all nil for a missing element
		dotDotDotToken = p.parseOptionalToken(ast.KindDotDotDotToken)
		name = p.parseIdentifierOrPattern()
		initializer = p.parseInitializer()
	}
	result := p.factory.NewBindingElement(dotDotDotToken, nil /*propertyName*/, name, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectBindingPattern() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenBraceToken)
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsDisallowInContext, false)
	elements := p.parseDelimitedList(PCObjectBindingElements, (*Parser).parseObjectBindingElement)
	p.contextFlags = saveContextFlags
	p.parseExpected(ast.KindCloseBraceToken)
	result := p.factory.NewBindingPattern(ast.KindObjectBindingPattern, elements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectBindingElement() *ast.Node {
	pos := p.nodePos()
	dotDotDotToken := p.parseOptionalToken(ast.KindDotDotDotToken)
	tokenIsIdentifier := p.isBindingIdentifier()
	propertyName := p.parsePropertyName()
	var name *ast.Node
	if tokenIsIdentifier && p.token != ast.KindColonToken {
		name = propertyName
		propertyName = nil
	} else {
		p.parseExpected(ast.KindColonToken)
		name = p.parseIdentifierOrPattern()
	}
	initializer := p.parseInitializer()
	result := p.factory.NewBindingElement(dotDotDotToken, propertyName, name, initializer)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseInitializer() *ast.Expression {
	if p.parseOptional(ast.KindEqualsToken) {
		return p.parseAssignmentExpressionOrHigher()
	}
	return nil
}

func (p *Parser) parseTypeAnnotation() *ast.TypeNode {
	if p.parseOptional(ast.KindColonToken) {
		return p.parseType()
	}
	return nil
}

func (p *Parser) parseFunctionDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	p.parseExpected(ast.KindFunctionKeyword)
	asteriskToken := p.parseOptionalToken(ast.KindAsteriskToken)
	// We don't parse the name here in await context, instead we will report a grammar error in the checker.
	var name *ast.Node
	if modifiers == nil || modifiers.ModifierFlags&ast.ModifierFlagsDefault == 0 || p.isBindingIdentifier() {
		name = p.parseBindingIdentifier()
	}
	signatureFlags := core.IfElse(asteriskToken != nil, ParseFlagsYield, ParseFlagsNone) | core.IfElse(modifiers != nil && modifiers.ModifierFlags&ast.ModifierFlagsAsync != 0, ParseFlagsAwait, ParseFlagsNone)
	typeParameters := p.parseTypeParameters()
	saveContextFlags := p.contextFlags
	if modifiers != nil && modifiers.ModifierFlags&ast.ModifierFlagsExport != 0 {
		p.setContextFlags(ast.NodeFlagsAwaitContext, true)
	}
	parameters := p.parseParameters(signatureFlags)
	returnType := p.parseReturnType(ast.KindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(signatureFlags, diagnostics.X_or_expected)
	p.contextFlags = saveContextFlags
	result := p.factory.NewFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseClassDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	return p.parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, ast.KindClassDeclaration)
}

func (p *Parser) parseClassExpression() *ast.Node {
	return p.parseClassDeclarationOrExpression(p.nodePos(), p.hasPrecedingJSDocComment(), nil /*modifiers*/, ast.KindClassExpression)
}

func (p *Parser) parseClassDeclarationOrExpression(pos int, hasJSDoc bool, modifiers *ast.ModifierList, kind ast.Kind) *ast.Node {
	saveContextFlags := p.contextFlags
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	p.parseExpected(ast.KindClassKeyword)
	// We don't parse the name here in await context, instead we will report a grammar error in the checker.
	name := p.parseNameOfClassDeclarationOrExpression()
	typeParameters := p.parseTypeParameters()
	if modifiers != nil && core.Some(modifiers.Nodes, isExportModifier) {
		p.setContextFlags(ast.NodeFlagsAwaitContext, true /*value*/)
	}
	heritageClauses := p.parseHeritageClauses()
	var members *ast.NodeList
	if p.parseExpected(ast.KindOpenBraceToken) {
		// ClassTail[Yield,Await] : (Modified) See 14.5
		//      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
		members = p.parseList(PCClassMembers, (*Parser).parseClassElement)
		p.parseExpected(ast.KindCloseBraceToken)
	} else {
		members = p.parseEmptyNodeList()
	}
	p.contextFlags = saveContextFlags
	var result *ast.Node
	if modifiers != nil && ast.ModifiersToFlags(modifiers.Nodes)&ast.ModifierFlagsAmbient != 0 {
		p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	}
	if kind == ast.KindClassDeclaration {
		result = p.factory.NewClassDeclaration(modifiers, name, typeParameters, heritageClauses, members)
	} else {
		result = p.factory.NewClassExpression(modifiers, name, typeParameters, heritageClauses, members)
	}
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseNameOfClassDeclarationOrExpression() *ast.Node {
	// implements is a future reserved word so
	// 'class implements' might mean either
	// - class expression with omitted name, 'implements' starts heritage clause
	// - class with name 'implements'
	// 'isImplementsClause' helps to disambiguate between these two cases
	if p.isBindingIdentifier() && !p.isImplementsClause() {
		saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
		id := p.createIdentifier(p.isBindingIdentifier())
		p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
		return id
	}
	return nil
}

func (p *Parser) isImplementsClause() bool {
	return p.token == ast.KindImplementsKeyword && p.lookAhead((*Parser).nextTokenIsIdentifierOrKeyword)
}

func isExportModifier(modifier *ast.Node) bool {
	return modifier.Kind == ast.KindExportKeyword
}

func isAsyncModifier(modifier *ast.Node) bool {
	return modifier.Kind == ast.KindAsyncKeyword
}

func (p *Parser) parseHeritageClauses() *ast.NodeList {
	// ClassTail[Yield,Await] : (Modified) See 14.5
	//      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
	if p.isHeritageClause() {
		return p.parseList(PCHeritageClauses, (*Parser).parseHeritageClause)
	}
	return nil
}

func (p *Parser) parseHeritageClause() *ast.Node {
	pos := p.nodePos()
	kind := p.token
	p.nextToken()
	types := p.parseDelimitedList(PCHeritageClauseElement, (*Parser).parseExpressionWithTypeArguments)
	result := p.factory.NewHeritageClause(kind, types)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExpressionWithTypeArguments() *ast.Node {
	pos := p.nodePos()
	expression := p.parseLeftHandSideExpressionOrHigher()
	if ast.IsExpressionWithTypeArguments(expression) {
		return expression
	}
	typeArguments := p.parseTypeArguments()
	result := p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseClassElement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	if p.token == ast.KindSemicolonToken {
		p.nextToken()
		result := p.factory.NewSemicolonClassElement()
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}
	modifiers := p.parseModifiersEx(true /*allowDecorators*/, true /*permitConstAsModifier*/, true /*stopOnStartOfClassStaticBlock*/)
	if p.token == ast.KindStaticKeyword && p.lookAhead((*Parser).nextTokenIsOpenBrace) {
		return p.parseClassStaticBlockDeclaration(pos, hasJSDoc, modifiers)
	}
	if p.parseContextualModifier(ast.KindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindGetAccessor, ParseFlagsNone)
	}
	if p.parseContextualModifier(ast.KindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindSetAccessor, ParseFlagsNone)
	}
	if p.token == ast.KindConstructorKeyword || p.token == ast.KindStringLiteral {
		constructorDeclaration := p.tryParseConstructorDeclaration(pos, hasJSDoc, modifiers)
		if constructorDeclaration != nil {
			return constructorDeclaration
		}
	}
	if p.isIndexSignature() {
		return p.parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers)
	}
	// It is very important that we check this *after* checking indexers because
	// the [ token can start an index signature or a computed property name
	if tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindStringLiteral || p.token == ast.KindNumericLiteral || p.token == ast.KindBigIntLiteral || p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBracketToken {
		isAmbient := modifiers != nil && core.Some(modifiers.Nodes, isDeclareModifier)
		if isAmbient {
			for _, m := range modifiers.Nodes {
				m.Flags |= ast.NodeFlagsAmbient
			}
			saveContextFlags := p.contextFlags
			p.setContextFlags(ast.NodeFlagsAmbient, true)
			result := p.parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers)
			p.contextFlags = saveContextFlags
			return result
		} else {
			return p.parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers)
		}
	}
	if modifiers != nil {
		// treat this as a property declaration with a missing name.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Declaration_expected)
		name := p.createMissingIdentifier()
		return p.parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, nil /*questionToken*/)
	}
	// 'isClassMemberStart' should have hinted not to attempt parsing.
	panic("Should not have attempted to parse class member declaration.")
}

func (p *Parser) parseClassStaticBlockDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	p.parseExpectedToken(ast.KindStaticKeyword)
	body := p.parseClassStaticBlockBody()
	result := p.factory.NewClassStaticBlockDeclaration(modifiers, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseClassStaticBlockBody() *ast.Node {
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsYieldContext, false)
	p.setContextFlags(ast.NodeFlagsAwaitContext, true)
	body := p.parseBlock(false /*ignoreMissingOpenBrace*/, nil /*diagnosticMessage*/)
	p.contextFlags = saveContextFlags
	return body
}

func (p *Parser) tryParseConstructorDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	state := p.mark()
	if p.token == ast.KindConstructorKeyword || p.token == ast.KindStringLiteral && p.scanner.TokenValue() == "constructor" && p.lookAhead((*Parser).nextTokenIsOpenParen) {
		p.nextToken()
		typeParameters := p.parseTypeParameters()
		parameters := p.parseParameters(ParseFlagsNone)
		returnType := p.parseReturnType(ast.KindColonToken, false /*isType*/)
		body := p.parseFunctionBlockOrSemicolon(ParseFlagsNone, diagnostics.X_or_expected)
		result := p.factory.NewConstructorDeclaration(modifiers, typeParameters, parameters, returnType, body)
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}
	p.rewind(state)
	return nil
}

func (p *Parser) nextTokenIsOpenParen() bool {
	return p.nextToken() == ast.KindOpenParenToken
}

func (p *Parser) parsePropertyOrMethodDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	asteriskToken := p.parseOptionalToken(ast.KindAsteriskToken)
	name := p.parsePropertyName()
	// Note: this is not legal as per the grammar.  But we allow it in the parser and
	// report an error in the grammar checker.
	questionToken := p.parseOptionalToken(ast.KindQuestionToken)
	if asteriskToken != nil || p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken {
		return p.parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, diagnostics.X_or_expected)
	}
	return p.parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, questionToken)
}

func (p *Parser) parseMethodDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList, asteriskToken *ast.Node, name *ast.Node, questionToken *ast.Node, diagnosticMessage *diagnostics.Message) *ast.Node {
	signatureFlags := core.IfElse(asteriskToken != nil, ParseFlagsYield, ParseFlagsNone) | core.IfElse(modifierListHasAsync(modifiers), ParseFlagsAwait, ParseFlagsNone)
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(signatureFlags)
	typeNode := p.parseReturnType(ast.KindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(signatureFlags, diagnosticMessage)
	result := p.factory.NewMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, typeNode, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func modifierListHasAsync(modifiers *ast.ModifierList) bool {
	return modifiers != nil && core.Some(modifiers.Nodes, isAsyncModifier)
}

func (p *Parser) parsePropertyDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList, name *ast.Node, questionToken *ast.Node) *ast.Node {
	postfixToken := questionToken
	if postfixToken == nil && !p.hasPrecedingLineBreak() {
		postfixToken = p.parseOptionalToken(ast.KindExclamationToken)
	}
	typeNode := p.parseTypeAnnotation()
	initializer := doInContext(p, ast.NodeFlagsYieldContext|ast.NodeFlagsAwaitContext|ast.NodeFlagsDisallowInContext, false, (*Parser).parseInitializer)
	p.parseSemicolonAfterPropertyName(name, typeNode, initializer)
	result := p.factory.NewPropertyDeclaration(modifiers, name, postfixToken, typeNode, initializer)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseSemicolonAfterPropertyName(name *ast.Node, typeNode *ast.TypeNode, initializer *ast.Expression) {
	if p.token == ast.KindAtToken && !p.hasPrecedingLineBreak() {
		p.parseErrorAtCurrentToken(diagnostics.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations)
		return
	}
	if p.token == ast.KindOpenParenToken {
		p.parseErrorAtCurrentToken(diagnostics.Cannot_start_a_function_call_in_a_type_annotation)
		p.nextToken()
		return
	}
	if typeNode != nil && !p.canParseSemicolon() {
		if initializer != nil {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindSemicolonToken))
		} else {
			p.parseErrorAtCurrentToken(diagnostics.Expected_for_property_initializer)
		}
		return
	}
	if p.tryParseSemicolon() {
		return
	}
	if initializer != nil {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindSemicolonToken))
		return
	}
	p.parseErrorForMissingSemicolonAfter(name)
}

func (p *Parser) parseErrorForMissingSemicolonAfter(node *ast.Node) {
	// Tagged template literals are sometimes used in places where only simple strings are allowed, i.e.:
	//   module `M1` {
	//   ^^^^^^^^^^^ This block is parsed as a template literal like module`M1`.
	if node.Kind == ast.KindTaggedTemplateExpression {
		p.parseErrorAtRange(p.skipRangeTrivia(node.AsTaggedTemplateExpression().Template.Loc), diagnostics.Module_declaration_names_may_only_use_or_quoted_strings)
		return
	}
	// Otherwise, if this isn't a well-known keyword-like identifier, give the generic fallback message.
	var expressionText string
	if node.Kind == ast.KindIdentifier {
		expressionText = node.AsIdentifier().Text
	}
	// !!! Also call isIdentifierText(expressionText, languageVersion)
	if expressionText == "" {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindSemicolonToken))
		return
	}
	pos := scanner.SkipTrivia(p.sourceText, node.Pos())
	// Some known keywords are likely signs of syntax being used improperly.
	switch expressionText {
	case "const", "let", "var":
		p.parseErrorAt(pos, node.End(), diagnostics.Variable_declaration_not_allowed_at_this_location)
		return
	case "declare":
		// If a declared node failed to parse, it would have emitted a diagnostic already.
		return
	case "interface":
		p.parseErrorForInvalidName(diagnostics.Interface_name_cannot_be_0, diagnostics.Interface_must_be_given_a_name, ast.KindOpenBraceToken)
		return
	case "is":
		p.parseErrorAt(pos, p.scanner.TokenStart(), diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods)
		return
	case "module", "namespace":
		p.parseErrorForInvalidName(diagnostics.Namespace_name_cannot_be_0, diagnostics.Namespace_must_be_given_a_name, ast.KindOpenBraceToken)
		return
	case "type":
		p.parseErrorForInvalidName(diagnostics.Type_alias_name_cannot_be_0, diagnostics.Type_alias_must_be_given_a_name, ast.KindEqualsToken)
		return
	}
	// The user alternatively might have misspelled or forgotten to add a space after a common keyword.
	suggestion := core.GetSpellingSuggestion(expressionText, viableKeywordSuggestions, func(s string) string { return s })
	if suggestion == "" {
		suggestion = getSpaceSuggestion(expressionText)
	}
	if suggestion != "" {
		p.parseErrorAt(pos, node.End(), diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion)
		return
	}
	// Unknown tokens are handled with their own errors in the scanner
	if p.token == ast.KindUnknown {
		return
	}
	// Otherwise, we know this some kind of unknown word, not just a missing expected semicolon.
	p.parseErrorAt(pos, node.End(), diagnostics.Unexpected_keyword_or_identifier)
}

func getSpaceSuggestion(expressionText string) string {
	for _, keyword := range viableKeywordSuggestions {
		if len(expressionText) > len(keyword)+2 && strings.HasPrefix(expressionText, keyword) {
			return keyword + " " + expressionText[len(keyword):]
		}
	}
	return ""
}

func (p *Parser) parseErrorForInvalidName(nameDiagnostic *diagnostics.Message, blankDiagnostic *diagnostics.Message, tokenIfBlankName ast.Kind) {
	if p.token == tokenIfBlankName {
		p.parseErrorAtCurrentToken(blankDiagnostic)
	} else {
		p.parseErrorAtCurrentToken(nameDiagnostic, p.scanner.TokenValue())
	}
}

func (p *Parser) parseInterfaceDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	p.parseExpected(ast.KindInterfaceKeyword)
	name := p.parseIdentifier()
	typeParameters := p.parseTypeParameters()
	heritageClauses := p.parseHeritageClauses()
	members := p.parseObjectTypeMembers()
	result := p.factory.NewInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseTypeAliasDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	p.parseExpected(ast.KindTypeKeyword)
	if p.hasPrecedingLineBreak() {
		p.parseErrorAtCurrentToken(diagnostics.Line_break_not_permitted_here)
	}
	name := p.parseIdentifier()
	typeParameters := p.parseTypeParameters()
	p.parseExpected(ast.KindEqualsToken)
	var typeNode *ast.TypeNode
	if p.token == ast.KindIntrinsicKeyword && p.lookAhead((*Parser).nextIsNotDot) {
		typeNode = p.parseKeywordTypeNode()
	} else {
		typeNode = p.parseType()
	}
	p.parseSemicolon()
	result := p.factory.NewTypeAliasDeclaration(modifiers, name, typeParameters, typeNode)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) nextIsNotDot() bool {
	return p.nextToken() != ast.KindDotToken
}

// In an ambient declaration, the grammar only allows integer literals as initializers.
// In a non-ambient declaration, the grammar allows uninitialized members only in a
// ConstantEnumMemberSection, which starts at the beginning of an enum declaration
// or any time an integer literal initializer is encountered.
func (p *Parser) parseEnumMember() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	name := p.parsePropertyName()
	initializer := doInContext(p, ast.NodeFlagsDisallowInContext, false, (*Parser).parseInitializer)
	result := p.factory.NewEnumMember(name, initializer)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseEnumDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	p.parseExpected(ast.KindEnumKeyword)
	name := p.parseIdentifier()
	var members *ast.NodeList
	if p.parseExpected(ast.KindOpenBraceToken) {
		saveContextFlags := p.contextFlags
		p.setContextFlags(ast.NodeFlagsYieldContext|ast.NodeFlagsAwaitContext, false)
		members = p.parseDelimitedList(PCEnumMembers, (*Parser).parseEnumMember)
		p.contextFlags = saveContextFlags
		p.parseExpected(ast.KindCloseBraceToken)
	} else {
		members = p.parseEmptyNodeList()
	}
	result := p.factory.NewEnumDeclaration(modifiers, name, members)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return result
}

func (p *Parser) parseModuleDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Statement {
	keyword := ast.KindModuleKeyword
	if p.token == ast.KindGlobalKeyword {
		// global augmentation
		return p.parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiers)
	} else if p.parseOptional(ast.KindNamespaceKeyword) {
		keyword = ast.KindNamespaceKeyword
	} else {
		p.parseExpected(ast.KindModuleKeyword)
		if p.token == ast.KindStringLiteral {
			return p.parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiers)
		}
	}
	return p.parseModuleOrNamespaceDeclaration(pos, hasJSDoc, modifiers, false /*nested*/, keyword)
}

func (p *Parser) parseAmbientExternalModuleDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	var name *ast.Node
	keyword := ast.KindModuleKeyword
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	if p.token == ast.KindGlobalKeyword {
		// parse 'global' as name of global scope augmentation
		name = p.parseIdentifier()
		keyword = ast.KindGlobalKeyword
	} else {
		// parse string literal
		name = p.parseLiteralExpression(true /*intern*/)
	}
	var body *ast.Node
	if p.token == ast.KindOpenBraceToken {
		body = p.parseModuleBlock()
	} else {
		p.parseSemicolon()
	}
	result := p.factory.NewModuleDeclaration(modifiers, keyword, name, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return result
}

func (p *Parser) parseModuleBlock() *ast.Node {
	pos := p.nodePos()
	var statements *ast.NodeList
	if p.parseExpected(ast.KindOpenBraceToken) {
		statements = p.parseList(PCBlockStatements, (*Parser).parseStatement)
		p.parseExpected(ast.KindCloseBraceToken)
	} else {
		statements = p.parseEmptyNodeList()
	}
	result := p.factory.NewModuleBlock(statements)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseModuleOrNamespaceDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList, nested bool, keyword ast.Kind) *ast.Node {
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	var name *ast.Node
	if nested {
		name = p.parseIdentifierName()
	} else {
		name = p.parseIdentifier()
	}
	var body *ast.Node
	if p.parseOptional(ast.KindDotToken) {
		implicitExport := p.factory.NewModifier(ast.KindExportKeyword)
		implicitExport.Loc = core.NewTextRange(p.nodePos(), p.nodePos())
		implicitExport.Flags = ast.NodeFlagsReparsed
		nodes := p.nodeSlicePool.NewSlice(1)
		nodes[0] = implicitExport
		implicitModifiers := p.newModifierList(implicitExport.Loc, nodes)
		body = p.parseModuleOrNamespaceDeclaration(p.nodePos(), false /*hasJSDoc*/, implicitModifiers, true /*nested*/, keyword)
	} else {
		body = p.parseModuleBlock()
	}
	result := p.factory.NewModuleDeclaration(modifiers, keyword, name, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return result
}

func (p *Parser) parseImportDeclarationOrImportEqualsDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Statement {
	p.parseExpected(ast.KindImportKeyword)
	afterImportPos := p.nodePos()
	// We don't parse the identifier here in await context, instead we will report a grammar error in the checker.
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	var identifier *ast.Node
	if p.isIdentifier() {
		identifier = p.parseIdentifier()
	}
	isTypeOnly := false
	if identifier != nil && identifier.AsIdentifier().Text == "type" &&
		(p.token != ast.KindFromKeyword || p.isIdentifier() && p.lookAhead((*Parser).nextTokenIsFromKeywordOrEqualsToken)) &&
		(p.isIdentifier() || p.tokenAfterImportDefinitelyProducesImportDeclaration()) {
		isTypeOnly = true
		identifier = nil
		if p.isIdentifier() {
			identifier = p.parseIdentifier()
		}
	}
	if identifier != nil && !p.tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() {
		importEquals := p.parseImportEqualsDeclaration(pos, hasJSDoc, modifiers, identifier, isTypeOnly)
		p.statementHasAwaitIdentifier = saveHasAwaitIdentifier // Import= declaration is always parsed in an Await context, no need to reparse
		return importEquals
	}
	importClause := p.tryParseImportClause(identifier, afterImportPos, isTypeOnly, false /*skipJsDocLeadingAsterisks*/)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier // import clause is always parsed in an Await context
	moduleSpecifier := p.parseModuleSpecifier()
	attributes := p.tryParseImportAttributes()
	p.parseSemicolon()
	result := p.factory.NewImportDeclaration(modifiers, importClause, moduleSpecifier, attributes)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) nextTokenIsFromKeywordOrEqualsToken() bool {
	p.nextToken()
	return p.token == ast.KindFromKeyword || p.token == ast.KindEqualsToken
}

func (p *Parser) tokenAfterImportDefinitelyProducesImportDeclaration() bool {
	return p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBraceToken
}

func (p *Parser) tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() bool {
	// In `import id ___`, the current token decides whether to produce
	// an ImportDeclaration or ImportEqualsDeclaration.
	return p.token == ast.KindCommaToken || p.token == ast.KindFromKeyword
}

func (p *Parser) parseImportEqualsDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList, identifier *ast.Node, isTypeOnly bool) *ast.Node {
	p.parseExpected(ast.KindEqualsToken)
	moduleReference := p.parseModuleReference()
	p.parseSemicolon()
	result := p.factory.NewImportEqualsDeclaration(modifiers, isTypeOnly, identifier, moduleReference)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseModuleReference() *ast.Node {
	if p.token == ast.KindRequireKeyword && p.lookAhead((*Parser).nextTokenIsOpenParen) {
		return p.parseExternalModuleReference()
	}
	return p.parseEntityName(false /*allowReservedWords*/, nil /*diagnosticMessage*/)
}

func (p *Parser) parseExternalModuleReference() *ast.Node {
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	pos := p.nodePos()
	p.parseExpected(ast.KindRequireKeyword)
	p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseModuleSpecifier()
	p.parseExpected(ast.KindCloseParenToken)
	result := p.factory.NewExternalModuleReference(expression)
	p.finishNode(result, pos)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return result
}

func (p *Parser) parseModuleSpecifier() *ast.Expression {
	if p.token == ast.KindStringLiteral {
		result := p.parseLiteralExpression(true /*intern*/)
		return result
	}
	// We allow arbitrary expressions here, even though the grammar only allows string
	// literals.  We check to ensure that it is only a string literal later in the grammar
	// check pass.
	return p.parseExpression()
}

func (p *Parser) tryParseImportClause(identifier *ast.Node, pos int, isTypeOnly bool, skipJsDocLeadingAsterisks bool) *ast.Node {
	// ImportDeclaration:
	//  import ImportClause from ModuleSpecifier ;
	//  import ModuleSpecifier;
	if identifier != nil || p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBraceToken {
		importClause := p.parseImportClause(identifier, pos, isTypeOnly, skipJsDocLeadingAsterisks)
		p.parseExpected(ast.KindFromKeyword)
		return importClause
	}
	return nil
}

func (p *Parser) parseImportClause(identifier *ast.Node, pos int, isTypeOnly bool, skipJsDocLeadingAsterisks bool) *ast.Node {
	// ImportClause:
	//  ImportedDefaultBinding
	//  NameSpaceImport
	//  NamedImports
	//  ImportedDefaultBinding, NameSpaceImport
	//  ImportedDefaultBinding, NamedImports
	// If there was no default import or if there is comma token after default import
	// parse namespace or named imports
	var namedBindings *ast.Node
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	if identifier == nil || p.parseOptional(ast.KindCommaToken) {
		if skipJsDocLeadingAsterisks {
			p.scanner.SetSkipJsDocLeadingAsterisks(true)
		}
		if p.token == ast.KindAsteriskToken {
			namedBindings = p.parseNamespaceImport()
		} else {
			namedBindings = p.parseNamedImports()
		}
		if skipJsDocLeadingAsterisks {
			p.scanner.SetSkipJsDocLeadingAsterisks(false)
		}
	}
	result := p.factory.NewImportClause(isTypeOnly, identifier, namedBindings)
	p.finishNode(result, pos)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return result
}

func (p *Parser) parseNamespaceImport() *ast.Node {
	// NameSpaceImport:
	//  * as ImportedBinding
	pos := p.nodePos()
	p.parseExpected(ast.KindAsteriskToken)
	p.parseExpected(ast.KindAsKeyword)
	name := p.parseIdentifier()
	result := p.factory.NewNamespaceImport(name)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNamedImports() *ast.Node {
	pos := p.nodePos()
	// NamedImports:
	//  { }
	//  { ImportsList }
	//  { ImportsList, }
	imports := p.parseBracketedList(PCImportOrExportSpecifiers, (*Parser).parseImportSpecifier, ast.KindOpenBraceToken, ast.KindCloseBraceToken)
	result := p.factory.NewNamedImports(imports)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportSpecifier() *ast.Node {
	pos := p.nodePos()
	isTypeOnly, propertyName, name := p.parseImportOrExportSpecifier(ast.KindImportSpecifier)
	var identifierName *ast.Node
	if name.Kind == ast.KindIdentifier {
		identifierName = name
	} else {
		p.parseErrorAtRange(p.skipRangeTrivia(name.Loc), diagnostics.Identifier_expected)
		identifierName = p.newIdentifier("")
		p.finishNode(identifierName, name.Pos())
	}
	result := p.factory.NewImportSpecifier(isTypeOnly, propertyName, identifierName)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportOrExportSpecifier(kind ast.Kind) (isTypeOnly bool, propertyName *ast.Node, name *ast.Node) {
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
	disallowKeywords := kind == ast.KindImportSpecifier
	var nameOk bool
	name, nameOk = p.parseModuleExportName(disallowKeywords)
	if name.Kind == ast.KindIdentifier && name.AsIdentifier().Text == "type" {
		// If the first token of an import specifier is 'type', there are a lot of possibilities,
		// especially if we see 'as' afterwards:
		//
		// import { type } from "mod";          - isTypeOnly: false,   name: type
		// import { type as } from "mod";       - isTypeOnly: true,    name: as
		// import { type as as } from "mod";    - isTypeOnly: false,   name: as,    propertyName: type
		// import { type as as as } from "mod"; - isTypeOnly: true,    name: as,    propertyName: as
		if p.token == ast.KindAsKeyword {
			// { type as ...? }
			firstAs := p.parseIdentifierName()
			if p.token == ast.KindAsKeyword {
				// { type as as ...? }
				secondAs := p.parseIdentifierName()
				if p.canParseModuleExportName() {
					// { type as as something }
					// { type as as "something" }
					isTypeOnly = true
					propertyName = firstAs
					name, nameOk = p.parseModuleExportName(disallowKeywords)
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
				name, nameOk = p.parseModuleExportName(disallowKeywords)
			} else {
				// { type as }
				isTypeOnly = true
				name = firstAs
			}
		} else if p.canParseModuleExportName() {
			// { type something ...? }
			// { type "something" ...? }
			isTypeOnly = true
			name, nameOk = p.parseModuleExportName(disallowKeywords)
		}
	}
	if canParseAsKeyword && p.token == ast.KindAsKeyword {
		propertyName = name
		p.parseExpected(ast.KindAsKeyword)
		name, nameOk = p.parseModuleExportName(disallowKeywords)
	}

	if !nameOk {
		p.parseErrorAtRange(p.skipRangeTrivia(name.Loc), diagnostics.Identifier_expected)
	}

	return isTypeOnly, propertyName, name
}

func (p *Parser) canParseModuleExportName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindStringLiteral
}

func (p *Parser) parseModuleExportName(disallowKeywords bool) (node *ast.Node, nameOk bool) {
	nameOk = true

	if p.token == ast.KindStringLiteral {
		return p.parseLiteralExpression(false /*intern*/), nameOk
	}
	if disallowKeywords && isKeyword(p.token) && !p.isIdentifier() {
		nameOk = false
	}
	return p.parseIdentifierName(), nameOk
}

func (p *Parser) tryParseImportAttributes() *ast.Node {
	if (p.token == ast.KindWithKeyword || p.token == ast.KindAssertKeyword) && !p.hasPrecedingLineBreak() {
		return p.parseImportAttributes(p.token, false /*skipKeyword*/)
	}
	return nil
}

func (p *Parser) parseExportAssignment(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	saveContextFlags := p.contextFlags
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	p.setContextFlags(ast.NodeFlagsAwaitContext, true)
	isExportEquals := false
	if p.parseOptional(ast.KindEqualsToken) {
		isExportEquals = true
	} else {
		p.parseExpected(ast.KindDefaultKeyword)
	}
	expression := p.parseAssignmentExpressionOrHigher()
	p.parseSemicolon()
	p.contextFlags = saveContextFlags
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	result := p.factory.NewExportAssignment(modifiers, isExportEquals, expression)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseNamespaceExportDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	p.parseExpected(ast.KindAsKeyword)
	p.parseExpected(ast.KindNamespaceKeyword)
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	name := p.parseIdentifier()
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	p.parseSemicolon()
	// NamespaceExportDeclaration nodes cannot have decorators or modifiers, we attach them here so we can report them in the grammar checker
	result := p.factory.NewNamespaceExportDeclaration(modifiers, name)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseExportDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	saveContextFlags := p.contextFlags
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	p.setContextFlags(ast.NodeFlagsAwaitContext, true)
	var exportClause *ast.Node
	var moduleSpecifier *ast.Expression
	var attributes *ast.Node
	isTypeOnly := p.parseOptional(ast.KindTypeKeyword)
	namespaceExportPos := p.nodePos()
	if p.parseOptional(ast.KindAsteriskToken) {
		if p.parseOptional(ast.KindAsKeyword) {
			exportClause = p.parseNamespaceExport(namespaceExportPos)
		}
		p.parseExpected(ast.KindFromKeyword)
		moduleSpecifier = p.parseModuleSpecifier()
	} else {
		exportClause = p.parseNamedExports()
		// It is not uncommon to accidentally omit the 'from' keyword. Additionally, in editing scenarios,
		// the 'from' keyword can be parsed as a named export when the export clause is unterminated (i.e. `export { from "moduleName";`)
		// If we don't have a 'from' keyword, see if we have a string literal such that ASI won't take effect.
		if p.token == ast.KindFromKeyword || (p.token == ast.KindStringLiteral && !p.hasPrecedingLineBreak()) {
			p.parseExpected(ast.KindFromKeyword)
			moduleSpecifier = p.parseModuleSpecifier()
		}
	}
	if moduleSpecifier != nil && (p.token == ast.KindWithKeyword || p.token == ast.KindAssertKeyword) && !p.hasPrecedingLineBreak() {
		attributes = p.parseImportAttributes(p.token, false /*skipKeyword*/)
	}
	p.parseSemicolon()
	p.contextFlags = saveContextFlags
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	result := p.factory.NewExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseNamespaceExport(pos int) *ast.Node {
	exportName, _ := p.parseModuleExportName(false /*disallowKeywords*/)
	result := p.factory.NewNamespaceExport(exportName)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNamedExports() *ast.Node {
	pos := p.nodePos()
	// NamedImports:
	//  { }
	//  { ImportsList }
	//  { ImportsList, }
	exports := p.parseBracketedList(PCImportOrExportSpecifiers, (*Parser).parseExportSpecifier, ast.KindOpenBraceToken, ast.KindCloseBraceToken)
	result := p.factory.NewNamedExports(exports)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseExportSpecifier() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	isTypeOnly, propertyName, name := p.parseImportOrExportSpecifier(ast.KindExportSpecifier)
	result := p.factory.NewExportSpecifier(isTypeOnly, propertyName, name)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

// TYPES

func (p *Parser) parseType() *ast.TypeNode {
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsTypeExcludesFlags, false)
	var typeNode *ast.TypeNode
	if p.isStartOfFunctionTypeOrConstructorType() {
		typeNode = p.parseFunctionOrConstructorType()
	} else {
		pos := p.nodePos()
		typeNode = p.parseUnionTypeOrHigher()
		if !p.inDisallowConditionalTypesContext() && !p.hasPrecedingLineBreak() && p.parseOptional(ast.KindExtendsKeyword) {
			// The type following 'extends' is not permitted to be another conditional type
			extendsType := doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, true, (*Parser).parseType)
			p.parseExpected(ast.KindQuestionToken)
			trueType := doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseType)
			p.parseExpected(ast.KindColonToken)
			falseType := doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseType)
			conditionalType := p.factory.NewConditionalTypeNode(typeNode, extendsType, trueType, falseType)
			p.finishNode(conditionalType, pos)
			typeNode = conditionalType
		}
	}
	p.contextFlags = saveContextFlags
	return typeNode
}

func (p *Parser) parseUnionTypeOrHigher() *ast.TypeNode {
	return p.parseUnionOrIntersectionType(ast.KindBarToken, (*Parser).parseIntersectionTypeOrHigher)
}

func (p *Parser) parseIntersectionTypeOrHigher() *ast.TypeNode {
	return p.parseUnionOrIntersectionType(ast.KindAmpersandToken, (*Parser).parseTypeOperatorOrHigher)
}

func (p *Parser) parseUnionOrIntersectionType(operator ast.Kind, parseConstituentType func(p *Parser) *ast.TypeNode) *ast.TypeNode {
	pos := p.nodePos()
	isUnionType := operator == ast.KindBarToken
	hasLeadingOperator := p.parseOptional(operator)
	var typeNode *ast.TypeNode
	if hasLeadingOperator {
		typeNode = p.parseFunctionOrConstructorTypeToError(isUnionType, parseConstituentType)
	} else {
		typeNode = parseConstituentType(p)
	}
	if p.token == operator || hasLeadingOperator {
		types := p.nodeSlicePool.NewSlice(2)[:1]
		types[0] = typeNode
		for p.parseOptional(operator) {
			types = append(types, p.parseFunctionOrConstructorTypeToError(isUnionType, parseConstituentType))
		}
		typeNode = p.createUnionOrIntersectionTypeNode(operator, p.newNodeList(core.NewTextRange(pos, p.nodePos()), types))
		p.finishNode(typeNode, pos)
	}
	return typeNode
}

func (p *Parser) createUnionOrIntersectionTypeNode(operator ast.Kind, types *ast.NodeList) *ast.Node {
	switch operator {
	case ast.KindBarToken:
		return p.factory.NewUnionTypeNode(types)
	case ast.KindAmpersandToken:
		return p.factory.NewIntersectionTypeNode(types)
	default:
		panic("Unhandled case in createUnionOrIntersectionType")
	}
}

func (p *Parser) parseTypeOperatorOrHigher() *ast.TypeNode {
	operator := p.token
	switch operator {
	case ast.KindKeyOfKeyword, ast.KindUniqueKeyword, ast.KindReadonlyKeyword:
		return p.parseTypeOperator(operator)
	case ast.KindInferKeyword:
		return p.parseInferType()
	}
	return doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parsePostfixTypeOrHigher)
}

func (p *Parser) parseTypeOperator(operator ast.Kind) *ast.Node {
	pos := p.nodePos()
	p.parseExpected(operator)
	result := p.factory.NewTypeOperatorNode(operator, p.parseTypeOperatorOrHigher())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseInferType() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindInferKeyword)
	result := p.factory.NewInferTypeNode(p.parseTypeParameterOfInferType())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeParameterOfInferType() *ast.Node {
	pos := p.nodePos()
	name := p.parseIdentifier()
	constraint := p.tryParseConstraintOfInferType()
	result := p.factory.NewTypeParameterDeclaration(nil /*modifiers*/, name, constraint, nil /*defaultType*/)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) tryParseConstraintOfInferType() *ast.Node {
	state := p.mark()
	if p.parseOptional(ast.KindExtendsKeyword) {
		constraint := doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, true, (*Parser).parseType)
		if p.inDisallowConditionalTypesContext() || p.token != ast.KindQuestionToken {
			return constraint
		}
	}
	p.rewind(state)
	return nil
}

func (p *Parser) parsePostfixTypeOrHigher() *ast.Node {
	pos := p.nodePos()
	typeNode := p.parseNonArrayType()
	for !p.hasPrecedingLineBreak() {
		switch p.token {
		case ast.KindOpenBracketToken:
			p.parseExpected(ast.KindOpenBracketToken)
			if p.isStartOfType(false /*isStartOfParameter*/) {
				indexType := p.parseType()
				p.parseExpected(ast.KindCloseBracketToken)
				typeNode = p.factory.NewIndexedAccessTypeNode(typeNode, indexType)
				p.finishNode(typeNode, pos)
			} else {
				p.parseExpected(ast.KindCloseBracketToken)
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

func (p *Parser) parseNonArrayType() *ast.Node {
	switch p.token {
	case ast.KindAnyKeyword, ast.KindUnknownKeyword, ast.KindStringKeyword, ast.KindNumberKeyword, ast.KindBigIntKeyword,
		ast.KindSymbolKeyword, ast.KindBooleanKeyword, ast.KindUndefinedKeyword, ast.KindNeverKeyword, ast.KindObjectKeyword:
		state := p.mark()
		keywordTypeNode := p.parseKeywordTypeNode()
		// If these are followed by a dot then parse these out as a dotted type reference instead
		if p.token != ast.KindDotToken {
			return keywordTypeNode
		}
		p.rewind(state)
		return p.parseTypeReference()
	case ast.KindAsteriskEqualsToken:
		// If there is '*=', treat it as * followed by postfix =
		p.scanner.ReScanAsteriskEqualsToken()
		fallthrough
	case ast.KindAsteriskToken:
		return p.parseJSDocAllType()
	case ast.KindQuestionQuestionToken:
		// If there is '??', treat it as prefix-'?' in JSDoc type.
		p.scanner.ReScanQuestionToken()
		fallthrough
	case ast.KindQuestionToken:
		return p.parseJSDocNullableType()
	case ast.KindExclamationToken:
		return p.parseJSDocNonNullableType()
	case ast.KindNoSubstitutionTemplateLiteral, ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindTrueKeyword,
		ast.KindFalseKeyword, ast.KindNullKeyword:
		return p.parseLiteralTypeNode(false /*negative*/)
	case ast.KindMinusToken:
		if p.lookAhead((*Parser).nextTokenIsNumericOrBigIntLiteral) {
			return p.parseLiteralTypeNode(true /*negative*/)
		}
		return p.parseTypeReference()
	case ast.KindVoidKeyword:
		return p.parseKeywordTypeNode()
	case ast.KindThisKeyword:
		thisKeyword := p.parseThisTypeNode()
		if p.token == ast.KindIsKeyword && !p.hasPrecedingLineBreak() {
			return p.parseThisTypePredicate(thisKeyword)
		}
		return thisKeyword
	case ast.KindTypeOfKeyword:
		if p.lookAhead((*Parser).nextIsStartOfTypeOfImportType) {
			return p.parseImportType()
		}
		return p.parseTypeQuery()
	case ast.KindOpenBraceToken:
		if p.lookAhead((*Parser).nextIsStartOfMappedType) {
			return p.parseMappedType()
		}
		return p.parseTypeLiteral()
	case ast.KindOpenBracketToken:
		return p.parseTupleType()
	case ast.KindOpenParenToken:
		return p.parseParenthesizedType()
	case ast.KindImportKeyword:
		return p.parseImportType()
	case ast.KindAssertsKeyword:
		if p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOnSameLine) {
			return p.parseAssertsTypePredicate()
		}
		return p.parseTypeReference()
	case ast.KindTemplateHead:
		return p.parseTemplateType()
	default:
		return p.parseTypeReference()
	}
}

func (p *Parser) parseKeywordTypeNode() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewKeywordTypeNode(p.token)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseThisTypeNode() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewThisTypeNode()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseThisTypePredicate(lhs *ast.Node) *ast.Node {
	p.nextToken()
	result := p.factory.NewTypePredicateNode(nil /*assertsModifier*/, lhs, p.parseType())
	p.finishNode(result, lhs.Pos())
	return result
}

func (p *Parser) parseJSDocAllType() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewJSDocAllType()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJSDocNonNullableType() *ast.TypeNode {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewJSDocNonNullableType(p.parseNonArrayType())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJSDocNullableType() *ast.Node {
	pos := p.nodePos()
	// skip the ?
	p.nextToken()
	result := p.factory.NewJSDocNullableType(p.parseType())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJSDocType() *ast.TypeNode {
	p.scanner.SetSkipJsDocLeadingAsterisks(true)
	pos := p.nodePos()

	hasDotDotDot := p.parseOptional(ast.KindDotDotDotToken)
	t := p.parseTypeOrTypePredicate()
	p.scanner.SetSkipJsDocLeadingAsterisks(false)
	if hasDotDotDot {
		t = p.factory.NewJSDocVariadicType(t)
		p.finishNode(t, pos)
	}
	if p.token == ast.KindEqualsToken {
		p.nextToken()
		result := p.factory.NewJSDocOptionalType(t)
		p.finishNode(result, pos)
		return result
	}
	return t
}

func (p *Parser) parseLiteralTypeNode(negative bool) *ast.Node {
	pos := p.nodePos()
	if negative {
		p.nextToken()
	}
	var expression *ast.Expression
	if p.token == ast.KindTrueKeyword || p.token == ast.KindFalseKeyword || p.token == ast.KindNullKeyword {
		expression = p.parseKeywordExpression()
	} else {
		expression = p.parseLiteralExpression(false /*intern*/)
	}
	if negative {
		expression = p.factory.NewPrefixUnaryExpression(ast.KindMinusToken, expression)
		p.finishNode(expression, pos)
	}
	result := p.factory.NewLiteralTypeNode(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeReference() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewTypeReferenceNode(p.parseEntityNameOfTypeReference(), p.parseTypeArgumentsOfTypeReference())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseEntityNameOfTypeReference() *ast.Node {
	return p.parseEntityName(true /*allowReservedWords*/, diagnostics.Type_expected)
}

func (p *Parser) parseEntityName(allowReservedWords bool, diagnosticMessage *diagnostics.Message) *ast.Node {
	pos := p.nodePos()
	var entity *ast.Node
	if allowReservedWords {
		entity = p.parseIdentifierNameWithDiagnostic(diagnosticMessage)
	} else {
		entity = p.parseIdentifierWithDiagnostic(diagnosticMessage, nil)
	}
	for p.parseOptional(ast.KindDotToken) {
		if p.token == ast.KindLessThanToken {
			// The entity is part of a JSDoc-style generic. We will use the gap between `typeName` and
			// `typeArguments` to report it as a grammar error in the checker.
			break
		}
		entity = p.factory.NewQualifiedName(entity, p.parseRightSideOfDot(allowReservedWords, false /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/))
		p.finishNode(entity, pos)
	}
	return entity
}

func (p *Parser) parseRightSideOfDot(allowIdentifierNames bool, allowPrivateIdentifiers bool, allowUnicodeEscapeSequenceInIdentifierName bool) *ast.Node {
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
	if p.hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(p.token) && p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOnSameLine) {
		// Report that we need an identifier.  However, report it right after the dot,
		// and not on the next token.  This is because the next token might actually
		// be an identifier and the error would be quite confusing.
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Identifier_expected)
		return p.createMissingIdentifier()
	}
	if p.token == ast.KindPrivateIdentifier {
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
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	id := p.parseIdentifier()
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return id
}

func (p *Parser) newIdentifier(text string) *ast.Node {
	p.identifierCount++
	id := p.factory.NewIdentifier(text)
	if text == "await" {
		p.statementHasAwaitIdentifier = true
	}
	return id
}

func (p *Parser) createMissingIdentifier() *ast.Node {
	result := p.newIdentifier("")
	p.finishNode(result, p.nodePos())
	return result
}

func (p *Parser) parsePrivateIdentifier() *ast.Node {
	pos := p.nodePos()
	text := p.scanner.TokenValue()
	p.nextToken()
	result := p.factory.NewPrivateIdentifier(p.internIdentifier(text))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) reScanLessThanToken() ast.Kind {
	p.token = p.scanner.ReScanLessThanToken()
	return p.token
}

func (p *Parser) reScanGreaterThanToken() ast.Kind {
	p.token = p.scanner.ReScanGreaterThanToken()
	return p.token
}

func (p *Parser) reScanSlashToken() ast.Kind {
	p.token = p.scanner.ReScanSlashToken()
	return p.token
}

func (p *Parser) reScanTemplateToken(isTaggedTemplate bool) ast.Kind {
	p.token = p.scanner.ReScanTemplateToken(isTaggedTemplate)
	return p.token
}

func (p *Parser) parseTypeArgumentsOfTypeReference() *ast.NodeList {
	if !p.hasPrecedingLineBreak() && p.reScanLessThanToken() == ast.KindLessThanToken {
		return p.parseTypeArguments()
	}
	return nil
}

func (p *Parser) parseTypeArguments() *ast.NodeList {
	if p.token == ast.KindLessThanToken {
		return p.parseBracketedList(PCTypeArguments, (*Parser).parseType, ast.KindLessThanToken, ast.KindGreaterThanToken)
	}
	return nil
}

func (p *Parser) nextIsStartOfTypeOfImportType() bool {
	p.nextToken()
	return p.token == ast.KindImportKeyword
}

func (p *Parser) parseImportType() *ast.Node {
	p.sourceFlags |= ast.NodeFlagsPossiblyContainsDynamicImport
	pos := p.nodePos()
	isTypeOf := p.parseOptional(ast.KindTypeOfKeyword)
	p.parseExpected(ast.KindImportKeyword)
	p.parseExpected(ast.KindOpenParenToken)
	typeNode := p.parseType()
	var attributes *ast.Node
	if p.parseOptional(ast.KindCommaToken) {
		openBracePosition := p.scanner.TokenStart()
		p.parseExpected(ast.KindOpenBraceToken)
		currentToken := p.token
		if currentToken == ast.KindWithKeyword || currentToken == ast.KindAssertKeyword {
			p.nextToken()
		} else {
			p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindWithKeyword))
		}
		p.parseExpected(ast.KindColonToken)
		attributes = p.parseImportAttributes(currentToken, true /*skipKeyword*/)
		if !p.parseExpected(ast.KindCloseBraceToken) {
			if len(p.diagnostics) != 0 {
				lastDiagnostic := p.diagnostics[len(p.diagnostics)-1]
				if lastDiagnostic.Code() == diagnostics.X_0_expected.Code() {
					related := ast.NewDiagnostic(nil, core.NewTextRange(openBracePosition, openBracePosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
					lastDiagnostic.AddRelatedInfo(related)
				}
			}
		}
	}
	p.parseExpected(ast.KindCloseParenToken)
	var qualifier *ast.Node
	if p.parseOptional(ast.KindDotToken) {
		qualifier = p.parseEntityNameOfTypeReference()
	}
	typeArguments := p.parseTypeArgumentsOfTypeReference()
	result := p.factory.NewImportTypeNode(isTypeOf, typeNode, attributes, qualifier, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportAttribute() *ast.Node {
	pos := p.nodePos()
	var name *ast.Node
	if tokenIsIdentifierOrKeyword(p.token) {
		name = p.parseIdentifierName()
	} else if p.token == ast.KindStringLiteral {
		name = p.parseLiteralExpression(false /*intern*/)
	}
	if name != nil {
		p.parseExpected(ast.KindColonToken)
	} else {
		p.parseErrorAtCurrentToken(diagnostics.Identifier_or_string_literal_expected)
	}
	value := p.parseAssignmentExpressionOrHigher()
	result := p.factory.NewImportAttribute(name, value)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseImportAttributes(token ast.Kind, skipKeyword bool) *ast.Node {
	pos := p.nodePos()
	if !skipKeyword {
		p.parseExpected(token)
	}
	var elements *ast.NodeList
	var multiLine bool
	openBracePosition := p.scanner.TokenStart()
	if p.parseExpected(ast.KindOpenBraceToken) {
		multiLine = p.hasPrecedingLineBreak()
		elements = p.parseDelimitedList(PCImportAttributes, (*Parser).parseImportAttribute)
		if !p.parseExpected(ast.KindCloseBraceToken) {
			if len(p.diagnostics) != 0 {
				lastDiagnostic := p.diagnostics[len(p.diagnostics)-1]
				if lastDiagnostic.Code() == diagnostics.X_0_expected.Code() {
					related := ast.NewDiagnostic(nil, core.NewTextRange(openBracePosition, openBracePosition+1), diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
					lastDiagnostic.AddRelatedInfo(related)
				}
			}
		}
	} else {
		elements = p.parseEmptyNodeList()
	}
	result := p.factory.NewImportAttributes(token, elements, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeQuery() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindTypeOfKeyword)
	entityName := p.parseEntityName(true /*allowReservedWords*/, nil)
	// Make sure we perform ASI to prevent parsing the next line's type arguments as part of an instantiation expression
	var typeArguments *ast.NodeList
	if !p.hasPrecedingLineBreak() {
		typeArguments = p.parseTypeArguments()
	}
	result := p.factory.NewTypeQueryNode(entityName, typeArguments)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) nextIsStartOfMappedType() bool {
	p.nextToken()
	if p.token == ast.KindPlusToken || p.token == ast.KindMinusToken {
		return p.nextToken() == ast.KindReadonlyKeyword
	}
	if p.token == ast.KindReadonlyKeyword {
		p.nextToken()
	}
	return p.token == ast.KindOpenBracketToken && p.nextTokenIsIdentifier() && p.nextToken() == ast.KindInKeyword
}

func (p *Parser) parseMappedType() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenBraceToken)
	var readonlyToken *ast.Node // ReadonlyKeyword | PlusToken | MinusToken
	if p.token == ast.KindReadonlyKeyword || p.token == ast.KindPlusToken || p.token == ast.KindMinusToken {
		readonlyToken = p.parseTokenNode()
		if readonlyToken.Kind != ast.KindReadonlyKeyword {
			p.parseExpected(ast.KindReadonlyKeyword)
		}
	}
	p.parseExpected(ast.KindOpenBracketToken)
	typeParameter := p.parseMappedTypeParameter()
	var nameType *ast.TypeNode
	if p.parseOptional(ast.KindAsKeyword) {
		nameType = p.parseType()
	}
	p.parseExpected(ast.KindCloseBracketToken)
	var questionToken *ast.Node // QuestionToken | PlusToken | MinusToken
	if p.token == ast.KindQuestionToken || p.token == ast.KindPlusToken || p.token == ast.KindMinusToken {
		questionToken = p.parseTokenNode()
		if questionToken.Kind != ast.KindQuestionToken {
			p.parseExpected(ast.KindQuestionToken)
		}
	}
	typeNode := p.parseTypeAnnotation()
	p.parseSemicolon()
	members := p.parseList(PCTypeMembers, (*Parser).parseTypeMember)
	p.parseExpected(ast.KindCloseBraceToken)
	result := p.factory.NewMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, typeNode, members)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseMappedTypeParameter() *ast.Node {
	pos := p.nodePos()
	name := p.parseIdentifierName()
	p.parseExpected(ast.KindInKeyword)
	typeNode := p.parseType()
	result := p.factory.NewTypeParameterDeclaration(nil /*modifiers*/, name, typeNode, nil /*defaultType*/)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeMember() *ast.Node {
	if p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken {
		return p.parseSignatureMember(ast.KindCallSignature)
	}
	if p.token == ast.KindNewKeyword && p.lookAhead((*Parser).nextTokenIsOpenParenOrLessThan) {
		return p.parseSignatureMember(ast.KindConstructSignature)
	}
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiers()
	if p.parseContextualModifier(ast.KindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindGetAccessor, ParseFlagsType)
	}
	if p.parseContextualModifier(ast.KindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindSetAccessor, ParseFlagsType)
	}
	if p.isIndexSignature() {
		return p.parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers)
	}
	return p.parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers)
}

func (p *Parser) nextTokenIsOpenParenOrLessThan() bool {
	p.nextToken()
	return p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken
}

func (p *Parser) parseSignatureMember(kind ast.Kind) *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	if kind == ast.KindConstructSignature {
		p.parseExpected(ast.KindNewKeyword)
	}
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsType)
	typeNode := p.parseReturnType(ast.KindColonToken /*isType*/, true)
	p.parseTypeMemberSemicolon()
	var result *ast.Node
	if kind == ast.KindCallSignature {
		result = p.factory.NewCallSignatureDeclaration(typeParameters, parameters, typeNode)
	} else {
		result = p.factory.NewConstructSignatureDeclaration(typeParameters, parameters, typeNode)
	}
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseTypeParameters() *ast.NodeList {
	if p.token == ast.KindLessThanToken {
		return p.parseBracketedList(PCTypeParameters, (*Parser).parseTypeParameter, ast.KindLessThanToken, ast.KindGreaterThanToken)
	}
	return nil
}

func (p *Parser) parseTypeParameter() *ast.Node {
	pos := p.nodePos()
	modifiers := p.parseModifiersEx(false /*allowDecorators*/, true /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	name := p.parseIdentifier()
	var constraint *ast.TypeNode
	var expression *ast.Expression
	if p.parseOptional(ast.KindExtendsKeyword) {
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
	var defaultType *ast.TypeNode
	if p.parseOptional(ast.KindEqualsToken) {
		defaultType = p.parseType()
	}
	result := p.factory.NewTypeParameterDeclaration(modifiers, name, constraint, defaultType)
	result.AsTypeParameter().Expression = expression
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseParameters(flags ParseFlags) *ast.NodeList {
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
	if p.parseExpected(ast.KindOpenParenToken) {
		parameters := p.parseParametersWorker(flags, true /*allowAmbiguity*/)
		p.parseExpected(ast.KindCloseParenToken)
		return parameters
	}
	return p.parseEmptyNodeList()
}

func (p *Parser) parseParametersWorker(flags ParseFlags, allowAmbiguity bool) *ast.NodeList {
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
	inAwaitContext := p.contextFlags&ast.NodeFlagsAwaitContext != 0
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsYieldContext, flags&ParseFlagsYield != 0)
	p.setContextFlags(ast.NodeFlagsAwaitContext, flags&ParseFlagsAwait != 0)
	parameters := p.parseDelimitedList(PCParameters, func(p *Parser) *ast.Node {
		return p.parseParameterEx(inAwaitContext, allowAmbiguity)
	})
	p.contextFlags = saveContextFlags
	return parameters
}

func (p *Parser) parseParameter() *ast.Node {
	return p.parseParameterEx(false /*inOuterAwaitContext*/, true /*allowAmbiguity*/)
}

func (p *Parser) parseParameterEx(inOuterAwaitContext bool, allowAmbiguity bool) *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	// FormalParameter [Yield,Await]:
	//      BindingElement[?Yield,?Await]
	// Decorators are parsed in the outer [Await] context, the rest of the parameter is parsed in the function's [Await] context.
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsAwaitContext, inOuterAwaitContext)
	modifiers := p.parseModifiersEx(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	p.contextFlags = saveContextFlags
	if p.token == ast.KindThisKeyword {
		result := p.factory.NewParameterDeclaration(
			modifiers,
			nil, /*dotDotDotToken*/
			p.createIdentifier(true /*isIdentifier*/),
			nil, /*questionToken*/
			p.parseTypeAnnotation(),
			nil /*initializer*/)
		if modifiers != nil {
			p.parseErrorAtRange(modifiers.Nodes[0].Loc, diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters)
		}
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}
	dotDotDotToken := p.parseOptionalToken(ast.KindDotDotDotToken)
	if !allowAmbiguity && !p.isParameterNameStart() {
		return nil
	}
	result := p.factory.NewParameterDeclaration(
		modifiers,
		dotDotDotToken,
		p.parseNameOfParameter(modifiers),
		p.parseOptionalToken(ast.KindQuestionToken),
		p.parseTypeAnnotation(),
		p.parseInitializer())
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) isParameterNameStart() bool {
	// Be permissive about await and yield by calling isBindingIdentifier instead of isIdentifier; disallowing
	// them during a speculative parse leads to many more follow-on errors than allowing the function to parse then later
	// complaining about the use of the keywords.
	return p.isBindingIdentifier() || p.token == ast.KindOpenBracketToken || p.token == ast.KindOpenBraceToken
}

func (p *Parser) parseNameOfParameter(modifiers *ast.ModifierList) *ast.Node {
	// FormalParameter [Yield,Await]:
	//      BindingElement[?Yield,?Await]
	name := p.parseIdentifierOrPatternWithDiagnostic(diagnostics.Private_identifiers_cannot_be_used_as_parameters)
	if name.Loc.Len() == 0 && modifiers == nil && ast.IsModifierKind(p.token) {
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

func (p *Parser) parseReturnType(returnToken ast.Kind, isType bool) *ast.TypeNode {
	if p.shouldParseReturnType(returnToken, isType) {
		return doInContext(p, ast.NodeFlagsDisallowConditionalTypesContext, false, (*Parser).parseTypeOrTypePredicate)
	}
	return nil
}

func (p *Parser) shouldParseReturnType(returnToken ast.Kind, isType bool) bool {
	if returnToken == ast.KindEqualsGreaterThanToken {
		p.parseExpected(returnToken)
		return true
	} else if p.parseOptional(ast.KindColonToken) {
		return true
	} else if isType && p.token == ast.KindEqualsGreaterThanToken {
		// This is easy to get backward, especially in type contexts, so parse the type anyway
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindColonToken))
		p.nextToken()
		return true
	}
	return false
}

func (p *Parser) parseTypeOrTypePredicate() *ast.TypeNode {
	if p.isIdentifier() {
		state := p.mark()
		pos := p.nodePos()
		id := p.parseIdentifier()
		if p.token == ast.KindIsKeyword && !p.hasPrecedingLineBreak() {
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
	if p.parseOptional(ast.KindCommaToken) {
		return
	}
	// Didn't have a comma.  We must have a (possible ASI) semicolon.
	p.parseSemicolon()
}

func (p *Parser) parseAccessorDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList, kind ast.Kind, flags ParseFlags) *ast.Node {
	name := p.parsePropertyName()
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsNone)
	returnType := p.parseReturnType(ast.KindColonToken, false /*isType*/)
	body := p.parseFunctionBlockOrSemicolon(flags, nil /*diagnosticMessage*/)
	var result *ast.Node
	// Keep track of `typeParameters` (for both) and `type` (for setters) if they were parsed those indicate grammar errors
	if kind == ast.KindGetAccessor {
		result = p.factory.NewGetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body)
	} else {
		result = p.factory.NewSetAccessorDeclaration(modifiers, name, typeParameters, parameters, returnType, body)
	}
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parsePropertyName() *ast.Node {
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	prop := p.parsePropertyNameWorker(true /*allowComputedPropertyNames*/)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return prop
}

func (p *Parser) parsePropertyNameWorker(allowComputedPropertyNames bool) *ast.Node {
	if p.token == ast.KindStringLiteral || p.token == ast.KindNumericLiteral || p.token == ast.KindBigIntLiteral {
		literal := p.parseLiteralExpression(true /*intern*/)
		return literal
	}
	if allowComputedPropertyNames && p.token == ast.KindOpenBracketToken {
		return p.parseComputedPropertyName()
	}
	if p.token == ast.KindPrivateIdentifier {
		return p.parsePrivateIdentifier()
	}
	return p.parseIdentifierName()
}

func (p *Parser) parseComputedPropertyName() *ast.Node {
	// PropertyName [Yield]:
	//      LiteralPropertyName
	//      ComputedPropertyName[?Yield]
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenBracketToken)
	// We parse any expression (including a comma expression). But the grammar
	// says that only an assignment expression is allowed, so the grammar checker
	// will error if it sees a comma expression.
	expression := p.parseExpressionAllowIn()
	p.parseExpected(ast.KindCloseBracketToken)
	result := p.factory.NewComputedPropertyName(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseFunctionBlockOrSemicolon(flags ParseFlags, diagnosticMessage *diagnostics.Message) *ast.Node {
	if p.token != ast.KindOpenBraceToken {
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

func (p *Parser) parseFunctionBlock(flags ParseFlags, diagnosticMessage *diagnostics.Message) *ast.Node {
	saveContextFlags := p.contextFlags
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	p.setContextFlags(ast.NodeFlagsYieldContext, flags&ParseFlagsYield != 0)
	p.setContextFlags(ast.NodeFlagsAwaitContext, flags&ParseFlagsAwait != 0)
	// We may be in a [Decorator] context when parsing a function expression or
	// arrow function. The body of the function is not in [Decorator] context.
	p.setContextFlags(ast.NodeFlagsDecoratorContext, false)
	block := p.parseBlock(flags&ParseFlagsIgnoreMissingOpenBrace != 0, diagnosticMessage)
	p.contextFlags = saveContextFlags
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return block
}

func (p *Parser) isIndexSignature() bool {
	return p.token == ast.KindOpenBracketToken && p.lookAhead((*Parser).nextIsUnambiguouslyIndexSignature)
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
	if p.token == ast.KindDotDotDotToken || p.token == ast.KindCloseBracketToken {
		return true
	}
	if ast.IsModifierKind(p.token) {
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
	if p.token == ast.KindColonToken || p.token == ast.KindCommaToken {
		return true
	}
	// Question mark could be an indexer with an optional property,
	// or it could be a conditional expression in a computed property.
	if p.token != ast.KindQuestionToken {
		return false
	}
	// If any of the following tokens are after the question mark, it cannot
	// be a conditional expression, so treat it as an indexer.
	p.nextToken()
	return p.token == ast.KindColonToken || p.token == ast.KindCommaToken || p.token == ast.KindCloseBracketToken
}

func (p *Parser) parseIndexSignatureDeclaration(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	parameters := p.parseBracketedList(PCParameters, (*Parser).parseParameter, ast.KindOpenBracketToken, ast.KindCloseBracketToken)
	typeNode := p.parseTypeAnnotation()
	p.parseTypeMemberSemicolon()
	result := p.factory.NewIndexSignatureDeclaration(modifiers, parameters, typeNode)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parsePropertyOrMethodSignature(pos int, hasJSDoc bool, modifiers *ast.ModifierList) *ast.Node {
	name := p.parsePropertyName()
	questionToken := p.parseOptionalToken(ast.KindQuestionToken)
	var result *ast.Node
	if p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken {
		// Method signatures don't exist in expression contexts.  So they have neither
		// [Yield] nor [Await]
		typeParameters := p.parseTypeParameters()
		parameters := p.parseParameters(ParseFlagsType)
		returnType := p.parseReturnType(ast.KindColonToken /*isType*/, true)
		result = p.factory.NewMethodSignatureDeclaration(modifiers, name, questionToken, typeParameters, parameters, returnType)
	} else {
		typeNode := p.parseTypeAnnotation()
		// Although type literal properties cannot not have initializers, we attempt
		// to parse an initializer so we can report in the checker that an interface
		// property or type literal property cannot have an initializer.
		var initializer *ast.Expression
		if p.token == ast.KindEqualsToken {
			initializer = p.parseInitializer()
		}
		result = p.factory.NewPropertySignatureDeclaration(modifiers, name, questionToken, typeNode, initializer)
	}
	p.parseTypeMemberSemicolon()
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseTypeLiteral() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewTypeLiteralNode(p.parseObjectTypeMembers())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectTypeMembers() *ast.NodeList {
	if p.parseExpected(ast.KindOpenBraceToken) {
		members := p.parseList(PCTypeMembers, (*Parser).parseTypeMember)
		p.parseExpected(ast.KindCloseBraceToken)
		return members
	}
	return p.parseEmptyNodeList()
}

func (p *Parser) parseTupleType() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewTupleTypeNode(p.parseBracketedList(PCTupleElementTypes, (*Parser).parseTupleElementNameOrTupleElementType, ast.KindOpenBracketToken, ast.KindCloseBracketToken))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTupleElementNameOrTupleElementType() *ast.Node {
	if p.lookAhead((*Parser).scanStartOfNamedTupleElement) {
		pos := p.nodePos()
		hasJSDoc := p.hasPrecedingJSDocComment()
		dotDotDotToken := p.parseOptionalToken(ast.KindDotDotDotToken)
		name := p.parseIdentifierName()
		questionToken := p.parseOptionalToken(ast.KindQuestionToken)
		p.parseExpected(ast.KindColonToken)
		typeNode := p.parseTupleElementType()
		result := p.factory.NewNamedTupleMember(dotDotDotToken, name, questionToken, typeNode)
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}
	return p.parseTupleElementType()
}

func (p *Parser) scanStartOfNamedTupleElement() bool {
	if p.token == ast.KindDotDotDotToken {
		return tokenIsIdentifierOrKeyword(p.nextToken()) && p.nextTokenIsColonOrQuestionColon()
	}
	return tokenIsIdentifierOrKeyword(p.token) && p.nextTokenIsColonOrQuestionColon()
}

func (p *Parser) nextTokenIsColonOrQuestionColon() bool {
	return p.nextToken() == ast.KindColonToken || p.token == ast.KindQuestionToken && p.nextToken() == ast.KindColonToken
}

func (p *Parser) parseTupleElementType() *ast.TypeNode {
	pos := p.nodePos()
	if p.parseOptional(ast.KindDotDotDotToken) {
		result := p.factory.NewRestTypeNode(p.parseType())
		p.finishNode(result, pos)
		return result
	}
	typeNode := p.parseType()
	// If next token is start of a type we have a conditional type and not an optional type
	if p.token == ast.KindQuestionToken && !p.lookAhead((*Parser).nextIsStartOfType) {
		p.nextToken()
		typeNode = p.factory.NewOptionalTypeNode(typeNode)
		p.finishNode(typeNode, pos)
	}
	return typeNode
}

func (p *Parser) parseParenthesizedType() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenParenToken)
	typeNode := p.parseType()
	p.parseExpected(ast.KindCloseParenToken)
	result := p.factory.NewParenthesizedTypeNode(typeNode)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseAssertsTypePredicate() *ast.TypeNode {
	pos := p.nodePos()
	assertsModifier := p.parseExpectedToken(ast.KindAssertsKeyword)
	var parameterName *ast.Node
	if p.token == ast.KindThisKeyword {
		parameterName = p.parseThisTypeNode()
	} else {
		parameterName = p.parseIdentifier()
	}
	var typeNode *ast.TypeNode
	if p.parseOptional(ast.KindIsKeyword) {
		typeNode = p.parseType()
	}
	result := p.factory.NewTypePredicateNode(assertsModifier, parameterName, typeNode)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateType() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewTemplateLiteralTypeNode(p.parseTemplateHead(false /*isTaggedTemplate*/), p.parseTemplateTypeSpans())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateHead(isTaggedTemplate bool) *ast.Node {
	if !isTaggedTemplate && p.scanner.TokenFlags()&ast.TokenFlagsIsInvalid != 0 {
		p.reScanTemplateToken(false /*isTaggedTemplate*/)
	}
	pos := p.nodePos()
	result := p.factory.NewTemplateHead(p.scanner.TokenValue(), p.getTemplateLiteralRawText(2 /*endLength*/), p.scanner.TokenFlags()&ast.TokenFlagsTemplateLiteralLikeFlags)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) getTemplateLiteralRawText(endLength int) string {
	tokenText := p.scanner.TokenText()
	if p.scanner.TokenFlags()&ast.TokenFlagsUnterminated != 0 {
		endLength = 0
	}
	return tokenText[1 : len(tokenText)-endLength]
}

func (p *Parser) parseTemplateTypeSpans() *ast.NodeList {
	pos := p.nodePos()
	var list []*ast.Node
	for {
		span := p.parseTemplateTypeSpan()
		list = append(list, span)
		if span.AsTemplateLiteralTypeSpan().Literal.Kind != ast.KindTemplateMiddle {
			break
		}
	}
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), list)
}

func (p *Parser) parseTemplateTypeSpan() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewTemplateLiteralTypeSpan(p.parseType(), p.parseLiteralOfTemplateSpan(false /*isTaggedTemplate*/))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLiteralOfTemplateSpan(isTaggedTemplate bool) *ast.Node {
	if p.token == ast.KindCloseBraceToken {
		p.reScanTemplateToken(isTaggedTemplate)
		return p.parseTemplateMiddleOrTail()
	}
	p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindCloseBraceToken))
	result := p.factory.NewTemplateTail("", "", ast.TokenFlagsNone)
	p.finishNode(result, p.nodePos())
	return result
}

func (p *Parser) parseTemplateMiddleOrTail() *ast.Node {
	pos := p.nodePos()
	var result *ast.Node
	if p.token == ast.KindTemplateMiddle {
		result = p.factory.NewTemplateMiddle(p.scanner.TokenValue(), p.getTemplateLiteralRawText(2 /*endLength*/), p.scanner.TokenFlags()&ast.TokenFlagsTemplateLiteralLikeFlags)
	} else {
		result = p.factory.NewTemplateTail(p.scanner.TokenValue(), p.getTemplateLiteralRawText(1 /*endLength*/), p.scanner.TokenFlags()&ast.TokenFlagsTemplateLiteralLikeFlags)
	}
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseFunctionOrConstructorTypeToError(isInUnionType bool, parseConstituentType func(p *Parser) *ast.TypeNode) *ast.TypeNode {
	// the function type and constructor type shorthand notation
	// are not allowed directly in unions and intersections, but we'll
	// try to parse them gracefully and issue a helpful message.
	if p.isStartOfFunctionTypeOrConstructorType() {
		typeNode := p.parseFunctionOrConstructorType()
		var diagnostic *diagnostics.Message
		if typeNode.Kind == ast.KindFunctionType {
			diagnostic = core.IfElse(isInUnionType,
				diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type,
				diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type)
		} else {
			diagnostic = core.IfElse(isInUnionType,
				diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type,
				diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type)
		}
		p.parseErrorAtRange(typeNode.Loc, diagnostic)
		return typeNode
	}
	return parseConstituentType(p)
}

func (p *Parser) isStartOfFunctionTypeOrConstructorType() bool {
	return p.token == ast.KindLessThanToken ||
		p.token == ast.KindOpenParenToken && p.lookAhead((*Parser).nextIsUnambiguouslyStartOfFunctionType) ||
		p.token == ast.KindNewKeyword ||
		p.token == ast.KindAbstractKeyword && p.lookAhead((*Parser).nextTokenIsNewKeyword)
}

func (p *Parser) parseFunctionOrConstructorType() *ast.TypeNode {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersForConstructorType()
	isConstructorType := p.parseOptional(ast.KindNewKeyword)
	// Debug.assert(!modifiers || isConstructorType, "Per isStartOfFunctionOrConstructorType, a function type cannot have modifiers.")
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(ParseFlagsType)
	returnType := p.parseReturnType(ast.KindEqualsGreaterThanToken, false /*isType*/)
	var result *ast.TypeNode
	if isConstructorType {
		result = p.factory.NewConstructorTypeNode(modifiers, typeParameters, parameters, returnType)
	} else {
		result = p.factory.NewFunctionTypeNode(typeParameters, parameters, returnType)
	}
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseModifiersForConstructorType() *ast.ModifierList {
	if p.token == ast.KindAbstractKeyword {
		pos := p.nodePos()
		modifier := p.factory.NewModifier(p.token)
		p.nextToken()
		p.finishNode(modifier, pos)
		nodes := p.nodeSlicePool.NewSlice(1)
		nodes[0] = modifier
		return p.newModifierList(modifier.Loc, nodes)
	}
	return nil
}

func (p *Parser) nextTokenIsNewKeyword() bool {
	return p.nextToken() == ast.KindNewKeyword
}

func (p *Parser) nextIsUnambiguouslyStartOfFunctionType() bool {
	p.nextToken()
	if p.token == ast.KindCloseParenToken || p.token == ast.KindDotDotDotToken {
		// ( )
		// ( ...
		return true
	}
	if p.skipParameterStart() {
		// We successfully skipped modifiers (if any) and an identifier or binding pattern,
		// now see if we have something that indicates a parameter declaration
		if p.token == ast.KindColonToken || p.token == ast.KindCommaToken || p.token == ast.KindQuestionToken || p.token == ast.KindEqualsToken {
			// ( xxx :
			// ( xxx ,
			// ( xxx ?
			// ( xxx =
			return true
		}
		if p.token == ast.KindCloseParenToken && p.nextToken() == ast.KindEqualsGreaterThanToken {
			// ( xxx ) =>
			return true
		}
	}
	return false
}

func (p *Parser) skipParameterStart() bool {
	if ast.IsModifierKind(p.token) {
		// Skip modifiers
		p.parseModifiers()
	}
	p.parseOptional(ast.KindDotDotDotToken)
	if p.isIdentifier() || p.token == ast.KindThisKeyword {
		p.nextToken()
		return true
	}
	if p.token == ast.KindOpenBracketToken || p.token == ast.KindOpenBraceToken {
		// Return true if we can parse an array or object binding pattern with no errors
		previousErrorCount := len(p.diagnostics)
		p.parseIdentifierOrPattern()
		return previousErrorCount == len(p.diagnostics)
	}
	return false
}

func (p *Parser) parseModifiers() *ast.ModifierList {
	return p.parseModifiersEx(false, false, false)
}

func (p *Parser) parseModifiersEx(allowDecorators bool, permitConstAsModifier bool, stopOnStartOfClassStaticBlock bool) *ast.ModifierList {
	var hasLeadingModifier bool
	var hasTrailingDecorator bool
	var hasTrailingModifier bool
	var hasStaticModifier bool
	// Decorators should be contiguous in a list of modifiers but can potentially appear in two places (i.e., `[...leadingDecorators, ...leadingModifiers, ...trailingDecorators, ...trailingModifiers]`).
	// The leading modifiers *should* only contain `export` and `default` when trailingDecorators are present, but we'll handle errors for any other leading modifiers in the checker.
	// It is illegal to have both leadingDecorators and trailingDecorators, but we will report that as a grammar check in the checker.
	// parse leading decorators
	pos := p.nodePos()
	list := make([]*ast.Node, 0, 16)
	for {
		if allowDecorators && p.token == ast.KindAtToken && !hasTrailingModifier {
			decorator := p.parseDecorator()
			list = append(list, decorator)
			if hasLeadingModifier {
				hasTrailingDecorator = true
			}
		} else {
			modifier := p.tryParseModifier(hasStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock)
			if modifier == nil {
				break
			}
			if modifier.Kind == ast.KindStaticKeyword {
				hasStaticModifier = true
			}
			list = append(list, modifier)
			if hasTrailingDecorator {
				hasTrailingModifier = true
			} else {
				hasLeadingModifier = true
			}
		}
	}
	if len(list) != 0 {
		nodes := p.nodeSlicePool.NewSlice(len(list))
		copy(nodes, list)
		return p.newModifierList(core.NewTextRange(pos, p.nodePos()), nodes)
	}
	return nil
}

func (p *Parser) parseDecorator() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindAtToken)
	expression := doInContext(p, ast.NodeFlagsDecoratorContext, true, (*Parser).parseDecoratorExpression)
	result := p.factory.NewDecorator(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDecoratorExpression() *ast.Expression {
	if p.inAwaitContext() && p.token == ast.KindAwaitKeyword {
		// `@await` is disallowed in an [Await] context, but can cause parsing to go off the rails
		// This simply parses the missing identifier and moves on.
		pos := p.nodePos()
		awaitExpression := p.parseIdentifierWithDiagnostic(diagnostics.Expression_expected, nil)
		p.nextToken()
		memberExpression := p.parseMemberExpressionRest(pos, awaitExpression /*allowOptionalChain*/, true)
		return p.parseCallExpressionRest(pos, memberExpression)
	}
	return p.parseLeftHandSideExpressionOrHigher()
}

func (p *Parser) tryParseModifier(hasSeenStaticModifier bool, permitConstAsModifier bool, stopOnStartOfClassStaticBlock bool) *ast.Node {
	pos := p.nodePos()
	kind := p.token
	if p.token == ast.KindConstKeyword && permitConstAsModifier {
		// We need to ensure that any subsequent modifiers appear on the same line
		// so that when 'const' is a standalone declaration, we don't issue an error.
		if !p.lookAhead((*Parser).nextTokenIsOnSameLineAndCanFollowModifier) {
			return nil
		} else {
			p.nextToken()
		}
	} else if stopOnStartOfClassStaticBlock && p.token == ast.KindStaticKeyword && p.lookAhead((*Parser).nextTokenIsOpenBrace) {
		return nil
	} else if hasSeenStaticModifier && p.token == ast.KindStaticKeyword {
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

func (p *Parser) parseContextualModifier(t ast.Kind) bool {
	state := p.mark()
	if p.token == t && p.nextTokenCanFollowModifier() {
		return true
	}
	p.rewind(state)
	return false
}

func (p *Parser) parseAnyContextualModifier() bool {
	state := p.mark()
	if ast.IsModifierKind(p.token) && p.nextTokenCanFollowModifier() {
		return true
	}
	p.rewind(state)
	return false
}

func (p *Parser) nextTokenCanFollowModifier() bool {
	switch p.token {
	case ast.KindConstKeyword:
		// 'const' is only a modifier if followed by 'enum'.
		return p.nextToken() == ast.KindEnumKeyword
	case ast.KindExportKeyword:
		p.nextToken()
		if p.token == ast.KindDefaultKeyword {
			return p.lookAhead((*Parser).nextTokenCanFollowDefaultKeyword)
		}
		if p.token == ast.KindTypeKeyword {
			return p.lookAhead((*Parser).nextTokenCanFollowExportModifier)
		}
		return p.canFollowExportModifier()
	case ast.KindDefaultKeyword:
		return p.nextTokenCanFollowDefaultKeyword()
	case ast.KindStaticKeyword, ast.KindGetKeyword, ast.KindSetKeyword:
		p.nextToken()
		return p.canFollowModifier()
	default:
		return p.nextTokenIsOnSameLineAndCanFollowModifier()
	}
}

func (p *Parser) nextTokenCanFollowDefaultKeyword() bool {
	switch p.nextToken() {
	case ast.KindClassKeyword, ast.KindFunctionKeyword, ast.KindInterfaceKeyword, ast.KindAtToken:
		return true
	case ast.KindAbstractKeyword:
		return p.lookAhead((*Parser).nextTokenIsClassKeywordOnSameLine)
	case ast.KindAsyncKeyword:
		return p.lookAhead((*Parser).nextTokenIsFunctionKeywordOnSameLine)
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
	return (p.nextTokenIsIdentifierOrKeyword() || p.token == ast.KindNumericLiteral || p.token == ast.KindBigIntLiteral || p.token == ast.KindStringLiteral) && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsClassKeywordOnSameLine() bool {
	return p.nextToken() == ast.KindClassKeyword && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsFunctionKeywordOnSameLine() bool {
	return p.nextToken() == ast.KindFunctionKeyword && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenCanFollowExportModifier() bool {
	p.nextToken()
	return p.canFollowExportModifier()
}

func (p *Parser) canFollowExportModifier() bool {
	return p.token == ast.KindAtToken || p.token != ast.KindAsteriskToken && p.token != ast.KindAsKeyword && p.token != ast.KindOpenBraceToken && p.canFollowModifier()
}

func (p *Parser) canFollowModifier() bool {
	return p.token == ast.KindOpenBracketToken || p.token == ast.KindOpenBraceToken || p.token == ast.KindAsteriskToken || p.token == ast.KindDotDotDotToken || p.isLiteralPropertyName()
}

func (p *Parser) nextTokenIsOnSameLineAndCanFollowModifier() bool {
	p.nextToken()
	if p.hasPrecedingLineBreak() {
		return false
	}
	return p.canFollowModifier()
}

func (p *Parser) nextTokenIsOpenBrace() bool {
	return p.nextToken() == ast.KindOpenBraceToken
}

func (p *Parser) parseExpression() *ast.Expression {
	// Expression[in]:
	//      AssignmentExpression[in]
	//      Expression[in] , AssignmentExpression[in]

	// clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
	saveContextFlags := p.contextFlags
	p.contextFlags &= ^ast.NodeFlagsDecoratorContext
	pos := p.nodePos()
	expr := p.parseAssignmentExpressionOrHigher()
	for {
		operatorToken := p.parseOptionalToken(ast.KindCommaToken)
		if operatorToken == nil {
			break
		}
		expr = p.makeBinaryExpression(expr, operatorToken, p.parseAssignmentExpressionOrHigher(), pos)
	}
	p.contextFlags = saveContextFlags
	return expr
}

func (p *Parser) parseExpressionAllowIn() *ast.Expression {
	return doInContext(p, ast.NodeFlagsDisallowInContext, false, (*Parser).parseExpression)
}

func (p *Parser) parseAssignmentExpressionOrHigher() *ast.Expression {
	return p.parseAssignmentExpressionOrHigherWorker(true /*allowReturnTypeInArrowFunction*/)
}

func (p *Parser) parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction bool) *ast.Expression {
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
	expr := p.parseBinaryExpressionOrHigher(ast.OperatorPrecedenceLowest)
	// To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
	// parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
	// identifier and the current token is an arrow.
	if expr.Kind == ast.KindIdentifier && p.token == ast.KindEqualsGreaterThanToken {
		return p.parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, hasJSDoc, nil /*asyncModifier*/)
	}
	// Now see if we might be in cases '2' or '3'.
	// If the expression was a LHS expression, and we have an assignment operator, then
	// we're in '2' or '3'. Consume the assignment and return.
	//
	// Note: we call reScanGreaterToken so that we get an appropriately merged token
	// for cases like `> > =` becoming `>>=`
	if ast.IsLeftHandSideExpression(expr) && ast.IsAssignmentOperator(p.reScanGreaterThanToken()) {
		return p.makeBinaryExpression(expr, p.parseTokenNode(), p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction), pos)
	}
	// It wasn't an assignment or a lambda.  This is a conditional expression:
	return p.parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction)
}

func (p *Parser) isYieldExpression() bool {
	if p.token == ast.KindYieldKeyword {
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
		return p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine)
	}
	return false
}

func (p *Parser) parseYieldExpression() *ast.Node {
	pos := p.nodePos()
	// YieldExpression[In] :
	//      yield
	//      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
	//      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
	p.nextToken()
	var result *ast.Node
	if !p.hasPrecedingLineBreak() && (p.token == ast.KindAsteriskToken || p.isStartOfExpression()) {
		result = p.factory.NewYieldExpression(p.parseOptionalToken(ast.KindAsteriskToken), p.parseAssignmentExpressionOrHigher())
	} else {
		// if the next token is not on the same line as yield.  or we don't have an '*' or
		// the start of an expression, then this is just a simple "yield" expression.
		result = p.factory.NewYieldExpression(nil /*asteriskToken*/, nil /*expression*/)
	}
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isParenthesizedArrowFunctionExpression() core.Tristate {
	if p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken || p.token == ast.KindAsyncKeyword {
		state := p.mark()
		result := p.nextIsParenthesizedArrowFunctionExpression()
		p.rewind(state)
		return result
	}
	if p.token == ast.KindEqualsGreaterThanToken {
		// ERROR RECOVERY TWEAK:
		// If we see a standalone => try to parse it as an arrow function expression as that's
		// likely what the user intended to write.
		return core.TSTrue
	}
	// Definitely not a parenthesized arrow function.
	return core.TSFalse
}

func (p *Parser) nextIsParenthesizedArrowFunctionExpression() core.Tristate {
	if p.token == ast.KindAsyncKeyword {
		p.nextToken()
		if p.hasPrecedingLineBreak() {
			return core.TSFalse
		}
		if p.token != ast.KindOpenParenToken && p.token != ast.KindLessThanToken {
			return core.TSFalse
		}
	}
	first := p.token
	second := p.nextToken()
	if first == ast.KindOpenParenToken {
		if second == ast.KindCloseParenToken {
			// Simple cases: "() =>", "(): ", and "() {".
			// This is an arrow function with no parameters.
			// The last one is not actually an arrow function,
			// but this is probably what the user intended.
			third := p.nextToken()
			switch third {
			case ast.KindEqualsGreaterThanToken, ast.KindColonToken, ast.KindOpenBraceToken:
				return core.TSTrue
			}
			return core.TSFalse
		}
		// If encounter "([" or "({", this could be the start of a binding pattern.
		// Examples:
		//      ([ x ]) => { }
		//      ({ x }) => { }
		//      ([ x ])
		//      ({ x })
		if second == ast.KindOpenBracketToken || second == ast.KindOpenBraceToken {
			return core.TSUnknown
		}
		// Simple case: "(..."
		// This is an arrow function with a rest parameter.
		if second == ast.KindDotDotDotToken {
			return core.TSTrue
		}
		// Check for "(xxx yyy", where xxx is a modifier and yyy is an identifier. This
		// isn't actually allowed, but we want to treat it as a lambda so we can provide
		// a good error message.
		if ast.IsModifierKind(second) && second != ast.KindAsyncKeyword && p.lookAhead((*Parser).nextTokenIsIdentifier) {
			if p.nextToken() == ast.KindAsKeyword {
				// https://github.com/microsoft/TypeScript/issues/44466
				return core.TSFalse
			}
			return core.TSTrue
		}
		// If we had "(" followed by something that's not an identifier,
		// then this definitely doesn't look like a lambda.  "this" is not
		// valid, but we want to parse it and then give a semantic error.
		if !p.isIdentifier() && second != ast.KindThisKeyword {
			return core.TSFalse
		}
		switch p.nextToken() {
		case ast.KindColonToken:
			// If we have something like "(a:", then we must have a
			// type-annotated parameter in an arrow function expression.
			return core.TSTrue
		case ast.KindQuestionToken:
			p.nextToken()
			// If we have "(a?:" or "(a?," or "(a?=" or "(a?)" then it is definitely a lambda.
			if p.token == ast.KindColonToken || p.token == ast.KindCommaToken || p.token == ast.KindEqualsToken || p.token == ast.KindCloseParenToken {
				return core.TSTrue
			}
			// Otherwise it is definitely not a lambda.
			return core.TSFalse
		case ast.KindCommaToken, ast.KindEqualsToken, ast.KindCloseParenToken:
			// If we have "(a," or "(a=" or "(a)" this *could* be an arrow function
			return core.TSUnknown
		}
		// It is definitely not an arrow function
		return core.TSFalse
	} else {
		// !!! Debug.assert(first == KindLessThanToken)
		// If we have "<" not followed by an identifier,
		// then this definitely is not an arrow function.
		if !p.isIdentifier() && p.token != ast.KindConstKeyword {
			return core.TSFalse
		}
		// JSX overrides
		if p.languageVariant == core.LanguageVariantJSX {
			isArrowFunctionInJsx := p.lookAhead(func(p *Parser) bool {
				p.parseOptional(ast.KindConstKeyword)
				third := p.nextToken()
				if third == ast.KindExtendsKeyword {
					fourth := p.nextToken()
					switch fourth {
					case ast.KindEqualsToken, ast.KindGreaterThanToken, ast.KindSlashToken:
						return false
					}
					return true
				} else if third == ast.KindCommaToken || third == ast.KindEqualsToken {
					return true
				}
				return false
			})
			if isArrowFunctionInJsx {
				return core.TSTrue
			}
			return core.TSFalse
		}
		// This *could* be a parenthesized arrow function.
		return core.TSUnknown
	}
}

func (p *Parser) tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *ast.Node {
	tristate := p.isParenthesizedArrowFunctionExpression()
	if tristate == core.TSFalse {
		// It's definitely not a parenthesized arrow function expression.
		return nil
	}
	// If we definitely have an arrow function, then we can just parse one, not requiring a
	// following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
	// it out, but don't allow any ambiguity, and return 'undefined' if this could be an
	// expression instead.
	if tristate == core.TSTrue {
		return p.parseParenthesizedArrowFunctionExpression(true /*allowAmbiguity*/, true /*allowReturnTypeInArrowFunction*/)
	}
	state := p.mark()
	result := p.parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction)
	if result == nil {
		p.rewind(state)
	}
	return result
}

func (p *Parser) parseParenthesizedArrowFunctionExpression(allowAmbiguity bool, allowReturnTypeInArrowFunction bool) *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersForArrowFunction()
	isAsync := modifierListHasAsync(modifiers)
	signatureFlags := core.IfElse(isAsync, ParseFlagsAwait, ParseFlagsNone)
	// Arrow functions are never generators.
	//
	// If we're speculatively parsing a signature for a parenthesized arrow function, then
	// we have to have a complete parameter list.  Otherwise we might see something like
	// a => (b => c)
	// And think that "(b =>" was actually a parenthesized arrow function with a missing
	// close paren.
	typeParameters := p.parseTypeParameters()
	var parameters *ast.NodeList
	if !p.parseExpected(ast.KindOpenParenToken) {
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
		if !p.parseExpected(ast.KindCloseParenToken) && !allowAmbiguity {
			return nil
		}
	}
	hasReturnColon := p.token == ast.KindColonToken
	returnType := p.parseReturnType(ast.KindColonToken /*isType*/, false)
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
	for unwrappedType != nil && unwrappedType.Kind == ast.KindParenthesizedType {
		unwrappedType = unwrappedType.AsParenthesizedTypeNode().Type // Skip parens if need be
	}
	if !allowAmbiguity && p.token != ast.KindEqualsGreaterThanToken && p.token != ast.KindOpenBraceToken {
		// Returning undefined here will cause our caller to rewind to where we started from.
		return nil
	}
	// If we have an arrow, then try to parse the body. Even if not, try to parse if we
	// have an opening brace, just in case we're in an error state.
	lastToken := p.token
	equalsGreaterThanToken := p.parseExpectedToken(ast.KindEqualsGreaterThanToken)
	var body *ast.Node
	if lastToken == ast.KindEqualsGreaterThanToken || lastToken == ast.KindOpenBraceToken {
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
		if p.token != ast.KindColonToken {
			return nil
		}
	}
	result := p.factory.NewArrowFunction(modifiers, typeParameters, parameters, returnType, equalsGreaterThanToken, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseModifiersForArrowFunction() *ast.ModifierList {
	if p.token == ast.KindAsyncKeyword {
		pos := p.nodePos()
		p.nextToken()
		modifier := p.factory.NewModifier(ast.KindAsyncKeyword)
		p.finishNode(modifier, pos)
		nodes := p.nodeSlicePool.NewSlice(1)
		nodes[0] = modifier
		return p.newModifierList(modifier.Loc, nodes)
	}
	return nil
}

// If true, we should abort parsing an error function.
func typeHasArrowFunctionBlockingParseError(node *ast.TypeNode) bool {
	switch node.Kind {
	case ast.KindTypeReference:
		return ast.NodeIsMissing(node.AsTypeReference().TypeName)
	case ast.KindFunctionType, ast.KindConstructorType:
		return typeHasArrowFunctionBlockingParseError(node.Type())
	case ast.KindParenthesizedType:
		return typeHasArrowFunctionBlockingParseError(node.AsParenthesizedTypeNode().Type)
	}
	return false
}

func (p *Parser) parseArrowFunctionExpressionBody(isAsync bool, allowReturnTypeInArrowFunction bool) *ast.Node {
	if p.token == ast.KindOpenBraceToken {
		return p.parseFunctionBlock(core.IfElse(isAsync, ParseFlagsAwait, ParseFlagsNone), nil /*diagnosticMessage*/)
	}
	if p.token != ast.KindSemicolonToken && p.token != ast.KindFunctionKeyword && p.token != ast.KindClassKeyword && p.isStartOfStatement() && !p.isStartOfExpressionStatement() {
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
		return p.parseFunctionBlock(ParseFlagsIgnoreMissingOpenBrace|core.IfElse(isAsync, ParseFlagsAwait, ParseFlagsNone), nil /*diagnosticMessage*/)
	}
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsAwaitContext, isAsync)
	node := p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction)
	p.contextFlags = saveContextFlags
	return node
}

func (p *Parser) isStartOfExpressionStatement() bool {
	// As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
	return p.token != ast.KindOpenBraceToken && p.token != ast.KindFunctionKeyword && p.token != ast.KindClassKeyword && p.token != ast.KindAtToken && p.isStartOfExpression()
}

func (p *Parser) parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *ast.Node {
	tokenPos := p.scanner.TokenStart()
	if p.notParenthesizedArrow.Has(tokenPos) {
		return nil
	}
	result := p.parseParenthesizedArrowFunctionExpression(false /*allowAmbiguity*/, allowReturnTypeInArrowFunction)
	if result == nil {
		p.notParenthesizedArrow.Add(tokenPos)
	}
	return result
}

func (p *Parser) tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction bool) *ast.Node {
	// We do a check here so that we won't be doing unnecessarily call to "lookAhead"
	if p.token == ast.KindAsyncKeyword && p.lookAhead((*Parser).nextIsUnParenthesizedAsyncArrowFunction) {
		pos := p.nodePos()
		hasJSDoc := p.hasPrecedingJSDocComment()
		asyncModifier := p.parseModifiersForArrowFunction()
		expr := p.parseBinaryExpressionOrHigher(ast.OperatorPrecedenceLowest)
		return p.parseSimpleArrowFunctionExpression(pos, expr, allowReturnTypeInArrowFunction, hasJSDoc, asyncModifier)
	}
	return nil
}

func (p *Parser) nextIsUnParenthesizedAsyncArrowFunction() bool {
	// AsyncArrowFunctionExpression:
	//      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
	//      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
	if p.token == ast.KindAsyncKeyword {
		p.nextToken()
		// If the "async" is followed by "=>" token then it is not a beginning of an async arrow-function
		// but instead a simple arrow-function which will be parsed inside "parseAssignmentExpressionOrHigher"
		if p.hasPrecedingLineBreak() || p.token == ast.KindEqualsGreaterThanToken {
			return false
		}
		// Check for un-parenthesized AsyncArrowFunction
		expr := p.parseBinaryExpressionOrHigher(ast.OperatorPrecedenceLowest)
		if !p.hasPrecedingLineBreak() && expr.Kind == ast.KindIdentifier && p.token == ast.KindEqualsGreaterThanToken {
			return true
		}
	}
	return false
}

func (p *Parser) parseSimpleArrowFunctionExpression(pos int, identifier *ast.Node, allowReturnTypeInArrowFunction bool, hasJSDoc bool, asyncModifier *ast.ModifierList) *ast.Node {
	// Debug.assert(token() == ast.KindEqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
	parameter := p.factory.NewParameterDeclaration(nil /*modifiers*/, nil /*dotDotDotToken*/, identifier, nil /*questionToken*/, nil /*typeNode*/, nil /*initializer*/)
	p.finishNode(parameter, identifier.Pos())
	parameters := p.newNodeList(parameter.Loc, []*ast.Node{parameter})
	equalsGreaterThanToken := p.parseExpectedToken(ast.KindEqualsGreaterThanToken)
	body := p.parseArrowFunctionExpressionBody(asyncModifier != nil /*isAsync*/, allowReturnTypeInArrowFunction)
	result := p.factory.NewArrowFunction(asyncModifier, nil /*typeParameters*/, parameters, nil /*returnType*/, equalsGreaterThanToken, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseConditionalExpressionRest(leftOperand *ast.Expression, pos int, allowReturnTypeInArrowFunction bool) *ast.Expression {
	// Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
	questionToken := p.parseOptionalToken(ast.KindQuestionToken)
	if questionToken == nil {
		return leftOperand
	}
	// Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
	// we do not that for the 'whenFalse' part.
	saveContextFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsDisallowInContext, false)
	trueExpression := p.parseAssignmentExpressionOrHigherWorker(false /*allowReturnTypeInArrowFunction*/)
	p.contextFlags = saveContextFlags
	colonToken := p.parseExpectedToken(ast.KindColonToken)
	var falseExpression *ast.Expression
	if colonToken != nil {
		falseExpression = p.parseAssignmentExpressionOrHigherWorker(allowReturnTypeInArrowFunction)
	} else {
		p.parseErrorAtCurrentToken(diagnostics.X_0_expected, scanner.TokenToString(ast.KindColonToken))
		falseExpression = p.createMissingIdentifier()
	}
	result := p.factory.NewConditionalExpression(leftOperand, questionToken, trueExpression, colonToken, falseExpression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseBinaryExpressionOrHigher(precedence ast.OperatorPrecedence) *ast.Expression {
	pos := p.nodePos()
	leftOperand := p.parseUnaryExpressionOrHigher()
	return p.parseBinaryExpressionRest(precedence, leftOperand, pos)
}

func (p *Parser) parseBinaryExpressionRest(precedence ast.OperatorPrecedence, leftOperand *ast.Expression, pos int) *ast.Expression {
	for {
		// We either have a binary operator here, or we're finished.  We call
		// reScanGreaterToken so that we merge token sequences like > and = into >=
		p.reScanGreaterThanToken()
		newPrecedence := ast.GetBinaryOperatorPrecedence(p.token)
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
		if p.token == ast.KindAsteriskAsteriskToken {
			consumeCurrentOperator = newPrecedence >= precedence
		} else {
			consumeCurrentOperator = newPrecedence > precedence
		}
		if !consumeCurrentOperator {
			break
		}
		if p.token == ast.KindInKeyword && p.inDisallowInContext() {
			break
		}
		if p.token == ast.KindAsKeyword || p.token == ast.KindSatisfiesKeyword {
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
				if keywordKind == ast.KindSatisfiesKeyword {
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

func (p *Parser) makeSatisfiesExpression(expression *ast.Expression, typeNode *ast.TypeNode) *ast.Node {
	result := p.factory.NewSatisfiesExpression(expression, typeNode)
	p.finishNode(result, expression.Pos())
	return result
}

func (p *Parser) makeAsExpression(left *ast.Expression, right *ast.TypeNode) *ast.Node {
	result := p.factory.NewAsExpression(left, right)
	p.finishNode(result, left.Pos())
	return result
}

func (p *Parser) makeBinaryExpression(left *ast.Expression, operatorToken *ast.Node, right *ast.Expression, pos int) *ast.Node {
	result := p.factory.NewBinaryExpression(left, operatorToken, right)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseUnaryExpressionOrHigher() *ast.Expression {
	// ES7 UpdateExpression:
	//      1) LeftHandSideExpression[?Yield]
	//      2) LeftHandSideExpression[?Yield][no LineTerminator here]++
	//      3) LeftHandSideExpression[?Yield][no LineTerminator here]--
	//      4) ++UnaryExpression[?Yield]
	//      5) --UnaryExpression[?Yield]
	if p.isUpdateExpression() {
		pos := p.nodePos()
		updateExpression := p.parseUpdateExpression()
		if p.token == ast.KindAsteriskAsteriskToken {
			return p.parseBinaryExpressionRest(ast.GetBinaryOperatorPrecedence(p.token), updateExpression, pos)
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
	if p.token == ast.KindAsteriskAsteriskToken {
		pos := scanner.SkipTrivia(p.sourceText, simpleUnaryExpression.Pos())
		end := simpleUnaryExpression.End()
		if simpleUnaryExpression.Kind == ast.KindTypeAssertionExpression {
			p.parseErrorAt(pos, end, diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses)
		} else {
			// Debug.assert(isKeywordOrPunctuation(unaryOperator))
			p.parseErrorAt(pos, end, diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, scanner.TokenToString(unaryOperator))
		}
	}
	return simpleUnaryExpression
}

func (p *Parser) isUpdateExpression() bool {
	switch p.token {
	case ast.KindPlusToken, ast.KindMinusToken, ast.KindTildeToken, ast.KindExclamationToken, ast.KindDeleteKeyword, ast.KindTypeOfKeyword, ast.KindVoidKeyword, ast.KindAwaitKeyword:
		return false
	case ast.KindLessThanToken:
		return p.languageVariant == core.LanguageVariantJSX
	}
	return true
}

func (p *Parser) parseUpdateExpression() *ast.Expression {
	pos := p.nodePos()
	if p.token == ast.KindPlusPlusToken || p.token == ast.KindMinusMinusToken {
		operator := p.token
		p.nextToken()
		result := p.factory.NewPrefixUnaryExpression(operator, p.parseLeftHandSideExpressionOrHigher())
		p.finishNode(result, pos)
		return result
	} else if p.languageVariant == core.LanguageVariantJSX && p.token == ast.KindLessThanToken && p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOrGreaterThan) {
		// JSXElement is part of primaryExpression
		return p.parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, nil /*openingTag*/, false /*mustBeUnary*/)
	}
	expression := p.parseLeftHandSideExpressionOrHigher()
	if (p.token == ast.KindPlusPlusToken || p.token == ast.KindMinusMinusToken) && !p.hasPrecedingLineBreak() {
		operator := p.token
		p.nextToken()
		result := p.factory.NewPostfixUnaryExpression(expression, operator)
		p.finishNode(result, pos)
		return result
	}
	return expression
}

func (p *Parser) parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext bool, topInvalidNodePosition int, openingTag *ast.Node, mustBeUnary bool) *ast.Expression {
	pos := p.nodePos()
	opening := p.parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext)
	var result *ast.Expression
	switch opening.Kind {
	case ast.KindJsxOpeningElement:
		children := p.parseJsxChildren(opening)
		var closingElement *ast.Node
		lastChild := core.LastOrNil(children.Nodes)
		if lastChild != nil && lastChild.Kind == ast.KindJsxElement &&
			!tagNamesAreEquivalent(lastChild.AsJsxElement().OpeningElement.AsJsxOpeningElement().TagName, lastChild.AsJsxElement().ClosingElement.AsJsxClosingElement().TagName) &&
			tagNamesAreEquivalent(opening.AsJsxOpeningElement().TagName, lastChild.AsJsxElement().ClosingElement.AsJsxClosingElement().TagName) {
			// when an unclosed JsxOpeningElement incorrectly parses its parent's JsxClosingElement,
			// restructure (<div>(...<span>...</div>)) --> (<div>(...<span>...</>)</div>)
			// (no need to error; the parent will error)
			end := lastChild.AsJsxElement().OpeningElement.End()
			missingIdentifier := p.newIdentifier("")
			p.finishNodeWithEnd(missingIdentifier, end, end)
			newClosingElement := p.factory.NewJsxClosingElement(missingIdentifier)
			p.finishNodeWithEnd(newClosingElement, end, end)
			newLast := p.factory.NewJsxElement(lastChild.AsJsxElement().OpeningElement, lastChild.AsJsxElement().Children, newClosingElement)
			p.finishNodeWithEnd(newLast, lastChild.AsJsxElement().OpeningElement.Pos(), end)
			children = p.newNodeList(core.NewTextRange(children.Pos(), newLast.End()), append(children.Nodes[0:len(children.Nodes)-1], newLast))
			closingElement = lastChild.AsJsxElement().ClosingElement
		} else {
			closingElement = p.parseJsxClosingElement(opening, inExpressionContext)
			if !tagNamesAreEquivalent(opening.AsJsxOpeningElement().TagName, closingElement.AsJsxClosingElement().TagName) {
				if openingTag != nil && ast.IsJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.AsJsxClosingElement().TagName, openingTag.AsJsxOpeningElement().TagName) {
					// opening incorrectly matched with its parent's closing -- put error on opening
					p.parseErrorAtRange(opening.AsJsxOpeningElement().TagName.Loc, diagnostics.JSX_element_0_has_no_corresponding_closing_tag, scanner.GetTextOfNodeFromSourceText(p.sourceText, opening.AsJsxOpeningElement().TagName, false /*includeTrivia*/))
				} else {
					// other opening/closing mismatches -- put error on closing
					p.parseErrorAtRange(closingElement.AsJsxClosingElement().TagName.Loc, diagnostics.Expected_corresponding_JSX_closing_tag_for_0, scanner.GetTextOfNodeFromSourceText(p.sourceText, opening.AsJsxOpeningElement().TagName, false /*includeTrivia*/))
				}
			}
		}
		result = p.factory.NewJsxElement(opening, children, closingElement)
		p.finishNode(result, pos)
	case ast.KindJsxOpeningFragment:
		result = p.factory.NewJsxFragment(opening, p.parseJsxChildren(opening), p.parseJsxClosingFragment(inExpressionContext))
		p.finishNode(result, pos)
	case ast.KindJsxSelfClosingElement:
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
	if !mustBeUnary && inExpressionContext && p.token == ast.KindLessThanToken {
		topBadPos := topInvalidNodePosition
		if topBadPos < 0 {
			topBadPos = result.Pos()
		}
		invalidElement := p.parseJsxElementOrSelfClosingElementOrFragment( /*inExpressionContext*/ true, topBadPos, nil, false)
		operatorToken := p.factory.NewToken(ast.KindCommaToken)
		operatorToken.Loc = core.NewTextRange(invalidElement.Pos(), invalidElement.Pos())
		p.parseErrorAt(scanner.SkipTrivia(p.sourceText, topBadPos), invalidElement.End(), diagnostics.JSX_expressions_must_have_one_parent_element)
		result = p.factory.NewBinaryExpression(result, operatorToken, invalidElement)
		p.finishNode(result, pos)
	}
	return result
}

func (p *Parser) parseJsxChildren(openingTag *ast.Expression) *ast.NodeList {
	pos := p.nodePos()
	saveParsingContexts := p.parsingContexts
	p.parsingContexts |= 1 << PCJsxChildren
	var list []*ast.Node
	for {
		currentToken := p.scanner.ReScanJsxToken(true /*allowMultilineJsxText*/)
		child := p.parseJsxChild(openingTag, currentToken)
		if child == nil {
			break
		}
		list = append(list, child)
		if ast.IsJsxOpeningElement(openingTag) && child.Kind == ast.KindJsxElement &&
			!tagNamesAreEquivalent(child.AsJsxElement().OpeningElement.AsJsxOpeningElement().TagName, child.AsJsxElement().ClosingElement.AsJsxClosingElement().TagName) &&
			tagNamesAreEquivalent(openingTag.AsJsxOpeningElement().TagName, child.AsJsxElement().ClosingElement.AsJsxClosingElement().TagName) {
			// stop after parsing a mismatched child like <div>...(<span></div>) in order to reattach the </div> higher
			break
		}
	}
	p.parsingContexts = saveParsingContexts
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), list)
}

func (p *Parser) parseJsxChild(openingTag *ast.Node, token ast.Kind) *ast.Expression {
	switch token {
	case ast.KindEndOfFile:
		// If we hit EOF, issue the error at the tag that lacks the closing element
		// rather than at the end of the file (which is useless)
		if ast.IsJsxOpeningFragment(openingTag) {
			p.parseErrorAtRange(openingTag.Loc, diagnostics.JSX_fragment_has_no_corresponding_closing_tag)
		} else {
			// We want the error span to cover only 'Foo.Bar' in < Foo.Bar >
			// or to cover only 'Foo' in < Foo >
			tag := openingTag.AsJsxOpeningElement().TagName
			start := min(scanner.SkipTrivia(p.sourceText, tag.Pos()), tag.End())
			p.parseErrorAt(start, tag.End(), diagnostics.JSX_element_0_has_no_corresponding_closing_tag,
				scanner.GetTextOfNodeFromSourceText(p.sourceText, openingTag.AsJsxOpeningElement().TagName, false /*includeTrivia*/))
		}
		return nil
	case ast.KindLessThanSlashToken, ast.KindConflictMarkerTrivia:
		return nil
	case ast.KindJsxText, ast.KindJsxTextAllWhiteSpaces:
		return p.parseJsxText()
	case ast.KindOpenBraceToken:
		return p.parseJsxExpression(false /*inExpressionContext*/)
	case ast.KindLessThanToken:
		return p.parseJsxElementOrSelfClosingElementOrFragment(false /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, openingTag, false)
	}
	panic("Unhandled case in parseJsxChild")
}

func (p *Parser) parseJsxText() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewJsxText(p.scanner.TokenValue(), p.token == ast.KindJsxTextAllWhiteSpaces)
	p.scanJsxText()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxExpression(inExpressionContext bool) *ast.Node {
	pos := p.nodePos()
	if !p.parseExpected(ast.KindOpenBraceToken) {
		return nil
	}
	var dotDotDotToken *ast.Node
	var expression *ast.Expression
	if p.token != ast.KindCloseBraceToken {
		if !inExpressionContext {
			dotDotDotToken = p.parseOptionalToken(ast.KindDotDotDotToken)
		}
		// Only an AssignmentExpression is valid here per the JSX spec,
		// but we can unambiguously parse a comma sequence and provide
		// a better error message in grammar checking.
		expression = p.parseExpression()
	}
	if inExpressionContext {
		p.parseExpected(ast.KindCloseBraceToken)
	} else if p.parseExpectedWithoutAdvancing(ast.KindCloseBraceToken) {
		p.scanJsxText()
	}
	result := p.factory.NewJsxExpression(dotDotDotToken, expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) scanJsxText() ast.Kind {
	p.token = p.scanner.ScanJsxToken()
	return p.token
}

func (p *Parser) scanJsxIdentifier() ast.Kind {
	p.token = p.scanner.ScanJsxIdentifier()
	return p.token
}

func (p *Parser) scanJsxAttributeValue() ast.Kind {
	p.token = p.scanner.ScanJsxAttributeValue()
	return p.token
}

func (p *Parser) parseJsxClosingElement(open *ast.Node, inExpressionContext bool) *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindLessThanSlashToken)
	tagName := p.parseJsxElementName()
	if p.parseExpectedWithDiagnostic(ast.KindGreaterThanToken, nil /*diagnosticMessage*/, false /*shouldAdvance*/) {
		// manually advance the scanner in order to look for jsx text inside jsx
		if inExpressionContext || !tagNamesAreEquivalent(open.AsJsxOpeningElement().TagName, tagName) {
			p.nextToken()
		} else {
			p.scanJsxText()
		}
	}
	result := p.factory.NewJsxClosingElement(tagName)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext bool) *ast.Expression {
	pos := p.nodePos()
	p.parseExpected(ast.KindLessThanToken)
	if p.token == ast.KindGreaterThanToken {
		// See below for explanation of scanJsxText
		p.scanJsxText()
		result := p.factory.NewJsxOpeningFragment()
		p.finishNode(result, pos)
		return result
	}
	tagName := p.parseJsxElementName()
	var typeArguments *ast.NodeList
	if p.contextFlags&ast.NodeFlagsJavaScriptFile == 0 {
		typeArguments = p.parseTypeArguments()
	}
	attributes := p.parseJsxAttributes()
	var result *ast.Expression
	if p.token == ast.KindGreaterThanToken {
		// Closing tag, so scan the immediately-following text with the JSX scanning instead
		// of regular scanning to avoid treating illegal characters (e.g. '#') as immediate
		// scanning errors
		p.scanJsxText()
		result = p.factory.NewJsxOpeningElement(tagName, typeArguments, attributes)
	} else {
		p.parseExpected(ast.KindSlashToken)
		if p.parseExpectedWithoutAdvancing(ast.KindGreaterThanToken) {
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

func (p *Parser) parseJsxElementName() *ast.Expression {
	pos := p.nodePos()
	// JsxElement can have name in the form of
	//      propertyAccessExpression
	//      primaryExpression in the form of an identifier and "this" keyword
	// We can't just simply use parseLeftHandSideExpressionOrHigher because then we will start consider class,function etc as a keyword
	// We only want to consider "this" as a primaryExpression
	initialExpression := p.parseJsxTagName()
	if ast.IsJsxNamespacedName(initialExpression) {
		return initialExpression // `a:b.c` is invalid syntax, don't even look for the `.` if we parse `a:b`, and let `parseAttribute` report "unexpected :" instead.
	}
	expression := initialExpression
	for p.parseOptional(ast.KindDotToken) {
		expression = p.factory.NewPropertyAccessExpression(expression, nil, p.parseRightSideOfDot(true /*allowIdentifierNames*/, false /*allowPrivateIdentifiers*/, false /*allowUnicodeEscapeSequenceInIdentifierName*/), ast.NodeFlagsNone)
		p.finishNode(expression, pos)
	}
	return expression
}

func (p *Parser) parseJsxTagName() *ast.Expression {
	pos := p.nodePos()
	p.scanJsxIdentifier()
	isThis := p.token == ast.KindThisKeyword
	tagName := p.parseIdentifierNameErrorOnUnicodeEscapeSequence()
	if p.parseOptional(ast.KindColonToken) {
		p.scanJsxIdentifier()
		result := p.factory.NewJsxNamespacedName(tagName, p.parseIdentifierNameErrorOnUnicodeEscapeSequence())
		p.finishNode(result, pos)
		return result
	}
	if isThis {
		result := p.factory.NewKeywordExpression(ast.KindThisKeyword)
		p.finishNode(result, pos)
		return result
	}
	return tagName
}

func (p *Parser) parseJsxAttributes() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewJsxAttributes(p.parseList(PCJsxAttributes, (*Parser).parseJsxAttribute))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxAttribute() *ast.Node {
	if p.token == ast.KindOpenBraceToken {
		return p.parseJsxSpreadAttribute()
	}
	pos := p.nodePos()
	result := p.factory.NewJsxAttribute(p.parseJsxAttributeName(), p.parseJsxAttributeValue())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxSpreadAttribute() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindOpenBraceToken)
	p.parseExpected(ast.KindDotDotDotToken)
	expression := p.parseExpression()
	p.parseExpected(ast.KindCloseBraceToken)
	result := p.factory.NewJsxSpreadAttribute(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseJsxAttributeName() *ast.Node {
	pos := p.nodePos()
	p.scanJsxIdentifier()
	attrName := p.parseIdentifierNameErrorOnUnicodeEscapeSequence()
	if p.parseOptional(ast.KindColonToken) {
		p.scanJsxIdentifier()
		result := p.factory.NewJsxNamespacedName(attrName, p.parseIdentifierNameErrorOnUnicodeEscapeSequence())
		p.finishNode(result, pos)
		return result
	}
	return attrName
}

func (p *Parser) parseJsxAttributeValue() *ast.Expression {
	if p.token == ast.KindEqualsToken {
		if p.scanJsxAttributeValue() == ast.KindStringLiteral {
			return p.parseLiteralExpression(false /*intern*/)
		}
		if p.token == ast.KindOpenBraceToken {
			return p.parseJsxExpression( /*inExpressionContext*/ true)
		}
		if p.token == ast.KindLessThanToken {
			return p.parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1, nil, false)
		}
		p.parseErrorAtCurrentToken(diagnostics.X_or_JSX_element_expected)
	}
	return nil
}

func (p *Parser) parseJsxClosingFragment(inExpressionContext bool) *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindLessThanSlashToken)
	if p.parseExpectedWithDiagnostic(ast.KindGreaterThanToken, diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment, false /*shouldAdvance*/) {
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

func (p *Parser) parseSimpleUnaryExpression() *ast.Expression {
	switch p.token {
	case ast.KindPlusToken, ast.KindMinusToken, ast.KindTildeToken, ast.KindExclamationToken:
		return p.parsePrefixUnaryExpression()
	case ast.KindDeleteKeyword:
		return p.parseDeleteExpression()
	case ast.KindTypeOfKeyword:
		return p.parseTypeOfExpression()
	case ast.KindVoidKeyword:
		return p.parseVoidExpression()
	case ast.KindLessThanToken:
		// !!!
		// // Just like in parseUpdateExpression, we need to avoid parsing type assertions when
		// // in JSX and we see an expression like "+ <foo> bar".
		// if (languageVariant == core.LanguageVariant.JSX) {
		// 	return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true, /*topInvalidNodePosition*/ undefined, /*openingTag*/ undefined, /*mustBeUnary*/ true);
		// }
		// // This is modified UnaryExpression grammar in TypeScript
		// //  UnaryExpression (modified):
		// //      < type > UnaryExpression
		return p.parseTypeAssertion()
	case ast.KindAwaitKeyword:
		if p.isAwaitExpression() {
			return p.parseAwaitExpression()
		}
		fallthrough
	default:
		return p.parseUpdateExpression()
	}
}

func (p *Parser) parsePrefixUnaryExpression() *ast.Node {
	pos := p.nodePos()
	operator := p.token
	p.nextToken()
	result := p.factory.NewPrefixUnaryExpression(operator, p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseDeleteExpression() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewDeleteExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeOfExpression() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewTypeOfExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseVoidExpression() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewVoidExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isAwaitExpression() bool {
	if p.token == ast.KindAwaitKeyword {
		if p.inAwaitContext() {
			return true
		}
		// here we are using similar heuristics as 'isYieldExpression'
		return p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine)
	}
	return false
}

func (p *Parser) parseAwaitExpression() *ast.Node {
	pos := p.nodePos()
	p.nextToken()
	result := p.factory.NewAwaitExpression(p.parseSimpleUnaryExpression())
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTypeAssertion() *ast.Node {
	// !!! Debug.assert(languageVariant !== core.LanguageVariant.JSX, "Type assertions should never be parsed in JSX; they should be parsed as comparisons or JSX elements/fragments.");
	pos := p.nodePos()
	p.parseExpected(ast.KindLessThanToken)
	typeNode := p.parseType()
	p.parseExpected(ast.KindGreaterThanToken)
	expression := p.parseSimpleUnaryExpression()
	result := p.factory.NewTypeAssertion(typeNode, expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLeftHandSideExpressionOrHigher() *ast.Expression {
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
	var expression *ast.Expression
	if p.token == ast.KindImportKeyword {
		if p.lookAhead((*Parser).nextTokenIsOpenParenOrLessThan) {
			// We don't want to eagerly consume all import keyword as import call expression so we look ahead to find "("
			// For example:
			//      var foo3 = require("subfolder
			//      import * as foo1 from "module-from-node
			// We want this import to be a statement rather than import call expression
			p.sourceFlags |= ast.NodeFlagsPossiblyContainsDynamicImport
			expression = p.parseKeywordExpression()
		} else if p.lookAhead((*Parser).nextTokenIsDot) {
			// This is an 'import.*' metaproperty (i.e. 'import.meta')
			p.nextToken() // advance past the 'import'
			p.nextToken() // advance past the dot
			expression = p.factory.NewMetaProperty(ast.KindImportKeyword, p.parseIdentifierName())
			p.finishNode(expression, pos)
			p.sourceFlags |= ast.NodeFlagsPossiblyContainsImportMeta
		} else {
			expression = p.parseMemberExpressionOrHigher()
		}
	} else if p.token == ast.KindSuperKeyword {
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
	return p.nextToken() == ast.KindDotToken
}

func (p *Parser) parseSuperExpression() *ast.Expression {
	pos := p.nodePos()
	expression := p.parseKeywordExpression()
	if p.token == ast.KindLessThanToken {
		startPos := p.nodePos()
		typeArguments := p.tryParseTypeArgumentsInExpression()
		if typeArguments != nil {
			p.parseErrorAt(startPos, p.nodePos(), diagnostics.X_super_may_not_use_type_arguments)
			if !p.isTemplateStartOfTaggedTemplate() {
				expression = p.factory.NewExpressionWithTypeArguments(expression, typeArguments)
				p.finishNode(expression, pos)
			}
		}
	}
	if p.token == ast.KindOpenParenToken || p.token == ast.KindDotToken || p.token == ast.KindOpenBracketToken {
		return expression
	}
	// If we have seen "super" it must be followed by '(' or '.'.
	// If it wasn't then just try to parse out a '.' and report an error.
	p.parseErrorAtCurrentToken(diagnostics.X_super_must_be_followed_by_an_argument_list_or_member_access)
	// private names will never work with `super` (`super.#foo`), but that's a semantic error, not syntactic
	result := p.factory.NewPropertyAccessExpression(expression, nil /*questionDotToken*/, p.parseRightSideOfDot(true /*allowIdentifierNames*/, true /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/), ast.NodeFlagsNone)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) isTemplateStartOfTaggedTemplate() bool {
	return p.token == ast.KindNoSubstitutionTemplateLiteral || p.token == ast.KindTemplateHead
}

func (p *Parser) tryParseTypeArgumentsInExpression() *ast.NodeList {
	// TypeArguments must not be parsed in JavaScript files to avoid ambiguity with binary operators.
	state := p.mark()
	if p.contextFlags&ast.NodeFlagsJavaScriptFile == 0 && p.reScanLessThanToken() == ast.KindLessThanToken {
		p.nextToken()
		typeArguments := p.parseDelimitedList(PCTypeArguments, (*Parser).parseType)
		// If it doesn't have the closing `>` then it's definitely not an type argument list.
		if p.reScanGreaterThanToken() == ast.KindGreaterThanToken {
			p.nextToken()
			// We successfully parsed a type argument list. The next token determines whether we want to
			// treat it as such. If the type argument list is followed by `(` or a template literal, as in
			// `f<number>(42)`, we favor the type argument interpretation even though JavaScript would view
			// it as a relational expression.
			if p.canFollowTypeArgumentsInExpression() {
				return typeArguments
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
	case ast.KindOpenParenToken, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateHead:
		return true
	// A type argument list followed by `<` never makes sense, and a type argument list followed
	// by `>` is ambiguous with a (re-scanned) `>>` operator, so we disqualify both. Also, in
	// this context, `+` and `-` are unary operators, not binary operators.
	case ast.KindLessThanToken, ast.KindGreaterThanToken, ast.KindPlusToken, ast.KindMinusToken:
		return false
	}
	// We favor the type argument list interpretation when it is immediately followed by
	// a line break, a binary operator, or something that can't start an expression.
	return p.hasPrecedingLineBreak() || p.isBinaryOperator() || !p.isStartOfExpression()
}

func (p *Parser) parseMemberExpressionOrHigher() *ast.Node {
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

func (p *Parser) parseMemberExpressionRest(pos int, expression *ast.Expression, allowOptionalChain bool) *ast.Expression {
	for {
		var questionDotToken *ast.Node
		isPropertyAccess := false
		if allowOptionalChain && p.isStartOfOptionalPropertyOrElementAccessChain() {
			questionDotToken = p.parseExpectedToken(ast.KindQuestionDotToken)
			isPropertyAccess = tokenIsIdentifierOrKeyword(p.token)
		} else {
			isPropertyAccess = p.parseOptional(ast.KindDotToken)
		}
		if isPropertyAccess {
			expression = p.parsePropertyAccessExpressionRest(pos, expression, questionDotToken)
			continue
		}
		// when in the [Decorator] context, we do not parse ElementAccess as it could be part of a ComputedPropertyName
		if (questionDotToken != nil || !p.inDecoratorContext()) && p.parseOptional(ast.KindOpenBracketToken) {
			expression = p.parseElementAccessExpressionRest(pos, expression, questionDotToken)
			continue
		}
		if p.isTemplateStartOfTaggedTemplate() {
			// Absorb type arguments into TemplateExpression when preceding expression is ExpressionWithTypeArguments
			if questionDotToken == nil && ast.IsExpressionWithTypeArguments(expression) {
				expression = p.parseTaggedTemplateRest(pos, expression.AsExpressionWithTypeArguments().Expression, questionDotToken, expression.AsExpressionWithTypeArguments().TypeArguments)
			} else {
				expression = p.parseTaggedTemplateRest(pos, expression, questionDotToken, nil /*typeArguments*/)
			}
			continue
		}
		if questionDotToken == nil {
			if p.token == ast.KindExclamationToken && !p.hasPrecedingLineBreak() {
				p.nextToken()
				expression = p.factory.NewNonNullExpression(expression, ast.NodeFlagsNone)
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
	return p.token == ast.KindQuestionDotToken && p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate)
}

func (p *Parser) nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate() bool {
	p.nextToken()
	return tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindOpenBracketToken || p.isTemplateStartOfTaggedTemplate()
}

func (p *Parser) parsePropertyAccessExpressionRest(pos int, expression *ast.Expression, questionDotToken *ast.Node) *ast.Node {
	name := p.parseRightSideOfDot(true /*allowIdentifierNames*/, true /*allowPrivateIdentifiers*/, true /*allowUnicodeEscapeSequenceInIdentifierName*/)
	isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
	propertyAccess := p.factory.NewPropertyAccessExpression(expression, questionDotToken, name, core.IfElse(isOptionalChain, ast.NodeFlagsOptionalChain, ast.NodeFlagsNone))
	if isOptionalChain && ast.IsPrivateIdentifier(name) {
		p.parseErrorAtRange(p.skipRangeTrivia(name.Loc), diagnostics.An_optional_chain_cannot_contain_private_identifiers)
	}
	if ast.IsExpressionWithTypeArguments(expression) {
		typeArguments := expression.AsExpressionWithTypeArguments().TypeArguments
		if typeArguments != nil {
			loc := core.NewTextRange(typeArguments.Pos()-1, scanner.SkipTrivia(p.sourceText, typeArguments.End())+1)
			p.parseErrorAtRange(loc, diagnostics.An_instantiation_expression_cannot_be_followed_by_a_property_access)
		}
	}
	p.finishNode(propertyAccess, pos)
	return propertyAccess
}

func (p *Parser) tryReparseOptionalChain(node *ast.Expression) bool {
	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
		return true
	}
	// check for an optional chain in a non-null expression
	if ast.IsNonNullExpression(node) {
		expr := node.AsNonNullExpression().Expression
		for ast.IsNonNullExpression(expr) && expr.Flags&ast.NodeFlagsOptionalChain == 0 {
			expr = expr.AsNonNullExpression().Expression
		}
		if expr.Flags&ast.NodeFlagsOptionalChain != 0 {
			// this is part of an optional chain. Walk down from `node` to `expression` and set the flag.
			for ast.IsNonNullExpression(node) {
				node.Flags |= ast.NodeFlagsOptionalChain
				node = node.AsNonNullExpression().Expression
			}
			return true
		}
	}
	return false
}

func (p *Parser) parseElementAccessExpressionRest(pos int, expression *ast.Expression, questionDotToken *ast.Node) *ast.Node {
	var argumentExpression *ast.Expression
	if p.token == ast.KindCloseBracketToken {
		p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.An_element_access_expression_should_take_an_argument)
		argumentExpression = p.createMissingIdentifier()
	} else {
		argument := p.parseExpressionAllowIn()
		switch argument.Kind {
		case ast.KindStringLiteral:
			argument.AsStringLiteral().Text = p.internIdentifier(argument.AsStringLiteral().Text)
		case ast.KindNoSubstitutionTemplateLiteral:
			argument.AsNoSubstitutionTemplateLiteral().Text = p.internIdentifier(argument.AsNoSubstitutionTemplateLiteral().Text)
		case ast.KindNumericLiteral:
			argument.AsNumericLiteral().Text = p.internIdentifier(argument.AsNumericLiteral().Text)
		}
		argumentExpression = argument
	}
	p.parseExpected(ast.KindCloseBracketToken)
	isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
	elementAccess := p.factory.NewElementAccessExpression(expression, questionDotToken, argumentExpression, core.IfElse(isOptionalChain, ast.NodeFlagsOptionalChain, ast.NodeFlagsNone))
	p.finishNode(elementAccess, pos)
	return elementAccess
}

func (p *Parser) parseCallExpressionRest(pos int, expression *ast.Expression) *ast.Expression {
	for {
		expression = p.parseMemberExpressionRest(pos, expression /*allowOptionalChain*/, true)
		var typeArguments *ast.NodeList
		questionDotToken := p.parseOptionalToken(ast.KindQuestionDotToken)
		if questionDotToken != nil {
			typeArguments = p.tryParseTypeArgumentsInExpression()
			if p.isTemplateStartOfTaggedTemplate() {
				expression = p.parseTaggedTemplateRest(pos, expression, questionDotToken, typeArguments)
				continue
			}
		}
		if typeArguments != nil || p.token == ast.KindOpenParenToken {
			// Absorb type arguments into CallExpression when preceding expression is ExpressionWithTypeArguments
			if questionDotToken == nil && expression.Kind == ast.KindExpressionWithTypeArguments {
				typeArguments = expression.AsExpressionWithTypeArguments().TypeArguments
				expression = expression.AsExpressionWithTypeArguments().Expression
			}
			argumentList := p.parseArgumentList()
			isOptionalChain := questionDotToken != nil || p.tryReparseOptionalChain(expression)
			expression = p.factory.NewCallExpression(expression, questionDotToken, typeArguments, argumentList, core.IfElse(isOptionalChain, ast.NodeFlagsOptionalChain, ast.NodeFlagsNone))
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

func (p *Parser) parseArgumentList() *ast.NodeList {
	p.parseExpected(ast.KindOpenParenToken)
	result := p.parseDelimitedList(PCArgumentExpressions, (*Parser).parseArgumentExpression)
	p.parseExpected(ast.KindCloseParenToken)
	return result
}

func (p *Parser) parseArgumentExpression() *ast.Expression {
	return doInContext(p, ast.NodeFlagsDisallowInContext|ast.NodeFlagsDecoratorContext, false, (*Parser).parseArgumentOrArrayLiteralElement)
}

func (p *Parser) parseArgumentOrArrayLiteralElement() *ast.Expression {
	switch p.token {
	case ast.KindDotDotDotToken:
		return p.parseSpreadElement()
	case ast.KindCommaToken:
		result := p.factory.NewOmittedExpression()
		p.finishNode(result, p.nodePos())
		return result
	}
	return p.parseAssignmentExpressionOrHigher()
}

func (p *Parser) parseSpreadElement() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindDotDotDotToken)
	expression := p.parseAssignmentExpressionOrHigher()
	result := p.factory.NewSpreadElement(expression)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTaggedTemplateRest(pos int, tag *ast.Expression, questionDotToken *ast.Node, typeArguments *ast.NodeList) *ast.Node {
	var template *ast.Expression
	if p.token == ast.KindNoSubstitutionTemplateLiteral {
		p.reScanTemplateToken(true /*isTaggedTemplate*/)
		template = p.parseLiteralExpression(false /*intern*/)
	} else {
		template = p.parseTemplateExpression(true /*isTaggedTemplate*/)
	}
	isOptionalChain := questionDotToken != nil || tag.Flags&ast.NodeFlagsOptionalChain != 0
	result := p.factory.NewTaggedTemplateExpression(tag, questionDotToken, typeArguments, template, core.IfElse(isOptionalChain, ast.NodeFlagsOptionalChain, ast.NodeFlagsNone))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateExpression(isTaggedTemplate bool) *ast.Expression {
	pos := p.nodePos()
	result := p.factory.NewTemplateExpression(p.parseTemplateHead(isTaggedTemplate), p.parseTemplateSpans(isTaggedTemplate))
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseTemplateSpans(isTaggedTemplate bool) *ast.NodeList {
	pos := p.nodePos()
	var list []*ast.Node
	for {
		span := p.parseTemplateSpan(isTaggedTemplate)
		list = append(list, span)
		if span.AsTemplateSpan().Literal.Kind != ast.KindTemplateMiddle {
			break
		}
	}
	return p.newNodeList(core.NewTextRange(pos, p.nodePos()), list)
}

func (p *Parser) parseTemplateSpan(isTaggedTemplate bool) *ast.Node {
	pos := p.nodePos()
	expression := p.parseExpressionAllowIn()
	literal := p.parseLiteralOfTemplateSpan(isTaggedTemplate)
	result := p.factory.NewTemplateSpan(expression, literal)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parsePrimaryExpression() *ast.Expression {
	switch p.token {
	case ast.KindNoSubstitutionTemplateLiteral:
		if p.scanner.TokenFlags()&ast.TokenFlagsIsInvalid != 0 {
			p.reScanTemplateToken(false /*isTaggedTemplate*/)
		}
		fallthrough
	case ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindStringLiteral:
		return p.parseLiteralExpression(false /*intern*/)
	case ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindNullKeyword, ast.KindTrueKeyword, ast.KindFalseKeyword:
		return p.parseKeywordExpression()
	case ast.KindOpenParenToken:
		return p.parseParenthesizedExpression()
	case ast.KindOpenBracketToken:
		return p.parseArrayLiteralExpression()
	case ast.KindOpenBraceToken:
		return p.parseObjectLiteralExpression()
	case ast.KindAsyncKeyword:
		// Async arrow functions are parsed earlier in parseAssignmentExpressionOrHigher.
		// If we encounter `async [no LineTerminator here] function` then this is an async
		// function; otherwise, its an identifier.
		if !p.lookAhead((*Parser).nextTokenIsFunctionKeywordOnSameLine) {
			break
		}
		return p.parseFunctionExpression()
	case ast.KindAtToken:
		return p.parseDecoratedExpression()
	case ast.KindClassKeyword:
		return p.parseClassExpression()
	case ast.KindFunctionKeyword:
		return p.parseFunctionExpression()
	case ast.KindNewKeyword:
		return p.parseNewExpressionOrNewDotTarget()
	case ast.KindSlashToken, ast.KindSlashEqualsToken:
		if p.reScanSlashToken() == ast.KindRegularExpressionLiteral {
			return p.parseLiteralExpression(false /*intern*/)
		}
	case ast.KindTemplateHead:
		return p.parseTemplateExpression(false /*isTaggedTemplate*/)
	case ast.KindPrivateIdentifier:
		return p.parsePrivateIdentifier()
	}
	return p.parseIdentifierWithDiagnostic(diagnostics.Expression_expected, nil)
}

func (p *Parser) parseParenthesizedExpression() *ast.Expression {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	p.parseExpected(ast.KindOpenParenToken)
	expression := p.parseExpressionAllowIn()
	p.parseExpected(ast.KindCloseParenToken)
	result := p.factory.NewParenthesizedExpression(expression)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseArrayLiteralExpression() *ast.Expression {
	pos := p.nodePos()
	openBracketPosition := p.scanner.TokenStart()
	openBracketParsed := p.parseExpected(ast.KindOpenBracketToken)
	multiLine := p.hasPrecedingLineBreak()
	elements := p.parseDelimitedList(PCArrayLiteralMembers, (*Parser).parseArgumentOrArrayLiteralElement)
	p.parseExpectedMatchingBrackets(ast.KindOpenBracketToken, ast.KindCloseBracketToken, openBracketParsed, openBracketPosition)
	result := p.factory.NewArrayLiteralExpression(elements, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectLiteralExpression() *ast.Expression {
	pos := p.nodePos()
	openBracePosition := p.scanner.TokenStart()
	openBraceParsed := p.parseExpected(ast.KindOpenBraceToken)
	multiLine := p.hasPrecedingLineBreak()
	properties := p.parseDelimitedList(PCObjectLiteralMembers, (*Parser).parseObjectLiteralElement)
	p.parseExpectedMatchingBrackets(ast.KindOpenBraceToken, ast.KindCloseBraceToken, openBraceParsed, openBracePosition)
	result := p.factory.NewObjectLiteralExpression(properties, multiLine)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseObjectLiteralElement() *ast.Node {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	if p.parseOptional(ast.KindDotDotDotToken) {
		expression := p.parseAssignmentExpressionOrHigher()
		result := p.factory.NewSpreadAssignment(expression)
		p.finishNode(result, pos)
		p.withJSDoc(result, hasJSDoc)
		return result
	}
	modifiers := p.parseModifiersEx(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	if p.parseContextualModifier(ast.KindGetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindGetAccessor, ParseFlagsNone)
	}
	if p.parseContextualModifier(ast.KindSetKeyword) {
		return p.parseAccessorDeclaration(pos, hasJSDoc, modifiers, ast.KindSetAccessor, ParseFlagsNone)
	}
	asteriskToken := p.parseOptionalToken(ast.KindAsteriskToken)
	tokenIsIdentifier := p.isIdentifier()
	name := p.parsePropertyName()
	// Disallowing of optional property assignments and definite assignment assertion happens in the grammar checker.
	postfixToken := p.parseOptionalToken(ast.KindQuestionToken)
	// Decorators, Modifiers, questionToken, and exclamationToken are not supported by property assignments and are reported in the grammar checker
	if postfixToken == nil {
		postfixToken = p.parseOptionalToken(ast.KindExclamationToken)
	}
	if asteriskToken != nil || p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken {
		return p.parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, postfixToken, nil /*diagnosticMessage*/)
	}
	// check if it is short-hand property assignment or normal property assignment
	// NOTE: if token is EqualsToken it is interpreted as CoverInitializedName production
	// CoverInitializedName[Yield] :
	//     IdentifierReference[?Yield] Initializer[In, ?Yield]
	// this is necessary because ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern
	var node *ast.Node
	isShorthandPropertyAssignment := tokenIsIdentifier && p.token != ast.KindColonToken
	if isShorthandPropertyAssignment {
		equalsToken := p.parseOptionalToken(ast.KindEqualsToken)
		var initializer *ast.Expression
		if equalsToken != nil {
			initializer = doInContext(p, ast.NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		}
		node = p.factory.NewShorthandPropertyAssignment(modifiers, name, postfixToken, equalsToken, initializer)
	} else {
		p.parseExpected(ast.KindColonToken)
		initializer := doInContext(p, ast.NodeFlagsDisallowInContext, false, (*Parser).parseAssignmentExpressionOrHigher)
		node = p.factory.NewPropertyAssignment(modifiers, name, postfixToken, initializer)
	}
	p.finishNode(node, pos)
	p.withJSDoc(node, hasJSDoc)
	return node
}

func (p *Parser) parseFunctionExpression() *ast.Expression {
	// GeneratorExpression:
	//      function* BindingIdentifier [Yield][opt](FormalParameters[Yield]){ GeneratorBody }
	//
	// FunctionExpression:
	//      function BindingIdentifier[opt](FormalParameters){ FunctionBody }
	saveContexFlags := p.contextFlags
	p.setContextFlags(ast.NodeFlagsDecoratorContext, false)
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiers()
	p.parseExpected(ast.KindFunctionKeyword)
	asteriskToken := p.parseOptionalToken(ast.KindAsteriskToken)
	isGenerator := asteriskToken != nil
	isAsync := modifierListHasAsync(modifiers)
	signatureFlags := core.IfElse(isGenerator, ParseFlagsYield, ParseFlagsNone) | core.IfElse(isAsync, ParseFlagsAwait, ParseFlagsNone)
	var name *ast.Node
	switch {
	case isGenerator && isAsync:
		name = doInContext(p, ast.NodeFlagsYieldContext|ast.NodeFlagsAwaitContext, true, (*Parser).parseOptionalBindingIdentifier)
	case isGenerator:
		name = doInContext(p, ast.NodeFlagsYieldContext, true, (*Parser).parseOptionalBindingIdentifier)
	case isAsync:
		name = doInContext(p, ast.NodeFlagsAwaitContext, true, (*Parser).parseOptionalBindingIdentifier)
	default:
		name = p.parseOptionalBindingIdentifier()
	}
	typeParameters := p.parseTypeParameters()
	parameters := p.parseParameters(signatureFlags)
	returnType := p.parseReturnType(ast.KindColonToken, false /*isType*/)
	body := p.parseFunctionBlock(signatureFlags, nil /*diagnosticMessage*/)
	p.contextFlags = saveContexFlags
	result := p.factory.NewFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, returnType, body)
	p.finishNode(result, pos)
	p.withJSDoc(result, hasJSDoc)
	return result
}

func (p *Parser) parseOptionalBindingIdentifier() *ast.Node {
	if p.isBindingIdentifier() {
		return p.parseBindingIdentifier()
	}
	return nil
}

func (p *Parser) parseDecoratedExpression() *ast.Expression {
	pos := p.nodePos()
	hasJSDoc := p.hasPrecedingJSDocComment()
	modifiers := p.parseModifiersEx(true /*allowDecorators*/, false /*permitConstAsModifier*/, false /*stopOnStartOfClassStaticBlock*/)
	if p.token == ast.KindClassKeyword {
		return p.parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, ast.KindClassExpression)
	}
	p.parseErrorAt(p.nodePos(), p.nodePos(), diagnostics.Expression_expected)
	result := p.factory.NewMissingDeclaration(modifiers)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseNewExpressionOrNewDotTarget() *ast.Node {
	pos := p.nodePos()
	p.parseExpected(ast.KindNewKeyword)
	if p.parseOptional(ast.KindDotToken) {
		name := p.parseIdentifierName()
		result := p.factory.NewMetaProperty(ast.KindNewKeyword, name)
		p.finishNode(result, pos)
		return result
	}
	expressionPos := p.nodePos()
	expression := p.parseMemberExpressionRest(expressionPos, p.parsePrimaryExpression(), false /*allowOptionalChain*/)
	var typeArguments *ast.NodeList
	// Absorb type arguments into NewExpression when preceding expression is ExpressionWithTypeArguments
	if expression.Kind == ast.KindExpressionWithTypeArguments {
		typeArguments = expression.AsExpressionWithTypeArguments().TypeArguments
		expression = expression.AsExpressionWithTypeArguments().Expression
	}
	if p.token == ast.KindQuestionDotToken {
		p.parseErrorAtCurrentToken(diagnostics.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0, scanner.GetTextOfNodeFromSourceText(p.sourceText, expression, false /*includeTrivia*/))
	}
	var argumentList *ast.NodeList
	if p.token == ast.KindOpenParenToken {
		argumentList = p.parseArgumentList()
	}
	result := p.factory.NewNewExpression(expression, typeArguments, argumentList)
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseKeywordExpression() *ast.Node {
	pos := p.nodePos()
	result := p.factory.NewKeywordExpression(p.token)
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseLiteralExpression(intern bool) *ast.Node {
	pos := p.nodePos()
	text := p.scanner.TokenValue()
	if intern {
		text = p.internIdentifier(text)
	}
	tokenFlags := p.scanner.TokenFlags()
	var result *ast.Node
	switch p.token {
	case ast.KindStringLiteral:
		result = p.factory.NewStringLiteral(text)
		result.AsStringLiteral().TokenFlags |= tokenFlags & ast.TokenFlagsStringLiteralFlags
	case ast.KindNumericLiteral:
		result = p.factory.NewNumericLiteral(text)
		result.AsNumericLiteral().TokenFlags |= tokenFlags & ast.TokenFlagsNumericLiteralFlags
	case ast.KindBigIntLiteral:
		result = p.factory.NewBigIntLiteral(text)
		result.AsBigIntLiteral().TokenFlags |= tokenFlags & ast.TokenFlagsNumericLiteralFlags
	case ast.KindRegularExpressionLiteral:
		result = p.factory.NewRegularExpressionLiteral(text)
		result.AsRegularExpressionLiteral().TokenFlags |= tokenFlags & ast.TokenFlagsRegularExpressionLiteralFlags
	case ast.KindNoSubstitutionTemplateLiteral:
		result = p.factory.NewNoSubstitutionTemplateLiteral(text)
		result.AsNoSubstitutionTemplateLiteral().TokenFlags |= tokenFlags & ast.TokenFlagsTemplateLiteralLikeFlags
	default:
		panic("Unhandled case in parseLiteralExpression")
	}
	p.nextToken()
	p.finishNode(result, pos)
	return result
}

func (p *Parser) parseIdentifierNameErrorOnUnicodeEscapeSequence() *ast.Node {
	if p.scanner.HasUnicodeEscape() || p.scanner.HasExtendedUnicodeEscape() {
		p.parseErrorAtCurrentToken(diagnostics.Unicode_escape_sequence_cannot_appear_here)
	}
	return p.createIdentifier(tokenIsIdentifierOrKeyword(p.token))
}

func (p *Parser) parseBindingIdentifier() *ast.Node {
	return p.parseBindingIdentifierWithDiagnostic(nil)
}

func (p *Parser) parseBindingIdentifierWithDiagnostic(privateIdentifierDiagnosticMessage *diagnostics.Message) *ast.Node {
	saveHasAwaitIdentifier := p.statementHasAwaitIdentifier
	id := p.createIdentifierWithDiagnostic(p.isBindingIdentifier(), nil /*diagnosticMessage*/, privateIdentifierDiagnosticMessage)
	p.statementHasAwaitIdentifier = saveHasAwaitIdentifier
	return id
}

func (p *Parser) parseIdentifierName() *ast.Node {
	return p.parseIdentifierNameWithDiagnostic(nil)
}

func (p *Parser) parseIdentifierNameWithDiagnostic(diagnosticMessage *diagnostics.Message) *ast.Node {
	return p.createIdentifierWithDiagnostic(tokenIsIdentifierOrKeyword(p.token), diagnosticMessage, nil)
}

func (p *Parser) parseIdentifier() *ast.Node {
	return p.parseIdentifierWithDiagnostic(nil, nil)
}

func (p *Parser) parseIdentifierWithDiagnostic(diagnosticMessage *diagnostics.Message, privateIdentifierDiagnosticMessage *diagnostics.Message) *ast.Node {
	return p.createIdentifierWithDiagnostic(p.isIdentifier(), diagnosticMessage, privateIdentifierDiagnosticMessage)
}

func (p *Parser) createIdentifier(isIdentifier bool) *ast.Node {
	return p.createIdentifierWithDiagnostic(isIdentifier, nil, nil)
}

func (p *Parser) createIdentifierWithDiagnostic(isIdentifier bool, diagnosticMessage *diagnostics.Message, privateIdentifierDiagnosticMessage *diagnostics.Message) *ast.Node {
	if isIdentifier {
		var pos int
		if p.scanner.HasPrecedingJSDocLeadingAsterisks() {
			pos = p.scanner.TokenStart()
		} else {
			pos = p.nodePos()
		}
		text := p.scanner.TokenValue()
		p.nextTokenWithoutCheck()
		result := p.newIdentifier(p.internIdentifier(text))
		p.finishNode(result, pos)
		return result
	}
	if p.token == ast.KindPrivateIdentifier {
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
	return p.createMissingIdentifier()
}

func (p *Parser) internIdentifier(text string) string {
	if identifier, ok := p.identifiers[text]; ok {
		return identifier
	}
	identifier := text
	if p.identifiers == nil {
		p.identifiers = make(map[string]string)
	}
	p.identifiers[identifier] = identifier
	return identifier
}

func (p *Parser) newNodeList(loc core.TextRange, nodes []*ast.Node) *ast.NodeList {
	list := p.factory.NewNodeList(nodes)
	list.Loc = loc
	return list
}

func (p *Parser) newModifierList(loc core.TextRange, nodes []*ast.Node) *ast.ModifierList {
	list := p.factory.NewModifierList(nodes)
	list.Loc = loc
	return list
}

func (p *Parser) finishNode(node *ast.Node, pos int) {
	p.finishNodeWithEnd(node, pos, p.nodePos())
}

func (p *Parser) finishNodeWithEnd(node *ast.Node, pos int, end int) {
	node.Loc = core.NewTextRange(pos, end)
	node.Flags |= p.contextFlags
	if p.hasParseError {
		node.Flags |= ast.NodeFlagsThisNodeHasError
		p.hasParseError = false
	}
}

func (p *Parser) nextTokenIsSlash() bool {
	return p.nextToken() == ast.KindSlashToken
}

func (p *Parser) scanTypeMemberStart() bool {
	// Return true if we have the start of a signature member
	if p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken || p.token == ast.KindGetKeyword || p.token == ast.KindSetKeyword {
		return true
	}
	idToken := false
	// Eat up all modifiers, but hold on to the last one in case it is actually an identifier
	for ast.IsModifierKind(p.token) {
		idToken = true
		p.nextToken()
	}
	// Index signatures and computed property names are type members
	if p.token == ast.KindOpenBracketToken {
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
		return p.token == ast.KindOpenParenToken || p.token == ast.KindLessThanToken || p.token == ast.KindQuestionToken || p.token == ast.KindColonToken || p.token == ast.KindCommaToken || p.canParseSemicolon()
	}
	return false
}

func (p *Parser) scanClassMemberStart() bool {
	idToken := ast.KindUnknown
	if p.token == ast.KindAtToken {
		return true
	}
	// Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
	for ast.IsModifierKind(p.token) {
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
	if p.token == ast.KindAsteriskToken {
		return true
	}
	// Try to get the first property-like token following all modifiers.
	// This can either be an identifier or the 'get' or 'set' keywords.
	if p.isLiteralPropertyName() {
		idToken = p.token
		p.nextToken()
	}
	// Index signatures and computed properties are class members; we can parse.
	if p.token == ast.KindOpenBracketToken {
		return true
	}
	// If we were able to get any potential identifier...
	if idToken != ast.KindUnknown {
		// If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
		if !isKeyword(idToken) || idToken == ast.KindSetKeyword || idToken == ast.KindGetKeyword {
			return true
		}
		// If it *is* a keyword, but not an accessor, check a little farther along
		// to see if it should actually be parsed as a class member.
		switch p.token {
		case ast.KindOpenParenToken, // Method declaration
			ast.KindLessThanToken,    // Generic Method declaration
			ast.KindExclamationToken, // Non-null assertion on property name
			ast.KindColonToken,       // Type Annotation for declaration
			ast.KindEqualsToken,      // Initializer for declaration
			ast.KindQuestionToken:    // Not valid, but permitted so that it gets caught later on.
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
	return p.token == ast.KindSemicolonToken || p.token == ast.KindCloseBraceToken || p.token == ast.KindEndOfFile || p.hasPrecedingLineBreak()
}

func (p *Parser) tryParseSemicolon() bool {
	if !p.canParseSemicolon() {
		return false
	}
	if p.token == ast.KindSemicolonToken {
		// consume the semicolon if it was explicitly provided.
		p.nextToken()
	}
	return true
}

func (p *Parser) parseSemicolon() bool {
	return p.tryParseSemicolon() || p.parseExpected(ast.KindSemicolonToken)
}

func (p *Parser) isLiteralPropertyName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindStringLiteral || p.token == ast.KindNumericLiteral || p.token == ast.KindBigIntLiteral
}

func (p *Parser) isStartOfStatement() bool {
	switch p.token {
	// 'catch' and 'finally' do not actually indicate that the code is part of a statement,
	// however, we say they are here so that we may gracefully parse them and error later.
	case ast.KindAtToken, ast.KindSemicolonToken, ast.KindOpenBraceToken, ast.KindVarKeyword, ast.KindLetKeyword,
		ast.KindUsingKeyword, ast.KindFunctionKeyword, ast.KindClassKeyword, ast.KindEnumKeyword, ast.KindIfKeyword,
		ast.KindDoKeyword, ast.KindWhileKeyword, ast.KindForKeyword, ast.KindContinueKeyword, ast.KindBreakKeyword,
		ast.KindReturnKeyword, ast.KindWithKeyword, ast.KindSwitchKeyword, ast.KindThrowKeyword, ast.KindTryKeyword,
		ast.KindDebuggerKeyword, ast.KindCatchKeyword, ast.KindFinallyKeyword:
		return true
	case ast.KindImportKeyword:
		return p.isStartOfDeclaration() || p.isNextTokenOpenParenOrLessThanOrDot()
	case ast.KindConstKeyword, ast.KindExportKeyword:
		return p.isStartOfDeclaration()
	case ast.KindAsyncKeyword, ast.KindDeclareKeyword, ast.KindInterfaceKeyword, ast.KindModuleKeyword, ast.KindNamespaceKeyword,
		ast.KindTypeKeyword, ast.KindGlobalKeyword:
		// When these don't start a declaration, they're an identifier in an expression statement
		return true
	case ast.KindAccessorKeyword, ast.KindPublicKeyword, ast.KindPrivateKeyword, ast.KindProtectedKeyword, ast.KindStaticKeyword,
		ast.KindReadonlyKeyword:
		// When these don't start a declaration, they may be the start of a class member if an identifier
		// immediately follows. Otherwise they're an identifier in an expression statement.
		return p.isStartOfDeclaration() || !p.lookAhead((*Parser).nextTokenIsIdentifierOrKeywordOnSameLine)

	default:
		return p.isStartOfExpression()
	}
}

func (p *Parser) isStartOfDeclaration() bool {
	return p.lookAhead((*Parser).scanStartOfDeclaration)
}

func (p *Parser) scanStartOfDeclaration() bool {
	for {
		switch p.token {
		case ast.KindVarKeyword, ast.KindLetKeyword, ast.KindConstKeyword, ast.KindFunctionKeyword, ast.KindClassKeyword,
			ast.KindEnumKeyword:
			return true
		case ast.KindUsingKeyword:
			return p.isUsingDeclaration()
		case ast.KindAwaitKeyword:
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
		case ast.KindInterfaceKeyword, ast.KindTypeKeyword:
			return p.nextTokenIsIdentifierOnSameLine()
		case ast.KindModuleKeyword, ast.KindNamespaceKeyword:
			return p.nextTokenIsIdentifierOrStringLiteralOnSameLine()
		case ast.KindAbstractKeyword, ast.KindAccessorKeyword, ast.KindAsyncKeyword, ast.KindDeclareKeyword, ast.KindPrivateKeyword,
			ast.KindProtectedKeyword, ast.KindPublicKeyword, ast.KindReadonlyKeyword:
			previousToken := p.token
			p.nextToken()
			// ASI takes effect for this modifier.
			if p.hasPrecedingLineBreak() {
				return false
			}
			if previousToken == ast.KindDeclareKeyword && p.token == ast.KindTypeKeyword {
				// If we see 'declare type', then commit to parsing a type alias. parseTypeAliasDeclaration will
				// report Line_break_not_permitted_here if needed.
				return true
			}
			continue
		case ast.KindGlobalKeyword:
			p.nextToken()
			return p.token == ast.KindOpenBraceToken || p.token == ast.KindIdentifier || p.token == ast.KindExportKeyword
		case ast.KindImportKeyword:
			p.nextToken()
			return p.token == ast.KindStringLiteral || p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBraceToken || tokenIsIdentifierOrKeyword(p.token)
		case ast.KindExportKeyword:
			p.nextToken()
			if p.token == ast.KindEqualsToken || p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBraceToken ||
				p.token == ast.KindDefaultKeyword || p.token == ast.KindAsKeyword || p.token == ast.KindAtToken {
				return true
			}
			if p.token == ast.KindTypeKeyword {
				p.nextToken()
				return p.token == ast.KindAsteriskToken || p.token == ast.KindOpenBraceToken || p.isIdentifier() && !p.hasPrecedingLineBreak()
			}
			continue
		case ast.KindStaticKeyword:
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
	case ast.KindPlusToken, ast.KindMinusToken, ast.KindTildeToken, ast.KindExclamationToken, ast.KindDeleteKeyword,
		ast.KindTypeOfKeyword, ast.KindVoidKeyword, ast.KindPlusPlusToken, ast.KindMinusMinusToken, ast.KindLessThanToken,
		ast.KindAwaitKeyword, ast.KindYieldKeyword, ast.KindPrivateIdentifier, ast.KindAtToken:
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
	case ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindNullKeyword, ast.KindTrueKeyword, ast.KindFalseKeyword,
		ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateHead,
		ast.KindOpenParenToken, ast.KindOpenBracketToken, ast.KindOpenBraceToken, ast.KindFunctionKeyword, ast.KindClassKeyword,
		ast.KindNewKeyword, ast.KindSlashToken, ast.KindSlashEqualsToken, ast.KindIdentifier:
		return true
	case ast.KindImportKeyword:
		return p.isNextTokenOpenParenOrLessThanOrDot()
	}
	return p.isIdentifier()
}

func (p *Parser) isStartOfType(inStartOfParameter bool) bool {
	switch p.token {
	case ast.KindAnyKeyword, ast.KindUnknownKeyword, ast.KindStringKeyword, ast.KindNumberKeyword, ast.KindBigIntKeyword,
		ast.KindBooleanKeyword, ast.KindReadonlyKeyword, ast.KindSymbolKeyword, ast.KindUniqueKeyword, ast.KindVoidKeyword,
		ast.KindUndefinedKeyword, ast.KindNullKeyword, ast.KindThisKeyword, ast.KindTypeOfKeyword, ast.KindNeverKeyword,
		ast.KindOpenBraceToken, ast.KindOpenBracketToken, ast.KindLessThanToken, ast.KindBarToken, ast.KindAmpersandToken,
		ast.KindNewKeyword, ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindTrueKeyword,
		ast.KindFalseKeyword, ast.KindObjectKeyword, ast.KindAsteriskToken, ast.KindQuestionToken, ast.KindExclamationToken,
		ast.KindDotDotDotToken, ast.KindInferKeyword, ast.KindImportKeyword, ast.KindAssertsKeyword, ast.KindNoSubstitutionTemplateLiteral,
		ast.KindTemplateHead:
		return true
	case ast.KindFunctionKeyword:
		return !inStartOfParameter
	case ast.KindMinusToken:
		return !inStartOfParameter && p.lookAhead((*Parser).nextTokenIsNumericOrBigIntLiteral)
	case ast.KindOpenParenToken:
		// Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
		// or something that starts a type. We don't want to consider things like '(1)' a type.
		return !inStartOfParameter && p.lookAhead((*Parser).nextIsParenthesizedOrFunctionType)
	}
	return p.isIdentifier()
}

func (p *Parser) nextTokenIsNumericOrBigIntLiteral() bool {
	p.nextToken()
	return p.token == ast.KindNumericLiteral || p.token == ast.KindBigIntLiteral
}

func (p *Parser) nextIsParenthesizedOrFunctionType() bool {
	p.nextToken()
	return p.token == ast.KindCloseParenToken || p.isStartOfParameter(false /*isJSDocParameter*/) || p.isStartOfType(false /*inStartOfParameter*/)
}

func (p *Parser) isStartOfParameter(isJSDocParameter bool) bool {
	return p.token == ast.KindDotDotDotToken ||
		p.isBindingIdentifierOrPrivateIdentifierOrPattern() ||
		ast.IsModifierKind(p.token) ||
		p.token == ast.KindAtToken ||
		p.isStartOfType(!isJSDocParameter /*inStartOfParameter*/)
}

func (p *Parser) isBindingIdentifierOrPrivateIdentifierOrPattern() bool {
	return p.token == ast.KindOpenBraceToken || p.token == ast.KindOpenBracketToken || p.token == ast.KindPrivateIdentifier || p.isBindingIdentifier()
}

func (p *Parser) isNextTokenOpenParenOrLessThanOrDot() bool {
	return p.lookAhead((*Parser).nextTokenIsOpenParenOrLessThanOrDot)
}

func (p *Parser) nextTokenIsOpenParenOrLessThanOrDot() bool {
	switch p.nextToken() {
	case ast.KindOpenParenToken, ast.KindLessThanToken, ast.KindDotToken:
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
	return (p.isIdentifier() || p.token == ast.KindStringLiteral) && !p.hasPrecedingLineBreak()
}

// Ignore strict mode flag because we will report an error in type checker instead.
func (p *Parser) isIdentifier() bool {
	if p.token == ast.KindIdentifier {
		return true
	}
	// If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
	// considered a keyword and is not an identifier.
	// If we have a 'await' keyword, and we're in the [Await] context, then 'await' is
	// considered a keyword and is not an identifier.
	if p.token == ast.KindYieldKeyword && p.inYieldContext() || p.token == ast.KindAwaitKeyword && p.inAwaitContext() {
		return false
	}
	return p.token > ast.KindLastReservedWord
}

func (p *Parser) isBindingIdentifier() bool {
	// `let await`/`let yield` in [Yield] or [Await] are allowed here and disallowed in the binder.
	return p.token == ast.KindIdentifier || p.token > ast.KindLastReservedWord
}

func (p *Parser) isImportAttributeName() bool {
	return tokenIsIdentifierOrKeyword(p.token) || p.token == ast.KindStringLiteral
}

func (p *Parser) isBinaryOperator() bool {
	if p.inDisallowInContext() && p.token == ast.KindInKeyword {
		return false
	}
	return ast.GetBinaryOperatorPrecedence(p.token) != ast.OperatorPrecedenceInvalid
}

func (p *Parser) isValidHeritageClauseObjectLiteral() bool {
	return p.lookAhead((*Parser).nextIsValidHeritageClauseObjectLiteral)
}

func (p *Parser) nextIsValidHeritageClauseObjectLiteral() bool {
	if p.nextToken() == ast.KindCloseBraceToken {
		// if we see "extends {}" then only treat the {} as what we're extending (and not
		// the class body) if we have:
		//
		//      extends {} {
		//      extends {},
		//      extends {} extends
		//      extends {} implements
		next := p.nextToken()
		return next == ast.KindCommaToken || next == ast.KindOpenBraceToken || next == ast.KindExtendsKeyword || next == ast.KindImplementsKeyword
	}
	return true
}

func (p *Parser) isHeritageClause() bool {
	return p.token == ast.KindExtendsKeyword || p.token == ast.KindImplementsKeyword
}

func (p *Parser) isHeritageClauseExtendsOrImplementsKeyword() bool {
	return p.isHeritageClause() && p.lookAhead((*Parser).nextIsStartOfExpression)
}

func (p *Parser) nextIsStartOfExpression() bool {
	p.nextToken()
	return p.isStartOfExpression()
}

func (p *Parser) isUsingDeclaration() bool {
	// 'using' always starts a lexical declaration if followed by an identifier. We also eagerly parse
	// |ObjectBindingPattern| so that we can report a grammar error during check. We don't parse out
	// |ArrayBindingPattern| since it potentially conflicts with element access (i.e., `using[x]`).
	return p.lookAhead((*Parser).nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine)
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine() bool {
	p.nextToken()
	return p.isBindingIdentifier() || p.token == ast.KindOpenBraceToken && !p.hasPrecedingLineBreak()
}

func (p *Parser) nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf() bool {
	return p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine() && p.token != ast.KindOfKeyword
}

func (p *Parser) isAwaitUsingDeclaration() bool {
	return p.lookAhead((*Parser).nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine)
}

func (p *Parser) nextIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine() bool {
	return p.nextToken() == ast.KindUsingKeyword && p.nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine()
}

func (p *Parser) nextTokenIsTokenStringLiteral() bool {
	return p.nextToken() == ast.KindStringLiteral
}

func (p *Parser) setContextFlags(flags ast.NodeFlags, value bool) {
	if value {
		p.contextFlags |= flags
	} else {
		p.contextFlags &= ^flags
	}
}

func doInContext[T any](p *Parser, flags ast.NodeFlags, value bool, f func(p *Parser) T) T {
	saveContextFlags := p.contextFlags
	p.setContextFlags(flags, value)
	result := f(p)
	p.contextFlags = saveContextFlags
	return result
}

func (p *Parser) inYieldContext() bool {
	return p.contextFlags&ast.NodeFlagsYieldContext != 0
}

func (p *Parser) inDisallowInContext() bool {
	return p.contextFlags&ast.NodeFlagsDisallowInContext != 0
}

func (p *Parser) inDisallowConditionalTypesContext() bool {
	return p.contextFlags&ast.NodeFlagsDisallowConditionalTypesContext != 0
}

func (p *Parser) inDecoratorContext() bool {
	return p.contextFlags&ast.NodeFlagsDecoratorContext != 0
}

func (p *Parser) inAwaitContext() bool {
	return p.contextFlags&ast.NodeFlagsAwaitContext != 0
}

func (p *Parser) skipRangeTrivia(textRange core.TextRange) core.TextRange {
	return core.NewTextRange(scanner.SkipTrivia(p.sourceText, textRange.Pos()), textRange.End())
}

func isClassMemberModifier(token ast.Kind) bool {
	return isParameterPropertyModifier(token) || token == ast.KindStaticKeyword || token == ast.KindOverrideKeyword || token == ast.KindAccessorKeyword
}

func isParameterPropertyModifier(kind ast.Kind) bool {
	return ast.ModifierToFlag(kind)&ast.ModifierFlagsParameterPropertyModifier != 0
}

func isKeyword(token ast.Kind) bool {
	return ast.KindFirstKeyword <= token && token <= ast.KindLastKeyword
}

func isReservedWord(token ast.Kind) bool {
	return ast.KindFirstReservedWord <= token && token <= ast.KindLastReservedWord
}

func isFileProbablyExternalModule(sourceFile *ast.SourceFile) *ast.Node {
	for _, statement := range sourceFile.Statements.Nodes {
		if ast.IsExternalModuleIndicator(statement) {
			return statement
		}
	}
	return getImportMetaIfNecessary(sourceFile)
}

func getImportMetaIfNecessary(sourceFile *ast.SourceFile) *ast.Node {
	if sourceFile.AsNode().Flags&ast.NodeFlagsPossiblyContainsImportMeta != 0 {
		return findChildNode(sourceFile.AsNode(), ast.IsImportMeta)
	}
	return nil
}

func findChildNode(root *ast.Node, check func(*ast.Node) bool) *ast.Node {
	var result *ast.Node
	var visit func(*ast.Node) bool
	visit = func(node *ast.Node) bool {
		if check(node) {
			result = node
			return true
		}
		return node.ForEachChild(visit)
	}
	visit(root)
	return result
}

func tagNamesAreEquivalent(lhs *ast.Expression, rhs *ast.Expression) bool {
	if lhs.Kind != rhs.Kind {
		return false
	}
	switch lhs.Kind {
	case ast.KindIdentifier:
		return lhs.AsIdentifier().Text == rhs.AsIdentifier().Text
	case ast.KindThisKeyword:
		return true
	case ast.KindJsxNamespacedName:
		return lhs.AsJsxNamespacedName().Namespace.AsIdentifier().Text == rhs.AsJsxNamespacedName().Namespace.AsIdentifier().Text &&
			lhs.AsJsxNamespacedName().Name().AsIdentifier().Text == rhs.AsJsxNamespacedName().Name().AsIdentifier().Text
	case ast.KindPropertyAccessExpression:
		return lhs.AsPropertyAccessExpression().Name().Text() == rhs.AsPropertyAccessExpression().Name().Text() &&
			tagNamesAreEquivalent(lhs.AsPropertyAccessExpression().Expression, rhs.AsPropertyAccessExpression().Expression)
	}
	panic("Unhandled case in tagNamesAreEquivalent")
}

func attachFileToDiagnostics(diagnostics []*ast.Diagnostic, file *ast.SourceFile) []*ast.Diagnostic {
	for _, d := range diagnostics {
		d.SetFile(file)
		for _, r := range d.RelatedInformation() {
			r.SetFile(file)
		}
	}
	return diagnostics
}

func getCommentPragmas(f *ast.NodeFactory, sourceText string) (pragmas []ast.Pragma) {
	for commentRange := range scanner.GetLeadingCommentRanges(f, sourceText, 0) {
		comment := sourceText[commentRange.Pos():commentRange.End()]
		pragmas = append(pragmas, extractPragmas(commentRange, comment)...)
	}

	return pragmas
}

var ReferencePragmaSpec = &ast.PragmaSpecification{
	Args: []ast.PragmaArgumentSpecification{
		{Name: "types", Optional: false, CaptureSpan: true},
		{Name: "lib", Optional: false, CaptureSpan: true},
		{Name: "path", Optional: false, CaptureSpan: true},
		{Name: "no-default-lib", Optional: false, CaptureSpan: true},
		{Name: "resolution-mode", Optional: false, CaptureSpan: true},
		{Name: "preserve", Optional: false, CaptureSpan: true},
	},
	Kind: ast.PragmaKindTripleSlashXML,
}

func getCommentPragmaSpec(name string) (*ast.PragmaSpecification, bool) {
	switch name {
	case "reference":
		return ReferencePragmaSpec, true
	default:
		return nil, false
	}
}

type NamedArgRegEx struct {
	regex *regexp.Regexp
	once  sync.Once
}

var namedArgRegExCache sync.Map

func getNamedArgRegEx(name string) *regexp.Regexp {
	value, _ := namedArgRegExCache.LoadOrStore(name, &NamedArgRegEx{})
	namedArgRegex := value.(*NamedArgRegEx)
	namedArgRegex.once.Do(func() {
		namedArgRegex.regex = regexp.MustCompile(fmt.Sprintf(`(?im)(\s%s\s*=\s*)(?:(?:'([^']*)')|(?:"([^"]*)"))`, name))
	})
	return namedArgRegex.regex
}

var (
	tripleSlashXMLCommentStartRegEx = regexp.MustCompile(`(?m)^\/\/\/\s*<(\S+)\s.*?\/>`)
	singleLinePragmaRegEx           = regexp.MustCompile(`(?m)^\/\/\/?\s*@([^\s:]+)((?:[^\S\r\n]|:).*)?$`)
)

func extractPragmas(commentRange ast.CommentRange, text string) []ast.Pragma {
	if commentRange.Kind == ast.KindSingleLineCommentTrivia {
		matches := tripleSlashXMLCommentStartRegEx.FindStringSubmatch(text)
		if len(matches) < 2 {
			return nil
		}

		name := strings.ToLower(matches[1])
		pragmaSpec, ok := getCommentPragmaSpec(name)
		if !(ok && pragmaSpec.IsTripleSlash()) {
			return nil
		}

		pragma := ast.Pragma{
			Name:      name,
			Args:      make(map[string]ast.PragmaArgument),
			ArgsRange: commentRange,
		}
		if len(pragmaSpec.Args) > 0 {
			for _, argSpec := range pragmaSpec.Args {
				argMatcher := getNamedArgRegEx(argSpec.Name)
				argMatchIndicies := argMatcher.FindStringSubmatchIndex(text)
				argMatches := argMatcher.FindStringSubmatch(text)
				if len(argMatches) < 2 {
					continue
				}
				var value string
				if argMatches[2] != "" {
					value = argMatches[2]
				} else if len(argMatches) > 3 {
					value = argMatches[3]
				}
				if argSpec.CaptureSpan {
					startPos := commentRange.Pos() + argMatchIndicies[0] + len(argMatches[1]) + 1

					newArg := ast.PragmaArgument{
						Name:      argSpec.Name,
						Value:     value,
						TextRange: core.NewTextRange(startPos, startPos+len(value)),
					}

					pragma.Args[argSpec.Name] = newArg
				} else {
					newArg := ast.PragmaArgument{
						Value: value,
					}

					pragma.Args[argSpec.Name] = newArg
				}
			}
		}
		return []ast.Pragma{pragma}
	}
	return nil

	// const singleLine = range.kind === SyntaxKind.SingleLineCommentTrivia && singleLinePragmaRegEx.exec(text);
	// if (singleLine) {
	//     return addPragmaForMatch(pragmas, range, PragmaKindFlags.SingleLine, singleLine);
	// }

	// if (range.kind === SyntaxKind.MultiLineCommentTrivia) {
	//     const multiLinePragmaRegEx = /@(\S+)(\s+(?:\S.*)?)?$/gm; // Defined inline since it uses the "g" flag, which keeps a persistent index (for iterating)
	//     let multiLineMatch: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
	//     while (multiLineMatch = multiLinePragmaRegEx.exec(text)) {
	//         addPragmaForMatch(pragmas, range, PragmaKindFlags.MultiLine, multiLineMatch);
	//     }
	// }
}

func processPragmasIntoFields(context *ast.SourceFile /* !!! reportDiagnostic func(*ast.Diagnostic)*/) {
	// context.CheckJsDirective = nil
	context.ReferencedFiles = nil
	context.TypeReferenceDirectives = nil
	context.LibReferenceDirectives = nil
	// context.AmdDependencies = nil
	context.HasNoDefaultLib = false
	for _, pragma := range context.Pragmas {
		switch pragma.Name {
		case "reference":
			types, typesOk := pragma.Args["types"]
			lib, libOk := pragma.Args["lib"]
			path, pathOk := pragma.Args["path"]
			resolutionMode, resolutionModeOk := pragma.Args["resolution-mode"]
			preserve, preserveOk := pragma.Args["preserve"]
			noDefaultLib, noDefaultLibOk := pragma.Args["no-default-lib"]

			if noDefaultLibOk && noDefaultLib.Value == "true" {
				context.HasNoDefaultLib = true
			} else if typesOk {
				var parsed core.ResolutionMode
				if resolutionModeOk {
					parsed = parseResolutionMode(resolutionMode.Value, types.Pos(), types.End() /*, reportDiagnostic*/)
				}
				context.TypeReferenceDirectives = append(context.TypeReferenceDirectives, &ast.FileReference{
					TextRange:      types.TextRange,
					FileName:       types.Value,
					ResolutionMode: parsed,
					Preserve:       preserveOk && preserve.Value == "true",
				})
			} else if libOk {
				context.LibReferenceDirectives = append(context.LibReferenceDirectives, &ast.FileReference{
					TextRange: types.TextRange,
					FileName:  lib.Value,
					Preserve:  preserveOk && preserve.Value == "true",
				})
			} else if pathOk {
				context.ReferencedFiles = append(context.ReferencedFiles, &ast.FileReference{
					TextRange: types.TextRange,
					FileName:  path.Value,
					Preserve:  preserveOk && preserve.Value == "true",
				})
			} else {
				// reportDiagnostic(argMap.Pos, argMap.End-argMap.Pos, "Invalid reference directive syntax")
			}

		default:
			panic("Unhandled pragma kind")
		}
	}
}

func parseResolutionMode(mode string, pos int, end int /*reportDiagnostic: PragmaDiagnosticReporter*/) (resolutionKind core.ResolutionMode) {
	if mode == "import" {
		resolutionKind = core.ModuleKindESNext
	}
	if mode == "require" {
		resolutionKind = core.ModuleKindCommonJS
	}
	return resolutionKind
	// reportDiagnostic(pos, end - pos, Diagnostics.resolution_mode_should_be_either_require_or_import);
	// return undefined;
}
