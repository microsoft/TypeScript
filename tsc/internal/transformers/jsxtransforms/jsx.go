package jsxtransforms

import (
	"maps"
	"slices"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type JSXTransformer struct {
	transformers.Transformer
	compilerOptions *core.CompilerOptions
	emitResolver    printer.EmitResolver

	importSpecifier                string
	filenameDeclaration            *ast.Node
	utilizedImplicitRuntimeImports map[string]map[string]*ast.Node
	inJsxChild                     bool

	currentSourceFile *ast.SourceFile
}

func NewJSXTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opts.CompilerOptions
	emitContext := opts.Context
	tx := &JSXTransformer{
		compilerOptions: compilerOptions,
		emitResolver:    opts.EmitResolver,
	}
	return tx.NewTransformer(tx.visit, emitContext)
}

func (tx *JSXTransformer) getCurrentFileNameExpression() *ast.Node {
	if tx.filenameDeclaration != nil {
		return tx.filenameDeclaration.AsVariableDeclaration().Name()
	}
	d := tx.Factory().NewVariableDeclaration(
		tx.Factory().NewUniqueNameEx("_jsxFileName", printer.AutoGenerateOptions{
			Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel,
		}),
		nil,
		nil,
		tx.Factory().NewStringLiteral(tx.currentSourceFile.FileName()),
	)
	tx.filenameDeclaration = d
	return d.AsVariableDeclaration().Name()
}

func (tx *JSXTransformer) getJsxFactoryCalleePrimitive(isStaticChildren bool) string {
	if tx.compilerOptions.Jsx == core.JsxEmitReactJSXDev {
		return "jsxDEV"
	}
	if isStaticChildren {
		return "jsxs"
	}
	return "jsx"
}

func (tx *JSXTransformer) getJsxFactoryCallee(isStaticChildren bool) *ast.Node {
	t := tx.getJsxFactoryCalleePrimitive(isStaticChildren)
	return tx.getImplicitImportForName(t)
}

func (tx *JSXTransformer) getImplicitJsxFragmentReference() *ast.Node {
	return tx.getImplicitImportForName("Fragment")
}

func (tx *JSXTransformer) getImplicitImportForName(name string) *ast.Node {
	importSource := tx.importSpecifier
	if name != "createElement" {
		importSource = ast.GetJSXRuntimeImport(importSource, tx.compilerOptions)
	}
	existing, ok := tx.utilizedImplicitRuntimeImports[importSource]
	if ok {
		elem, ok := existing[name]
		if ok {
			return elem.AsImportSpecifier().Name()
		}
	} else {
		tx.utilizedImplicitRuntimeImports[importSource] = make(map[string]*ast.Node)
	}

	generatedName := tx.Factory().NewUniqueNameEx("_"+name, printer.AutoGenerateOptions{
		Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel | printer.GeneratedIdentifierFlagsAllowNameSubstitution,
	})
	specifier := tx.Factory().NewImportSpecifier(false, tx.Factory().NewIdentifier(name), generatedName)
	tx.emitResolver.SetReferencedImportDeclaration(generatedName, specifier)
	tx.utilizedImplicitRuntimeImports[importSource][name] = specifier
	return specifier.Name()
}

func (tx *JSXTransformer) setInChild(v bool) {
	tx.inJsxChild = v
}

func (tx *JSXTransformer) visit(node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}
	if node.SubtreeFacts()&ast.SubtreeContainsJsx == 0 {
		return node
	}
	switch node.Kind {
	case ast.KindSourceFile:
		tx.setInChild(false)
		return tx.visitSourceFile(node.AsSourceFile())
	case ast.KindJsxElement:
		return tx.visitJsxElement(node.AsJsxElement())
	case ast.KindJsxSelfClosingElement:
		return tx.visitJsxSelfClosingElement(node.AsJsxSelfClosingElement())
	case ast.KindJsxFragment:
		return tx.visitJsxFragment(node.AsJsxFragment())
	case ast.KindJsxOpeningElement:
		panic("JsxOpeningElement should not be visited, handled in visitJsxElement")
	case ast.KindJsxOpeningFragment:
		panic("JsxOpeningFragment should not be visited, handled in visitJsxFragment")
	case ast.KindJsxText:
		tx.setInChild(false)
		return tx.visitJsxText(node.AsJsxText())
	case ast.KindJsxExpression:
		tx.setInChild(false)
		return tx.visitJsxExpression(node.AsJsxExpression())
	}
	tx.setInChild(false)
	return tx.Visitor().VisitEachChild(node) // by default, do nothing
}

/**
 * The react jsx/jsxs transform falls back to `createElement` when an explicit `key` argument comes after a spread
 */
func hasKeyAfterPropsSpread(node *ast.Node) bool {
	spread := false
	opener := node
	if node.Kind == ast.KindJsxElement {
		opener = node.AsJsxElement().OpeningElement
	} // otherwise self-closing
	for _, elem := range opener.Attributes().Properties() {
		if ast.IsJsxSpreadAttribute(elem) && (!ast.IsObjectLiteralExpression(elem.Expression()) || core.Some(elem.Expression().Properties(), ast.IsSpreadAssignment)) {
			spread = true
		} else if spread && ast.IsJsxAttribute(elem) && ast.IsIdentifier(elem.Name()) && elem.Name().AsIdentifier().Text == "key" {
			return true
		}
	}
	return false
}

func (tx *JSXTransformer) shouldUseCreateElement(node *ast.Node) bool {
	return len(tx.importSpecifier) == 0 || hasKeyAfterPropsSpread(node)
}

