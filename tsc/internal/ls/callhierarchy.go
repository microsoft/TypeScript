package ls

import (
	"context"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type CallHierarchyDeclaration = *ast.Node

// Indictates whether a node is named function or class expression.
func isNamedExpression(node *ast.Node) bool {
	if node == nil {
		return false
	}
	if !ast.IsFunctionExpression(node) && !ast.IsClassExpression(node) {
		return false
	}
	name := node.Name()
	return name != nil && ast.IsIdentifier(name)
}

func isVariableLike(node *ast.Node) bool {
	if node == nil {
		return false
	}
	return ast.IsPropertyDeclaration(node) || ast.IsVariableDeclaration(node)
}

// Indicates whether a node is a function, arrow, or class expression assigned to a constant variable or class property.
func isAssignedExpression(node *ast.Node) bool {
	if node == nil {
		return false
	}
	if !(ast.IsFunctionExpression(node) || ast.IsArrowFunction(node) || ast.IsClassExpression(node)) {
		return false
	}
	if node.Name() != nil {
		return false
	}
	parent := node.Parent
	if !isVariableLike(parent) {
		return false
	}

	if parent.Initializer() != node {
		return false
	}

	name := parent.Name()
	if !ast.IsIdentifier(name) {
		return false
	}

	return (ast.GetCombinedNodeFlags(parent)&ast.NodeFlagsConst) != 0 || ast.IsPropertyDeclaration(parent)
}

// Indicates whether a node could possibly be a call hierarchy declaration.
//
// See `resolveCallHierarchyDeclaration` for the specific rules.
func isPossibleCallHierarchyDeclaration(node *ast.Node) bool {
	if node == nil {
		return false
	}
	return ast.IsSourceFile(node) ||
		ast.IsModuleDeclaration(node) ||
		ast.IsFunctionDeclaration(node) ||
		ast.IsFunctionExpression(node) ||
		ast.IsClassDeclaration(node) ||
		ast.IsClassExpression(node) ||
		ast.IsClassStaticBlockDeclaration(node) ||
		ast.IsMethodDeclaration(node) ||
		ast.IsMethodSignatureDeclaration(node) ||
		ast.IsGetAccessorDeclaration(node) ||
		ast.IsSetAccessorDeclaration(node)
}

// Indicates whether a node is a valid a call hierarchy declaration.
//
// See `resolveCallHierarchyDeclaration` for the specific rules.
func isValidCallHierarchyDeclaration(node *ast.Node) bool {
	if node == nil {
		return false
	}

	if ast.IsSourceFile(node) {
		return true
	}

	if ast.IsModuleDeclaration(node) {
		return ast.IsIdentifier(node.Name())
	}

	return ast.IsFunctionDeclaration(node) ||
		ast.IsClassDeclaration(node) ||
		ast.IsClassStaticBlockDeclaration(node) ||
		ast.IsMethodDeclaration(node) ||
		ast.IsMethodSignatureDeclaration(node) ||
		ast.IsGetAccessorDeclaration(node) ||
		ast.IsSetAccessorDeclaration(node) ||
		isNamedExpression(node) ||
		isAssignedExpression(node)
}

// Gets the node that can be used as a reference to a call hierarchy declaration.
func getCallHierarchyDeclarationReferenceNode(node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}

	if ast.IsSourceFile(node) {
		return node
	}

	if name := node.Name(); name != nil {
		return name
	}

	if isAssignedExpression(node) {
		return node.Parent.Name()
	}

	if modifiers := node.Modifiers(); modifiers != nil {
		for _, mod := range modifiers.Nodes {
			if mod.Kind == ast.KindDefaultKeyword {
				return mod
			}
		}
	}

	debug.Assert(false, "Expected call hierarchy declaration to have a reference node")
	return nil
}

// Gets the symbol for a call hierarchy declaration.
func getSymbolOfCallHierarchyDeclaration(c *checker.Checker, node *ast.Node) *ast.Symbol {
	if ast.IsClassStaticBlockDeclaration(node) {
		return nil
	}
	location := getCallHierarchyDeclarationReferenceNode(node)
	if location == nil {
		return nil
	}
	return c.GetSymbolAtLocation(location)
}

