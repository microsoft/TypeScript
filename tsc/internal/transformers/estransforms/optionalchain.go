package estransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

type optionalChainTransformer struct {
	transformers.Transformer
}

func (ch *optionalChainTransformer) visit(node *ast.Node) *ast.Node {
	if node.SubtreeFacts()&ast.SubtreeContainsOptionalChaining == 0 {
		return node
	}
	switch node.Kind {
	case ast.KindCallExpression:
		return ch.visitCallExpression(node.AsCallExpression(), false)
	case ast.KindPropertyAccessExpression,
		ast.KindElementAccessExpression:
		if node.Flags&ast.NodeFlagsOptionalChain != 0 {
			return ch.visitOptionalExpression(node, false, false)
		}
		return ch.Visitor().VisitEachChild(node)
	case ast.KindDeleteExpression:
		return ch.visitDeleteExpression(node.AsDeleteExpression())
	case ast.KindTaggedTemplateExpression:
		return ch.visitTaggedTemplateExpression(node.AsTaggedTemplateExpression())
	default:
		return ch.Visitor().VisitEachChild(node)
	}
}

// Determines whether `node` is an optional chain wrapped in parentheses or erased type syntax, such as
// `(a?.b)`, `(a?.b!)`, `(a?.b as T)`, or `(a?.b<T>)`. Calling such an expression, or using it as a
// template tag, must preserve the `this` binding of the inner property or element access.
func isWrappedOptionalChain(node *ast.Expression) bool {
	unwrapped := ast.SkipOuterExpressions(node, ast.OEKAll)
	return unwrapped != node && unwrapped.Flags&ast.NodeFlagsOptionalChain != 0
}

