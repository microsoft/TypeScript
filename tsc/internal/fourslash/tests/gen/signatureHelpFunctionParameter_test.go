package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpFunctionParameter(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function parameterFunction(callback: (a: number, b: string) => void) {
    callback(/*parameterFunction1*/5, /*parameterFunction2*/"");
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "parameterFunction1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callback(a: number, b: string): void", ParameterCount: 2, ParameterName: "a", ParameterSpan: "a: number"})
	f.GoToMarker(t, "parameterFunction2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "callback(a: number, b: string): void", ParameterName: "b", ParameterSpan: "b: string"})
}