// Gets the text and range for the name of a call hierarchy declaration.
func getCallHierarchyItemName(program *compiler.Program, node *ast.Node) (text string, pos int, end int) {
	if ast.IsSourceFile(node) {
		sourceFile := node.AsSourceFile()
		return sourceFile.FileName(), 0, 0
	}

	if (ast.IsFunctionDeclaration(node) || ast.IsClassDeclaration(node)) && node.Name() == nil {
		if modifiers := node.Modifiers(); modifiers != nil {
			for _, mod := range modifiers.Nodes {
				if mod.Kind == ast.KindDefaultKeyword {
					sourceFile := ast.GetSourceFileOfNode(node)
					start := scanner.SkipTrivia(sourceFile.Text(), mod.Pos())
					return "default", start, mod.End()
				}
			}
		}
	}

	if ast.IsClassStaticBlockDeclaration(node) {
		sourceFile := ast.GetSourceFileOfNode(node)
		pos := scanner.SkipTrivia(sourceFile.Text(), moveRangePastModifiers(node).Pos())
		end := pos + 6 // "static".length
		c, done := program.GetTypeCheckerForFile(context.Background(), sourceFile)
		defer done()
		symbol := c.GetSymbolAtLocation(node.Parent)
		prefix := ""
		if symbol != nil {
			prefix = c.SymbolToString(symbol) + " "
		}
		return prefix + "static {}", pos, end
	}

	var declName *ast.Node
	if isAssignedExpression(node) {
		declName = node.Parent.Name()
	} else {
		declName = ast.GetNameOfDeclaration(node)
	}

	debug.AssertIsDefined(declName, "Expected call hierarchy item to have a name")

	if ast.IsIdentifier(declName) {
		text = declName.Text()
	} else if ast.IsStringOrNumericLiteralLike(declName) {
		text = declName.Text()
	} else if ast.IsComputedPropertyName(declName) {
		expr := declName.Expression()
		if ast.IsStringOrNumericLiteralLike(expr) {
			text = expr.Text()
		}
	}

	if text == "" {
		c, done := program.GetTypeCheckerForFile(context.Background(), ast.GetSourceFileOfNode(node))
		defer done()
		symbol := c.GetSymbolAtLocation(declName)
		if symbol != nil {
			text = c.SymbolToString(symbol)
		}
	}

	// get the text from printing the node on a single line without comments...
	if text == "" {
		sourceFile := ast.GetSourceFileOfNode(node)
		writer, putWriter := printer.GetSingleLineStringWriter()
		defer putWriter()
		p := printer.NewPrinter(printer.PrinterOptions{RemoveComments: true}, printer.PrintHandlers{}, nil)
		p.Write(node, sourceFile, writer, nil)
		text = writer.String()
	}

	sourceFile := ast.GetSourceFileOfNode(node)
	namePos := scanner.SkipTrivia(sourceFile.Text(), declName.Pos())

	return text, namePos, declName.End()
}

func getCallHierarchyItemContainerName(node *ast.Node) string {
	if isAssignedExpression(node) {
		parent := node.Parent
		if ast.IsPropertyDeclaration(parent) && ast.IsClassLike(parent.Parent) {
			if ast.IsClassExpression(parent.Parent) {
				if assignedName := ast.GetAssignedName(parent.Parent); assignedName != nil {
					return assignedName.Text()
				}
			} else {
				if name := parent.Parent.Name(); name != nil {
					return name.Text()
				}
			}
		}
		if ast.IsModuleBlock(parent.Parent.Parent.Parent) {
			modParent := parent.Parent.Parent.Parent.Parent
			if ast.IsModuleDeclaration(modParent) {
				if name := modParent.Name(); name != nil && ast.IsIdentifier(name) {
					return name.Text()
				}
			}
		}
		return ""
	}

	switch node.Kind {
	case ast.KindGetAccessor, ast.KindSetAccessor, ast.KindMethodDeclaration:
		if node.Parent.Kind == ast.KindObjectLiteralExpression {
			if assignedName := ast.GetAssignedName(node.Parent); assignedName != nil {
				return assignedName.Text()
			}
		}
		if name := ast.GetNameOfDeclaration(node.Parent); name != nil {
			return name.Text()
		}
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindModuleDeclaration:
		if ast.IsModuleBlock(node.Parent) {
			if ast.IsModuleDeclaration(node.Parent.Parent) {
				if name := node.Parent.Parent.Name(); name != nil && ast.IsIdentifier(name) {
					return name.Text()
				}
			}
		}
	}

	return ""
}

