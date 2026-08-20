package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpImplicitConstructor(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class ImplicitConstructor {
}
var implicitConstructor = new ImplicitConstructor(/**/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "ImplicitConstructor(): ImplicitConstructor", ParameterCount: 0})
}
