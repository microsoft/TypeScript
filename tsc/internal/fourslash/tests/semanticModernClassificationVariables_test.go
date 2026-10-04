package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSemanticModernClassificationVariables(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `  var x = 9, y1 = [x];
  try {
    for (const s of y1) { x = s }
  } catch (e) {
    throw y1;
  }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "variable.declaration", Text: "x"},
		{Type: "variable.declaration", Text: "y1"},
		{Type: "variable", Text: "x"},
		{Type: "variable.declaration.readonly.local", Text: "s"},
		{Type: "variable", Text: "y1"},
		{Type: "variable", Text: "x"},
		{Type: "variable.readonly.local", Text: "s"},
		{Type: "variable.declaration.local", Text: "e"},
		{Type: "variable", Text: "y1"},
	})
}