func moveRangePastModifiers(node *ast.Node) core.TextRange {
	if modifiers := node.Modifiers(); modifiers != nil && len(modifiers.Nodes) > 0 {
		lastMod := modifiers.Nodes[len(modifiers.Nodes)-1]
		return core.NewTextRange(lastMod.End(), node.End())
	}
	return core.NewTextRange(node.Pos(), node.End())
}

// Finds the implementation of a function-like declaration, if one exists.
func findImplementation(c *checker.Checker, node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}

	if !ast.IsFunctionLikeDeclaration(node) {
		return node
	}

	if node.Body() != nil {
		return node
	}

	if ast.IsConstructorDeclaration(node) {
		return ast.GetFirstConstructorWithBody(node.Parent)
	}

	if ast.IsFunctionDeclaration(node) || ast.IsMethodDeclaration(node) {
		symbol := getSymbolOfCallHierarchyDeclaration(c, node)
		if symbol != nil && symbol.ValueDeclaration != nil {
			if ast.IsFunctionLikeDeclaration(symbol.ValueDeclaration) && symbol.ValueDeclaration.Body() != nil {
				return symbol.ValueDeclaration
			}
		}
		return nil
	}

	return node
}

func findAllInitialDeclarations(c *checker.Checker, node *ast.Node) []*ast.Node {
	if ast.IsClassStaticBlockDeclaration(node) {
		return nil
	}

	symbol := getSymbolOfCallHierarchyDeclaration(c, node)
	if symbol == nil || symbol.Declarations == nil {
		return nil
	}

	type declKey struct {
		file string
		pos  int
	}

	indices := make([]int, len(symbol.Declarations))
	for i := range indices {
		indices[i] = i
	}
	keys := make([]declKey, len(symbol.Declarations))
	for i, decl := range symbol.Declarations {
		keys[i] = declKey{
			file: ast.GetSourceFileOfNode(decl).FileName(),
			pos:  decl.Pos(),
		}
	}

	slices.SortFunc(indices, func(a, b int) int {
		if keys[a].file != keys[b].file {
			return strings.Compare(keys[a].file, keys[b].file)
		}
		return keys[a].pos - keys[b].pos
	})

	var declarations []*ast.Node
	var lastDecl *ast.Node

	for _, i := range indices {
		decl := symbol.Declarations[i]
		if isValidCallHierarchyDeclaration(decl) {
			if lastDecl == nil || lastDecl.Parent != decl.Parent || lastDecl.End() != decl.Pos() {
				declarations = append(declarations, decl)
			}
			lastDecl = decl
		}
	}

	return declarations
}

// Find the implementation or the first declaration for a call hierarchy declaration.
func findImplementationOrAllInitialDeclarations(c *checker.Checker, node *ast.Node) any {
	if ast.IsClassStaticBlockDeclaration(node) {
		return node
	}

	if ast.IsFunctionLikeDeclaration(node) {
		if impl := findImplementation(c, node); impl != nil {
			return impl
		}
		if decls := findAllInitialDeclarations(c, node); decls != nil {
			return decls
		}
		return node
	}

	if decls := findAllInitialDeclarations(c, node); decls != nil {
		return decls
	}
	return node
}

