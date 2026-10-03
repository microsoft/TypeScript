package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestReturnTypeNarrowingAfterCachingTypes(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function h<T extends boolean>(x: T): T extends true ? 1 : T extends false ? 2 : never {
  if (x) {
      return 1;
  }
  return 2;
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySemanticTokens(t, []fourslash.SemanticToken{
		{Type: "function.declaration", Text: "h"},
		{Type: "typeParameter.declaration", Text: "T"},
		{Type: "parameter.declaration", Text: "x"},
		{Type: "typeParameter", Text: "T"},
		{Type: "typeParameter", Text: "T"},
		{Type: "typeParameter", Text: "T"},
		{Type: "parameter", Text: "x"},
	})
	f.VerifyNoErrors(t)
}
