package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnThis3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Restricted {
    n: number;
}
function implicitAny(x: number): void {
    return th/*1*/is;
}
function explicitVoid(th/*2*/is: void, x: number): void {
    return th/*3*/is;
}
function explicitInterface(th/*4*/is: Restricted): void {
    console.log(thi/*5*/s);
}
function explicitLiteral(th/*6*/is: { n: number }): void {
    console.log(th/*7*/is);
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "any", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) this: void", "")
	f.VerifyQuickInfoAt(t, "3", "this: void", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) this: Restricted", "")
	f.VerifyQuickInfoAt(t, "5", "this: Restricted", "")
	f.VerifyQuickInfoAt(t, "6", "(parameter) this: {\n    n: number;\n}", "")
	f.VerifyQuickInfoAt(t, "7", "this: {\n    n: number;\n}", "")
}
