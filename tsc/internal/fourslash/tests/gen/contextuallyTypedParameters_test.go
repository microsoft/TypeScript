package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestContextuallyTypedParameters(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function foo(cb: (this: any, x: number, y: string, z: boolean) => void): void;

foo(function(this, a, ...args) {
    a/*10*/;
    args/*11*/;
});

foo(function(this, a, b, ...args) {
    a/*20*/;
    b/*21*/;
    args/*22*/;
});

foo(function(this, a, b, c, ...args) {
    a/*30*/;
    b/*31*/;
    c/*32*/;
    args/*33*/;
});

foo(function(a, ...args) {
    a/*40*/;
    args/*41*/;
});

foo(function(a, b, ...args) {
    a/*50*/;
    b/*51*/;
    args/*52*/;
});

foo(function(a, b, c, ...args) {
    a/*60*/;
    b/*61*/;
    c/*62*/;
    args/*63*/;
});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "10", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "11", "(parameter) args: [y: string, z: boolean]", "")
	f.VerifyQuickInfoAt(t, "20", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "21", "(parameter) b: string", "")
	f.VerifyQuickInfoAt(t, "22", "(parameter) args: [z: boolean]", "")
	f.VerifyQuickInfoAt(t, "30", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "31", "(parameter) b: string", "")
	f.VerifyQuickInfoAt(t, "32", "(parameter) c: boolean", "")
	f.VerifyQuickInfoAt(t, "33", "(parameter) args: []", "")
	f.VerifyQuickInfoAt(t, "40", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "41", "(parameter) args: [y: string, z: boolean]", "")
	f.VerifyQuickInfoAt(t, "50", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "51", "(parameter) b: string", "")
	f.VerifyQuickInfoAt(t, "52", "(parameter) args: [z: boolean]", "")
	f.VerifyQuickInfoAt(t, "60", "(parameter) a: number", "")
	f.VerifyQuickInfoAt(t, "61", "(parameter) b: string", "")
	f.VerifyQuickInfoAt(t, "62", "(parameter) c: boolean", "")
	f.VerifyQuickInfoAt(t, "63", "(parameter) args: []", "")
}
