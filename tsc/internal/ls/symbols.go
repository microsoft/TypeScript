package ls

import (
	"context"
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func (l *LanguageService) ProvideDocumentSymbols(ctx context.Context, documentURI lsproto.DocumentUri) (lsproto.DocumentSymbolResponse, error) {
	_, file := l.getProgramAndFile(documentURI)
	symbols := l.getDocumentSymbolsForChildren(ctx, file.AsNode())
	return lsproto.SymbolInformationsOrDocumentSymbolsOrNull{DocumentSymbols: &symbols}, nil
}

func (l *LanguageService) getDocumentSymbolsForChildren(ctx context.Context, node *ast.Node) []*lsproto.DocumentSymbol {
	var symbols []*lsproto.DocumentSymbol
	addSymbolForNode := func(node *ast.Node, children []*lsproto.DocumentSymbol) {
		if node.Flags&ast.NodeFlagsReparsed == 0 {
			symbol := l.newDocumentSymbol(node, children)
			if symbol != nil {
				symbols = append(symbols, symbol)
			}
		}
	}
	var visit func(*ast.Node) bool
	getSymbolsForChildren := func(node *ast.Node) []*lsproto.DocumentSymbol {
		var result []*lsproto.DocumentSymbol
		if node != nil {
			saveSymbols := symbols
			symbols = nil
			node.ForEachChild(visit)
			result = symbols
			symbols = saveSymbols
		}
		return result
	}
	visit = func(node *ast.Node) bool {
		if ctx.Err() != nil {
			return true
		}
		switch node.Kind {
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration:
			addSymbolForNode(node, getSymbolsForChildren(node))
		case ast.KindModuleDeclaration:
			addSymbolForNode(node, getSymbolsForChildren(getInteriorModule(node)))
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindMethodDeclaration, ast.KindGetAccessor,
			ast.KindSetAccessor, ast.KindConstructor:
			addSymbolForNode(node, getSymbolsForChildren(node.Body()))
		case ast.KindVariableDeclaration, ast.KindBindingElement, ast.KindPropertyAssignment, ast.KindPropertyDeclaration:
			name := node.Name()
			if name != nil {
				if ast.IsBindingPattern(name) {
					visit(name)
				} else {
					addSymbolForNode(node, getSymbolsForChildren(node.Initializer()))
				}
			}
		case ast.KindMethodSignature, ast.KindPropertySignature, ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature,
			ast.KindEnumMember, ast.KindShorthandPropertyAssignment, ast.KindTypeAliasDeclaration:
			addSymbolForNode(node, nil)
		default:
			node.ForEachChild(visit)
		}
		return false
	}
	node.ForEachChild(visit)
	return symbols
}

func (l *LanguageService) newDocumentSymbol(node *ast.Node, children []*lsproto.DocumentSymbol) *lsproto.DocumentSymbol {
	result := new(lsproto.DocumentSymbol)
	file := ast.GetSourceFileOfNode(node)
	nodeStartPos := scanner.SkipTrivia(file.Text(), node.Pos())
	name := ast.GetNameOfDeclaration(node)
	var text string
	var nameStartPos, nameEndPos int
	if ast.IsModuleDeclaration(node) && !ast.IsAmbientModule(node) {
		text = getModuleName(node)
		nameStartPos = scanner.SkipTrivia(file.Text(), name.Pos())
		nameEndPos = getInteriorModule(node).Name().End()
	} else if name != nil {
		text = getTextOfName(name)
		nameStartPos = max(scanner.SkipTrivia(file.Text(), name.Pos()), nodeStartPos)
		nameEndPos = max(name.End(), nodeStartPos)
	} else {
		text = getUnnamedNodeLabel(node)
		nameStartPos = nodeStartPos
		nameEndPos = nodeStartPos
	}
	if text == "" {
		return nil
	}
	result.Name = text
	result.Kind = getSymbolKindFromNode(node)
	result.Range = lsproto.Range{
		Start: l.converters.PositionToLineAndCharacter(file, core.TextPos(nodeStartPos)),
		End:   l.converters.PositionToLineAndCharacter(file, core.TextPos(node.End())),
	}
	result.SelectionRange = lsproto.Range{
		Start: l.converters.PositionToLineAndCharacter(file, core.TextPos(nameStartPos)),
		End:   l.converters.PositionToLineAndCharacter(file, core.TextPos(nameEndPos)),
	}
	if children == nil {
		children = []*lsproto.DocumentSymbol{}
	}
	result.Children = &children
	return result
}

func getTextOfName(node *ast.Node) string {
	switch node.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindNumericLiteral:
		return node.Text()
	case ast.KindStringLiteral:
		return "\"" + printer.EscapeString(node.Text(), '"') + "\""
	case ast.KindNoSubstitutionTemplateLiteral:
		return "`" + printer.EscapeString(node.Text(), '`') + "`"
	case ast.KindComputedPropertyName:
		if ast.IsStringOrNumericLiteralLike(node.Expression()) {
			return getTextOfName(node.Expression())
		}
	}
	return scanner.GetTextOfNode(node)
}

func getUnnamedNodeLabel(node *ast.Node) string {
	switch node.Kind {
	case ast.KindFunctionExpression, ast.KindArrowFunction:
		if ast.IsCallExpression(node.Parent) {
			name := getCallExpressionName(node.Parent.Expression())
			if name != "" {
				return name + "() callback"
			}
		}
		return "<function>"
	case ast.KindClassExpression:
		return "<class>"
	case ast.KindConstructor:
		return "constructor"
	case ast.KindCallSignature:
		return "()"
	case ast.KindConstructSignature:
		return "new()"
	case ast.KindIndexSignature:
		return "[]"
	}
	return ""
}

