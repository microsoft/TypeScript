package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForContextuallyTypedIife(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `(({ q/*1*/, qq/*2*/ }, x/*3*/, { p/*4*/ }) => {
    var s: number = q/*5*/;
    var t: number = qq/*6*/;
    var u: number = p/*7*/;
    var v: number = x/*8*/;
    return q; })({ q: 13, qq: 12 }, 1, { p: 14 });
((a/*9*/, b/*10*/, c/*11*/) => [a/*12*/,b/*13*/,c/*14*/])("foo", 101, false);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) q: number", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) qq: number", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) p: number", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) q: number", "")
	f.VerifyQuickInfoAt(t, "6", "(parameter) qq: number", "")
	f.VerifyQuickInfoAt(t, "7", "(parameter) p: number", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) x: number", "")
	f.VerifyQuickInfoAt(t, "9", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "10", "(parameter) b: number", "")
	f.VerifyQuickInfoAt(t, "11", "(parameter) c: boolean", "")
	f.VerifyQuickInfoAt(t, "12", "(parameter) a: string", "")
	f.VerifyQuickInfoAt(t, "13", "(parameter) b: number", "")
	f.VerifyQuickInfoAt(t, "14", "(parameter) c: boolean", "")
}
