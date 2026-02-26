package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

func convertClassDeclarationToClassExpression(emitContext *printer.EmitContext, node *ast.ClassDeclaration) *ast.Expression {
	updated := emitContext.Factory.NewClassExpression(
		transformers.ExtractModifiers(emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault),
		node.Name(),
		node.TypeParameters,
		node.HeritageClauses,
		node.Members,
	)
	emitContext.SetOriginal(updated, node.AsNode())
	updated.Loc = node.Loc
	return updated
}

func createNotNullCondition(emitContext *printer.EmitContext, left *ast.Node, right *ast.Node, invert bool) *ast.Node {
	token := ast.KindExclamationEqualsEqualsToken
	op := ast.KindAmpersandAmpersandToken
	if invert {
		token = ast.KindEqualsEqualsEqualsToken
		op = ast.KindBarBarToken
	}

	return emitContext.Factory.NewBinaryExpression(
		nil,
		emitContext.Factory.NewBinaryExpression(
			nil,
			left,
			nil,
			emitContext.Factory.NewToken(token),
			emitContext.Factory.NewKeywordExpression(ast.KindNullKeyword),
		),
		nil,
		emitContext.Factory.NewToken(op),
		emitContext.Factory.NewBinaryExpression(
			nil,
			right,
			nil,
			emitContext.Factory.NewToken(token),
			emitContext.Factory.NewVoidZeroExpression(),
		),
	)
}

// superAccessState tracks super property/element accesses and super property assignments
// within async function or async generator bodies. It is embedded by both asyncTransformer
// and forawaitTransformer to share the tracking logic.
type superAccessState struct {
	factory *printer.NodeFactory

	// Keeps track of property names accessed on super (`super.x`) within async functions.
	capturedSuperProperties *collections.OrderedSet[string]
	// Whether the async function contains an element access on super (`super[x]`).
	hasSuperElementAccess      bool
	hasSuperPropertyAssignment bool

	superBinding       *ast.IdentifierNode
	superIndexBinding  *ast.IdentifierNode
	superAccessVisitor *ast.NodeVisitor
}

func (s *superAccessState) initSuperAccessVisitor(emitContext *printer.EmitContext, factory *printer.NodeFactory) {
	s.factory = factory
	s.superAccessVisitor = emitContext.NewNodeVisitor(s.visitSuperAccessNode)
}

// visitSuperAccessNode walks the async/generator body and replaces super property/element
// accesses with _super/_superIndex references. This is necessary because the async body
// ends up inside a generator function where `super` is not valid.
func (s *superAccessState) visitSuperAccessNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindCallExpression:
		call := node.AsCallExpression()
		if ast.IsSuperProperty(call.Expression) {
			return s.substituteCallExpressionWithSuperAccess(call, s.superAccessVisitor)
		}
		return s.superAccessVisitor.VisitEachChild(node)
	case ast.KindPropertyAccessExpression:
		if node.Expression().Kind == ast.KindSuperKeyword {
			// super.x → _super.x
			return s.factory.NewPropertyAccessExpression(
				s.superBinding, nil, node.Name(), ast.NodeFlagsNone,
			)
		}
		return s.superAccessVisitor.VisitEachChild(node)
	case ast.KindElementAccessExpression:
		if node.Expression().Kind == ast.KindSuperKeyword {
			// super[x] → _superIndex(x) or _superIndex(x).value
			return s.createSuperElementAccessInAsyncMethod(
				node.AsElementAccessExpression().ArgumentExpression,
			)
		}
		return s.superAccessVisitor.VisitEachChild(node)
	// Don't recurse into non-arrow function scopes or classes
	case ast.KindFunctionExpression, ast.KindFunctionDeclaration,
		ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor,
		ast.KindConstructor, ast.KindClassDeclaration, ast.KindClassExpression:
		return node
	default:
		return s.superAccessVisitor.VisitEachChild(node)
	}
}

func (s *superAccessState) substituteSuperAccessesInBody(body *ast.Node) *ast.Node {
	return s.superAccessVisitor.VisitNode(body)
}

// substituteCallExpressionWithSuperAccess handles super.x(args) and super[x](args).
func (s *superAccessState) substituteCallExpressionWithSuperAccess(call *ast.CallExpression, visitor *ast.NodeVisitor) *ast.Node {
	expression := call.Expression
	var target *ast.Node

	if ast.IsPropertyAccessExpression(expression) {
		// super.x(args) → _super.x.call(this, args)
		target = s.factory.NewPropertyAccessExpression(
			s.superBinding, nil,
			expression.AsPropertyAccessExpression().Name(), ast.NodeFlagsNone,
		)
	} else if ast.IsElementAccessExpression(expression) {
		// super[x](args) → _superIndex(x).call(this, args) or _superIndex(x).value.call(this, args)
		target = s.createSuperElementAccessInAsyncMethod(
			expression.AsElementAccessExpression().ArgumentExpression,
		)
	} else {
		return visitor.VisitEachChild(call.AsNode())
	}

	callTarget := s.factory.NewPropertyAccessExpression(
		target, nil,
		s.factory.NewIdentifier("call"), ast.NodeFlagsNone,
	)

	var allArgs []*ast.Node
	allArgs = append(allArgs, s.factory.NewThisExpression())
	if call.Arguments != nil {
		visitedArgs := visitor.VisitNodes(call.Arguments)
		if visitedArgs != nil {
			allArgs = append(allArgs, visitedArgs.Nodes...)
		}
	}

	result := s.factory.NewCallExpression(
		callTarget, nil, nil,
		s.factory.NewNodeList(allArgs), ast.NodeFlagsNone,
	)
	result.Loc = call.Loc
	return result
}

