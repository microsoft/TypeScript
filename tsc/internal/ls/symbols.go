package ls

import (
	"context"
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func (l *LanguageService) ProvideDocumentSymbols(ctx context.Context, documentURI lsproto.DocumentUri) (lsproto.DocumentSymbolResponse, error) {
	_, file := l.getProgramAndFile(documentURI)
	if lsproto.GetClientCapabilities(ctx).TextDocument.DocumentSymbol.HierarchicalDocumentSymbolSupport {
		symbols := l.getDocumentSymbolsForChildren(ctx, file.AsNode(), file)
		return lsproto.SymbolInformationsOrDocumentSymbolsOrNull{DocumentSymbols: &symbols}, nil
	}
	// Client doesn't support hierarchical document symbols, return flat SymbolInformation array
	symbolInfos := l.getDocumentSymbolInformations(ctx, file, documentURI)
	symbolInfoPtrs := make([]*lsproto.SymbolInformation, len(symbolInfos))
	for i := range symbolInfos {
		symbolInfoPtrs[i] = &symbolInfos[i]
	}
	return lsproto.SymbolInformationsOrDocumentSymbolsOrNull{SymbolInformations: &symbolInfoPtrs}, nil
}

// getDocumentSymbolInformations converts hierarchical DocumentSymbols to a flat SymbolInformation array
func (l *LanguageService) getDocumentSymbolInformations(ctx context.Context, file *ast.SourceFile, documentURI lsproto.DocumentUri) []lsproto.SymbolInformation {
	// First get hierarchical symbols
	docSymbols := l.getDocumentSymbolsForChildren(ctx, file.AsNode(), file)

	// Flatten the hierarchy
	var result []lsproto.SymbolInformation
	var flatten func(symbols []*lsproto.DocumentSymbol, containerName *string)
	flatten = func(symbols []*lsproto.DocumentSymbol, containerName *string) {
		for _, symbol := range symbols {
			info := lsproto.SymbolInformation{
				Name: symbol.Name,
				Kind: symbol.Kind,
				Location: lsproto.Location{
					Uri:   documentURI,
					Range: symbol.Range,
				},
				ContainerName: containerName,
				Tags:          symbol.Tags,
				Deprecated:    symbol.Deprecated,
			}
			result = append(result, info)

			// Recursively flatten children with this symbol as container
			if symbol.Children != nil && len(*symbol.Children) > 0 {
				flatten(*symbol.Children, &symbol.Name)
			}
		}
	}
	flatten(docSymbols, nil)
	return result
}

func (l *LanguageService) getDocumentSymbolsForChildren(ctx context.Context, node *ast.Node, file *ast.SourceFile) []*lsproto.DocumentSymbol {
	var symbols []*lsproto.DocumentSymbol
	expandoTargets := collections.Set[string]{}
	addSymbolForNode := func(node *ast.Node, children []*lsproto.DocumentSymbol) {
		if node.Flags&ast.NodeFlagsReparsed == 0 || node.Kind == ast.KindJSExportAssignment {
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
			saveExpandoTargets := expandoTargets
			expandoTargets = collections.Set[string]{}
			saveSymbols := symbols
			symbols = nil
			node.ForEachChild(visit)
			result = symbols
			symbols = saveSymbols
			expandoTargets = saveExpandoTargets
		}
		return result
	}
	startNode := func(node *ast.Node) func() {
		if node == nil {
			return func() {}
		}
		saveExpandoTargets := expandoTargets
		expandoTargets = collections.Set[string]{}
		saveSymbols := symbols
		symbols = nil
		return func() {
			result := symbols
			symbols = saveSymbols
			expandoTargets = saveExpandoTargets
			addSymbolForNode(node, result)
		}
	}
	getSymbolsForNode := func(node *ast.Node) []*lsproto.DocumentSymbol {
		var result []*lsproto.DocumentSymbol
		if node != nil {
			saveSymbols := symbols
			symbols = nil
			visit(node)
			result = symbols
			symbols = saveSymbols
		}
		return result
	}
	visit = func(node *ast.Node) bool {
		if ctx.Err() != nil {
			return true
		}
		if jsdocs := node.JSDoc(file); len(jsdocs) > 0 {
			for _, jsdoc := range jsdocs {
				if tagList := jsdoc.AsJSDoc().Tags; tagList != nil {
					for _, tag := range tagList.Nodes {
						if ast.IsJSDocTypedefTag(tag) || ast.IsJSDocCallbackTag(tag) {
							addSymbolForNode(tag, nil /*children*/)
						}
					}
				}
			}
		}
		switch node.Kind {
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration:
			if ast.IsClassLike(node) && ast.GetDeclarationName(node) != "" {
				expandoTargets.Add(ast.GetDeclarationName(node))
			}
			addSymbolForNode(node, getSymbolsForChildren(node))
		case ast.KindModuleDeclaration:
			addSymbolForNode(node, getSymbolsForChildren(getInteriorModule(node)))
		case ast.KindConstructor:
			addSymbolForNode(node, getSymbolsForChildren(node.Body()))
			for _, param := range node.Parameters() {
				if ast.IsParameterPropertyDeclaration(param, node) {
					addSymbolForNode(param, nil /*children*/)
				}
			}
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindMethodDeclaration, ast.KindGetAccessor,
			ast.KindSetAccessor:
			name := ast.GetDeclarationName(node)
			if name != "" {
				expandoTargets.Add(name)
			}
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
		case ast.KindSpreadAssignment:
			addSymbolForNode(node, nil /*children*/)
		case ast.KindMethodSignature, ast.KindPropertySignature, ast.KindCallSignature, ast.KindConstructSignature, ast.KindIndexSignature,
			ast.KindEnumMember, ast.KindShorthandPropertyAssignment, ast.KindTypeAliasDeclaration, ast.KindImportEqualsDeclaration, ast.KindExportSpecifier:
			addSymbolForNode(node, nil)
		case ast.KindImportClause:
			// Handle default import case e.g.:
			//    import d from "mod";
			if node.Name() != nil {
				addSymbolForNode(node.Name(), nil /*children*/)
			}
			// Handle named bindings in imports e.g.:
			//    import * as NS from "mod";
			//    import {a, b as B} from "mod";
			if namedBindings := node.AsImportClause().NamedBindings; namedBindings != nil {
				if namedBindings.Kind == ast.KindNamespaceImport {
					addSymbolForNode(namedBindings, nil /*children*/)
				} else {
					for _, element := range namedBindings.Elements() {
						addSymbolForNode(element, nil /*children*/)
					}
				}
			}
		case ast.KindBinaryExpression:
			binaryExpr := node.AsBinaryExpression()
			assignmentKind := ast.GetAssignmentDeclarationKind(binaryExpr)
			switch assignmentKind {
			// `module.exports = ...`` should be reparsed into a JSExportAssignment,
			// and `exports.a = ...`` into a CommonJSExport.
			case ast.JSDeclarationKindNone, ast.JSDeclarationKindThisProperty,
				ast.JSDeclarationKindModuleExports, ast.JSDeclarationKindExportsProperty:
				node.ForEachChild(visit)
			case ast.JSDeclarationKindProperty:
				// `A.b = ... ` or `A.prototype.b = ...`
				target := binaryExpr.Left
				targetFunction := target.Expression()
				if isPrototypeExpando(binaryExpr) {
					targetFunction = targetFunction.Expression()
					// If we see a prototype assignment, start tracking the target as an expando target.
					if ast.IsIdentifier(targetFunction) {
						expandoTargets.Add(targetFunction.Text())
					}
				}
				if ast.IsIdentifier(targetFunction) &&
					expandoTargets.Has(targetFunction.Text()) {
					endNode := startNode(node)
					addSymbolForNode(target, getSymbolsForNode(binaryExpr.Right))
					endNode()
				} else {
					node.ForEachChild(visit)
				}
			}
		case ast.KindExportAssignment, ast.KindJSExportAssignment:
			if node.AsExportAssignment().IsExportEquals {
				addSymbolForNode(node, getSymbolsForNode(node.Expression()))
			} else {
				node.ForEachChild(visit)
			}
		default:
			node.ForEachChild(visit)
		}
		return false
	}
	node.ForEachChild(visit)
	return mergeExpandos(symbols)
}

// Binary expression is `f.prototype.prop`.
func isPrototypeExpando(binaryExpr *ast.BinaryExpression) bool {
	target := binaryExpr.Left.Expression()
	if ast.IsAccessExpression(target) {
		accessName := ast.GetElementOrPropertyAccessName(target)
		return accessName != nil && accessName.Text() == "prototype"
	}
	return false
}

const maxLength = 150

func (l *LanguageService) newDocumentSymbol(node *ast.Node, children []*lsproto.DocumentSymbol) *lsproto.DocumentSymbol {
	result := new(lsproto.DocumentSymbol)
	file := ast.GetSourceFileOfNode(node)
	nodeStartPos := scanner.SkipTrivia(file.Text(), node.Pos())
	var name *ast.Node
	// Expando properties
	if ast.IsBinaryExpression(node) {
		if isPrototypeExpando(node.AsBinaryExpression()) { // `f.prototype.prop = ...`
			name = node.AsBinaryExpression().Left.Expression().Expression()
		} else { // `f[prop] = ...`
			name = node.AsBinaryExpression().Left.Expression()
		}
	} else if ast.IsAccessExpression(node) {
		if ast.IsPropertyAccessExpression(node) {
			name = node.AsPropertyAccessExpression().Name()
		} else if ast.IsElementAccessExpression(node) {
			name = node.AsElementAccessExpression().ArgumentExpression
		}
	} else if ast.IsIdentifier(node) || ast.IsPrivateIdentifier(node) {
		name = node
	} else if ast.IsSpreadAssignment(node) && ast.IsIdentifier(node.Expression()) {
		name = node.Expression()
	} else {
		name = ast.GetNameOfDeclaration(node)
	}
	var text string
	var nameStartPos, nameEndPos int
	if ast.IsModuleDeclaration(node) && !ast.IsAmbientModule(node) {
		text = getModuleName(node)
		nameStartPos = scanner.SkipTrivia(file.Text(), name.Pos())
		nameEndPos = getInteriorModule(node).Name().End()
	} else if ast.IsAnyExportAssignment(node) && node.AsExportAssignment().IsExportEquals {
		text = "export="
		if name != nil {
			nameStartPos = scanner.SkipTrivia(file.Text(), name.Pos())
			nameEndPos = name.End()
		} else {
			nameStartPos = nodeStartPos
			nameEndPos = node.End()
		}
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
	truncatedText := stringutil.TruncateByRunes(text, maxLength)
	if len(truncatedText) < len(text) {
		text = truncatedText + "..."
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

// Merges expando symbols into their target symbols, and namespaces of same name.
// Modifies the input slice.
func mergeExpandos(symbols []*lsproto.DocumentSymbol) []*lsproto.DocumentSymbol {
	mergedSymbols := make([]*lsproto.DocumentSymbol, 0, len(symbols))
	// Collect symbols that can be an expando target.
	nameToExpandoTargetIndex := collections.MultiMap[string, int]{}
	// Collect namespaces.
	nameToNamespaceIndex := map[string]int{}
	for i, symbol := range symbols {
		if isAnonymousName(symbol.Name) {
			continue
		}
		if symbol.Kind == lsproto.SymbolKindClass || symbol.Kind == lsproto.SymbolKindFunction || symbol.Kind == lsproto.SymbolKindVariable {
			nameToExpandoTargetIndex.Add(symbol.Name, i)
		}
		if symbol.Kind == lsproto.SymbolKindNamespace {
			if _, ok := nameToNamespaceIndex[symbol.Name]; !ok {
				nameToNamespaceIndex[symbol.Name] = i
			}
		}
	}
	for i, symbol := range symbols {
		if symbol.Children != nil {
			children := mergeExpandos(*symbol.Children)
			symbol.Children = &children
		}

		// Anonymous symbols never merge.
		if isAnonymousName(symbol.Name) {
			continue
		}

		// Merge expandos.
		if symbol.Kind == lsproto.SymbolKindProperty {
			symbolsWithSameName := nameToExpandoTargetIndex.Get(symbol.Name)
			for j := len(symbolsWithSameName) - 1; j >= 0; j-- {
				targetIndex := symbolsWithSameName[j]
				targetSymbol := symbols[targetIndex]
				mergeChildren(targetSymbol, symbol)
				// Mark this symbol as merged.
				symbols[i] = nil
			}
		}
		// Merge namespaces.
		if symbol.Kind == lsproto.SymbolKindNamespace {
			if targetIndex, ok := nameToNamespaceIndex[symbol.Name]; ok && targetIndex != i {
				targetSymbol := symbols[targetIndex]
				mergeChildren(targetSymbol, symbol)
				// Mark this symbol as merged.
				symbols[i] = nil
			}
		}
	}
	for _, symbol := range symbols {
		if symbol != nil {
			mergedSymbols = append(mergedSymbols, symbol)
		}
	}
	return mergedSymbols
}

func mergeChildren(target *lsproto.DocumentSymbol, source *lsproto.DocumentSymbol) {
	if source.Children != nil {
		if target.Children == nil {
			target.Children = source.Children
		} else {
			*target.Children = mergeExpandos(append(*target.Children, *source.Children...))
			slices.SortFunc(*target.Children, func(a, b *lsproto.DocumentSymbol) int {
				return lsproto.CompareRanges(&a.Range, &b.Range)
			})
		}
	}
}

// See `getUnnamedNodeLabel`.
func isAnonymousName(name string) bool {
	return name == "<function>" || name == "<class>" || name == "export=" || name == "default" ||
		name == "constructor" || name == "()" || name == "new()" || name == "[]" || strings.HasSuffix(name, "() callback")
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
	if parent := ast.WalkUpParenthesizedExpressions(node.Parent); parent != nil && ast.IsExportAssignment(parent) {
		if parent.AsExportAssignment().IsExportEquals {
			return "export="
		}
		return "default"
	}
	switch node.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
		if node.ModifierFlags()&ast.ModifierFlagsDefault != 0 {
			return "default"
		}
		if ast.IsCallExpression(node.Parent) {
			name := getCallExpressionName(node.Parent.Expression())
			if name != "" {
				return name + "() callback"
			}
		}
		return "<function>"
	case ast.KindClassDeclaration, ast.KindClassExpression:
		if node.ModifierFlags()&ast.ModifierFlagsDefault != 0 {
			return "default"
		}
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

func ProvideWorkspaceSymbols(
	ctx context.Context,
	programs []*compiler.Program,
	converters *lsconv.Converters,
	preferences *lsutil.UserPreferences,
	query string,
) (lsproto.WorkspaceSymbolResponse, error) {
	excludeLibrarySymbols := preferences.ExcludeLibrarySymbolsInNavTo
	// Obtain set of non-declaration source files from all active programs.
	sourceFiles := map[tspath.Path]*ast.SourceFile{}
	for _, program := range programs {
		for _, sourceFile := range program.SourceFiles() {
			if (program.HasTSFile() || !sourceFile.IsDeclarationFile) &&
				!shouldExcludeFile(sourceFile, program, excludeLibrarySymbols) {
				sourceFiles[sourceFile.Path()] = sourceFile
			}
		}
	}
	// Create DeclarationInfos for all declarations in the source files.
	var infos []DeclarationInfo
	for _, sourceFile := range sourceFiles {
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
		node := info.declaration
		sourceFile := ast.GetSourceFileOfNode(node)
		pos := astnav.GetStartOfNode(node, sourceFile, false /*includeJsDoc*/)
		container := getContainerNode(info.declaration)
		var containerName *string
		if container != nil {
			containerName = strPtrTo(ast.GetDeclarationName(container))
		}
		var symbol lsproto.SymbolInformation
		symbol.Name = info.name
		symbol.Kind = getSymbolKindFromNode(info.declaration)
		symbol.Location = converters.ToLSPLocation(sourceFile, core.NewTextRange(pos, node.End()))
		symbol.ContainerName = containerName
		symbols[i] = &symbol
	}

	return lsproto.SymbolInformationsOrWorkspaceSymbolsOrNull{SymbolInformations: &symbols}, nil
}

func shouldExcludeFile(file *ast.SourceFile, program *compiler.Program, excludeLibrarySymbols bool) bool {
	return excludeLibrarySymbols && (isInsideNodeModules(file.FileName()) || program.IsLibFile(file))
}

func isInsideNodeModules(fileName string) bool {
	return strings.Contains(fileName, "/node_modules/")
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

// getSymbolKindFromNode converts an AST node to an LSP SymbolKind.
// Combines getNodeKind with VS Code's fromProtocolScriptElementKind.
func getSymbolKindFromNode(node *ast.Node) lsproto.SymbolKind {
	switch node.Kind {
	case ast.KindSourceFile:
		if ast.IsExternalModule(node.AsSourceFile()) {
			return lsproto.SymbolKindModule
		}
		return lsproto.SymbolKindFile
	case ast.KindModuleDeclaration:
		return lsproto.SymbolKindNamespace
	case ast.KindClassDeclaration, ast.KindClassExpression:
		return lsproto.SymbolKindClass
	case ast.KindInterfaceDeclaration:
		return lsproto.SymbolKindInterface
	case ast.KindTypeAliasDeclaration, ast.KindJSDocTypedefTag, ast.KindJSDocCallbackTag:
		return lsproto.SymbolKindClass
	case ast.KindEnumDeclaration:
		return lsproto.SymbolKindEnum
	case ast.KindVariableDeclaration:
		return lsproto.SymbolKindVariable
	case ast.KindArrowFunction, ast.KindFunctionDeclaration, ast.KindFunctionExpression:
		return lsproto.SymbolKindFunction
	case ast.KindGetAccessor, ast.KindSetAccessor:
		return lsproto.SymbolKindProperty
	case ast.KindMethodDeclaration, ast.KindMethodSignature:
		return lsproto.SymbolKindMethod
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindPropertyAssignment,
		ast.KindShorthandPropertyAssignment, ast.KindSpreadAssignment, ast.KindIndexSignature:
		return lsproto.SymbolKindProperty
	case ast.KindCallSignature:
		return lsproto.SymbolKindMethod
	case ast.KindConstructSignature:
		return lsproto.SymbolKindConstructor
	case ast.KindConstructor, ast.KindClassStaticBlockDeclaration:
		return lsproto.SymbolKindConstructor
	case ast.KindTypeParameter:
		return lsproto.SymbolKindTypeParameter
	case ast.KindEnumMember:
		return lsproto.SymbolKindEnumMember
	case ast.KindParameter:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsParameterPropertyModifier) {
			return lsproto.SymbolKindProperty
		}
		return lsproto.SymbolKindVariable
	case ast.KindBinaryExpression:
		kind := ast.GetAssignmentDeclarationKind(node.AsBinaryExpression())
		switch kind {
		case ast.JSDeclarationKindThisProperty, ast.JSDeclarationKindProperty:
			return lsproto.SymbolKindProperty
		}
	}
	return lsproto.SymbolKindVariable
}
