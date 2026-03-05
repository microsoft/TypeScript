package transformers

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func IsGeneratedIdentifier(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.HasAutoGenerateInfo(name)
}

func IsHelperName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFHelperName != 0
}

func IsLocalName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFLocalName != 0
}

func IsExportName(emitContext *printer.EmitContext, name *ast.IdentifierNode) bool {
	return emitContext.EmitFlags(name)&printer.EFExportName != 0
}

func IsIdentifierReference(name *ast.IdentifierNode, parent *ast.Node) bool {
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
		return parent.Initializer() == name ||
			parent.AsForStatement().Condition == name ||
			parent.AsForStatement().Incrementor == name
	case ast.KindForInStatement,
		ast.KindForOfStatement:
		return parent.Initializer() == name ||
			parent.Expression() == name
	case ast.KindImportEqualsDeclaration:
		return parent.AsImportEqualsDeclaration().ModuleReference == name
	case ast.KindArrowFunction:
		return parent.Body() == name
	case ast.KindConditionalExpression:
		return parent.AsConditionalExpression().Condition == name ||
			parent.AsConditionalExpression().WhenTrue == name ||
			parent.AsConditionalExpression().WhenFalse == name
	case ast.KindCallExpression, ast.KindNewExpression:
		return parent.Expression() == name ||
			slices.Contains(parent.Arguments(), name)
	case ast.KindTaggedTemplateExpression:
		return parent.AsTaggedTemplateExpression().Tag == name
	case ast.KindImportAttribute:
		return parent.AsImportAttribute().Value == name
	case ast.KindJsxOpeningElement, ast.KindJsxClosingElement:
		return parent.TagName() == name
	default:
		return false
	}
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

func ConvertBindingPatternToAssignmentPattern(emitContext *printer.EmitContext, element *ast.BindingPattern) *ast.Expression {
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
		return ConvertBindingPatternToAssignmentPattern(emitContext, element.AsBindingPattern())
	}
	return element
}

func ConvertVariableDeclarationToAssignmentExpression(emitContext *printer.EmitContext, element *ast.VariableDeclaration) *ast.Expression {
	if element.Initializer == nil {
		return nil
	}
	expression := convertBindingNameToAssignmentElementTarget(emitContext, element.Name())
	assignment := emitContext.Factory.NewAssignmentExpression(expression, element.Initializer)
	emitContext.SetOriginal(assignment, element.AsNode())
	emitContext.AssignCommentAndSourceMapRanges(assignment, element.AsNode())
	return assignment
}

func SingleOrMany(nodes []*ast.Node, factory *printer.NodeFactory) *ast.Node {
	if len(nodes) == 1 {
		return nodes[0]
	}
	return factory.NewSyntaxList(nodes)
}

// Used in the module transformer to check if an expression is reasonably without sideeffect,
//
//	and thus better to copy into multiple places rather than to cache in a temporary variable
//	- this is mostly subjective beyond the requirement that the expression not be sideeffecting
//
// Also used by the logical assignment downleveling transform to skip temp variables when they're
// not needed.
func IsSimpleCopiableExpression(expression *ast.Expression) bool {
	return ast.IsStringLiteralLike(expression) ||
		ast.IsNumericLiteral(expression) ||
		ast.IsKeywordKind(expression.Kind) ||
		ast.IsIdentifier(expression)
}

func IsOriginalNodeSingleLine(emitContext *printer.EmitContext, node *ast.Node) bool {
	if node == nil {
		return false
	}
	original := emitContext.MostOriginal(node)
	if original == nil {
		return false
	}
	source := ast.GetSourceFileOfNode(original)
	if source == nil {
		return false
	}
	startLine := scanner.GetECMALineOfPosition(source, original.Loc.Pos())
	endLine := scanner.GetECMALineOfPosition(source, original.Loc.End())
	return startLine == endLine
}

/**
 * A simple inlinable expression is an expression which can be copied into multiple locations
 * without risk of repeating any sideeffects and whose value could not possibly change between
 * any such locations
 */
func IsSimpleInlineableExpression(expression *ast.Expression) bool {
	return !ast.IsIdentifier(expression) && IsSimpleCopiableExpression(expression)
}