func getCallExpressionName(node *ast.Node) string {
	switch node.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier:
		return node.Text()
	case ast.KindPropertyAccessExpression:
		left := getCallExpressionName(node.Expression())
		right := getCallExpressionName(node.Name())
		if left != "" {
			return left + "." + right
		}
		return right
	}
	return ""
}

func getInteriorModule(node *ast.Node) *ast.Node {
	for node.Body() != nil && ast.IsModuleDeclaration(node.Body()) {
		node = node.Body()
	}
	return node
}

func getModuleName(node *ast.Node) string {
	result := node.Name().Text()
	for node.Body() != nil && ast.IsModuleDeclaration(node.Body()) {
		node = node.Body()
		result = result + "." + node.Name().Text()
	}
	return result
}

type DeclarationInfo struct {
	name        string
	declaration *ast.Node
	matchScore  int
}

func ProvideWorkspaceSymbols(ctx context.Context, programs []*compiler.Program, converters *Converters, query string) (lsproto.WorkspaceSymbolResponse, error) {
	// Obtain set of non-declaration source files from all active programs.
	var sourceFiles collections.Set[*ast.SourceFile]
	for _, program := range programs {
		for _, sourceFile := range program.SourceFiles() {
			if !sourceFile.IsDeclarationFile {
				sourceFiles.Add(sourceFile)
			}
		}
	}
	// Create DeclarationInfos for all declarations in the source files.
	var infos []DeclarationInfo
	for sourceFile := range sourceFiles.Keys() {
		if ctx.Err() != nil {
			return lsproto.SymbolInformationsOrWorkspaceSymbolsOrNull{}, nil
		}
		declarationMap := sourceFile.GetDeclarationMap()
		for name, declarations := range declarationMap {
			score := getMatchScore(name, query)
			if score >= 0 {
				for _, declaration := range declarations {
					infos = append(infos, DeclarationInfo{name, declaration, score})
				}
			}
		}
	}
	// Sort the DeclarationInfos and return the top 256 matches.
	slices.SortFunc(infos, compareDeclarationInfos)
	count := min(len(infos), 256)
	symbols := make([]*lsproto.SymbolInformation, count)
	for i, info := range infos[0:count] {
		node := core.OrElse(ast.GetNameOfDeclaration(info.declaration), info.declaration)
		sourceFile := ast.GetSourceFileOfNode(node)
		pos := scanner.SkipTrivia(sourceFile.Text(), node.Pos())
		var symbol lsproto.SymbolInformation
		symbol.Name = info.name
		symbol.Kind = getSymbolKindFromNode(info.declaration)
		symbol.Location = converters.ToLSPLocation(sourceFile, core.NewTextRange(pos, node.End()))
		symbols[i] = &symbol
	}
	return lsproto.SymbolInformationsOrWorkspaceSymbolsOrNull{SymbolInformations: &symbols}, nil
}

// Return a score for matching `s` against `pattern`. In order to match, `s` must contain each of the characters in
// `pattern` in the same order. Upper case characters in `pattern` must match exactly, whereas lower case characters
// in `pattern` match either case in `s`. If `s` doesn't match, -1 is returned. Otherwise, the returned score is the
// number of characters in `s` that weren't matched. Thus, zero represents an exact match, and higher values represent
// increasingly less specific partial matches.
func getMatchScore(s string, pattern string) int {
	score := 0
	for _, p := range pattern {
		exact := unicode.IsUpper(p)
		for {
			c, size := utf8.DecodeRuneInString(s)
			if size == 0 {
				return -1
			}
			s = s[size:]
			if exact && c == p || !exact && unicode.ToLower(c) == unicode.ToLower(p) {
				break
			}
			score++
		}
	}
	return score
}

// Sort DeclarationInfos by ascending match score, then ascending case insensitive name, then
// ascending case sensitive name, and finally by source file name and position.
func compareDeclarationInfos(d1, d2 DeclarationInfo) int {
	if d1.matchScore != d2.matchScore {
		return d1.matchScore - d2.matchScore
	}
	if c := stringutil.CompareStringsCaseInsensitive(d1.name, d2.name); c != 0 {
		return c
	}
	if c := strings.Compare(d1.name, d2.name); c != 0 {
		return c
	}
	s1 := ast.GetSourceFileOfNode(d1.declaration)
	s2 := ast.GetSourceFileOfNode(d2.declaration)
	if s1 != s2 {
		return strings.Compare(string(s1.Path()), string(s2.Path()))
	}
	return d1.declaration.Pos() - d2.declaration.Pos()
}

func getSymbolKindFromNode(node *ast.Node) lsproto.SymbolKind {
	switch node.Kind {
	case ast.KindModuleDeclaration:
		return lsproto.SymbolKindNamespace
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindTypeAliasDeclaration:
		return lsproto.SymbolKindClass
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		return lsproto.SymbolKindMethod
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindGetAccessor, ast.KindSetAccessor:
		return lsproto.SymbolKindProperty
	case ast.KindConstructor, ast.KindConstructSignature:
		return lsproto.SymbolKindConstructor
	case ast.KindEnumDeclaration:
		return lsproto.SymbolKindEnum
	case ast.KindInterfaceDeclaration:
		return lsproto.SymbolKindInterface
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		return lsproto.SymbolKindFunction
	case ast.KindEnumMember:
		return lsproto.SymbolKindEnumMember
	case ast.KindTypeParameter:
		return lsproto.SymbolKindTypeParameter
	}
	return lsproto.SymbolKindVariable
}
