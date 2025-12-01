package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpConstructExpression(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class sampleCls { constructor(str: string, num: number) { } }
var x = new sampleCls(/*1*/"", /*2*/5);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "sampleCls(str: string, num: number): sampleCls", ParameterCount: 2, ParameterName: "str", ParameterSpan: "str: string"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "num", ParameterSpan: "num: number"})
}