// Resolves the call hierarchy declaration for a node.
func resolveCallHierarchyDeclaration(program *compiler.Program, location *ast.Node) (result any) {
	// A call hierarchy item must refer to either a SourceFile, Module Declaration, Class Static Block, or something intrinsically callable that has a name:
	// - Class Declarations
	// - Class Expressions (with a name)
	// - Function Declarations
	// - Function Expressions (with a name or assigned to a const variable)
	// - Arrow Functions (assigned to a const variable)
	// - Constructors
	// - Class `static {}` initializer blocks
	// - Methods
	// - Accessors
	//
	// If a call is contained in a non-named callable Node (function expression, arrow function, etc.), then
	// its containing `CallHierarchyItem` is a containing function or SourceFile that matches the above list.

	c, done := program.GetTypeChecker(context.Background())
	defer done()

	followingSymbol := false

	for location != nil {
		if isValidCallHierarchyDeclaration(location) {
			return findImplementationOrAllInitialDeclarations(c, location)
		}

		if isPossibleCallHierarchyDeclaration(location) {
			ancestor := ast.FindAncestor(location, isValidCallHierarchyDeclaration)
			if ancestor != nil {
				return findImplementationOrAllInitialDeclarations(c, ancestor)
			}
		}

		if ast.IsDeclarationName(location) {
			if isValidCallHierarchyDeclaration(location.Parent) {
				return findImplementationOrAllInitialDeclarations(c, location.Parent)
			}
			if isPossibleCallHierarchyDeclaration(location.Parent) {
				ancestor := ast.FindAncestor(location.Parent, isValidCallHierarchyDeclaration)
				if ancestor != nil {
					return findImplementationOrAllInitialDeclarations(c, ancestor)
				}
			}
			if isVariableLike(location.Parent) {
				initializer := location.Parent.Initializer()
				if initializer != nil && isAssignedExpression(initializer) {
					return initializer
				}
			}
			return nil
		}

		if ast.IsConstructorDeclaration(location) {
			if isValidCallHierarchyDeclaration(location.Parent) {
				return location.Parent
			}
			return nil
		}

		if location.Kind == ast.KindStaticKeyword && ast.IsClassStaticBlockDeclaration(location.Parent) {
			location = location.Parent
			continue
		}

		// #39453
		if ast.IsVariableDeclaration(location) {
			if initializer := location.Initializer(); initializer != nil && isAssignedExpression(initializer) {
				return initializer
			}
		}

		if !followingSymbol {
			symbol := c.GetSymbolAtLocation(location)
			if symbol != nil {
				if (symbol.Flags & ast.SymbolFlagsAlias) != 0 {
					symbol = c.GetAliasedSymbol(symbol)
				}
				if symbol.ValueDeclaration != nil {
					followingSymbol = true
					location = symbol.ValueDeclaration
					continue
				}
			}
		}

		return nil
	}

	return nil
}

// Creates a `CallHierarchyItem` for a call hierarchy declaration.
func (l *LanguageService) createCallHierarchyItem(program *compiler.Program, node *ast.Node) *lsproto.CallHierarchyItem {
	sourceFile := ast.GetSourceFileOfNode(node)
	nameText, namePos, nameEnd := getCallHierarchyItemName(program, node)
	containerName := getCallHierarchyItemContainerName(node)

	kind := getSymbolKindFromNode(node)

	fullStart := scanner.SkipTriviaEx(sourceFile.Text(), node.Pos(), &scanner.SkipTriviaOptions{StopAtComments: true})
	script := l.getScript(sourceFile.FileName())
	span := l.converters.ToLSPRange(script, core.NewTextRange(fullStart, node.End()))
	selectionSpan := l.converters.ToLSPRange(script, core.NewTextRange(namePos, nameEnd))

	item := &lsproto.CallHierarchyItem{
		Name:           nameText,
		Kind:           kind,
		Uri:            lsconv.FileNameToDocumentURI(sourceFile.FileName()),
		Range:          span,
		SelectionRange: selectionSpan,
	}

	if containerName != "" {
		item.Detail = &containerName
	}

	return item
}

type callSite struct {
	declaration *ast.Node
	textRange   core.TextRange
	sourceFile  *ast.Node
}

