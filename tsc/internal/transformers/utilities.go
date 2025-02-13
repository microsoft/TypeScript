package transformers

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/printer"
)

func copyIdentifier(emitContext *printer.EmitContext, node *ast.IdentifierNode) *ast.IdentifierNode {
	var nodeCopy *ast.IdentifierNode
	if emitContext.HasAutoGenerateInfo(node) {
		nodeCopy = emitContext.NewGeneratedNameForNode(node, printer.AutoGenerateOptions{})
	} else {
		nodeCopy = emitContext.Factory.NewIdentifier(node.Text())
		nodeCopy.Flags = node.Flags
		nodeCopy.Loc = node.Loc
	}
	emitContext.SetOriginal(nodeCopy, node)
	return nodeCopy
}

type nameOptions struct {
	allowComments   bool
	allowSourceMaps bool
}

type assignedNameOptions struct {
	allowComments      bool
	allowSourceMaps    bool
	ignoreAssignedName bool
}

func getName(emitContext *printer.EmitContext, node *ast.Declaration, emitFlags printer.EmitFlags, opts assignedNameOptions) *ast.IdentifierNode {
	var nodeName *ast.IdentifierNode
	if node != nil {
		if opts.ignoreAssignedName {
			nodeName = ast.GetNonAssignedNameOfDeclaration(node)
		} else {
			nodeName = ast.GetNameOfDeclaration(node)
		}
	}

	if nodeName != nil {
		name := copyIdentifier(emitContext, nodeName)
		if !opts.allowComments {
			emitContext.AddEmitFlags(name, printer.EFNoComments)
		}
		if !opts.allowSourceMaps {
			emitContext.AddEmitFlags(name, printer.EFNoSourceMap)
		}
		return name
	}

	return emitContext.NewGeneratedNameForNode(node, printer.AutoGenerateOptions{})
}

// Gets the local name of a declaration. This is primarily used for declarations that can be referred to by name in the
// declaration's immediate scope (classes, enums, namespaces). A local name will *never* be prefixed with a module or
// namespace export modifier like "exports." when emitted as an expression.
//
// The value of the allowComments parameter indicates whether comments may be emitted for the name.
// The value of the allowSourceMaps parameter indicates whether source maps may be emitted for the name.
// The value of the ignoreAssignedName parameter indicates whether the assigned name of a declaration shouldn't be considered.
func getLocalName(emitContext *printer.EmitContext, node *ast.Declaration, opts assignedNameOptions) *ast.IdentifierNode {
	return getName(emitContext, node, printer.EFLocalName, opts)
}

// Gets the name of a declaration to use during emit.
//
// The value of the allowComments parameter indicates whether comments may be emitted for the name.
// The value of the allowSourceMaps parameter indicates whether source maps may be emitted for the name.
func getDeclarationName(emitContext *printer.EmitContext, node *ast.Declaration, opts nameOptions) *ast.IdentifierNode {
	return getName(emitContext, node, printer.EFNone, assignedNameOptions{allowComments: opts.allowComments, allowSourceMaps: opts.allowSourceMaps})
}

func getNamespaceMemberName(emitContext *printer.EmitContext, ns *ast.IdentifierNode, name *ast.IdentifierNode, opts nameOptions) *ast.IdentifierNode {
	if !emitContext.HasAutoGenerateInfo(name) {
		name = copyIdentifier(emitContext, name)
	}
	qualifiedName := emitContext.Factory.NewPropertyAccessExpression(ns, nil /*questionDotToken*/, name, ast.NodeFlagsNone)
	emitContext.CopyCommentAndSourceMapRangesTo(qualifiedName, name)
	if !opts.allowComments {
		emitContext.AddEmitFlags(qualifiedName, printer.EFNoComments)
	}
	if !opts.allowSourceMaps {
		emitContext.AddEmitFlags(qualifiedName, printer.EFNoSourceMap)
	}
	return qualifiedName
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
		ast.KindPropertyAccessExpression:
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
	default:
		return false
	}
}

func constantValue(node *ast.Expression) any {
	node = ast.SkipOuterExpressions(node, ast.OEKAll)
	if ast.IsStringLiteralLike(node) {
		return node.Text()
	}
	if ast.IsPrefixUnaryExpression(node) {
		prefixUnary := node.AsPrefixUnaryExpression()
		if value, ok := constantValue(prefixUnary.Operand).(jsnum.Number); ok {
			switch prefixUnary.Operator {
			case ast.KindPlusToken:
				return value
			case ast.KindMinusToken:
				return -value
			case ast.KindTildeToken:
				return value.BitwiseNOT()
			}
		}
	}
	if ast.IsNumericLiteral(node) {
		return jsnum.FromString(node.Text())
	}
	return nil
}

