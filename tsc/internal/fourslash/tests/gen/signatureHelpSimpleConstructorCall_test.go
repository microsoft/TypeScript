package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpSimpleConstructorCall(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class ConstructorCall {
    constructor(str: string, num: number) {
    }
}
var x = new ConstructorCall(/*constructorCall1*/1,/*constructorCall2*/2);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "constructorCall1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "ConstructorCall(str: string, num: number): ConstructorCall", ParameterName: "str", ParameterSpan: "str: string"})
	f.GoToMarker(t, "constructorCall2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "ConstructorCall(str: string, num: number): ConstructorCall", ParameterName: "num", ParameterSpan: "num: number"})
}
