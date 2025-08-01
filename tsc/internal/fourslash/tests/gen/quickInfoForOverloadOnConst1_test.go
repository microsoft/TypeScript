package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForOverloadOnConst1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    x/*1*/1(a: number, callback: (x: 'hi') => number);
}
class C {
    x/*2*/1(a: number, call/*3*/back: (x: 'hi') => number);
    x/*4*/1(a: number, call/*5*/back: (x: string) => number) {
        call/*6*/back('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    }
}
var c: C;
c.x/*7*/1(1, (x/*8*/x: 'hi') => { return 1; } );
c.x1(1, (x/*9*/x: 'bye') => { return 1; } );
c.x1(1, (x/*10*/x) => { return 1; } );`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(method) I.x1(a: number, callback: (x: \"hi\") => number): any", "")
	f.VerifyQuickInfoAt(t, "2", "(method) C.x1(a: number, callback: (x: \"hi\") => number): any", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) callback: (x: \"hi\") => number", "")
	f.VerifyQuickInfoAt(t, "4", "(method) C.x1(a: number, callback: (x: \"hi\") => number): any", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) callback: (x: string) => number", "")
	f.VerifyQuickInfoAt(t, "6", "(parameter) callback: (x: string) => number", "")
	f.VerifyQuickInfoAt(t, "7", "(method) C.x1(a: number, callback: (x: \"hi\") => number): any", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) xx: \"hi\"", "")
	f.VerifyQuickInfoAt(t, "9", "(parameter) xx: \"bye\"", "")
	f.VerifyQuickInfoAt(t, "10", "(parameter) xx: \"hi\"", "")
}