func insertStatementAfterPrologue[T any](to []*ast.Node, statement *ast.Node, isPrologueDirective func(callee T, node *ast.Node) bool, callee T) []*ast.Node {
	if statement == nil {
		return to
	}
	statementIdx := 0
	// skip all prologue directives to insert at the correct position
	for ; statementIdx < len(to); statementIdx++ {
		if !isPrologueDirective(callee, to[statementIdx]) {
			break
		}
	}
	return slices.Insert(to, statementIdx, statement)
}

func (tx *JSXTransformer) isAnyPrologueDirective(node *ast.Node) bool {
	return ast.IsPrologueDirective(node) || (tx.EmitContext().EmitFlags(node)&printer.EFCustomPrologue != 0)
}

func (tx *JSXTransformer) insertStatementAfterCustomPrologue(to []*ast.Node, statement *ast.Node) []*ast.Node {
	return insertStatementAfterPrologue(to, statement, (*JSXTransformer).isAnyPrologueDirective, tx)
}

func sortByImportDeclarationSource(a *ast.Node, b *ast.Node) int {
	return stringutil.CompareStringsCaseSensitive(a.AsImportDeclaration().ModuleSpecifier.AsStringLiteral().Text, b.AsImportDeclaration().ModuleSpecifier.AsStringLiteral().Text)
}

func getSpecifierOfRequireCall(s *ast.Node) string {
	return s.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes[0].AsVariableDeclaration().Initializer.AsCallExpression().Arguments.Nodes[0].AsStringLiteral().Text
}

func sortByRequireSource(a *ast.Node, b *ast.Node) int {
	return stringutil.CompareStringsCaseSensitive(getSpecifierOfRequireCall(a), getSpecifierOfRequireCall(b))
}

func sortImportSpecifiers(a *ast.Node, b *ast.Node) int {
	res := stringutil.CompareStringsCaseSensitive(a.AsImportSpecifier().PropertyName.Text(), b.AsImportSpecifier().PropertyName.Text())
	if res != 0 {
		return res
	}
	return stringutil.CompareStringsCaseSensitive(a.AsImportSpecifier().Name().AsIdentifier().Text, b.AsImportSpecifier().Name().AsIdentifier().Text)
}

func getSortedSpecifiers(m map[string]*ast.Node) []*ast.Node {
	res := slices.Collect(maps.Values(m))
	slices.SortFunc(res, sortImportSpecifiers)
	return res
}

func (tx *JSXTransformer) visitSourceFile(file *ast.SourceFile) *ast.Node {
	if file.IsDeclarationFile {
		return file.AsNode()
	}

	tx.currentSourceFile = file
	tx.importSpecifier = ast.GetJSXImplicitImportBase(tx.compilerOptions, file)
	tx.filenameDeclaration = nil
	tx.utilizedImplicitRuntimeImports = make(map[string]map[string]*ast.Node)

	visited := tx.Visitor().VisitEachChild(file.AsNode())
	tx.EmitContext().AddEmitHelper(visited.AsNode(), tx.EmitContext().ReadEmitHelpers()...)
	statements := visited.Statements()
	statementsUpdated := false
	if tx.filenameDeclaration != nil {
		statements = tx.insertStatementAfterCustomPrologue(statements, tx.Factory().NewVariableStatement(nil, tx.Factory().NewVariableDeclarationList(
			ast.NodeFlagsConst,
			tx.Factory().NewNodeList([]*ast.Node{tx.filenameDeclaration}),
		)))
		statementsUpdated = true
	}

	if len(tx.utilizedImplicitRuntimeImports) > 0 {
		// A key difference from strada is that these imports are sorted in corsa, rather than appearing in a use-defined order
		if ast.IsExternalModule(file) {
			statementsUpdated = true
			newStatements := make([]*ast.Node, 0, len(tx.utilizedImplicitRuntimeImports))
			for importSource, importSpecifiersMap := range tx.utilizedImplicitRuntimeImports {
				s := tx.Factory().NewImportDeclaration(
					nil,
					tx.Factory().NewImportClause(false, nil, tx.Factory().NewNamedImports(tx.Factory().NewNodeList(getSortedSpecifiers(importSpecifiersMap)))),
					tx.Factory().NewStringLiteral(importSource),
					nil,
				)
				ast.SetParentInChildren(s)
				newStatements = append(newStatements, s)

			}
			slices.SortFunc(newStatements, sortByImportDeclarationSource)
			for _, e := range newStatements {
				statements = tx.insertStatementAfterCustomPrologue(statements, e)
			}
		} else if ast.IsExternalOrCommonJSModule(file) {
			statementsUpdated = true
			newStatements := make([]*ast.Node, 0, len(tx.utilizedImplicitRuntimeImports))
			for importSource, importSpecifiersMap := range tx.utilizedImplicitRuntimeImports {
				sorted := getSortedSpecifiers(importSpecifiersMap)
				asBindingElems := make([]*ast.Node, 0, len(sorted))
				for _, elem := range sorted {
					asBindingElems = append(asBindingElems, tx.Factory().NewBindingElement(nil, elem.AsImportSpecifier().PropertyName, elem.AsImportSpecifier().Name(), nil))
				}
				s := tx.Factory().NewVariableStatement(nil, tx.Factory().NewVariableDeclarationList(ast.NodeFlagsConst, tx.Factory().NewNodeList([]*ast.Node{tx.Factory().NewVariableDeclaration(
					tx.Factory().NewBindingPattern(ast.KindObjectBindingPattern, tx.Factory().NewNodeList(asBindingElems)),
					nil,
					nil,
					tx.Factory().NewCallExpression(tx.Factory().NewIdentifier("require"), nil, nil, tx.Factory().NewNodeList([]*ast.Node{tx.Factory().NewStringLiteral(importSource)}), ast.NodeFlagsNone),
				)})))
				ast.SetParentInChildren(s)
				newStatements = append(newStatements, s)
			}
			slices.SortFunc(newStatements, sortByRequireSource)
			for _, e := range newStatements {
				statements = tx.insertStatementAfterCustomPrologue(statements, e)
			}
		} else {
			// Do nothing (script file) - consider an error in the checker?
		}
	}

	if statementsUpdated {
		visited = tx.Factory().UpdateSourceFile(file, tx.Factory().NewNodeList(statements), file.EndOfFileToken)
	}

	tx.currentSourceFile = nil
	tx.importSpecifier = ""
	tx.filenameDeclaration = nil
	tx.utilizedImplicitRuntimeImports = nil

	return visited
}

