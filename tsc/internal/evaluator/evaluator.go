package evaluator

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
)

type Result struct {
	Value                 any
	IsSyntacticallyString bool
	ResolvedOtherFiles    bool
	HasExternalReferences bool
}

func NewResult(value any, isSyntacticallyString bool, resolvedOtherFiles bool, hasExternalReferences bool) Result {
	return Result{value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
}

type Evaluator func(expr *ast.Node, location *ast.Node) Result

func NewEvaluator(evaluateEntity Evaluator, outerExpressionsToSkip ast.OuterExpressionKinds) Evaluator {
	var evaluate Evaluator
	evaluate = func(expr *ast.Node, location *ast.Node) Result {
		isSyntacticallyString := false
		resolvedOtherFiles := false
		hasExternalReferences := false
		// It's unclear when/whether we should consider skipping other kinds of outer expressions.
		// Type assertions intentionally break evaluation when evaluating literal types, such as:
		//     type T = `one ${"two" as any} three`; // string
		// But it's less clear whether such an assertion should break enum member evaluation:
		//     enum E {
		//       A = "one" as any
		//     }
		// SatisfiesExpressions and non-null assertions seem to have even less reason to break
		// emitting enum members as literals. However, these expressions also break Babel's
		// evaluation (but not esbuild's), and the isolatedModules errors we give depend on
		// our evaluation results, so we're currently being conservative so as to issue errors
		// on code that might break Babel.
		expr = ast.SkipOuterExpressions(expr, outerExpressionsToSkip|ast.OEKParentheses)
		switch expr.Kind {
		case ast.KindPrefixUnaryExpression:
			result := evaluate(expr.AsPrefixUnaryExpression().Operand, location)
			resolvedOtherFiles = result.ResolvedOtherFiles
			hasExternalReferences = result.HasExternalReferences
			if value, ok := result.Value.(jsnum.Number); ok {
				switch expr.AsPrefixUnaryExpression().Operator {
				case ast.KindPlusToken:
					return Result{value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindMinusToken:
					return Result{-value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindTildeToken:
					return Result{value.BitwiseNOT(), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				}
			}
		case ast.KindBinaryExpression:
			left := evaluate(expr.AsBinaryExpression().Left, location)
			right := evaluate(expr.AsBinaryExpression().Right, location)
			operator := expr.AsBinaryExpression().OperatorToken.Kind
			isSyntacticallyString = (left.IsSyntacticallyString || right.IsSyntacticallyString) && expr.AsBinaryExpression().OperatorToken.Kind == ast.KindPlusToken
			resolvedOtherFiles = left.ResolvedOtherFiles || right.ResolvedOtherFiles
			hasExternalReferences = left.HasExternalReferences || right.HasExternalReferences
			leftNum, leftIsNum := left.Value.(jsnum.Number)
			rightNum, rightIsNum := right.Value.(jsnum.Number)
			if leftIsNum && rightIsNum {
				switch operator {
				case ast.KindBarToken:
					return Result{leftNum.BitwiseOR(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindAmpersandToken:
					return Result{leftNum.BitwiseAND(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindGreaterThanGreaterThanToken:
					return Result{leftNum.SignedRightShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindGreaterThanGreaterThanGreaterThanToken:
					return Result{leftNum.UnsignedRightShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindLessThanLessThanToken:
					return Result{leftNum.LeftShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindCaretToken:
					return Result{leftNum.BitwiseXOR(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindAsteriskToken:
					return Result{leftNum * rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindSlashToken:
					return Result{leftNum / rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindPlusToken:
					return Result{leftNum + rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindMinusToken:
					return Result{leftNum - rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindPercentToken:
					return Result{leftNum.Remainder(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				case ast.KindAsteriskAsteriskToken:
					return Result{leftNum.Exponentiate(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
				}
			}
			leftStr, leftIsStr := left.Value.(string)
			rightStr, rightIsStr := right.Value.(string)
			if (leftIsStr || leftIsNum) && (rightIsStr || rightIsNum) && operator == ast.KindPlusToken {
				if leftIsNum {
					leftStr = leftNum.String()
				}
				if rightIsNum {
					rightStr = rightNum.String()
				}
				return Result{leftStr + rightStr, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
			}
		case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
			return Result{expr.Text(), true /*isSyntacticallyString*/, false, false}
		case ast.KindTemplateExpression:
			return evaluateTemplateExpression(expr, location, evaluate)
		case ast.KindNumericLiteral:
			return Result{jsnum.FromString(expr.Text()), false, false, false}
		case ast.KindIdentifier:
			return evaluateEntity(expr, location)
		case ast.KindElementAccessExpression, ast.KindPropertyAccessExpression:
			if ast.IsEntityNameExpression(expr.Expression()) {
				return evaluateEntity(expr, location)
			}
		}
		return Result{nil, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
	}
	return evaluate
}

func evaluateTemplateExpression(expr *ast.Node, location *ast.Node, evaluate Evaluator) Result {
	var sb strings.Builder
	sb.WriteString(expr.AsTemplateExpression().Head.Text())
	resolvedOtherFiles := false
	hasExternalReferences := false
	for _, span := range expr.AsTemplateExpression().TemplateSpans.Nodes {
		spanResult := evaluate(span.Expression(), location)
		if spanResult.Value == nil {
			return Result{nil, true /*isSyntacticallyString*/, false, false}
		}
		sb.WriteString(AnyToString(spanResult.Value))
		sb.WriteString(span.AsTemplateSpan().Literal.Text())
		resolvedOtherFiles = resolvedOtherFiles || spanResult.ResolvedOtherFiles
		hasExternalReferences = hasExternalReferences || spanResult.HasExternalReferences
	}
	return Result{sb.String(), true, resolvedOtherFiles, hasExternalReferences}
}

func AnyToString(v any) string {
	// !!! This function should behave identically to the expression `"" + v` in JS
	switch v := v.(type) {
	case string:
		return v
	case jsnum.Number:
		return v.String()
	case bool:
		return core.IfElse(v, "true", "false")
	case jsnum.PseudoBigInt:
		return v.String()
	}
	panic("Unhandled case in AnyToString")
}

func IsTruthy(v any) bool {
	// !!! This function should behave identically to the expression `!!v` in JS
	switch v := v.(type) {
	case string:
		return len(v) != 0
	case jsnum.Number:
		return v != 0 && !v.IsNaN()
	case bool:
		return v
	case jsnum.PseudoBigInt:
		return v != jsnum.PseudoBigInt{}
	}
	panic("Unhandled case in IsTruthy")
}