func constantExpression(value any, factory *ast.NodeFactory) *ast.Expression {
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

func flattenCommaElement(node *ast.Expression, expressions []*ast.Expression) []*ast.Expression {
	if ast.IsBinaryExpression(node) && ast.NodeIsSynthesized(node) && node.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
		expressions = flattenCommaElement(node.AsBinaryExpression().Left, expressions)
		expressions = flattenCommaElement(node.AsBinaryExpression().Right, expressions)
	} else {
		expressions = append(expressions, node)
	}
	return expressions
}

func flattenCommaElements(expressions []*ast.Expression) []*ast.Expression {
	var result []*ast.Expression
	for _, expression := range expressions {
		result = flattenCommaElement(expression, result)
	}
	return result
}

func inlineExpressions(expressions []*ast.Expression, factory *ast.NodeFactory) *ast.Expression {
	if len(expressions) == 0 {
		return nil
	}
	if len(expressions) == 1 {
		return expressions[0]
	}
	expressions = flattenCommaElements(expressions)
	expression := expressions[0]
	for _, next := range expressions[1:] {
		expression = factory.NewBinaryExpression(expression, factory.NewToken(ast.KindCommaToken), next)
	}
	return expression
}

func convertBindingElementToArrayAssignmentElement(emitContext *printer.EmitContext, element *ast.BindingElement) *ast.Expression {
	if element.Name() == nil {
		elision := emitContext.Factory.NewOmittedExpression()
		emitContext.SetOriginal(elision, element.AsNode())
		emitContext.CopyCommentAndSourceMapRangesTo(elision, element.AsNode())
		return elision
	}
	if element.DotDotDotToken != nil {
		spread := emitContext.Factory.NewSpreadElement(element.Name())
		emitContext.SetOriginal(spread, element.AsNode())
		emitContext.CopyCommentAndSourceMapRangesTo(spread, element.AsNode())
		return spread
	}
	expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
	if element.Initializer != nil {
		assignment := emitContext.Factory.NewBinaryExpression(
			expression,
			emitContext.Factory.NewToken(ast.KindEqualsToken),
			element.Initializer,
		)
		emitContext.SetOriginal(assignment, element.AsNode())
		emitContext.CopyCommentAndSourceMapRangesTo(assignment, element.AsNode())
		return assignment
	}
	return expression
}

func convertBindingElementToObjectAssignmentElement(emitContext *printer.EmitContext, element *ast.BindingElement) *ast.ObjectLiteralElement {
	if element.DotDotDotToken != nil {
		spread := emitContext.Factory.NewSpreadAssignment(element.Name())
		emitContext.SetOriginal(spread, element.AsNode())
		emitContext.CopyCommentAndSourceMapRangesTo(spread, element.AsNode())
		return spread
	}
	if element.PropertyName != nil {
		expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
		if element.Initializer != nil {
			expression = emitContext.Factory.NewBinaryExpression(
				expression,
				emitContext.Factory.NewToken(ast.KindEqualsToken),
				element.Initializer,
			)
		}
		assignment := emitContext.Factory.NewPropertyAssignment(nil /*modifiers*/, element.PropertyName, nil /*postfixToken*/, expression)
		emitContext.SetOriginal(assignment, element.AsNode())
		emitContext.CopyCommentAndSourceMapRangesTo(assignment, element.AsNode())
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
		equalsToken,
		element.Initializer,
	)
	emitContext.SetOriginal(assignment, element.AsNode())
	emitContext.CopyCommentAndSourceMapRangesTo(assignment, element.AsNode())
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
	emitContext.CopyCommentAndSourceMapRangesTo(object, element.AsNode())
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
	emitContext.CopyCommentAndSourceMapRangesTo(object, element.AsNode())
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
	assignment := emitContext.Factory.NewBinaryExpression(
		expression,
		emitContext.Factory.NewToken(ast.KindEqualsToken),
		element.Initializer,
	)
	emitContext.SetOriginal(assignment, element.AsNode())
	emitContext.CopyCommentAndSourceMapRangesTo(assignment, element.AsNode())
	return assignment
}

func convertEntityNameToExpression(emitContext *printer.EmitContext, name *ast.EntityName) *ast.Expression {
	if ast.IsQualifiedName(name) {
		left := convertEntityNameToExpression(emitContext, name.AsQualifiedName().Left)
		right := name.AsQualifiedName().Right
		prop := emitContext.Factory.NewPropertyAccessExpression(left, nil /*questionDotToken*/, right, ast.NodeFlagsNone)
		emitContext.SetOriginal(prop, name)
		emitContext.CopyCommentAndSourceMapRangesTo(prop, name)
		return prop
	}
	return copyIdentifier(emitContext, name)
}
