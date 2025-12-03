package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpAnonymousFunction(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var anonymousFunctionTest = function(n: number, s: string): (a: number, b: string) => string {
    return null;
}
anonymousFunctionTest(5, "")(/*anonymousFunction1*/1, /*anonymousFunction2*/"");`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "anonymousFunction1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "(a: number, b: string): string", ParameterCount: 2, ParameterName: "a", ParameterSpan: "a: number"})
	f.GoToMarker(t, "anonymousFunction2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "b", ParameterSpan: "b: string"})
}