func convertEntryToCallSite(entry *ReferenceEntry) *callSite {
	if entry.kind != entryKindNode {
		return nil
	}

	node := entry.node
	if !ast.IsCallOrNewExpressionTarget(node, true /*includeElementAccess*/, true /*skipPastOuterExpressions*/) &&
		!ast.IsTaggedTemplateTag(node, true, true) &&
		!ast.IsDecoratorTarget(node, true, true) &&
		!ast.IsJsxOpeningLikeElementTagName(node, true, true) &&
		!ast.IsRightSideOfPropertyAccess(node) &&
		!ast.IsArgumentExpressionOfElementAccess(node) {
		return nil
	}

	sourceFile := ast.GetSourceFileOfNode(node)
	ancestor := ast.FindAncestor(node, isValidCallHierarchyDeclaration)
	if ancestor == nil {
		ancestor = sourceFile.AsNode()
	}

	start := scanner.SkipTrivia(sourceFile.Text(), node.Pos())
	return &callSite{
		declaration: ancestor,
		textRange:   core.NewTextRange(start, node.End()),
		sourceFile:  sourceFile.AsNode(),
	}
}

func getCallSiteGroupKey(site *callSite) ast.NodeId {
	return ast.GetNodeId(site.declaration)
}

func (l *LanguageService) convertCallSiteGroupToIncomingCall(program *compiler.Program, entries []*callSite) *lsproto.CallHierarchyIncomingCall {
	fromRanges := make([]lsproto.Range, len(entries))
	for i, entry := range entries {
		script := l.getScript(entry.sourceFile.AsSourceFile().FileName())
		fromRanges[i] = l.converters.ToLSPRange(script, entry.textRange)
	}

	slices.SortFunc(fromRanges, func(a, b lsproto.Range) int {
		return lsproto.CompareRanges(&a, &b)
	})

	return &lsproto.CallHierarchyIncomingCall{
		From:       l.createCallHierarchyItem(program, entries[0].declaration),
		FromRanges: fromRanges,
	}
}

// Gets the call sites that call into the provided call hierarchy declaration.
func (l *LanguageService) getIncomingCalls(ctx context.Context, program *compiler.Program, declaration *ast.Node) []*lsproto.CallHierarchyIncomingCall {
	// Source files and modules have no incoming calls.
	if ast.IsSourceFile(declaration) || ast.IsModuleDeclaration(declaration) || ast.IsClassStaticBlockDeclaration(declaration) {
		return nil
	}

	location := getCallHierarchyDeclarationReferenceNode(declaration)
	if location == nil {
		return nil
	}

	sourceFiles := program.GetSourceFiles()
	options := refOptions{use: referenceUseReferences}
	symbolsAndEntries := l.getReferencedSymbolsForNode(ctx, 0, location, program, sourceFiles, options, nil)

	var refEntries []*ReferenceEntry
	for _, symbolAndEntry := range symbolsAndEntries {
		refEntries = append(refEntries, symbolAndEntry.references...)
	}

	var callSites []*callSite
	for _, entry := range refEntries {
		if site := convertEntryToCallSite(entry); site != nil {
			callSites = append(callSites, site)
		}
	}

	if len(callSites) == 0 {
		return nil
	}

	grouped := make(map[ast.NodeId][]*callSite)
	for _, site := range callSites {
		key := getCallSiteGroupKey(site)
		grouped[key] = append(grouped[key], site)
	}

	var result []*lsproto.CallHierarchyIncomingCall
	for _, sites := range grouped {
		result = append(result, l.convertCallSiteGroupToIncomingCall(program, sites))
	}

	slices.SortFunc(result, func(a, b *lsproto.CallHierarchyIncomingCall) int {
		if uriComp := strings.Compare(string(a.From.Uri), string(b.From.Uri)); uriComp != 0 {
			return uriComp
		}
		if len(a.FromRanges) == 0 || len(b.FromRanges) == 0 {
			return 0
		}
		return lsproto.CompareRanges(&a.FromRanges[0], &b.FromRanges[0])
	})

	return result
}