func (tx *JSXTransformer) visitJsxElement(element *ast.JsxElement) *ast.Node {
	tagTransform := (*JSXTransformer).visitJsxOpeningLikeElementJSX
	if tx.shouldUseCreateElement(element.AsNode()) {
		tagTransform = (*JSXTransformer).visitJsxOpeningLikeElementCreateElement
	}
	return tagTransform(tx, element.OpeningElement, element.Children, element.AsNode())
}

func (tx *JSXTransformer) visitJsxSelfClosingElement(element *ast.JsxSelfClosingElement) *ast.Node {
	tagTransform := (*JSXTransformer).visitJsxOpeningLikeElementJSX
	if tx.shouldUseCreateElement(element.AsNode()) {
		tagTransform = (*JSXTransformer).visitJsxOpeningLikeElementCreateElement
	}
	return tagTransform(tx, element.AsNode(), nil, element.AsNode())
}

func (tx *JSXTransformer) visitJsxFragment(fragment *ast.JsxFragment) *ast.Node {
	tagTransform := (*JSXTransformer).visitJsxOpeningFragmentJSX
	if len(tx.importSpecifier) == 0 {
		tagTransform = (*JSXTransformer).visitJsxOpeningFragmentCreateElement
	}
	return tagTransform(tx, fragment.OpeningFragment.AsJsxOpeningFragment(), fragment.Children, fragment.AsNode())
}

func (tx *JSXTransformer) convertJsxChildrenToChildrenPropObject(children []*ast.JsxChild) *ast.Node {
	prop := tx.convertJsxChildrenToChildrenPropAssignment(children)
	if prop == nil {
		return nil
	}
	return tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{prop}), false)
}

func (tx *JSXTransformer) transformJsxChildToExpression(node *ast.Node) *ast.Node {
	tx.setInChild(true)
	defer tx.setInChild(false)
	return tx.Visitor().Visit(node)
}

func (tx *JSXTransformer) convertJsxChildrenToChildrenPropAssignment(children []*ast.JsxChild) *ast.Node {
	nonWhitespceChildren := ast.GetSemanticJsxChildren(children)
	if len(nonWhitespceChildren) == 1 && (nonWhitespceChildren[0].Kind != ast.KindJsxExpression || nonWhitespceChildren[0].AsJsxExpression().DotDotDotToken == nil) {
		result := tx.transformJsxChildToExpression(nonWhitespceChildren[0])
		if result == nil {
			return nil
		}
		return tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("children"), nil, nil, result)
	}
	results := make([]*ast.Node, 0, len(nonWhitespceChildren))
	for _, child := range nonWhitespceChildren {
		res := tx.transformJsxChildToExpression(child)
		if res == nil {
			continue
		}
		results = append(results, res)
	}
	if len(results) == 0 {
		return nil
	}
	return tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("children"), nil, nil, tx.Factory().NewArrayLiteralExpression(tx.Factory().NewNodeList(results), false))
}

func (tx *JSXTransformer) getTagName(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindJsxElement {
		return tx.getTagName(node.AsJsxElement().OpeningElement)
	} else if ast.IsJsxOpeningLikeElement(node) {
		tagName := node.TagName()
		if ast.IsIdentifier(tagName) && scanner.IsIntrinsicJsxName(tagName.Text()) {
			return tx.Factory().NewStringLiteral(tagName.Text())
		} else if ast.IsJsxNamespacedName(tagName) {
			return tx.Factory().NewStringLiteral(tagName.AsJsxNamespacedName().Namespace.Text() + ":" + tagName.AsJsxNamespacedName().Name().Text())
		} else {
			return createExpressionFromEntityName(tx.Factory(), tagName)
		}
	} else {
		panic("unhandled node kind passed to getTagName: " + node.Kind.String())
	}
}

func (tx *JSXTransformer) visitJsxOpeningLikeElementJSX(element *ast.Node, children *ast.NodeList, location *ast.Node) *ast.Node {
	tagName := tx.getTagName(element)
	var childrenProp *ast.Node
	if children != nil && len(children.Nodes) > 0 {
		childrenProp = tx.convertJsxChildrenToChildrenPropAssignment(children.Nodes)
	}
	var keyAttr *ast.Node
	attrs := element.Attributes().AsJsxAttributes().Properties.Nodes
	for i, p := range attrs {
		if p.Kind == ast.KindJsxAttribute && p.AsJsxAttribute().Name() != nil && ast.IsIdentifier(p.AsJsxAttribute().Name()) && p.AsJsxAttribute().Name().AsIdentifier().Text == "key" {
			keyAttr = p
			attrs = slices.Clone(attrs)
			attrs = slices.Delete(attrs, i, i+1)
			break
		}
	}
	var object *ast.Node
	if len(attrs) > 0 {
		object = tx.transformJsxAttributesToObjectProps(attrs, childrenProp)
	} else {
		objectChildren := []*ast.Node{}
		if childrenProp != nil {
			objectChildren = append(objectChildren, childrenProp)
		}
		object = tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList(objectChildren), false) // When there are no attributes, React wants {}
	}
	return tx.visitJsxOpeningLikeElementOrFragmentJSX(
		tagName,
		object,
		keyAttr,
		children,
		location,
	)
}

