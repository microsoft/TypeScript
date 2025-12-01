package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericFunctionReturnType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo<T, U>(x: T, y: U): (a: U) => T {
    var z = y;
    return (z) => x;
}
var /*2*/r = foo(/*1*/1, "");
var /*4*/r2 = r(/*3*/"");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(x: number, y: string): (a: string) => number"})
	f.VerifyQuickInfoAt(t, "2", "var r: (a: string) => number", "")
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "r(a: string): number"})
	f.VerifyQuickInfoAt(t, "4", "var r2: number", "")
}
