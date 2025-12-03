package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnOverloadOnConst(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function x1(x: 'hi');
function x1(y: 'bye');
function x1(z: string);
function x1(a: any) {
}

x1(''/*1*/);
x1('hi'/*2*/);
x1('bye'/*3*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "z", ParameterSpan: "z: string", OverloadsCount: 3})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "x", ParameterSpan: "x: \"hi\"", OverloadsCount: 3})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "y", ParameterSpan: "y: \"bye\"", OverloadsCount: 3})
}
