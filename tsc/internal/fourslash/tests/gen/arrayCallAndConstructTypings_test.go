package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestArrayCallAndConstructTypings(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var a/*1*/1 = new Array();
var a/*2*/2 = new Array(1);
var a/*3*/3 = new Array<boolean>();
var a/*4*/4 = new Array<boolean>(1);
var a/*5*/5 = new Array("s");
var a/*6*/6 = Array();
var a/*7*/7 = Array(1);
var a/*8*/8 = Array<boolean>();
var a/*9*/9 = Array<boolean>(1);
var a/*10*/10 = Array("s");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var a1: any[]", "")
	f.VerifyQuickInfoAt(t, "2", "var a2: any[]", "")
	f.VerifyQuickInfoAt(t, "3", "var a3: boolean[]", "")
	f.VerifyQuickInfoAt(t, "4", "var a4: boolean[]", "")
	f.VerifyQuickInfoAt(t, "5", "var a5: string[]", "")
	f.VerifyQuickInfoAt(t, "6", "var a6: any[]", "")
	f.VerifyQuickInfoAt(t, "7", "var a7: any[]", "")
	f.VerifyQuickInfoAt(t, "8", "var a8: boolean[]", "")
	f.VerifyQuickInfoAt(t, "9", "var a9: boolean[]", "")
	f.VerifyQuickInfoAt(t, "10", "var a10: string[]", "")
}
