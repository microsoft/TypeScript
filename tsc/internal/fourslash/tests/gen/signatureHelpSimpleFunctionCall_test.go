package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpSimpleFunctionCall(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// Simple function test
function functionCall(str: string, num: number) {
}
functionCall(/*functionCall1*/);
functionCall("", /*functionCall2*/1);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "functionCall1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "functionCall(str: string, num: number): void", ParameterName: "str", ParameterSpan: "str: string"})
	f.GoToMarker(t, "functionCall2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "functionCall(str: string, num: number): void", ParameterName: "num", ParameterSpan: "num: number"})
}