// createSuperElementAccessInAsyncMethod creates _superIndex(x) or _superIndex(x).value.
func (s *superAccessState) createSuperElementAccessInAsyncMethod(argumentExpression *ast.Node) *ast.Node {
	superIndexCall := s.factory.NewCallExpression(
		s.superIndexBinding, nil, nil,
		s.factory.NewNodeList([]*ast.Node{argumentExpression}),
		ast.NodeFlagsNone,
	)
	if s.hasSuperPropertyAssignment {
		return s.factory.NewPropertyAccessExpression(
			superIndexCall, nil,
			s.factory.NewIdentifier("value"), ast.NodeFlagsNone,
		)
	}
	return superIndexCall
}

// createSuperAccessVariableStatement creates a variable named `_super` with accessor
// properties for the given property names.
//
// Create a variable declaration with a getter/setter (if binding) definition for each name:
//
//	const _super = Object.create(null, {
//	    x: { get: () => super.x },                           // read-only
//	    x: { get: () => super.x, set: (v) => super.x = v }, // read-write
//	});
func (s *superAccessState) createSuperAccessVariableStatement() *ast.Node {
	f := s.factory
	var accessors []*ast.Node

	for name := range s.capturedSuperProperties.Values() {
		var descriptorProperties []*ast.Node

		// getter: get: () => super.name
		getterBody := f.NewPropertyAccessExpression(
			f.NewKeywordExpression(ast.KindSuperKeyword), nil,
			f.NewIdentifier(name), ast.NodeFlagsNone,
		)
		getterArrow := f.NewArrowFunction(
			nil, nil,
			f.NewNodeList([]*ast.Node{}),
			nil, nil,
			f.NewToken(ast.KindEqualsGreaterThanToken),
			getterBody,
		)
		getter := f.NewPropertyAssignment(nil, f.NewIdentifier("get"), nil, nil, getterArrow)
		descriptorProperties = append(descriptorProperties, getter)

		if s.hasSuperPropertyAssignment {
			// setter: set: v => super.name = v
			vParam := f.NewParameterDeclaration(nil, nil, f.NewIdentifier("v"), nil, nil, nil)
			superProp := f.NewPropertyAccessExpression(
				f.NewKeywordExpression(ast.KindSuperKeyword), nil,
				f.NewIdentifier(name), ast.NodeFlagsNone,
			)
			assignExpr := f.NewAssignmentExpression(superProp, f.NewIdentifier("v"))
			setterArrow := f.NewArrowFunction(
				nil, nil,
				f.NewNodeList([]*ast.Node{vParam}),
				nil, nil,
				f.NewToken(ast.KindEqualsGreaterThanToken),
				assignExpr,
			)
			setter := f.NewPropertyAssignment(nil, f.NewIdentifier("set"), nil, nil, setterArrow)
			descriptorProperties = append(descriptorProperties, setter)
		}

		descriptor := f.NewObjectLiteralExpression(f.NewNodeList(descriptorProperties), false)
		accessor := f.NewPropertyAssignment(nil, f.NewIdentifier(name), nil, nil, descriptor)
		accessors = append(accessors, accessor)
	}

	descriptorsObject := f.NewObjectLiteralExpression(f.NewNodeList(accessors), true)

	objectCreateCall := f.NewCallExpression(
		f.NewPropertyAccessExpression(
			f.NewIdentifier("Object"), nil,
			f.NewIdentifier("create"), ast.NodeFlagsNone,
		), nil, nil,
		f.NewNodeList([]*ast.Node{
			f.NewKeywordExpression(ast.KindNullKeyword),
			descriptorsObject,
		}),
		ast.NodeFlagsNone,
	)

	decl := f.NewVariableDeclaration(s.superBinding, nil, nil, objectCreateCall)
	declList := f.NewVariableDeclarationList(ast.NodeFlagsConst, f.NewNodeList([]*ast.Node{decl}))
	return f.NewVariableStatement(nil, declList)
}

// trackSuperAccess records super property/element accesses and super property assignments
// for the enclosing async method body. Called from both the main visitor and auxiliary
// visitors to ensure super accesses are tracked regardless of whether the node has
// transform flags.
func (s *superAccessState) trackSuperAccess(node *ast.Node) {
	if s.capturedSuperProperties == nil {
		return
	}
	switch node.Kind {
	case ast.KindPropertyAccessExpression:
		if node.Expression().Kind == ast.KindSuperKeyword {
			s.capturedSuperProperties.Add(node.Name().Text())
		}
	case ast.KindElementAccessExpression:
		if node.Expression().Kind == ast.KindSuperKeyword {
			s.hasSuperElementAccess = true
		}
	case ast.KindBinaryExpression:
		if ast.IsAssignmentOperator(node.AsBinaryExpression().OperatorToken.Kind) && assignmentTargetContainsSuperProperty(node.AsBinaryExpression().Left) {
			s.hasSuperPropertyAssignment = true
		}
	case ast.KindPrefixUnaryExpression:
		if isUpdateExpression(node) && assignmentTargetContainsSuperProperty(node.AsPrefixUnaryExpression().Operand) {
			s.hasSuperPropertyAssignment = true
		}
	case ast.KindPostfixUnaryExpression:
		if isUpdateExpression(node) && assignmentTargetContainsSuperProperty(node.AsPostfixUnaryExpression().Operand) {
			s.hasSuperPropertyAssignment = true
		}
	}
}
