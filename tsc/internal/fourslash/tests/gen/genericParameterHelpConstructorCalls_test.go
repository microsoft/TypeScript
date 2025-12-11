package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericParameterHelpConstructorCalls(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo { }

class testClass<T extends IFoo, U, M extends IFoo> {
    constructor(a:T, b:U, c:M){ }
}

// Constructor calls
new testClass</*constructor1*/
new testClass<IFoo, /*constructor2*/
new testClass</*constructor3*/>(null, null, null)
new testClass<,,/*constructor4*/>(null, null, null)
new testClass<IFoo,/*constructor5*/IFoo,IFoo>(null, null, null)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "constructor1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "testClass<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): testClass<T, U, M>", ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "constructor2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "U", ParameterSpan: "U"})
	f.GoToMarker(t, "constructor3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "T", ParameterSpan: "T extends IFoo"})
	f.GoToMarker(t, "constructor4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "M", ParameterSpan: "M extends IFoo"})
	f.GoToMarker(t, "constructor5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "U", ParameterSpan: "U"})
}
