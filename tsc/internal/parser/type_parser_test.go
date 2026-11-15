package parser

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
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
