package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemanticClassificatonTypeAlias(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type /*0*/Alias = number
var x: /*1*/Alias;
var y = </*2*/Alias>{};
function f(x: /*3*/Alias): /*4*/Alias { return undefined; }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "type.declaration", Text: "Alias"},
		{Type: "variable.declaration", Text: "x"},
		{Type: "type", Text: "Alias"},
		{Type: "variable.declaration", Text: "y"},
		{Type: "type", Text: "Alias"},
		{Type: "function.declaration", Text: "f"},
		{Type: "parameter.declaration", Text: "x"},
		{Type: "type", Text: "Alias"},
		{Type: "type", Text: "Alias"},
	})
}
