package parser

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"gotest.tools/v3/assert"
)

func newTestParser(source string) *Parser {
	p := newParser()
	p.initializeState(ast.SourceFileParseOptions{FileName: "/a.ts", PathKey: "/a.ts"}, source, core.ScriptKindTS)
	p.nextToken()
	return p
}

func TestTentativeScopeRestore(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + b")
	var expression tentativeExpression
	p.tentativeExpression = &expression
	failure := new(int)
	var recovered any
	func() {
		defer func() { recovered = recover() }()
		scope := p.beginTentativeScope()
		defer scope.restore()
		scope.suspendExpression()
		assert.Assert(t, p.tentativeExpression == nil)
		p.nextToken()
		panic(failure)
	}()
	assert.Equal(t, recovered, any(failure))
	assert.Equal(t, p.tentativeExpression, &expression)
	assert.Equal(t, p.token, ast.KindPlusToken)
}

func TestTentativeParseCommitAndRevert(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + b")
	outer := p.beginTentativeParse()
	p.nextToken()
	inner := p.beginTentativeParse()
	p.nextToken()
	inner.commit()
	inner.close()
	assert.Equal(t, p.scanner.TokenText(), "b")
	outer.revert()
	assert.Equal(t, p.scanner.TokenText(), "a")

	outer = p.beginTentativeParse()
	p.nextToken()
	inner = p.beginTentativeParse()
	p.nextToken()
	inner.revert()
	outer.commit()
	outer.close()
	assert.Equal(t, p.token, ast.KindPlusToken)
}

func TestTentativeParseExpression(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + b")
	var expression tentativeExpression
	p.tentativeExpression = &expression
	tentative := p.beginTentativeParse()
	tentative.suspendExpression()
	assert.Assert(t, p.tentativeExpression == nil)
	p.nextToken()
	tentative.commit()
	assert.Equal(t, p.tentativeExpression, &expression)
	assert.Equal(t, p.token, ast.KindPlusToken)

	state := p.mark()
	tentative = p.beginTentativeParse()
	tentative.suspendExpression()
	inner := p.beginTentativeParse()
	p.tentativeExpression = &tentativeExpression{}
	p.nextToken()
	inner.commit()
	assert.Assert(t, p.tentativeExpression == nil)
	tentative.revert()
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
}

func TestTentativeParseFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + // @ts-expect-error\nb")
	p.tentativeExpression = &tentativeExpression{}
	state := p.mark()
	result := func() (result *ast.Node) {
		tentative := p.beginTentativeParse()
		defer tentative.close()
		tentative.silence()
		tentative.suspendExpression()
		p.parsingContexts |= 1 << PCParameters
		p.contextFlags |= ast.NodeFlagsAwaitContext
		p.nextToken()
		p.nextToken()
		p.parseErrorAtCurrentToken(diagnostics.Expression_expected)
		return p.factory.NewEmptyStatement()
	}()
	assert.Assert(t, result == nil)
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
	assert.Equal(t, p.parsingContexts, ParsingContexts(0))
	assert.Equal(t, p.parsingFlags, ParsingFlagsNone)
	p.nextToken()
	p.nextToken()
	assert.Equal(t, len(p.scanner.CommentDirectives()), 1)
}

func TestTentativeParseUnexpectedFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + b")
	failure := new(int)
	var recovered any
	func() {
		defer func() { recovered = recover() }()
		tentative := p.beginTentativeParse()
		defer tentative.close()
		p.nextToken()
		panic(failure)
	}()
	assert.Equal(t, recovered, any(failure))
	assert.Equal(t, p.scanner.TokenText(), "a")
}

func TestTentativeConditionalFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("a ? b")
	leftOperand := p.parseIdentifier()
	questionToken := p.parseExpectedToken(ast.KindQuestionToken)
	p.tentativeExpression = &tentativeExpression{}
	p.parsingFlags = ParsingFlagsTentative
	state := p.mark()
	node := p.tryParseConditionalBranches(leftOperand, questionToken, leftOperand.Pos(), ExpressionParseFlagsNone)
	assert.Assert(t, node == nil)
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
	assert.Equal(t, p.parsingFlags, ParsingFlagsTentative)
}

func TestTentativeParseCommittedFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("a + b")
	state := p.mark()
	outer := p.beginTentativeParse()
	func() {
		defer outer.close()
		outer.silence()
		func() {
			inner := p.beginTentativeParse()
			defer inner.close()
			p.nextToken()
			inner.commit()
			p.parseErrorAtCurrentToken(diagnostics.Expression_expected)
		}()
		t.Fatal("a committed inner transaction swallowed the failure")
	}()
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
	assert.Equal(t, p.parsingFlags, ParsingFlagsNone)
}

func TestArrowFunctionHeadSyntaxFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("(a = b; c)")
	pos := p.nodePos()
	p.parsingFlags = ParsingFlagsTentative
	status, _ := p.tryParseArrowFunctionHead(ExpressionParseFlagsNone)
	assert.Equal(t, status, core.TSFalse)
	assert.Assert(t, p.notParenthesizedArrow.Has(pos))
	assert.Equal(t, p.nodePos(), pos)
	expression := p.tryParseParenthesizedArrowFunctionExpression(ExpressionParseFlagsNone)
	assert.Assert(t, expression == nil)
	assert.Assert(t, p.notParenthesizedArrow.Has(pos))
	assert.Equal(t, p.nodePos(), pos)
}

