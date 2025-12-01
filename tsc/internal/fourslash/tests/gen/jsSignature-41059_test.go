package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsSignature_41059(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: esnext
// @allowNonTsExtensions: true
// @Filename: Foo.js
a.next(/**/);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Generator.next(): IteratorResult<T, TReturn>", OverloadsCount: 2})
}
