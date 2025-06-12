package transformers

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/outputpaths"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/tspath"
)

func isGeneratedIdentifier(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.HasAutoGenerateInfo(name)
}

func isHelperName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFHelperName != 0
}

func isLocalName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFLocalName != 0
}

func isExportName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFExportName != 0
}

func isDeclarationNameOfEnumOrNamespace(emitContext *printer.EmitContext, node *ast.IdentifierNode) bool {
	if original := emitContext.MostOriginal(node); original != nil && original.Parent != nil {
		switch original.Parent.Kind {
		case ast.KindEnumDeclaration, ast.KindModuleDeclaration:
			return original == original.Parent.Name()
		}
	}
	return false
}

func isIdentifierReference(name *ast.IdentifierNode, parent *ast.Node) bool {
	switch parent.Kind {
	case ast.KindBinaryExpression,
		ast.KindPrefixUnaryExpression,
		ast.KindPostfixUnaryExpression,
		ast.KindYieldExpression,
		ast.KindAsExpression,
		ast.KindSatisfiesExpression,
		ast.KindElementAccessExpression,
		ast.KindNonNullExpression,
		ast.KindSpreadElement,
		ast.KindSpreadAssignment,
		ast.KindParenthesizedExpression,
		ast.KindArrayLiteralExpression,
		ast.KindDeleteExpression,
		ast.KindTypeOfExpression,
		ast.KindVoidExpression,
		ast.KindAwaitExpression,
		ast.KindTypeAssertionExpression,
		ast.KindExpressionWithTypeArguments,
		ast.KindJsxSelfClosingElement,
		ast.KindJsxSpreadAttribute,
		ast.KindJsxExpression,
		ast.KindCommaListExpression,
		ast.KindPartiallyEmittedExpression:
		// all immediate children that can be `Identifier` would be instances of `IdentifierReference`
		return true
	case ast.KindComputedPropertyName,
		ast.KindDecorator,
		ast.KindIfStatement,
		ast.KindDoStatement,
		ast.KindWhileStatement,
		ast.KindWithStatement,
		ast.KindReturnStatement,
		ast.KindSwitchStatement,
		ast.KindCaseClause,
		ast.KindThrowStatement,
		ast.KindExpressionStatement,
		ast.KindExportAssignment,
		ast.KindJSExportAssignment,
		ast.KindPropertyAccessExpression,
		ast.KindTemplateSpan:
		// only an `Expression()` child that can be `Identifier` would be an instance of `IdentifierReference`
		return parent.Expression() == name
	case ast.KindVariableDeclaration,
		ast.KindParameter,
		ast.KindBindingElement,
		ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindPropertyAssignment,
		ast.KindEnumMember,
		ast.KindJsxAttribute:
		// only an `Initializer()` child that can be `Identifier` would be an instance of `IdentifierReference`
		return parent.Initializer() == name
	case ast.KindForStatement:
		return parent.AsForStatement().Initializer == name ||
			parent.AsForStatement().Condition == name ||
			parent.AsForStatement().Incrementor == name
	case ast.KindForInStatement,
		ast.KindForOfStatement:
		return parent.AsForInOrOfStatement().Initializer == name ||
			parent.AsForInOrOfStatement().Expression == name
	case ast.KindImportEqualsDeclaration:
		return parent.AsImportEqualsDeclaration().ModuleReference == name
	case ast.KindArrowFunction:
		return parent.AsArrowFunction().Body == name
	case ast.KindConditionalExpression:
		return parent.AsConditionalExpression().Condition == name ||
			parent.AsConditionalExpression().WhenTrue == name ||
			parent.AsConditionalExpression().WhenFalse == name
	case ast.KindCallExpression:
		return parent.AsCallExpression().Expression == name ||
			slices.Contains(parent.AsCallExpression().Arguments.Nodes, name)
	case ast.KindNewExpression:
		return parent.AsNewExpression().Expression == name ||
			parent.AsNewExpression().Arguments.Nodes != nil &&
				slices.Contains(parent.AsNewExpression().Arguments.Nodes, name)
	case ast.KindTaggedTemplateExpression:
		return parent.AsTaggedTemplateExpression().Tag == name
	case ast.KindImportAttribute:
		return parent.AsImportAttribute().Value == name
	case ast.KindJsxOpeningElement:
		return parent.AsJsxOpeningElement().TagName == name
	case ast.KindJsxClosingElement:
		return parent.AsJsxClosingElement().TagName == name
	default:
		return false
	}
}