type callSiteCollector struct {
	program   *compiler.Program
	callSites []*callSite
}

func (c *callSiteCollector) recordCallSite(node *ast.Node) {
	var target *ast.Node

	switch {
	case ast.IsTaggedTemplateExpression(node):
		target = node.AsTaggedTemplateExpression().Tag
	case ast.IsJsxOpeningElement(node):
		target = node.TagName()
	case ast.IsJsxSelfClosingElement(node):
		target = node.TagName()
	case ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node):
		target = node
	case ast.IsClassStaticBlockDeclaration(node):
		target = node
	case ast.IsCallExpression(node):
		target = node.Expression()
	case ast.IsNewExpression(node):
		target = node.Expression()
	case ast.IsDecorator(node):
		target = node.Expression()
	}

	if target == nil {
		return
	}

	declaration := resolveCallHierarchyDeclaration(c.program, target)
	if declaration == nil {
		return
	}

	sourceFile := ast.GetSourceFileOfNode(target)
	start := scanner.SkipTrivia(sourceFile.Text(), target.Pos())
	textRange := core.NewTextRange(start, target.End())

	switch decl := declaration.(type) {
	case *ast.Node:
		c.callSites = append(c.callSites, &callSite{
			declaration: decl,
			textRange:   textRange,
			sourceFile:  sourceFile.AsNode(),
		})
	case []*ast.Node:
		for _, d := range decl {
			c.callSites = append(c.callSites, &callSite{
				declaration: d,
				textRange:   textRange,
				sourceFile:  sourceFile.AsNode(),
			})
		}
	}
}

func (c *callSiteCollector) collect(node *ast.Node) {
	if node == nil {
		return
	}

	// do not descend into ambient nodes.
	if (node.Flags & ast.NodeFlagsAmbient) != 0 {
		return
	}

	// do not descend into other call site declarations, other than class member names
	if isValidCallHierarchyDeclaration(node) {
		if ast.IsClassLike(node) {
			for _, member := range node.Members() {
				if member.Name() != nil && ast.IsComputedPropertyName(member.Name()) {
					c.collect(member.Name().Expression())
				}
			}
		}
		return
	}

	switch node.Kind {
	case ast.KindIdentifier,
		ast.KindImportEqualsDeclaration,
		ast.KindImportDeclaration,
		ast.KindExportDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration:
		// do not descend into nodes that cannot contain callable nodes
		return
	case ast.KindClassStaticBlockDeclaration:
		c.recordCallSite(node)
		return
	case ast.KindTypeAssertionExpression, ast.KindAsExpression:
		// do not descend into the type side of an assertion
		c.collect(node.Expression())
		return
	case ast.KindVariableDeclaration, ast.KindParameter:
		// do not descend into the type of a variable or parameter declaration
		c.collect(node.Name())
		c.collect(node.Initializer())
		return
	case ast.KindCallExpression:
		// do not descend into the type arguments of a call expression
		c.recordCallSite(node)
		c.collect(node.Expression())
		for _, arg := range node.Arguments() {
			c.collect(arg)
		}
		return
	case ast.KindNewExpression:
		// do not descend into the type arguments of a new expression
		c.recordCallSite(node)
		c.collect(node.Expression())
		for _, arg := range node.Arguments() {
			c.collect(arg)
		}
		return
	case ast.KindTaggedTemplateExpression:
		// do not descend into the type arguments of a tagged template expression
		c.recordCallSite(node)
		taggedTemplate := node.AsTaggedTemplateExpression()
		c.collect(taggedTemplate.Tag)
		c.collect(taggedTemplate.Template)
		return
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement:
		// do not descend into the type arguments of a JsxOpeningLikeElement
		c.recordCallSite(node)
		c.collect(node.TagName())
		c.collect(node.Attributes())
		return
	case ast.KindDecorator:
		c.recordCallSite(node)
		c.collect(node.Expression())
		return
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		c.recordCallSite(node)
		node.ForEachChild(func(child *ast.Node) bool {
			c.collect(child)
			return false
		})
		return
	case ast.KindSatisfiesExpression:
		// do not descend into the type side of an assertion
		c.collect(node.Expression())
		return
	}

	if ast.IsPartOfTypeNode(node) {
		// do not descend into types
		return
	}

	node.ForEachChild(func(child *ast.Node) bool {
		c.collect(child)
		return false
	})
}

