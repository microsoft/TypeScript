package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSemanticModernClassificationFunctions(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(p1) {
  return foo(Math.abs(p1))
}
` + "`" + `/${window.location}` + "`" + `.split("/").forEach(s => foo(s));`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "function.declaration", Text: "foo"},
		{Type: "parameter.declaration", Text: "p1"},
		{Type: "function", Text: "foo"},
		{Type: "variable.defaultLibrary", Text: "Math"},
		{Type: "method.defaultLibrary", Text: "abs"},
		{Type: "parameter", Text: "p1"},
		{Type: "variable.defaultLibrary", Text: "window"},
		{Type: "property.defaultLibrary", Text: "location"},
		{Type: "method.defaultLibrary", Text: "split"},
		{Type: "method.defaultLibrary", Text: "forEach"},
		{Type: "parameter.declaration", Text: "s"},
		{Type: "function", Text: "foo"},
		{Type: "parameter", Text: "s"},
	})
}