func constantExpression(value any, factory *printer.NodeFactory) *ast.Expression {
	switch value := value.(type) {
	case string:
		return factory.NewStringLiteral(value)
	case jsnum.Number:
		if value.IsInf() || value.IsNaN() {
			return nil
		}
		if value < 0 {
			return factory.NewPrefixUnaryExpression(ast.KindMinusToken, constantExpression(-value, factory))
		}
		return factory.NewNumericLiteral(value.String())
	}
	return nil
}

func isInstantiatedModule(node *ast.ModuleDeclarationNode, preserveConstEnums bool) bool {
	moduleState := ast.GetModuleInstanceState(node)
	return moduleState == ast.ModuleInstanceStateInstantiated ||
		(preserveConstEnums && moduleState == ast.ModuleInstanceStateConstEnumOnly)
}

func convertBindingElementToArrayAssignmentElement(emitContext *printer.EmitContext, element *ast.BindingElement) *ast.Expression {
	if element.Name() == nil {
		elision := emitContext.Factory.NewOmittedExpression()
		emitContext.SetOriginal(elision, element.AsNode())
		emitContext.AssignCommentAndSourceMapRanges(elision, element.AsNode())
		return elision
	}
	if element.DotDotDotToken != nil {
		spread := emitContext.Factory.NewSpreadElement(element.Name())
		emitContext.SetOriginal(spread, element.AsNode())
		emitContext.AssignCommentAndSourceMapRanges(spread, element.AsNode())
		return spread
	}
	expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
	if element.Initializer != nil {
		assignment := emitContext.Factory.NewAssignmentExpression(expression, element.Initializer)
		emitContext.SetOriginal(assignment, element.AsNode())
		emitContext.AssignCommentAndSourceMapRanges(assignment, element.AsNode())
		return assignment
	}
	return expression
}

func convertBindingElementToObjectAssignmentElement(emitContext *printer.EmitContext, element *ast.BindingElement) *ast.ObjectLiteralElement {
	if element.DotDotDotToken != nil {
		spread := emitContext.Factory.NewSpreadAssignment(element.Name())
		emitContext.SetOriginal(spread, element.AsNode())
		emitContext.AssignCommentAndSourceMapRanges(spread, element.AsNode())
		return spread
	}
	if element.PropertyName != nil {
		expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
		if element.Initializer != nil {
			expression = emitContext.Factory.NewAssignmentExpression(expression, element.Initializer)
		}
		assignment := emitContext.Factory.NewPropertyAssignment(nil /*modifiers*/, element.PropertyName, nil /*postfixToken*/, nil /*typeNode*/, expression)
		emitContext.SetOriginal(assignment, element.AsNode())
		emitContext.AssignCommentAndSourceMapRanges(assignment, element.AsNode())
		return assignment
	}
	var equalsToken *ast.TokenNode
	if element.Initializer != nil {
		equalsToken = emitContext.Factory.NewToken(ast.KindEqualsToken)
	}
	assignment := emitContext.Factory.NewShorthandPropertyAssignment(
		nil, /*modifiers*/
		element.Name(),
		nil, /*postfixToken*/
		nil, /*typeNode*/
		equalsToken,
		element.Initializer,
	)
	emitContext.SetOriginal(assignment, element.AsNode())
	emitContext.AssignCommentAndSourceMapRanges(assignment, element.AsNode())
	return assignment
}

func convertBindingPatternToAssignmentPattern(emitContext *printer.EmitContext, element *ast.BindingPattern) *ast.Expression {
	switch element.Kind {
	case ast.KindArrayBindingPattern:
		return convertBindingElementToArrayAssignmentPattern(emitContext, element)
	case ast.KindObjectBindingPattern:
		return convertBindingElementToObjectAssignmentPattern(emitContext, element)
	default:
		panic("Unknown binding pattern")
	}
}

func convertBindingElementToObjectAssignmentPattern(emitContext *printer.EmitContext, element *ast.BindingPattern) *ast.Expression {
	var properties []*ast.ObjectLiteralElement
	for _, element := range element.Elements.Nodes {
		properties = append(properties, convertBindingElementToObjectAssignmentElement(emitContext, element.AsBindingElement()))
	}
	propertyList := emitContext.Factory.NewNodeList(properties)
	propertyList.Loc = element.Elements.Loc
	object := emitContext.Factory.NewObjectLiteralExpression(propertyList, false /*multiLine*/)
	emitContext.SetOriginal(object, element.AsNode())
	emitContext.AssignCommentAndSourceMapRanges(object, element.AsNode())
	return object
}