func (tx *JSXTransformer) transformJsxAttributesToObjectProps(attrs []*ast.Node, childrenProp *ast.Node) *ast.Node {
	target := tx.compilerOptions.GetEmitScriptTarget()
	if target >= core.ScriptTargetES2018 {
		// target has object spreads, can keep as-is
		return tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList(tx.transformJsxAttributesToProps(attrs, childrenProp)), false)
	}
	return tx.transformJsxAttributesToExpression(attrs, childrenProp)
}

func (tx *JSXTransformer) transformJsxAttributesToExpression(attrs []*ast.Node, childrenProp *ast.Node) *ast.Node {
	expressions := make([]*ast.Expression, 0, 2)
	properties := make([]*ast.ObjectLiteralElement, 0, len(attrs))

	for _, attr := range attrs {
		if ast.IsJsxSpreadAttribute(attr) {
			// as an optimization we try to flatten the first level of spread inline object
			// as if its props would be passed as JSX attributes
			if ast.IsObjectLiteralExpression(attr.Expression()) && !hasProto(attr.Expression().AsObjectLiteralExpression()) {
				for _, prop := range attr.Expression().Properties() {
					if ast.IsSpreadAssignment(prop) {
						expressions, properties = tx.combinePropertiesIntoNewExpression(expressions, properties)
						expressions = append(expressions, tx.Visitor().Visit(prop.Expression()))
						continue
					}
					properties = append(properties, tx.Visitor().Visit(prop))
				}
				continue
			}
			expressions, properties = tx.combinePropertiesIntoNewExpression(expressions, properties)
			expressions = append(expressions, tx.Visitor().Visit(attr.Expression()))
			continue
		}
		properties = append(properties, tx.transformJsxAttributeToObjectLiteralElement(attr.AsJsxAttribute()))
	}

	if childrenProp != nil {
		properties = append(properties, childrenProp)
	}

	expressions, _ = tx.combinePropertiesIntoNewExpression(expressions, properties)

	if len(expressions) > 0 && !ast.IsObjectLiteralExpression(expressions[0]) {
		// We must always emit at least one object literal before a spread attribute
		// as the JSX always factory expects a fresh object, so we need to make a copy here
		// we also avoid mutating an external reference by doing this (first expression is used as assign's target)
		expressions = append([]*ast.Expression{tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{}), false)}, expressions...)
	}

	if len(expressions) == 1 {
		return expressions[0]
	}
	return tx.Factory().NewAssignHelper(expressions, tx.compilerOptions.GetEmitScriptTarget())
}

func (tx *JSXTransformer) combinePropertiesIntoNewExpression(expressions []*ast.Expression, props []*ast.ObjectLiteralElement) ([]*ast.Expression, []*ast.ObjectLiteralElement) {
	if len(props) == 0 {
		return expressions, props
	}
	newObj := tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList(props), false)
	expressions = append(expressions, newObj)
	return expressions, nil
}

func (tx *JSXTransformer) transformJsxAttributesToProps(attrs []*ast.Node, childrenProp *ast.Node) []*ast.Node {
	props := make([]*ast.Node, 0, len(attrs))
	for _, attr := range attrs {
		if attr.Kind == ast.KindJsxSpreadAttribute {
			res := tx.transformJsxSpreadAttributesToProps(attr.AsJsxSpreadAttribute())
			props = append(props, res...)
		} else {
			props = append(props, tx.transformJsxAttributeToObjectLiteralElement(attr.AsJsxAttribute()))
		}
	}
	if childrenProp != nil {
		props = append(props, childrenProp)
	}
	return props
}

func hasProto(obj *ast.ObjectLiteralExpression) bool {
	for _, p := range obj.Properties.Nodes {
		if ast.IsPropertyAssignment(p) && (ast.IsStringLiteral(p.Name()) || ast.IsIdentifier(p.Name())) && p.Name().Text() == "__proto__" {
			return true
		}
	}
	return false
}

func (tx *JSXTransformer) transformJsxSpreadAttributesToProps(node *ast.JsxSpreadAttribute) []*ast.Node {
	if ast.IsObjectLiteralExpression(node.Expression) && !hasProto(node.Expression.AsObjectLiteralExpression()) {
		res, _ := tx.Visitor().VisitSlice(node.Expression.Properties())
		return res
	}
	return []*ast.Node{tx.Factory().NewSpreadAssignment(tx.Visitor().Visit(node.Expression))}
}

func (tx *JSXTransformer) transformJsxAttributeToObjectLiteralElement(node *ast.JsxAttribute) *ast.Node {
	name := tx.getAttributeName(node)
	expression := tx.transformJsxAttributeInitializer(node.Initializer)
	return tx.Factory().NewPropertyAssignment(nil, name, nil, nil, expression)
}

/**
* Emit an attribute name, which is quoted if it needs to be quoted. Because
* these emit into an object literal property name, we don't need to be worried
* about keywords, just non-identifier characters
 */
func (tx *JSXTransformer) getAttributeName(node *ast.JsxAttribute) *ast.Node {
	name := node.Name()
	if ast.IsIdentifier(name) {
		text := name.Text()
		if scanner.IsIdentifierText(text, core.LanguageVariantStandard) {
			return name
		}
		return tx.Factory().NewStringLiteral(text)
	}
	// must be jsx namespace
	return tx.Factory().NewStringLiteral(name.AsJsxNamespacedName().Namespace.Text() + ":" + name.AsJsxNamespacedName().Name().Text())
}

