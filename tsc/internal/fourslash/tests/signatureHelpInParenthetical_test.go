package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpInParenthetical(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class base { constructor (public n: number, public y: string) { } }
(new base(/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "n"})
	f.Insert(t, "0, ")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "y"})
}