func collectCallSites(program *compiler.Program, c *checker.Checker, node *ast.Node) []*callSite {
	collector := &callSiteCollector{
		program:   program,
		callSites: make([]*callSite, 0),
	}

	switch node.Kind {
	case ast.KindSourceFile:
		for _, stmt := range node.Statements() {
			collector.collect(stmt)
		}

	case ast.KindModuleDeclaration:
		if body := node.Body(); !ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient) && body != nil && ast.IsModuleBlock(body) {
			for _, stmt := range body.Statements() {
				collector.collect(stmt)
			}
		}

	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction,
		ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
		impl := findImplementation(c, node)
		if impl != nil {
			for _, param := range impl.Parameters() {
				collector.collect(param)
			}
			collector.collect(impl.Body())
		}

	case ast.KindClassDeclaration, ast.KindClassExpression:
		if modifiers := node.Modifiers(); modifiers != nil {
			for _, mod := range modifiers.Nodes {
				collector.collect(mod)
			}
		}

		heritage := ast.GetClassExtendsHeritageElement(node)
		if heritage != nil {
			collector.collect(heritage.Expression())
		}

		for _, member := range node.Members() {
			if ast.CanHaveModifiers(member) && member.Modifiers() != nil {
				for _, mod := range member.Modifiers().Nodes {
					collector.collect(mod)
				}
			}

			if ast.IsPropertyDeclaration(member) {
				collector.collect(member.Initializer())
			} else if ast.IsConstructorDeclaration(member) {
				if body := member.Body(); body != nil {
					for _, param := range member.Parameters() {
						collector.collect(param)
					}
					collector.collect(body)
				}
			} else if ast.IsClassStaticBlockDeclaration(member) {
				collector.collect(member)
			}
		}

	case ast.KindClassStaticBlockDeclaration:
		staticBlock := node.AsClassStaticBlockDeclaration()
		collector.collect(staticBlock.Body)

	default:
		debug.AssertNever(node)
	}

	return collector.callSites
}

func (l *LanguageService) convertCallSiteGroupToOutgoingCall(program *compiler.Program, entries []*callSite) *lsproto.CallHierarchyOutgoingCall {
	fromRanges := make([]lsproto.Range, len(entries))
	for i, entry := range entries {
		script := l.getScript(entry.sourceFile.AsSourceFile().FileName())
		fromRanges[i] = l.converters.ToLSPRange(script, entry.textRange)
	}

	slices.SortFunc(fromRanges, func(a, b lsproto.Range) int {
		return lsproto.CompareRanges(&a, &b)
	})

	return &lsproto.CallHierarchyOutgoingCall{
		To:         l.createCallHierarchyItem(program, entries[0].declaration),
		FromRanges: fromRanges,
	}
}

// Gets the call sites that call out of the provided call hierarchy declaration.
func (l *LanguageService) getOutgoingCalls(program *compiler.Program, declaration *ast.Node) []*lsproto.CallHierarchyOutgoingCall {
	if (declaration.Flags&ast.NodeFlagsAmbient) != 0 || ast.IsMethodSignatureDeclaration(declaration) {
		return nil
	}

	c, done := program.GetTypeChecker(context.Background())
	defer done()

	callSites := collectCallSites(program, c, declaration)

	if len(callSites) == 0 {
		return nil
	}

	grouped := make(map[ast.NodeId][]*callSite)
	for _, site := range callSites {
		key := getCallSiteGroupKey(site)
		grouped[key] = append(grouped[key], site)
	}

	var result []*lsproto.CallHierarchyOutgoingCall
	for _, sites := range grouped {
		result = append(result, l.convertCallSiteGroupToOutgoingCall(program, sites))
	}

	slices.SortFunc(result, func(a, b *lsproto.CallHierarchyOutgoingCall) int {
		if uriComp := strings.Compare(string(a.To.Uri), string(b.To.Uri)); uriComp != 0 {
			return uriComp
		}
		if len(a.FromRanges) == 0 || len(b.FromRanges) == 0 {
			return 0
		}
		return lsproto.CompareRanges(&a.FromRanges[0], &b.FromRanges[0])
	})

	return result
}