func (tx *JSXTransformer) transformJsxAttributeInitializer(node *ast.Node) *ast.Node {
	if node == nil {
		return tx.Factory().NewTrueExpression()
	}
	if node.Kind == ast.KindStringLiteral {
		// Always recreate the literal to escape any escape sequences or newlines which may be in the original jsx string and which
		// Need to be escaped to be handled correctly in a normal string
		res := tx.Factory().NewStringLiteral(decodeEntities(node.Text()))
		res.Loc = node.Loc
		return res
	}
	if node.Kind == ast.KindJsxExpression {
		if node.AsJsxExpression().Expression == nil {
			return tx.Factory().NewTrueExpression()
		}
		return tx.Visitor().Visit(node.AsJsxExpression().Expression)
	}
	if ast.IsJsxElement(node) || ast.IsJsxSelfClosingElement(node) || ast.IsJsxFragment(node) {
		tx.setInChild(false)
		return tx.Visitor().Visit(node)
	}
	panic("Unhandled node kind found in jsx initializer: " + node.Kind.String())
}

func (tx *JSXTransformer) visitJsxOpeningLikeElementOrFragmentJSX(
	tagName *ast.Expression,
	object *ast.Expression,
	keyAttr *ast.Node,
	children *ast.NodeList,
	location *ast.Node,
) *ast.Node {
	var nonWhitespaceChildren []*ast.Node
	if children != nil {
		nonWhitespaceChildren = ast.GetSemanticJsxChildren(children.Nodes)
	}
	isStaticChildren := len(nonWhitespaceChildren) > 1 || (len(nonWhitespaceChildren) == 1 && ast.IsJsxExpression(nonWhitespaceChildren[0]) && nonWhitespaceChildren[0].AsJsxExpression().DotDotDotToken != nil)
	args := make([]*ast.Node, 0, 3)
	args = append(args, tagName, object)
	// function jsx(type, config, maybeKey) {}
	// "maybeKey" is optional. It is acceptable to use "_jsx" without a third argument
	if keyAttr != nil {
		args = append(args, tx.transformJsxAttributeInitializer(keyAttr.Initializer()))
	}

	if tx.compilerOptions.Jsx == core.JsxEmitReactJSXDev {
		originalFile := tx.EmitContext().Original(tx.currentSourceFile.AsNode())
		if originalFile != nil && ast.IsSourceFile(originalFile) {
			// "maybeKey" has to be replaced with "void 0" to not break the jsxDEV signature
			if keyAttr == nil {
				args = append(args, tx.Factory().NewVoidZeroExpression())
			}
			// isStaticChildren development flag
			if isStaticChildren {
				args = append(args, tx.Factory().NewTrueExpression())
			} else {
				args = append(args, tx.Factory().NewFalseExpression())
			}
			// __source development flag
			line, col := scanner.GetECMALineAndCharacterOfPosition(originalFile.AsSourceFile(), location.Pos())
			args = append(args, tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{
				tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("fileName"), nil, nil, tx.getCurrentFileNameExpression()),
				tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("lineNumber"), nil, nil, tx.Factory().NewNumericLiteral(strconv.FormatInt(int64(line+1), 10))),
				tx.Factory().NewPropertyAssignment(nil, tx.Factory().NewIdentifier("columnNumber"), nil, nil, tx.Factory().NewNumericLiteral(strconv.FormatInt(int64(col+1), 10))),
			}), false))
			// __self development flag
			args = append(args, tx.Factory().NewThisExpression())
		}
	}

	element := tx.Factory().NewCallExpression(tx.getJsxFactoryCallee(isStaticChildren), nil, nil, tx.Factory().NewNodeList(args), ast.NodeFlagsNone)
	element.Loc = location.Loc

	if tx.inJsxChild {
		tx.EmitContext().AddEmitFlags(element, printer.EFStartOnNewLine)
	}

	return element
}

func (tx *JSXTransformer) visitJsxOpeningFragmentJSX(fragment *ast.JsxOpeningFragment, children *ast.NodeList, location *ast.Node) *ast.Node {
	var childrenProps *ast.Expression
	if children != nil && len(children.Nodes) > 0 {
		result := tx.convertJsxChildrenToChildrenPropObject(children.Nodes)
		if result != nil {
			childrenProps = result
		}
	}
	if childrenProps == nil {
		childrenProps = tx.Factory().NewObjectLiteralExpression(tx.Factory().NewNodeList([]*ast.Node{}), false)
	}
	return tx.visitJsxOpeningLikeElementOrFragmentJSX(
		tx.getImplicitJsxFragmentReference(),
		childrenProps,
		nil,
		children,
		location,
	)
}

func (tx *JSXTransformer) createReactNamespace(reactNamespace string, parent *ast.Node) *ast.Node {
	// To ensure the emit resolver can properly resolve the namespace, we need to
	// treat this identifier as if it were a source tree node by clearing the `Synthesized`
	// flag and setting a parent node. TODO: Is this still true? The emit resolver is supposed to be
	// hardened aginast this, so long as the node retains original node pointers back to a parsed node
	if len(reactNamespace) == 0 {
		reactNamespace = "React"
	}
	react := tx.Factory().NewIdentifier(reactNamespace)
	react.Flags &= ^ast.NodeFlagsSynthesized

	// Set the parent that is in parse tree
	// this makes sure that parent chain is intact for checker to traverse complete scope tree
	react.Parent = tx.EmitContext().ParseNode(parent)
	return react
}

func (tx *JSXTransformer) createJsxFactoryExpressionFromEntityName(e *ast.Node, parent *ast.Node) *ast.Node {
	if ast.IsQualifiedName(e) {
		left := tx.createJsxFactoryExpressionFromEntityName(e.AsQualifiedName().Left, parent)
		right := tx.Factory().NewIdentifier(e.AsQualifiedName().Right.Text())
		return tx.Factory().NewPropertyAccessExpression(left, nil, right, ast.NodeFlagsNone)
	}
	return tx.createReactNamespace(e.AsIdentifier().Text, parent)
}

