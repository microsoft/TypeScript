package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnThis(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Restricted {
    n: number;
}
function wrapper(wrapped: { (): void; }) { }
class Foo {
    n: number;
    prop1: th/*0*/is;
    public explicitThis(this: this) {
        wrapper(
            function explicitVoid(this: void) {
                console.log(th/*1*/is);
            }
        )
        console.log(th/*2*/is);
    }
    public explicitInterface(th/*3*/is: Restricted) {
        console.log(th/*4*/is);
    }
    public explicitClass(th/*5*/is: Foo) {
        console.log(th/*6*/is);
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "0", "this", "")
	f.VerifyQuickInfoAt(t, "1", "this: void", "")
	f.VerifyQuickInfoAt(t, "2", "this: this", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) this: Restricted", "")
	f.VerifyQuickInfoAt(t, "4", "this: Restricted", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) this: Foo", "")
	f.VerifyQuickInfoAt(t, "6", "this: Foo", "")
}