func (ch *optionalChainTransformer) visitCallExpression(node *ast.CallExpression, captureThisArg bool) *ast.Node {
	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
		// If `node` is an optional chain, then it is the outermost chain of an optional expression.
		return ch.visitOptionalExpression(node.AsNode(), captureThisArg, false)
	}
	if isWrappedOptionalChain(node.Expression) {
		// capture thisArg for calls of parenthesized optional chains like `(foo?.bar)()`
		expression := ch.visitNonOptionalExpression(node.Expression, true, false)
		args := ch.Visitor().VisitNodes(node.Arguments)
		if ast.IsSyntheticReferenceExpression(expression) {
			res := ch.Factory().NewFunctionCallCall(expression.AsSyntheticReferenceExpression().Expression, expression.AsSyntheticReferenceExpression().ThisArg, args.Nodes)
			res.Loc = node.Loc
			ch.EmitContext().SetOriginal(res, node.AsNode())
			return res
		}
		return ch.Factory().UpdateCallExpression(node, expression, nil /*questionDotToken*/, nil /*typeArguments*/, args, node.Flags)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *optionalChainTransformer) visitTaggedTemplateExpression(node *ast.TaggedTemplateExpression) *ast.Node {
	if node.Flags&ast.NodeFlagsOptionalChain == 0 && isWrappedOptionalChain(node.Tag) {
		// capture thisArg for tags of parenthesized optional chains like ``(foo?.bar)`x` ``
		tag := ch.visitNonOptionalExpression(node.Tag, true, false)
		if ast.IsSyntheticReferenceExpression(tag) {
			synth := tag.AsSyntheticReferenceExpression()
			tag = ch.Factory().NewFunctionBindCall(synth.Expression, synth.ThisArg, nil)
		}
		return ch.Factory().UpdateTaggedTemplateExpression(node, tag, nil /*questionDotToken*/, nil /*typeArguments*/, ch.Visitor().VisitNode(node.Template), node.Flags)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *optionalChainTransformer) visitOuterExpression(node *ast.Expression, captureThisArg bool, isDelete bool) *ast.Node {
	expr := ch.visitNonOptionalExpression(node.Expression(), captureThisArg, isDelete)
	if ast.IsSyntheticReferenceExpression(expr) {
		// `(a.b)` -> { expression `((_a = a).b)`, thisArg: `_a` }
		// `(a[b])` -> { expression `((_a = a)[b])`, thisArg: `_a` }
		synth := expr.AsSyntheticReferenceExpression()
		res := ch.Factory().NewSyntheticReferenceExpression(ch.updateOuterExpression(node, synth.Expression), synth.ThisArg)
		ch.EmitContext().SetOriginal(res, node)
		return res
	}
	return ch.updateOuterExpression(node, expr)
}

func (ch *optionalChainTransformer) updateOuterExpression(node *ast.Expression, expression *ast.Expression) *ast.Expression {
	switch node.Kind {
	case ast.KindParenthesizedExpression:
		return ch.Factory().UpdateParenthesizedExpression(node.AsParenthesizedExpression(), expression)
	case ast.KindPartiallyEmittedExpression:
		return ch.Factory().UpdatePartiallyEmittedExpression(node.AsPartiallyEmittedExpression(), expression)
	case ast.KindExpressionWithTypeArguments:
		return ch.Factory().UpdateExpressionWithTypeArguments(node.AsExpressionWithTypeArguments(), expression, ch.Visitor().VisitNodes(node.TypeArgumentList()))
	default:
		panic("Unexpected outer expression kind: " + node.Kind.String())
	}
}

func (ch *optionalChainTransformer) visitPropertyOrElementAccessExpression(node *ast.Expression, captureThisArg bool, isDelete bool) *ast.Expression {
	if node.Flags&ast.NodeFlagsOptionalChain != 0 {
		// If `node` is an optional chain, then it is the outermost chain of an optional expression.
		return ch.visitOptionalExpression(node.AsNode(), captureThisArg, isDelete)
	}
	expression := ch.Visitor().VisitNode(node.Expression())
	debug.Assert(expression == nil || !ast.IsSyntheticReferenceExpression(expression))

	var thisArg *ast.Expression
	if captureThisArg {
		if !transformers.IsSimpleCopiableExpression(expression) {
			thisArg = ch.Factory().NewTempVariable()
			ch.EmitContext().AddVariableDeclaration(thisArg)
			expression = ch.Factory().NewAssignmentExpression(thisArg, expression)
		} else {
			thisArg = expression
		}
	}

	if node.Kind == ast.KindPropertyAccessExpression {
		p := node.AsPropertyAccessExpression()
		expression = ch.Factory().UpdatePropertyAccessExpression(p, expression, nil /*questionDotToken*/, ch.Visitor().VisitNode(p.Name()), p.Flags)
	} else {
		p := node.AsElementAccessExpression()
		expression = ch.Factory().UpdateElementAccessExpression(p, expression, nil, ch.Visitor().VisitNode(p.AsElementAccessExpression().ArgumentExpression), p.Flags)
	}

	if thisArg != nil {
		res := ch.Factory().NewSyntheticReferenceExpression(expression, thisArg)
		ch.EmitContext().SetOriginal(res, node.AsNode())
		return res
	}
	return expression
}

func (ch *optionalChainTransformer) visitDeleteExpression(node *ast.DeleteExpression) *ast.Node {
	unwrapped := ast.SkipParentheses(node.Expression)
	if unwrapped.Flags&ast.NodeFlagsOptionalChain != 0 {
		return ch.visitNonOptionalExpression(node.Expression, false, true)
	}
	return ch.Visitor().VisitEachChild(node.AsNode())
}

func (ch *optionalChainTransformer) visitNonOptionalExpression(node *ast.Expression, captureThisArg bool, isDelete bool) *ast.Expression {
	switch node.Kind {
	case ast.KindParenthesizedExpression,
		ast.KindPartiallyEmittedExpression,
		ast.KindExpressionWithTypeArguments:
		return ch.visitOuterExpression(node, captureThisArg, isDelete)
	case ast.KindElementAccessExpression, ast.KindPropertyAccessExpression:
		return ch.visitPropertyOrElementAccessExpression(node, captureThisArg, isDelete)
	case ast.KindCallExpression:
		return ch.visitCallExpression(node.AsCallExpression(), captureThisArg)
	default:
		return ch.Visitor().VisitNode(node.AsNode())
	}
}

type flattenResult struct {
	expression *ast.Expression
	chain      []*ast.Node
}

func isNonNullChain(node *ast.Node) bool {
	return ast.IsNonNullExpression(node) && node.Flags&ast.NodeFlagsOptionalChain != 0
}

func flattenChain(chain *ast.Node) flattenResult {
	debug.Assert(!isNonNullChain(chain))
	links := []*ast.Node{chain}
	for !ast.IsTaggedTemplateExpression(chain) && chain.QuestionDotToken() == nil {
		chain = ast.SkipPartiallyEmittedExpressions(chain.Expression())
		debug.Assert(!isNonNullChain(chain))
		links = append([]*ast.Node{chain}, links...)
	}
	return flattenResult{chain.Expression(), links}
}

func isCallChain(node *ast.Node) bool {
	return ast.IsCallExpression(node) && node.Flags&ast.NodeFlagsOptionalChain != 0
}

func (ch *optionalChainTransformer) visitOptionalExpression(node *ast.Node, captureThisArg bool, isDelete bool) *ast.Node {
	r := flattenChain(node)
	expression := r.expression
	chain := r.chain
	left := ch.visitNonOptionalExpression(ast.SkipPartiallyEmittedExpressions(expression), isCallChain(chain[0]), false)
	var leftThisArg *ast.Expression
	capturedLeft := left
	if ast.IsSyntheticReferenceExpression(left) {
		leftThisArg = left.AsSyntheticReferenceExpression().ThisArg
		capturedLeft = left.AsSyntheticReferenceExpression().Expression
	}
	leftExpression := ch.Factory().RestoreOuterExpressions(expression, capturedLeft, ast.OEKPartiallyEmittedExpressions)
	if !transformers.IsSimpleCopiableExpression(capturedLeft) {
		capturedLeft = ch.Factory().NewTempVariable()
		ch.EmitContext().AddVariableDeclaration(capturedLeft)
		leftExpression = ch.Factory().NewAssignmentExpression(capturedLeft, leftExpression)
	}
	rightExpression := capturedLeft
	var thisArg *ast.Expression

	for i, segment := range chain {
		switch segment.Kind {
		case ast.KindElementAccessExpression, ast.KindPropertyAccessExpression:
			if i == len(chain)-1 && captureThisArg {
				if !transformers.IsSimpleCopiableExpression(rightExpression) {
					thisArg = ch.Factory().NewTempVariable()
					ch.EmitContext().AddVariableDeclaration(thisArg)
					rightExpression = ch.Factory().NewAssignmentExpression(thisArg, rightExpression)
				} else {
					thisArg = rightExpression
				}
			}
			if segment.Kind == ast.KindElementAccessExpression {
				rightExpression = ch.Factory().NewElementAccessExpression(rightExpression, nil, ch.Visitor().VisitNode(segment.AsElementAccessExpression().ArgumentExpression), ast.NodeFlagsNone)
			} else {
				rightExpression = ch.Factory().NewPropertyAccessExpression(rightExpression, nil, ch.Visitor().VisitNode(segment.AsPropertyAccessExpression().Name()), ast.NodeFlagsNone)
			}
		case ast.KindCallExpression:
			if i == 0 && leftThisArg != nil {
				if !ch.EmitContext().HasAutoGenerateInfo(leftThisArg) {
					leftThisArg = leftThisArg.Clone(ch.Factory())
					ch.EmitContext().AddEmitFlags(leftThisArg, printer.EFNoComments)
				}
				callThisArg := leftThisArg
				if leftThisArg.Kind == ast.KindSuperKeyword {
					callThisArg = ch.Factory().NewThisExpression()
				}
				rightExpression = ch.Factory().NewFunctionCallCall(rightExpression, callThisArg, ch.Visitor().VisitNodes(segment.ArgumentList()).Nodes)
			} else {
				rightExpression = ch.Factory().NewCallExpression(
					rightExpression,
					nil,
					nil,
					ch.Visitor().VisitNodes(segment.ArgumentList()),
					ast.NodeFlagsNone,
				)
			}
		}
		ch.EmitContext().SetOriginal(rightExpression, segment)
	}

	var target *ast.Node
	if isDelete {
		target = ch.Factory().NewConditionalExpression(
			createNotNullCondition(ch.EmitContext(), leftExpression, capturedLeft, true),
			ch.Factory().NewToken(ast.KindQuestionToken),
			ch.Factory().NewTrueExpression(),
			ch.Factory().NewToken(ast.KindColonToken),
			ch.Factory().NewDeleteExpression(rightExpression),
		)
	} else {
		target = ch.Factory().NewConditionalExpression(
			createNotNullCondition(ch.EmitContext(), leftExpression, capturedLeft, true),
			ch.Factory().NewToken(ast.KindQuestionToken),
			ch.Factory().NewVoidZeroExpression(),
			ch.Factory().NewToken(ast.KindColonToken),
			rightExpression,
		)
	}
	target.Loc = node.Loc
	if thisArg != nil {
		target = ch.Factory().NewSyntheticReferenceExpression(target, thisArg)
	}
	ch.EmitContext().SetOriginal(target, node.AsNode())
	return target
}

func newOptionalChainTransformer(opts *transformers.TransformOptions) *transformers.Transformer {
	tx := &optionalChainTransformer{}
	return tx.NewTransformer(tx.visit, opts.Context)
}
