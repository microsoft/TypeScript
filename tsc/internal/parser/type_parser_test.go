package parser

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"gotest.tools/v3/assert"
)

func TestTypeArgumentSpeculationRollback(t *testing.T) {
	t.Parallel()
	for _, source := range []string{
		"<infer X extends (T>(x)",
		"<A<(T>>(x)",
		"<{ m(x: [T): U }>(x)",
		"<{ [K in (T]: U }>(x)",
		"<T | (U>(x)",
		"<readonly [T>(x)",
		`<import("m", { with: { type: "json" } }>(x)`,
		"<`prefix${(T}`>(x)",
	} {
		t.Run(source, func(t *testing.T) {
			t.Parallel()
			p := newParser()
			p.initializeState(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, source, core.ScriptKindTS)
			p.parsingContexts = 1 << PCSourceElements
			p.nextToken()
			state := p.mark()
			arguments := p.tryParseTypeArgumentsInExpression()
			assert.Assert(t, arguments == nil)
			assert.Assert(t, reflect.DeepEqual(p.mark(), state))
			assert.Equal(t, p.parsingContexts, ParsingContexts(1<<PCSourceElements))
		})
	}
}

func TestInferConstraintSpeculationFailure(t *testing.T) {
	t.Parallel()
	p := newParser()
	p.initializeState(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, "extends (infer Y extends (T[))", core.ScriptKindTS)
	p.nextToken()
	state := p.mark()
	constraint, ok := p.speculativeTypes.tryParseConstraintOfInferType()
	assert.Assert(t, constraint == nil)
	assert.Assert(t, !ok)
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
}

func TestTypeArgumentClosureLookaheadRollback(t *testing.T) {
	t.Parallel()
	p := newParser()
	p.initializeState(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, "< // @ts-ignore\n\"\\xZ\">();", core.ScriptKindTS)
	p.nextToken()
	state := p.mark()
	assert.Assert(t, p.typeArgumentsMayClose())
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
	// The real scan must still observe the directive and its lexical diagnostic.
	p.nextToken()
	assert.Equal(t, len(p.scanner.CommentDirectives()), 1)
	assert.Equal(t, len(p.diagnostics), 1)
	assert.Equal(t, p.diagnostics[0].Code(), diagnostics.Hexadecimal_digit_expected.Code())
}

func TestProbeExpressionBoundaryRollback(t *testing.T) {
	t.Parallel()
	p := newParser()
	p.initializeState(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, "x + y // @ts-ignore\n;", core.ScriptKindTS)
	p.nextToken()
	p.inExpressionProbe = true
	state := p.mark()
	first := p.parseValueExpression(true)
	assert.Equal(t, first.Kind, ast.KindBinaryExpression)
	assert.Equal(t, len(p.probeExpressions), 1)
	p.rewind(state)
	assert.Assert(t, p.lookAhead(func(p *Parser) bool {
		// A cache hit is opaque and belongs only to this disposable lookahead.
		return p.parseValueExpression(true).Kind == ast.KindIdentifier
	}))
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
	assert.Assert(t, p.hasOpaqueExpression)
	assert.Equal(t, len(p.scanner.CommentDirectives()), 0)
	p.inExpressionProbe = false
	committed := p.parseValueExpression(true)
	assert.Equal(t, committed.Kind, ast.KindBinaryExpression)
	assert.Equal(t, len(p.scanner.CommentDirectives()), 1)
}

func TestJSDocSpeculationRollback(t *testing.T) {
	t.Parallel()
	p := newParser()
	p.initializeState(ast.SourceFileParseOptions{FileName: "/index.js", PathKey: "/index.js"}, `/** @typedef {number} Local */
const local = 0;
/** @returns { */
function broken() {}`, core.ScriptKindJS)
	p.nextToken()
	retainedDeclaration := p.factory.NewIdentifier("retained")
	retainedDiagnostic := ast.NewDiagnostic(nil, core.NewTextRange(0, 0), diagnostics.Type_expected)
	p.reparseList = []*ast.Node{retainedDeclaration}
	p.jsdocDiagnostics = []*ast.Diagnostic{retainedDiagnostic}
	state := p.mark()
	assert.Assert(t, p.lookAhead(func(p *Parser) bool {
		assert.Equal(t, p.parseStatement().Kind, ast.KindVariableStatement)
		assert.Equal(t, p.parseStatement().Kind, ast.KindFunctionDeclaration)
		assert.Assert(t, len(p.reparseList) > 1)
		assert.Assert(t, len(p.jsdocDiagnostics) > 1)
		return true
	}))
	assert.Equal(t, len(p.reparseList), 1)
	assert.Assert(t, p.reparseList[0] == retainedDeclaration)
	assert.Equal(t, len(p.jsdocDiagnostics), 1)
	assert.Assert(t, p.jsdocDiagnostics[0] == retainedDiagnostic)
	assert.Assert(t, reflect.DeepEqual(p.mark(), state))
}

func TestProbeExpressionBoundaryWithScanError(t *testing.T) {
	t.Parallel()
	for _, source := range []string{`"\xZ";`, `= "\xZ";`} {
		t.Run(source, func(t *testing.T) {
			t.Parallel()
			p := newParser()
			p.initializeState(ast.SourceFileParseOptions{FileName: "/index.ts", PathKey: "/index.ts"}, source, core.ScriptKindTS)
			p.nextToken()
			if p.token == ast.KindEqualsToken {
				// The operator node consumes the error flag on the following token.
				p.parseTokenNode()
			}
			p.inExpressionProbe = true
			state := p.mark()
			assert.Equal(t, len(p.diagnostics), 1)
			assert.Equal(t, p.parseValueExpression(true).Kind, ast.KindStringLiteral)
			p.rewind(state)
			assert.Equal(t, p.parseValueExpression(true).Kind, ast.KindStringLiteral)
			assert.Assert(t, !p.hasOpaqueExpression)
			assert.Equal(t, len(p.diagnostics), 1)
			assert.Equal(t, p.diagnostics[0].Code(), diagnostics.Hexadecimal_digit_expected.Code())
		})
	}
}