func (tx *JSXTransformer) createJsxPsuedoFactoryExpression(parent *ast.Node, e *ast.Node, target string) *ast.Node {
	if e != nil {
		return tx.createJsxFactoryExpressionFromEntityName(e, parent)
	}
	return tx.Factory().NewPropertyAccessExpression(
		tx.createReactNamespace(tx.compilerOptions.ReactNamespace, parent),
		nil,
		tx.Factory().NewIdentifier(target),
		ast.NodeFlagsNone,
	)
}

func (tx *JSXTransformer) createJsxFactoryExpression(parent *ast.Node) *ast.Node {
	e := tx.emitResolver.GetJsxFactoryEntity(tx.currentSourceFile.AsNode())
	return tx.createJsxPsuedoFactoryExpression(parent, e, "createElement")
}

func (tx *JSXTransformer) createJsxFragmentFactoryExpression(parent *ast.Node) *ast.Node {
	e := tx.emitResolver.GetJsxFragmentFactoryEntity(tx.currentSourceFile.AsNode())
	return tx.createJsxPsuedoFactoryExpression(parent, e, "Fragment")
}

func (tx *JSXTransformer) visitJsxOpeningLikeElementCreateElement(element *ast.Node, children *ast.NodeList, location *ast.Node) *ast.Node {
	tagName := tx.getTagName(element)
	attrs := element.Attributes().Properties()
	var objectProperties *ast.Expression
	if len(attrs) > 0 {
		objectProperties = tx.transformJsxAttributesToObjectProps(attrs, nil)
	} else {
		objectProperties = tx.Factory().NewKeywordExpression(ast.KindNullKeyword) // When there are no attributes, React wants "null"
	}

	var callee *ast.Expression
	if len(tx.importSpecifier) == 0 {
		callee = tx.createJsxFactoryExpression(element)
	} else {
		callee = tx.getImplicitImportForName("createElement")
	}

	var newChildren []*ast.Node
	if children != nil && len(children.Nodes) > 0 {
		for _, c := range children.Nodes {
			res := tx.transformJsxChildToExpression(c)
			if res != nil {
				if len(children.Nodes) > 1 {
					tx.EmitContext().AddEmitFlags(res, printer.EFStartOnNewLine)
				}
				newChildren = append(newChildren, res)
			}
		}
	}

	args := make([]*ast.Expression, 0, len(newChildren)+2)
	args = append(args, tagName)
	args = append(args, objectProperties)
	args = append(args, newChildren...)

	result := tx.Factory().NewCallExpression(
		callee,
		nil,
		nil,
		tx.Factory().NewNodeList(args),
		ast.NodeFlagsNone,
	)
	result.Loc = location.Loc

	if tx.inJsxChild {
		tx.EmitContext().AddEmitFlags(result, printer.EFStartOnNewLine)
	}
	return result
}

func (tx *JSXTransformer) visitJsxOpeningFragmentCreateElement(fragment *ast.JsxOpeningFragment, children *ast.NodeList, location *ast.Node) *ast.Node {
	tagName := tx.createJsxFragmentFactoryExpression(fragment.AsNode())
	callee := tx.createJsxFactoryExpression(fragment.AsNode())

	var newChildren []*ast.Node
	if children != nil && len(children.Nodes) > 0 {
		for _, c := range children.Nodes {
			res := tx.transformJsxChildToExpression(c)
			if res != nil {
				if len(children.Nodes) > 1 {
					tx.EmitContext().AddEmitFlags(res, printer.EFStartOnNewLine)
				}
				newChildren = append(newChildren, res)
			}
		}
	}

	args := make([]*ast.Expression, 0, len(newChildren)+2)
	args = append(args, tagName)
	args = append(args, tx.Factory().NewKeywordExpression(ast.KindNullKeyword))
	args = append(args, newChildren...)

	result := tx.Factory().NewCallExpression(
		callee,
		nil,
		nil,
		tx.Factory().NewNodeList(args),
		ast.NodeFlagsNone,
	)
	result.Loc = location.Loc

	if tx.inJsxChild {
		tx.EmitContext().AddEmitFlags(result, printer.EFStartOnNewLine)
	}
	return result
}

func (tx *JSXTransformer) visitJsxText(text *ast.JsxText) *ast.Node {
	fixed := fixupWhitespaceAndDecodeEntities(text.Text)
	if len(fixed) == 0 {
		return nil
	}
	return tx.Factory().NewStringLiteral(fixed)
}

func addLineOfJsxText(b *strings.Builder, trimmedLine string, isInitial bool) {
	// We do not escape the string here as that is handled by the printer
	// when it emits the literal. We do, however, need to decode JSX entities.
	decoded := decodeEntities(trimmedLine)
	if !isInitial {
		b.WriteString(" ")
	}
	b.WriteString(decoded)
}

/**
* JSX trims whitespace at the end and beginning of lines, except that the
* start/end of a tag is considered a start/end of a line only if that line is
* on the same line as the closing tag. See examples in
* tests/cases/conformance/jsx/tsxReactEmitWhitespace.tsx
* See also https://www.w3.org/TR/html4/struct/text.html#h-9.1 and https://www.w3.org/TR/CSS2/text.html#white-space-model
*
* An equivalent algorithm would be:
* - If there is only one line, return it.
* - If there is only whitespace (but multiple lines), return `undefined`.
* - Split the text into lines.
* - 'trimRight' the first line, 'trimLeft' the last line, 'trim' middle lines.
* - Decode entities on each line (individually).
* - Remove empty lines and join the rest with " ".
 */