func (l *LanguageService) ProvidePrepareCallHierarchy(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
) (lsproto.CallHierarchyPrepareResponse, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))

	if node.Kind == ast.KindSourceFile {
		return lsproto.CallHierarchyItemsOrNull{}, nil
	}

	declaration := resolveCallHierarchyDeclaration(program, node)
	if declaration == nil {
		return lsproto.CallHierarchyItemsOrNull{}, nil
	}

	var items []*lsproto.CallHierarchyItem
	switch decl := declaration.(type) {
	case *ast.Node:
		items = []*lsproto.CallHierarchyItem{l.createCallHierarchyItem(program, decl)}
	case []*ast.Node:
		items = make([]*lsproto.CallHierarchyItem, len(decl))
		for i, d := range decl {
			items[i] = l.createCallHierarchyItem(program, d)
		}
	}

	if items == nil {
		return lsproto.CallHierarchyItemsOrNull{}, nil
	}
	return lsproto.CallHierarchyItemsOrNull{CallHierarchyItems: &items}, nil
}

func (l *LanguageService) ProvideCallHierarchyIncomingCalls(
	ctx context.Context,
	item *lsproto.CallHierarchyItem,
) (lsproto.CallHierarchyIncomingCallsResponse, error) {
	program := l.GetProgram()
	fileName := item.Uri.FileName()
	file := program.GetSourceFile(fileName)
	if file == nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, nil
	}

	pos := int(l.converters.LineAndCharacterToPosition(file, item.SelectionRange.Start))
	var node *ast.Node
	if pos == 0 {
		node = file.AsNode()
	} else {
		node = astnav.GetTouchingPropertyName(file, pos)
	}

	if node == nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, nil
	}

	declaration := resolveCallHierarchyDeclaration(program, node)
	if declaration == nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, nil
	}

	var decl *ast.Node
	switch d := declaration.(type) {
	case *ast.Node:
		decl = d
	case []*ast.Node:
		if len(d) > 0 {
			decl = d[0]
		}
	}

	if decl == nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, nil
	}

	calls := l.getIncomingCalls(ctx, program, decl)
	if calls == nil {
		return lsproto.CallHierarchyIncomingCallsOrNull{}, nil
	}
	return lsproto.CallHierarchyIncomingCallsOrNull{CallHierarchyIncomingCalls: &calls}, nil
}

func (l *LanguageService) ProvideCallHierarchyOutgoingCalls(
	ctx context.Context,
	item *lsproto.CallHierarchyItem,
) (lsproto.CallHierarchyOutgoingCallsResponse, error) {
	program := l.GetProgram()
	fileName := item.Uri.FileName()
	file := program.GetSourceFile(fileName)
	if file == nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, nil
	}

	pos := int(l.converters.LineAndCharacterToPosition(file, item.SelectionRange.Start))
	var node *ast.Node
	if pos == 0 {
		node = file.AsNode()
	} else {
		node = astnav.GetTouchingPropertyName(file, pos)
	}

	if node == nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, nil
	}

	declaration := resolveCallHierarchyDeclaration(program, node)
	if declaration == nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, nil
	}

	var decl *ast.Node
	switch d := declaration.(type) {
	case *ast.Node:
		decl = d
	case []*ast.Node:
		if len(d) > 0 {
			decl = d[0]
		}
	}

	if decl == nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, nil
	}

	calls := l.getOutgoingCalls(program, decl)
	if calls == nil {
		return lsproto.CallHierarchyOutgoingCallsOrNull{}, nil
	}
	return lsproto.CallHierarchyOutgoingCallsOrNull{CallHierarchyOutgoingCalls: &calls}, nil
}
