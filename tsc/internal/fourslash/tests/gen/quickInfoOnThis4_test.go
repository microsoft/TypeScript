package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnThis4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface ContextualInterface {
    m: number;
    method(this: this, n: number);
}
let o: ContextualInterface = {
    m: 12,
    method(n) {
        let x = this/*1*/.m;
    }
}
interface ContextualInterface2 {
    (this: void, n: number): void;
}
let contextualInterface2: ContextualInterface2 = function (th/*2*/is, n) { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "this: ContextualInterface", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) this: void", "")
}
