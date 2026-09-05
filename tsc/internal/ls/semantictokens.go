package ls

import (
	"cmp"
	"context"
	"fmt"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

// tokenTypes defines the order of token types for encoding
var tokenTypes = []lsproto.SemanticTokenType{
	lsproto.SemanticTokenTypeNamespace,
	lsproto.SemanticTokenTypeClass,
	lsproto.SemanticTokenTypeEnum,
	lsproto.SemanticTokenTypeInterface,
	lsproto.SemanticTokenTypeStruct,
	lsproto.SemanticTokenTypeTypeParameter,
	lsproto.SemanticTokenTypeType,
	lsproto.SemanticTokenTypeParameter,
	lsproto.SemanticTokenTypeVariable,
	lsproto.SemanticTokenTypeProperty,
	lsproto.SemanticTokenTypeEnumMember,
	lsproto.SemanticTokenTypeDecorator,
	lsproto.SemanticTokenTypeEvent,
	lsproto.SemanticTokenTypeFunction,
	lsproto.SemanticTokenTypeMethod,
	lsproto.SemanticTokenTypeMacro,
	lsproto.SemanticTokenTypeLabel,
	lsproto.SemanticTokenTypeComment,
	lsproto.SemanticTokenTypeString,
	lsproto.SemanticTokenTypeKeyword,
	lsproto.SemanticTokenTypeNumber,
	lsproto.SemanticTokenTypeRegexp,
	lsproto.SemanticTokenTypeOperator,
}

// tokenModifiers defines the order of token modifiers for encoding
var tokenModifiers = []lsproto.SemanticTokenModifier{
	lsproto.SemanticTokenModifierDeclaration,
	lsproto.SemanticTokenModifierDefinition,
	lsproto.SemanticTokenModifierReadonly,
	lsproto.SemanticTokenModifierStatic,
	lsproto.SemanticTokenModifierDeprecated,
	lsproto.SemanticTokenModifierAbstract,
	lsproto.SemanticTokenModifierAsync,
	lsproto.SemanticTokenModifierModification,
	lsproto.SemanticTokenModifierDocumentation,
	lsproto.SemanticTokenModifierDefaultLibrary,
	"local",
}

type tokenType int

const (
	tokenTypeNamespace tokenType = iota
	tokenTypeClass
	tokenTypeEnum
	tokenTypeInterface
	tokenTypeStruct
	tokenTypeTypeParameter
	tokenTypeType
	tokenTypeParameter
	tokenTypeVariable
	tokenTypeProperty
	tokenTypeEnumMember
	tokenTypeDecorator
	tokenTypeEvent
	tokenTypeFunction
	tokenTypeMethod // Previously called "member" in TypeScript
	tokenTypeMacro
	tokenTypeLabel
	tokenTypeComment
	tokenTypeString
	tokenTypeKeyword
	tokenTypeNumber
	tokenTypeRegexp
	tokenTypeOperator
)

type tokenModifier int

const (
	tokenModifierDeclaration tokenModifier = 1 << iota
	tokenModifierDefinition
	tokenModifierReadonly
	tokenModifierStatic
	tokenModifierDeprecated
	tokenModifierAbstract
	tokenModifierAsync
	tokenModifierModification
	tokenModifierDocumentation
	tokenModifierDefaultLibrary
	tokenModifierLocal
)

// SemanticTokensLegend returns the legend describing the token types and modifiers.
// It filters the legend to only include types and modifiers that the client supports,
// as indicated by clientCapabilities.
func SemanticTokensLegend(clientCapabilities lsproto.ResolvedSemanticTokensClientCapabilities) *lsproto.SemanticTokensLegend {
	types := make([]string, 0, len(tokenTypes))
	for _, t := range tokenTypes {
		if slices.Contains(clientCapabilities.TokenTypes, string(t)) {
			types = append(types, string(t))
		}
	}
	modifiers := make([]string, 0, len(tokenModifiers))
	for _, m := range tokenModifiers {
		if slices.Contains(clientCapabilities.TokenModifiers, string(m)) {
			modifiers = append(modifiers, string(m))
		}
	}
	return &lsproto.SemanticTokensLegend{
		TokenTypes:     types,
		TokenModifiers: modifiers,
	}
}

func (l *LanguageService) ProvideSemanticTokens(ctx context.Context, documentURI lsproto.DocumentUri) (lsproto.SemanticTokensResponse, error) {
	program, file := l.getProgramAndFile(documentURI)

	supplemental := file.SupplementalSourceFiles()
	files := make([]*ast.SourceFile, 1, 1+len(supplemental))
	files[0] = file
	files = append(files, supplemental...)
	tokens := make([]semanticToken, 0, len(files))
	for _, projection := range files {
		c, done := program.GetTypeCheckerForFile(ctx, projection)
		for _, token := range l.collectSemanticTokens(ctx, c, projection, program) {
			token.file = projection
			tokens = append(tokens, token)
		}
		done()
	}
	sortSemanticTokens(tokens, l.converters)

	if len(tokens) == 0 {
		return lsproto.SemanticTokensOrNull{}, nil
	}

	// Convert to LSP format (relative encoding)
	encoded := encodeSemanticTokens(ctx, tokens, l.converters)

	return lsproto.SemanticTokensOrNull{
		SemanticTokens: &lsproto.SemanticTokens{
			Data: encoded,
		},
	}, nil
}

func (l *LanguageService) ProvideSemanticTokensRange(ctx context.Context, documentURI lsproto.DocumentUri, rng lsproto.Range) (lsproto.SemanticTokensRangeResponse, error) {
	program, file := l.getProgramAndFile(documentURI)

	mappedRanges := lsconv.FromLSPRangeIntersectingForSourceFile(l.converters, file, rng, spanmap.FeatureSemanticTokens)
	tokens := make([]semanticToken, 0, len(mappedRanges))
	var seen collections.Set[semanticToken]
	for _, mapped := range mappedRanges {
		projection := mapped.Script
		c, done := program.GetTypeCheckerForFile(ctx, projection)
		for _, token := range l.collectSemanticTokensInRange(ctx, c, projection, program, mapped.Span.Pos(), mapped.Span.End()) {
			token.file = projection
			if seen.AddIfAbsent(token) {
				tokens = append(tokens, token)
			}
		}
		done()
	}
	sortSemanticTokens(tokens, l.converters)

	if len(tokens) == 0 {
		return lsproto.SemanticTokensOrNull{}, nil
	}

	// Convert to LSP format (relative encoding)
	encoded := encodeSemanticTokens(ctx, tokens, l.converters)

	return lsproto.SemanticTokensOrNull{
		SemanticTokens: &lsproto.SemanticTokens{
			Data: encoded,
		},
	}, nil
}

func sortSemanticTokens(tokens []semanticToken, converters *lsconv.Converters) {
	slices.SortFunc(tokens, func(a, b semanticToken) int {
		aRange, _ := semanticTokenLSPRange(a, converters)
		bRange, _ := semanticTokenLSPRange(b, converters)
		if result := cmp.Compare(aRange.Start.Line, bRange.Start.Line); result != 0 {
			return result
		}
		if result := cmp.Compare(aRange.Start.Character, bRange.Start.Character); result != 0 {
			return result
		}
		if result := cmp.Compare(a.file.PathKey(), b.file.PathKey()); result != 0 {
			return result
		}
		return cmp.Compare(a.node.Pos(), b.node.Pos())
	})
}

func semanticTokenLSPRange(token semanticToken, converters *lsconv.Converters) (lsproto.Range, spanmap.Fidelity) {
	start := scanner.GetTokenPosOfNode(token.node, token.file, false)
	return converters.ToLSPRangeForFeature(token.file, core.NewTextRange(start, token.node.End()), spanmap.FeatureSemanticTokens)
}

type semanticToken struct {
	node          *ast.Node
	file          *ast.SourceFile
	tokenType     tokenType
	tokenModifier tokenModifier
}

func (l *LanguageService) collectSemanticTokens(ctx context.Context, c *checker.Checker, file *ast.SourceFile, program *compiler.Program) []semanticToken {
	return l.collectSemanticTokensInRange(ctx, c, file, program, file.Pos(), file.End())
}

func (l *LanguageService) collectSemanticTokensInRange(ctx context.Context, c *checker.Checker, file *ast.SourceFile, program *compiler.Program, spanStart, spanEnd int) []semanticToken {
	tokens := []semanticToken{}

	inJSXElement := false

	var visit func(*ast.Node) bool
	visit = func(node *ast.Node) bool {
		// Check for cancellation
		if ctx.Err() != nil {
			return false
		}

		if node == nil {
			return false
		}
		if node.Flags&ast.NodeFlagsReparsed != 0 {
			return false
		}
		nodeEnd := node.End()
		if node.Pos() >= spanEnd || nodeEnd <= spanStart {
			return false
		}

		prevInJSXElement := inJSXElement
		if ast.IsJsxElement(node) || ast.IsJsxSelfClosingElement(node) {
			inJSXElement = true
		} else if ast.IsJsxExpression(node) {
			inJSXElement = false
		}

		if ast.IsIdentifier(node) && node.Text() != "" && !inJSXElement && !isInImportClause(node) && !isInfinityOrNaNString(node.Text()) {
			symbol := c.GetSymbolAtLocation(node)
			if symbol != nil {
				// Resolve aliases
				if symbol.Flags&ast.SymbolFlagsAlias != 0 {
					symbol = c.GetAliasedSymbol(symbol)
				}

				tokenType, ok := classifySymbol(symbol, getMeaningFromLocation(node))
				if ok {
					tokenModifier := tokenModifier(0)

					// Check if this is a declaration
					parent := node.Parent
					if parent != nil {
						parentIsDeclaration := ast.IsBindingElement(parent) || tokenFromDeclarationMapping(parent.Kind) == tokenType
						if parentIsDeclaration && parent.Name() == node {
							tokenModifier |= tokenModifierDeclaration
						}
					}

					// Property declaration in constructor: reclassify parameters as properties in property access context
					if tokenType == tokenTypeParameter && ast.IsRightSideOfQualifiedNameOrPropertyAccess(node) {
						tokenType = tokenTypeProperty
					}

					// Type-based reclassification
					tokenType = reclassifyByType(c, node, tokenType)

					// Get the value declaration to check modifiers
					if decl := symbol.ValueDeclaration; decl != nil {
						modifiers := ast.GetCombinedModifierFlags(decl)
						nodeFlags := ast.GetCombinedNodeFlags(decl)

						if modifiers&ast.ModifierFlagsStatic != 0 {
							tokenModifier |= tokenModifierStatic
						}
						if modifiers&ast.ModifierFlagsAsync != 0 {
							tokenModifier |= tokenModifierAsync
						}
						if tokenType != tokenTypeClass && tokenType != tokenTypeInterface {
							if (modifiers&ast.ModifierFlagsReadonly != 0) || (nodeFlags&ast.NodeFlagsConst != 0) || (symbol.Flags&ast.SymbolFlagsEnumMember != 0) {
								tokenModifier |= tokenModifierReadonly
							}
						}
						if (tokenType == tokenTypeVariable || tokenType == tokenTypeFunction) && isLocalDeclaration(decl, file) {
							tokenModifier |= tokenModifierLocal
						}
						declSourceFile := ast.GetSourceFileOfNode(decl)
						if declSourceFile != nil && program.IsSourceFileDefaultLibrary(declSourceFile.PathKey()) {
							tokenModifier |= tokenModifierDefaultLibrary
						}
					} else if symbol.Declarations != nil {
						for _, decl := range symbol.Declarations {
							declSourceFile := ast.GetSourceFileOfNode(decl)
							if declSourceFile != nil && program.IsSourceFileDefaultLibrary(declSourceFile.PathKey()) {
								tokenModifier |= tokenModifierDefaultLibrary
								break
							}
						}
					}

					tokens = append(tokens, semanticToken{
						node:          node,
						tokenType:     tokenType,
						tokenModifier: tokenModifier,
					})
				}
			}
		}

		node.ForEachChild(visit)
		inJSXElement = prevInJSXElement
		return false
	}

	visit(file.AsNode())

	// Check for cancellation after collection
	if ctx.Err() != nil {
		return nil
	}

	return tokens
}

func classifySymbol(symbol *ast.Symbol, meaning ast.SemanticMeaning) (tokenType, bool) {
	flags := symbol.Flags
	if flags&ast.SymbolFlagsClass != 0 {
		return tokenTypeClass, true
	}
	if flags&ast.SymbolFlagsEnum != 0 {
		return tokenTypeEnum, true
	}
	if flags&ast.SymbolFlagsTypeAlias != 0 {
		return tokenTypeType, true
	}
	if flags&ast.SymbolFlagsInterface != 0 {
		if meaning&ast.SemanticMeaningType != 0 {
			return tokenTypeInterface, true
		}
	}
	if flags&ast.SymbolFlagsTypeParameter != 0 {
		return tokenTypeTypeParameter, true
	}

	// Check the value declaration
	decl := symbol.ValueDeclaration
	if decl == nil && len(symbol.Declarations) > 0 {
		decl = symbol.Declarations[0]
	}
	if decl != nil {
		if ast.IsBindingElement(decl) {
			decl = getDeclarationForBindingElement(decl)
		}
		if tokenType := tokenFromDeclarationMapping(decl.Kind); tokenType >= 0 {
			return tokenType, true
		}
	}

	return 0, false
}

func tokenFromDeclarationMapping(kind ast.Kind) tokenType {
	switch kind {
	case ast.KindVariableDeclaration:
		return tokenTypeVariable
	case ast.KindParameter:
		return tokenTypeParameter
	case ast.KindPropertyDeclaration:
		return tokenTypeProperty
	case ast.KindModuleDeclaration:
		return tokenTypeNamespace
	case ast.KindEnumDeclaration:
		return tokenTypeEnum
	case ast.KindEnumMember:
		return tokenTypeEnumMember
	case ast.KindClassDeclaration, ast.KindClassExpression:
		return tokenTypeClass
	case ast.KindMethodDeclaration:
		return tokenTypeMethod
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		return tokenTypeFunction
	case ast.KindMethodSignature:
		return tokenTypeMethod
	case ast.KindGetAccessor, ast.KindSetAccessor:
		return tokenTypeProperty
	case ast.KindPropertySignature:
		return tokenTypeProperty
	case ast.KindInterfaceDeclaration:
		return tokenTypeInterface
	case ast.KindTypeAliasDeclaration:
		return tokenTypeType
	case ast.KindTypeParameter:
		return tokenTypeTypeParameter
	case ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
		return tokenTypeProperty
	default:
		return -1
	}
}

func reclassifyByType(c *checker.Checker, node *ast.Node, tt tokenType) tokenType {
	// Type-based reclassification for variables, properties, and parameters
	if tt == tokenTypeVariable || tt == tokenTypeProperty || tt == tokenTypeParameter {
		typ := c.GetTypeAtLocation(node)
		if typ != nil {
			test := func(condition func(*checker.Type) bool) bool {
				if condition(typ) {
					return true
				}
				if typ.Flags()&checker.TypeFlagsUnion != 0 {
					if slices.ContainsFunc(typ.AsUnionType().Types(), condition) {
						return true
					}
				}
				return false
			}

			// Check for constructor signatures (class-like)
			if tt != tokenTypeParameter && test(func(t *checker.Type) bool {
				return len(c.GetSignaturesOfType(t, checker.SignatureKindConstruct)) > 0
			}) {
				return tokenTypeClass
			}

			// Check for call signatures (function-like)
			// Must have call signatures AND (no properties OR be used in call context)
			hasCallSignatures := test(func(t *checker.Type) bool {
				return len(c.GetSignaturesOfType(t, checker.SignatureKindCall)) > 0
			})
			if hasCallSignatures {
				hasNoProperties := !test(func(t *checker.Type) bool {
					objType := t.AsObjectType()
					return objType != nil && len(objType.Properties()) > 0
				})
				if hasNoProperties || isExpressionInCallExpression(node) {
					if tt == tokenTypeProperty {
						return tokenTypeMethod
					}
					return tokenTypeFunction
				}
			}
		}
	}
	return tt
}

func isLocalDeclaration(decl *ast.Node, sourceFile *ast.SourceFile) bool {
	if ast.IsBindingElement(decl) {
		decl = getDeclarationForBindingElement(decl)
	}
	if ast.IsVariableDeclaration(decl) {
		parent := decl.Parent
		// Check if this is a catch clause parameter
		if parent != nil && ast.IsCatchClause(parent) {
			return ast.GetSourceFileOfNode(decl) == sourceFile
		}
		if parent != nil && ast.IsVariableDeclarationList(parent) {
			grandparent := parent.Parent
			if grandparent != nil {
				greatGrandparent := grandparent.Parent
				return (!ast.IsSourceFile(greatGrandparent) || ast.IsCatchClause(grandparent)) &&
					ast.GetSourceFileOfNode(decl) == sourceFile
			}
		}
	} else if ast.IsFunctionDeclaration(decl) {
		parent := decl.Parent
		return parent != nil && !ast.IsSourceFile(parent) && ast.GetSourceFileOfNode(decl) == sourceFile
	}
	return false
}

func getDeclarationForBindingElement(element *ast.Node) *ast.Node {
	for {
		parent := element.Parent
		if parent != nil && ast.IsBindingPattern(parent) {
			grandparent := parent.Parent
			if grandparent != nil && ast.IsBindingElement(grandparent) {
				element = grandparent
				continue
			}
			return parent.Parent
		}
		return element
	}
}

func isInImportClause(node *ast.Node) bool {
	parent := node.Parent
	return parent != nil && (ast.IsImportClause(parent) || ast.IsImportSpecifier(parent) || ast.IsNamespaceImport(parent))
}

func isExpressionInCallExpression(node *ast.Node) bool {
	for ast.IsRightSideOfQualifiedNameOrPropertyAccess(node) {
		node = node.Parent
	}
	parent := node.Parent
	return parent != nil && ast.IsCallExpression(parent) && parent.Expression() == node
}

func isInfinityOrNaNString(text string) bool {
	return text == "Infinity" || text == "NaN"
}

// encodeSemanticTokens encodes tokens into the LSP format using relative positioning.
// It filters tokens based on client capabilities, only including types and modifiers that the client supports.
func encodeSemanticTokens(ctx context.Context, tokens []semanticToken, converters *lsconv.Converters) []uint32 {
	// Build mapping from server token types/modifiers to client indices
	typeMapping := make(map[tokenType]uint32)
	modifierMapping := make(map[lsproto.SemanticTokenModifier]uint32)

	clientCapabilities := lsproto.GetClientCapabilities(ctx).TextDocument.SemanticTokens

	// Map server token types to client-supported indices
	clientIdx := uint32(0)
	for i, serverType := range tokenTypes {
		if slices.Contains(clientCapabilities.TokenTypes, string(serverType)) {
			typeMapping[tokenType(i)] = clientIdx
			clientIdx++
		}
	}

	// Map server token modifiers to client-supported bit positions
	clientBit := uint32(0)
	for _, serverModifier := range tokenModifiers {
		if slices.Contains(clientCapabilities.TokenModifiers, string(serverModifier)) {
			modifierMapping[serverModifier] = clientBit
			clientBit++
		}
	}

	// Each token encodes 5 uint32 values: deltaLine, deltaChar, length, tokenType, tokenModifiers
	encoded := make([]uint32, 0, len(tokens)*5)
	prevLine := uint32(0)
	prevChar := uint32(0)

	for _, token := range tokens {
		// Skip tokens with types not supported by the client
		clientTypeIdx, typeSupported := typeMapping[token.tokenType]
		if !typeSupported {
			continue
		}

		// Map modifiers to client-supported bit mask
		clientModifierMask := uint32(0)
		for i, serverModifier := range tokenModifiers {
			if token.tokenModifier&(1<<i) != 0 {
				if clientBit, ok := modifierMapping[serverModifier]; ok {
					clientModifierMask |= 1 << clientBit
				}
			}
		}

		// Semantic tokens must describe one concrete source segment; synthesized and cross-segment
		// tokens do not identify a coherent token in the original text.
		lspRange, fidelity := semanticTokenLSPRange(token, converters)
		if !fidelity.IsExact() {
			continue
		}
		startPos := lspRange.Start
		endPos := lspRange.End

		// Length is the character difference when on the same line
		var tokenLength uint32
		if startPos.Line == endPos.Line {
			tokenLength = endPos.Character - startPos.Character
		} else {
			panic(fmt.Sprintf("semantic tokens: token spans multiple lines: start=(%d,%d) end=(%d,%d) for token at offset %d",
				startPos.Line, startPos.Character, endPos.Line, endPos.Character, token.node.Pos()))
		}

		line := startPos.Line
		char := startPos.Character

		// Multiple virtual projections can describe the same original token; LSP requires one entry per
		// start position, so retain the first after sorting.
		if len(encoded) > 0 && line == prevLine && char == prevChar {
			continue
		}
		if len(encoded) > 0 && (line < prevLine || line == prevLine && char < prevChar) {
			panic(fmt.Sprintf("semantic tokens: positions must be strictly increasing: prev=(%d,%d) current=(%d,%d) for token at offset %d",
				prevLine, prevChar, line, char, token.node.Pos()))
		}

		// Encode as: [deltaLine, deltaChar, length, tokenType, tokenModifiers]
		deltaLine := line - prevLine
		var deltaChar uint32
		if deltaLine == 0 {
			deltaChar = char - prevChar
		} else {
			deltaChar = char
		}

		encoded = append(
			encoded,
			deltaLine,
			deltaChar,
			tokenLength,
			clientTypeIdx,
			clientModifierMask,
		)

		prevLine = line
		prevChar = char
	}

	return encoded
}
