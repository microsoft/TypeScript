package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpInParenthetical(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class base { constructor (public n: number, public y: string) { } }
(new base(/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "n"})
	f.Insert(t, "0, ")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "y"})
}