func fixupWhitespaceAndDecodeEntities(text string) string {
	acc := &strings.Builder{}
	initial := true
	// First non-whitespace character on this line.
	firstNonWhitespace := 0
	// End byte position of the last non-whitespace character on this line.
	lastNonWhitespaceEnd := -1
	// These initial values are special because the first line is:
	// firstNonWhitespace = 0 to indicate that we want leading whitespace,
	// but lastNonWhitespaceEnd = -1 as a special flag to indicate that we *don't* include the line if it's all whitespace.
	for i := 0; i < len(text); i++ {
		c, size := utf8.DecodeRuneInString(text[i:])
		if stringutil.IsLineBreak(c) {
			// If we've seen any non-whitespace characters on this line, add the 'trim' of the line.
			// (lastNonWhitespaceEnd === -1 is a special flag to detect whether the first line is all whitespace.)
			if firstNonWhitespace != -1 && lastNonWhitespaceEnd != -1 {
				addLineOfJsxText(acc, text[firstNonWhitespace:lastNonWhitespaceEnd+1], initial)
				initial = false
			}

			// Reset firstNonWhitespace for the next line.
			// Don't bother to reset lastNonWhitespaceEnd because we ignore it if firstNonWhitespace = -1.
			firstNonWhitespace = -1
		} else if !stringutil.IsWhiteSpaceSingleLine(c) {
			lastNonWhitespaceEnd = i + size - 1 // Store the end byte position of the character
			if firstNonWhitespace == -1 {
				firstNonWhitespace = i
			}
		}

		if size > 1 {
			i += (size - 1)
		}
	}

	if firstNonWhitespace != -1 {
		// Last line had a non-whitespace character. Emit the 'trimLeft', meaning keep trailing whitespace.
		addLineOfJsxText(acc, text[firstNonWhitespace:], initial)
	}
	return acc.String()
}

func (tx *JSXTransformer) visitJsxExpression(expression *ast.JsxExpression) *ast.Node {
	e := tx.Visitor().Visit(expression.Expression)
	if expression.DotDotDotToken != nil {
		return tx.Factory().NewSpreadElement(e)
	}
	return e
}

var htmlEntityMatcher = regexp2.MustCompile(`&((#((\d+)|x([\da-fA-F]+)))|(\w+));`, regexp2.ECMAScript)

func htmlEntityReplacer(m regexp2.Match) string {
	decimal := m.GroupByNumber(4)
	if decimal != nil && decimal.Capture.String() != "" {
		parsed, err := strconv.ParseInt(decimal.Capture.String(), 10, 32)
		if err == nil {
			return string(rune(parsed))
		}
	}
	hex := m.GroupByNumber(5)
	if hex != nil && hex.Capture.String() != "" {
		parsed, err := strconv.ParseInt(hex.Capture.String(), 16, 32)
		if err == nil {
			return string(rune(parsed))
		}
	}
	word := m.GroupByNumber(6)
	if word != nil && word.Capture.String() != "" {
		res, ok := entities[word.Capture.String()]
		if ok {
			return string(res)
		}
	}
	return m.String()
}

/**
* Replace entities like "&nbsp;", "&#123;", and "&#xDEADBEEF;" with the characters they encode.
* See https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
 */
func decodeEntities(text string) string {
	res, err := htmlEntityMatcher.ReplaceFunc(text, htmlEntityReplacer, -1, -1)
	if err != nil {
		panic(err.Error())
	}
	return res
}