// FindSuperStatementIndexPath finds a path of indices to a statement containing a `super()` call.
func FindSuperStatementIndexPath(statements []*ast.Statement, start int) []int {
	indices := findSuperStatementIndexPathWorker(statements, start, nil)
	slices.Reverse(indices)
	return indices
}

func findSuperStatementIndexPathWorker(statements []*ast.Statement, start int, indices []int) []int {
	for i := start; i < len(statements); i++ {
		statement := statements[i]
		if GetSuperCallFromStatement(statement) != nil {
			return append(indices, i)
		} else if ast.IsTryStatement(statement) {
			if result := findSuperStatementIndexPathWorker(statement.AsTryStatement().TryBlock.Statements(), 0, indices); result != nil {
				return append(result, i)
			}
		}
	}
	return nil
}

// GetSuperCallFromStatement extracts the super() call expression from an expression statement, if any.
func GetSuperCallFromStatement(statement *ast.Statement) *ast.Node {
	if !ast.IsExpressionStatement(statement) {
		return nil
	}
	expression := ast.SkipParentheses(statement.Expression())
	if ast.IsSuperCall(expression) {
		return expression
	}
	return nil
}

// MoveRangePastModifiers returns a text range that starts past any modifiers on the node.
func MoveRangePastModifiers(node *ast.Node) core.TextRange {
	if ast.IsPropertyDeclaration(node) || ast.IsMethodDeclaration(node) {
		return core.NewTextRange(node.Name().Pos(), node.End())
	}

	var lastModifier *ast.Node
	if ast.CanHaveModifiers(node) {
		lastModifier = core.LastOrNil(node.ModifierNodes())
	}

	if lastModifier != nil && !ast.PositionIsSynthesized(lastModifier.End()) {
		return core.NewTextRange(lastModifier.End(), node.End())
	}
	return MoveRangePastDecorators(node)
}

// MoveRangePastDecorators returns a text range that starts past any decorators on the node.
func MoveRangePastDecorators(node *ast.Node) core.TextRange {
	var lastDecorator *ast.Node
	if ast.CanHaveModifiers(node) {
		nodes := node.ModifierNodes()
		if nodes != nil {
			lastDecorator = core.FindLast(nodes, ast.IsDecorator)
		}
	}

	if lastDecorator != nil && !ast.PositionIsSynthesized(lastDecorator.End()) {
		return core.NewTextRange(lastDecorator.End(), node.End())
	}
	return node.Loc
}

// GetNonAssignmentOperatorForCompoundAssignment returns the non-assignment operator for a compound assignment.
func GetNonAssignmentOperatorForCompoundAssignment(kind ast.Kind) ast.Kind {
	switch kind {
	case ast.KindPlusEqualsToken:
		return ast.KindPlusToken
	case ast.KindMinusEqualsToken:
		return ast.KindMinusToken
	case ast.KindAsteriskEqualsToken:
		return ast.KindAsteriskToken
	case ast.KindAsteriskAsteriskEqualsToken:
		return ast.KindAsteriskAsteriskToken
	case ast.KindSlashEqualsToken:
		return ast.KindSlashToken
	case ast.KindPercentEqualsToken:
		return ast.KindPercentToken
	case ast.KindLessThanLessThanEqualsToken:
		return ast.KindLessThanLessThanToken
	case ast.KindGreaterThanGreaterThanEqualsToken:
		return ast.KindGreaterThanGreaterThanToken
	case ast.KindGreaterThanGreaterThanGreaterThanEqualsToken:
		return ast.KindGreaterThanGreaterThanGreaterThanToken
	case ast.KindAmpersandEqualsToken:
		return ast.KindAmpersandToken
	case ast.KindBarEqualsToken:
		return ast.KindBarToken
	case ast.KindCaretEqualsToken:
		return ast.KindCaretToken
	case ast.KindBarBarEqualsToken:
		return ast.KindBarBarToken
	case ast.KindAmpersandAmpersandEqualsToken:
		return ast.KindAmpersandAmpersandToken
	case ast.KindQuestionQuestionEqualsToken:
		return ast.KindQuestionQuestionToken
	}
	return kind
}