func convertBindingElementToArrayAssignmentPattern(emitContext *printer.EmitContext, element *ast.BindingPattern) *ast.Expression {
	var elements []*ast.Expression
	for _, element := range element.Elements.Nodes {
		elements = append(elements, convertBindingElementToArrayAssignmentElement(emitContext, element.AsBindingElement()))
	}
	elementList := emitContext.Factory.NewNodeList(elements)
	elementList.Loc = element.Elements.Loc
	object := emitContext.Factory.NewArrayLiteralExpression(elementList, false /*multiLine*/)
	emitContext.SetOriginal(object, element.AsNode())
	emitContext.AssignCommentAndSourceMapRanges(object, element.AsNode())
	return object
}

func convertBindingNameToAssignmentElementTarget(emitContext *printer.EmitContext, element *ast.Node) *ast.Expression {
	if ast.IsBindingPattern(element) {
		return convertBindingPatternToAssignmentPattern(emitContext, element.AsBindingPattern())
	}
	return element
}

func convertVariableDeclarationToAssignmentExpression(emitContext *printer.EmitContext, element *ast.VariableDeclaration) *ast.Expression {
	if element.Initializer == nil {
		return nil
	}
	expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
	assignment := emitContext.Factory.NewAssignmentExpression(expression, element.Initializer)
	emitContext.SetOriginal(assignment, element.AsNode())
	emitContext.AssignCommentAndSourceMapRanges(assignment, element.AsNode())
	return assignment
}

func convertEntityNameToExpression(emitContext *printer.EmitContext, name *ast.EntityName) *ast.Expression {
	if ast.IsQualifiedName(name) {
		left := convertEntityNameToExpression(emitContext, name.AsQualifiedName().Left)
		right := name.AsQualifiedName().Right
		prop := emitContext.Factory.NewPropertyAccessExpression(left, nil /*questionDotToken*/, right, ast.NodeFlagsNone)
		emitContext.SetOriginal(prop, name)
		emitContext.AssignCommentAndSourceMapRanges(prop, name)
		return prop
	}
	return name.Clone(emitContext.Factory)
}

// Get the name of a target module from an import/export declaration as should be written in the emitted output.
// The emitted output name can be different from the input if:
//  1. The module has a /// <amd-module name="<new name>" />
//  2. --out or --outFile is used, making the name relative to the rootDir
//     3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
//
// Otherwise, a new StringLiteral node representing the module name will be returned.
func getExternalModuleNameLiteral(factory *printer.NodeFactory, importNode *ast.Node /*ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration | ImportCall*/, sourceFile *ast.SourceFile, host any /*EmitHost*/, resolver printer.EmitResolver, compilerOptions *core.CompilerOptions) *ast.StringLiteralNode {
	moduleName := ast.GetExternalModuleName(importNode)
	if moduleName != nil && ast.IsStringLiteral(moduleName) {
		name := tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions)
		if name == nil {
			name = tryRenameExternalModule(factory, moduleName, sourceFile)
		}
		if name == nil {
			name = factory.NewStringLiteral(moduleName.Text())
		}
		return name
	}
	return nil
}

// Get the name of a module as should be written in the emitted output.
// The emitted output name can be different from the input if:
//  1. The module has a /// <amd-module name="<new name>" />
//  2. --out or --outFile is used, making the name relative to the rootDir
//
// Otherwise, a new StringLiteral node representing the module name will be returned.
func tryGetModuleNameFromFile(factory *printer.NodeFactory, file *ast.SourceFile, host any /*EmitHost*/, options *core.CompilerOptions) *ast.StringLiteralNode {
	if file == nil {
		return nil
	}
	// !!!
	// if file.moduleName {
	// 	return factory.createStringLiteral(file.moduleName)
	// }
	if !file.IsDeclarationFile && len(options.OutFile) > 0 {
		return factory.NewStringLiteral(getExternalModuleNameFromPath(host, file.FileName(), "" /*referencePath*/))
	}
	return nil
}

func tryGetModuleNameFromDeclaration(declaration *ast.Node /*ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ImportCall*/, host any /*EmitHost*/, factory *printer.NodeFactory, resolver printer.EmitResolver, compilerOptions *core.CompilerOptions) *ast.StringLiteralNode {
	if resolver == nil {
		return nil
	}
	return tryGetModuleNameFromFile(factory, resolver.GetExternalModuleFileFromDeclaration(declaration), host, compilerOptions)
}

