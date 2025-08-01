package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRestArgType(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Test {
    private _priv(.../*1*/restArgs) {
    }
    public pub(.../*2*/restArgs) {
        var x = restArgs[2];
    }
}
var x: (...y: string[]) => void = function (.../*3*/y) {
    var t = y;
};
function foo(x: (...y: string[]) => void ) { }
foo((.../*4*/y1) => {
    var t = y;
});
foo((/*5*/y2) => {
    var t = y;
});
var t1 :(a1: string, a2: string) => void = (.../*t1*/f1) => { }  // f1 => any[];
var t2: (a1: string, ...a2: string[]) => void = (.../*t2*/f1) => { } // f1 => any[];
var t3: (a1: number, a2: boolean, ...c: string[]) => void  = (/*t31*/f1, .../*t32*/f2) => { }; // f1 => number, f2 => any[]
var t4: (...a1: string[]) => void = (.../*t4*/f1) => { };      // f1 => string[]
var t5: (...a1: string[]) => void = (/*t5*/f1) => { };         // f1 => string
var t6: (...a1: string[]) => void = (/*t61*/f1, .../*t62*/f2) => { };  // f1 => string, f2 => string[]
var t7: (...a1: string[]) => void = (/*t71*/f1, /*t72*/f2, /*t73*/f3) => { }; // fa => string, f2 => string, f3 => string
// Explicit type annotation
var t8: (...a1: string[]) => void = (/*t8*/f1: number[]) => { };
// Explicit initialization value
var t9: (a1: string[], a2: string[]) => void = (/*t91*/f1 = 4, /*t92*/f2 = [false, true]) => { };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) restArgs: any[]", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) restArgs: any[]", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) y: string[]", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) y1: string[]", "")
	f.VerifyQuickInfoAt(t, "5", "(parameter) y2: string", "")
	f.VerifyQuickInfoAt(t, "t1", "(parameter) f1: [a1: string, a2: string]", "")
	f.VerifyQuickInfoAt(t, "t2", "(parameter) f1: [a1: string, ...a2: string[]]", "")
	f.VerifyQuickInfoAt(t, "t31", "(parameter) f1: number", "")
	f.VerifyQuickInfoAt(t, "t32", "(parameter) f2: [a2: boolean, ...c: string[]]", "")
	f.VerifyQuickInfoAt(t, "t4", "(parameter) f1: string[]", "")
	f.VerifyQuickInfoAt(t, "t5", "(parameter) f1: string", "")
	f.VerifyQuickInfoAt(t, "t61", "(parameter) f1: string", "")
	f.VerifyQuickInfoAt(t, "t62", "(parameter) f2: string[]", "")
	f.VerifyQuickInfoAt(t, "t71", "(parameter) f1: string", "")
	f.VerifyQuickInfoAt(t, "t72", "(parameter) f2: string", "")
	f.VerifyQuickInfoAt(t, "t73", "(parameter) f3: string", "")
	f.VerifyQuickInfoAt(t, "t8", "(parameter) f1: number[]", "")
	f.VerifyQuickInfoAt(t, "t91", "(parameter) f1: string[]", "")
	f.VerifyQuickInfoAt(t, "t92", "(parameter) f2: string[]", "")
}