func TestTentativeParseNode(t *testing.T) {
	t.Parallel()
	p := newTestParser("(a) + b")
	tentative := p.beginTentativeParse()
	tentative.silence()
	state := p.mark()
	first := p.parseParenthesizedExpression()
	assert.Equal(t, p.token, ast.KindPlusToken)
	p.rewind(state)
	second := p.parseParenthesizedExpression()
	assert.Equal(t, first, second)
	assert.Equal(t, p.token, ast.KindPlusToken)
	p.rewind(state)
	p.contextFlags |= ast.NodeFlagsAwaitContext
	third := p.parseParenthesizedExpression()
	assert.Assert(t, third != first)
	assert.Equal(t, third.Flags&ast.NodeFlagsAwaitContext, ast.NodeFlagsAwaitContext)
	tentative.revert()
	assert.Assert(t, p.tentativeNodes == nil)
	assert.Equal(t, p.scanner.TokenText(), "(")
}

func TestTentativeParseNodeFailure(t *testing.T) {
	t.Parallel()
	p := newTestParser("(a +)")
	tentative := p.beginTentativeParse()
	tentative.silence()
	pos := p.nodePos()
	func() {
		attempt := p.beginTentativeParse()
		defer attempt.close()
		p.parseParenthesizedExpression()
		t.Fatal("invalid expression accepted")
	}()
	assert.Equal(t, len(p.tentativeNodes[pos]), 1)
	assert.Assert(t, p.tentativeNodes[pos][0].node == nil)
	func() {
		attempt := p.beginTentativeParse()
		defer attempt.close()
		p.parseParenthesizedExpression()
		t.Fatal("failed recognition reused as a valid expression")
	}()
	assert.Equal(t, len(p.tentativeNodes[pos]), 1)
	assert.Equal(t, p.nodePos(), pos)
	tentative.revert()
	assert.Assert(t, p.tentativeNodes == nil)
}

func TestArrowFunctionHeadAmbiguity(t *testing.T) {
	t.Parallel()
	p := newTestParser("async(): T => a ?")
	p.tentativeExpression = &tentativeExpression{}
	state := p.mark()
	status, signature := p.parseArrowFunctionHead(ExpressionParseFlagsDisallowArrowReturnType)
	assert.Equal(t, status, core.TSUnknown)
	assert.Equal(t, len(signature.parameters.Nodes), 0)
	assert.Equal(t, signature.returnType.Kind, ast.KindTypeReference)
	assert.Equal(t, p.token, ast.KindEqualsGreaterThanToken)
	assert.Equal(t, len(p.diagnostics), 0)
	headState := p.mark()
	assert.Assert(t, p.isArrowFunctionHeadAmbiguous(state, signature.returnType))
	assert.Assert(t, reflect.DeepEqual(p.mark(), headState))
}

func TestArrowFunctionHeadParameterType(t *testing.T) {
	t.Parallel()
	p := newTestParser("async (...a: number[]): T => a ?")
	status, signature := p.parseArrowFunctionHead(ExpressionParseFlagsAllowArrowFunctionRecovery | ExpressionParseFlagsDisallowArrowReturnType)
	assert.Equal(t, status, core.TSTrue)
	assert.Equal(t, len(signature.parameters.Nodes), 1)
	assert.Equal(t, signature.parameters.Nodes[0].Type().Kind, ast.KindArrayType)
	assert.Equal(t, p.token, ast.KindEqualsGreaterThanToken)
	assert.Equal(t, len(p.diagnostics), 0)
}

func TestArrowFunctionHeadRollback(t *testing.T) {
	t.Parallel()
	p := newTestParser("async(a = b.c)")
	pos := p.nodePos()
	tentative := p.beginTentativeParse()
	status, _ := p.parseArrowFunctionHead(ExpressionParseFlagsNone)
	assert.Equal(t, status, core.TSFalse)
	assert.Equal(t, p.notParenthesizedArrow.Len(), 0)
	tentative.revert()
	expression := p.tryParseParenthesizedArrowFunctionExpression(ExpressionParseFlagsNone)
	assert.Assert(t, expression == nil)
	assert.Assert(t, p.notParenthesizedArrow.Has(pos))
	assert.Equal(t, p.nodePos(), pos)
	expression = p.parseAssignmentExpressionOrHigher()
	assert.Equal(t, expression.Kind, ast.KindCallExpression)
	assert.Equal(t, p.token, ast.KindEndOfFile)
	assert.Equal(t, len(p.diagnostics), 0)
}

func TestArrowFunctionBodyFailureDoesNotCacheHead(t *testing.T) {
	t.Parallel()
	p := newTestParser("async(): T => a")
	p.tentativeExpression = &tentativeExpression{result: core.TSFalse}
	p.parsingFlags |= ParsingFlagsTentative
	expression := p.tryParseParenthesizedArrowFunctionExpression(ExpressionParseFlagsDisallowArrowReturnType)
	assert.Assert(t, expression == nil)
	assert.Equal(t, p.notParenthesizedArrow.Len(), 0)
	p.parsingFlags = ParsingFlagsNone
	expression = p.tryParseParenthesizedArrowFunctionExpression(ExpressionParseFlagsNone)
	assert.Equal(t, expression.Kind, ast.KindArrowFunction)
	assert.Equal(t, p.token, ast.KindEndOfFile)
}

func TestArrowFunctionBodySyntaxFailureDoesNotCacheHead(t *testing.T) {
	t.Parallel()
	p := newTestParser("async(): T => a +;")
	p.tentativeExpression = &tentativeExpression{result: core.TSFalse}
	p.parsingFlags |= ParsingFlagsTentative
	pos := p.nodePos()
	expression := p.tryParseParenthesizedArrowFunctionExpression(ExpressionParseFlagsDisallowArrowReturnType)
	assert.Assert(t, expression == nil)
	assert.Equal(t, p.notParenthesizedArrow.Len(), 0)
	assert.Equal(t, p.nodePos(), pos)
}
