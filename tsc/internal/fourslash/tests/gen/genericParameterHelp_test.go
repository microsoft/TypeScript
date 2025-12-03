package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericParameterHelp(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo { }

function testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M {
    return null;
}

// Function calls
testFunction</*1*/
testFunction<any, /*2*/
testFunction<any, any, any>(/*3*/
testFunction<any, any,/*4*/ any>(null, null, null);
testFunction<, ,/*5*/>(null, null, null);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M", ParameterCount: 3, ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "U", ParameterSpan: "U"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "a", ParameterSpan: "a: any"})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "M", ParameterSpan: "M extends IFoo"})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "M", ParameterSpan: "M extends IFoo"})
}
