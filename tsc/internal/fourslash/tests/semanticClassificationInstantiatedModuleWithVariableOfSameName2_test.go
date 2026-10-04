package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemanticClassificationInstantiatedModuleWithVariableOfSameName2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module /*0*/M {
    export interface /*1*/I {
    }
}

module /*2*/M {
    var x = 10;
}

var /*3*/M = {
    foo: 10,
    bar: 20
}

var v: /*4*/M./*5*/I;

var x = /*6*/M;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "namespace.declaration", Text: "M"},
		{Type: "interface.declaration", Text: "I"},
		{Type: "namespace.declaration", Text: "M"},
		{Type: "variable.declaration.local", Text: "x"},
		{Type: "variable.declaration", Text: "M"},
		{Type: "property.declaration", Text: "foo"},
		{Type: "property.declaration", Text: "bar"},
		{Type: "variable.declaration", Text: "v"},
		{Type: "namespace", Text: "M"},
		{Type: "interface", Text: "I"},
		{Type: "variable.declaration", Text: "x"},
		{Type: "namespace", Text: "M"},
	})
}
