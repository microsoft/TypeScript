package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestDocumentHighlightMalformedAmbientModuleExportEquals(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = `// @Filename: /a.d.ts
declare moduleu "m" {
  interface A { x: 1 }
  function f(): A[];
  /*m*/export = f;
}`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "m")
}
