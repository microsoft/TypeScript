package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericFunctionReturnType2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C<T> {
    constructor(x: T) { }
    foo(x: T) {
        return (a: T) => x;
    }
}
var x = new C(1);
var /*2*/r = x.foo(/*1*/3);
var /*4*/r2 = r(/*3*/4);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(x: number): (a: number) => number"})
	f.VerifyQuickInfoAt(t, "2", "var r: (a: number) => number", "")
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "r(a: number): number"})
	f.VerifyQuickInfoAt(t, "4", "var r2: number", "")
}