var entities = map[string]rune{
	"quot":     0x0022,
	"amp":      0x0026,
	"apos":     0x0027,
	"lt":       0x003C,
	"gt":       0x003E,
	"nbsp":     0x00A0,
	"iexcl":    0x00A1,
	"cent":     0x00A2,
	"pound":    0x00A3,
	"curren":   0x00A4,
	"yen":      0x00A5,
	"brvbar":   0x00A6,
	"sect":     0x00A7,
	"uml":      0x00A8,
	"copy":     0x00A9,
	"ordf":     0x00AA,
	"laquo":    0x00AB,
	"not":      0x00AC,
	"shy":      0x00AD,
	"reg":      0x00AE,
	"macr":     0x00AF,
	"deg":      0x00B0,
	"plusmn":   0x00B1,
	"sup2":     0x00B2,
	"sup3":     0x00B3,
	"acute":    0x00B4,
	"micro":    0x00B5,
	"para":     0x00B6,
	"middot":   0x00B7,
	"cedil":    0x00B8,
	"sup1":     0x00B9,
	"ordm":     0x00BA,
	"raquo":    0x00BB,
	"frac14":   0x00BC,
	"frac12":   0x00BD,
	"frac34":   0x00BE,
	"iquest":   0x00BF,
	"Agrave":   0x00C0,
	"Aacute":   0x00C1,
	"Acirc":    0x00C2,
	"Atilde":   0x00C3,
	"Auml":     0x00C4,
	"Aring":    0x00C5,
	"AElig":    0x00C6,
	"Ccedil":   0x00C7,
	"Egrave":   0x00C8,
	"Eacute":   0x00C9,
	"Ecirc":    0x00CA,
	"Euml":     0x00CB,
	"Igrave":   0x00CC,
	"Iacute":   0x00CD,
	"Icirc":    0x00CE,
	"Iuml":     0x00CF,
	"ETH":      0x00D0,
	"Ntilde":   0x00D1,
	"Ograve":   0x00D2,
	"Oacute":   0x00D3,
	"Ocirc":    0x00D4,
	"Otilde":   0x00D5,
	"Ouml":     0x00D6,
	"times":    0x00D7,
	"Oslash":   0x00D8,
	"Ugrave":   0x00D9,
	"Uacute":   0x00DA,
	"Ucirc":    0x00DB,
	"Uuml":     0x00DC,
	"Yacute":   0x00DD,
	"THORN":    0x00DE,
	"szlig":    0x00DF,
	"agrave":   0x00E0,
	"aacute":   0x00E1,
	"acirc":    0x00E2,
	"atilde":   0x00E3,
	"auml":     0x00E4,
	"aring":    0x00E5,
	"aelig":    0x00E6,
	"ccedil":   0x00E7,
	"egrave":   0x00E8,
	"eacute":   0x00E9,
	"ecirc":    0x00EA,
	"euml":     0x00EB,
	"igrave":   0x00EC,
	"iacute":   0x00ED,
	"icirc":    0x00EE,
	"iuml":     0x00EF,
	"eth":      0x00F0,
	"ntilde":   0x00F1,
	"ograve":   0x00F2,
	"oacute":   0x00F3,
	"ocirc":    0x00F4,
	"otilde":   0x00F5,
	"ouml":     0x00F6,
	"divide":   0x00F7,
	"oslash":   0x00F8,
	"ugrave":   0x00F9,
	"uacute":   0x00FA,
	"ucirc":    0x00FB,
	"uuml":     0x00FC,
	"yacute":   0x00FD,
	"thorn":    0x00FE,
	"yuml":     0x00FF,
	"OElig":    0x0152,
	"oelig":    0x0153,
	"Scaron":   0x0160,
	"scaron":   0x0161,
	"Yuml":     0x0178,
	"fnof":     0x0192,
	"circ":     0x02C6,
	"tilde":    0x02DC,
	"Alpha":    0x0391,
	"Beta":     0x0392,
	"Gamma":    0x0393,
	"Delta":    0x0394,
	"Epsilon":  0x0395,
	"Zeta":     0x0396,
	"Eta":      0x0397,
	"Theta":    0x0398,
	"Iota":     0x0399,
	"Kappa":    0x039A,
	"Lambda":   0x039B,
	"Mu":       0x039C,
	"Nu":       0x039D,
	"Xi":       0x039E,
	"Omicron":  0x039F,
	"Pi":       0x03A0,
	"Rho":      0x03A1,
	"Sigma":    0x03A3,
	"Tau":      0x03A4,
	"Upsilon":  0x03A5,
	"Phi":      0x03A6,
	"Chi":      0x03A7,
	"Psi":      0x03A8,
	"Omega":    0x03A9,
	"alpha":    0x03B1,
	"beta":     0x03B2,
	"gamma":    0x03B3,
	"delta":    0x03B4,
	"epsilon":  0x03B5,
	"zeta":     0x03B6,
	"eta":      0x03B7,
	"theta":    0x03B8,
	"iota":     0x03B9,
	"kappa":    0x03BA,
	"lambda":   0x03BB,
	"mu":       0x03BC,
	"nu":       0x03BD,
	"xi":       0x03BE,
	"omicron":  0x03BF,
	"pi":       0x03C0,
	"rho":      0x03C1,
	"sigmaf":   0x03C2,
	"sigma":    0x03C3,
	"tau":      0x03C4,
	"upsilon":  0x03C5,
	"phi":      0x03C6,
	"chi":      0x03C7,
	"psi":      0x03C8,
	"omega":    0x03C9,
	"thetasym": 0x03D1,
	"upsih":    0x03D2,
	"piv":      0x03D6,
	"ensp":     0x2002,
	"emsp":     0x2003,
	"thinsp":   0x2009,
	"zwnj":     0x200C,
	"zwj":      0x200D,
	"lrm":      0x200E,
	"rlm":      0x200F,
	"ndash":    0x2013,
	"mdash":    0x2014,
	"lsquo":    0x2018,
	"rsquo":    0x2019,
	"sbquo":    0x201A,
	"ldquo":    0x201C,
	"rdquo":    0x201D,
	"bdquo":    0x201E,
	"dagger":   0x2020,
	"Dagger":   0x2021,
	"bull":     0x2022,
	"hellip":   0x2026,
	"permil":   0x2030,
	"prime":    0x2032,
	"Prime":    0x2033,
	"lsaquo":   0x2039,
	"rsaquo":   0x203A,
	"oline":    0x203E,
	"frasl":    0x2044,
	"euro":     0x20AC,
	"image":    0x2111,
	"weierp":   0x2118,
	"real":     0x211C,
	"trade":    0x2122,
	"alefsym":  0x2135,
	"larr":     0x2190,
	"uarr":     0x2191,
	"rarr":     0x2192,
	"darr":     0x2193,
	"harr":     0x2194,
	"crarr":    0x21B5,
	"lArr":     0x21D0,
	"uArr":     0x21D1,
	"rArr":     0x21D2,
	"dArr":     0x21D3,
	"hArr":     0x21D4,
	"forall":   0x2200,
	"part":     0x2202,
	"exist":    0x2203,
	"empty":    0x2205,
	"nabla":    0x2207,
	"isin":     0x2208,
	"notin":    0x2209,
	"ni":       0x220B,
	"prod":     0x220F,
	"sum":      0x2211,
	"minus":    0x2212,
	"lowast":   0x2217,
	"radic":    0x221A,
	"prop":     0x221D,
	"infin":    0x221E,
	"ang":      0x2220,
	"and":      0x2227,
	"or":       0x2228,
	"cap":      0x2229,
	"cup":      0x222A,
	"int":      0x222B,
	"there4":   0x2234,
	"sim":      0x223C,
	"cong":     0x2245,
	"asymp":    0x2248,
	"ne":       0x2260,
	"equiv":    0x2261,
	"le":       0x2264,
	"ge":       0x2265,
	"sub":      0x2282,
	"sup":      0x2283,
	"nsub":     0x2284,
	"sube":     0x2286,
	"supe":     0x2287,
	"oplus":    0x2295,
	"otimes":   0x2297,
	"perp":     0x22A5,
	"sdot":     0x22C5,
	"lceil":    0x2308,
	"rceil":    0x2309,
	"lfloor":   0x230A,
	"rfloor":   0x230B,
	"lang":     0x2329,
	"rang":     0x232A,
	"loz":      0x25CA,
	"spades":   0x2660,
	"clubs":    0x2663,
	"hearts":   0x2665,
	"diams":    0x2666,
}