// Resolves a local path to a path which is absolute to the base of the emit
func getExternalModuleNameFromPath(host any /*ResolveModuleNameResolutionHost*/, fileName string, referencePath string) string {
	// !!!
	return ""
}

// Some bundlers (SystemJS builder) sometimes want to rename dependencies.
// Here we check if alternative name was provided for a given moduleName and return it if possible.
func tryRenameExternalModule(factory *printer.NodeFactory, moduleName *ast.LiteralExpression, sourceFile *ast.SourceFile) *ast.StringLiteralNode {
	// !!!
	return nil
}

func rewriteModuleSpecifier(emitContext *printer.EmitContext, node *ast.Expression, compilerOptions *core.CompilerOptions) *ast.Expression {
	if node == nil || !ast.IsStringLiteral(node) || !core.ShouldRewriteModuleSpecifier(node.Text(), compilerOptions) {
		return node
	}
	updatedText := tspath.ChangeExtension(node.Text(), outputpaths.GetOutputExtension(node.Text(), compilerOptions.Jsx))
	if updatedText != node.Text() {
		updated := emitContext.Factory.NewStringLiteral(updatedText)
		// !!! set quote style
		emitContext.SetOriginal(updated, node)
		emitContext.AssignCommentAndSourceMapRanges(updated, node)
		return updated
	}
	return node
}

func singleOrMany(nodes []*ast.Node, factory *printer.NodeFactory) *ast.Node {
	if len(nodes) == 1 {
		return nodes[0]
	}
	return factory.NewSyntaxList(nodes)
}

func isFileLevelReservedGeneratedIdentifier(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	info := emitContext.GetAutoGenerateInfo(name)
	return info != nil &&
		info.Flags.IsFileLevel() &&
		info.Flags.IsOptimistic() &&
		info.Flags.IsReservedInNestedScopes()
}

func createEmptyImports(factory *printer.NodeFactory) *ast.Statement {
	return factory.NewExportDeclaration(
		nil,   /*modifiers*/
		false, /*isTypeOnly*/
		factory.NewNamedExports(factory.NewNodeList(nil)),
		nil, /*moduleSpecifier*/
		nil, /*attributes*/
	)
}

// Used in the module transformer to check if an expression is reasonably without sideeffect,
//
//	and thus better to copy into multiple places rather than to cache in a temporary variable
//	- this is mostly subjective beyond the requirement that the expression not be sideeffecting
func isSimpleCopiableExpression(expression *ast.Expression) bool {
	return ast.IsStringLiteralLike(expression) ||
		ast.IsNumericLiteral(expression) ||
		ast.IsKeywordKind(expression.Kind) ||
		ast.IsIdentifier(expression)
}

// A simple inlinable expression is an expression which can be copied into multiple locations
// without risk of repeating any sideeffects and whose value could not possibly change between
// any such locations
func isSimpleInlineableExpression(expression *ast.Expression) bool {
	return !ast.IsIdentifier(expression) && isSimpleCopiableExpression(expression)
}

func convertClassDeclarationToClassExpression(emitContext *printer.EmitContext, node *ast.ClassDeclaration) *ast.Expression {
	updated := emitContext.Factory.NewClassExpression(
		extractModifiers(emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault),
		node.Name(),
		node.TypeParameters,
		node.HeritageClauses,
		node.Members,
	)
	emitContext.SetOriginal(updated, node.AsNode())
	updated.Loc = node.Loc
	return updated
}

func createExpressionFromEntityName(factory ast.NodeFactoryCoercible, node *ast.Node) *ast.Expression {
	if ast.IsQualifiedName(node) {
		left := createExpressionFromEntityName(factory, node.AsQualifiedName().Left)
		// TODO(rbuckton): Does this need to be parented?
		right := node.AsQualifiedName().Right.Clone(factory.AsNodeFactory())
		right.Loc = node.AsQualifiedName().Right.Loc
		right.Parent = node.AsQualifiedName().Right.Parent
		return factory.AsNodeFactory().NewPropertyAccessExpression(left, nil, right, ast.NodeFlagsNone)
	} else {
		// TODO(rbuckton): Does this need to be parented?
		res := node.Clone(factory.AsNodeFactory())
		res.Loc = node.Loc
		res.Parent = node.Parent
		return res
	}
}
