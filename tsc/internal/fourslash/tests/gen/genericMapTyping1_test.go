package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGenericMapTyping1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Iterator_<T, U> {
    (value: T, index: any, list: any): U;
}
interface WrappedArray<T> {
    map<U>(iterator: Iterator_<T, U>, context?: any): U[];
}
interface Underscore {
    <T>(list: T[]): WrappedArray<T>;
    map<T, U>(list: T[], iterator: Iterator_<T, U>, context?: any): U[];
}
declare var _: Underscore;
var aa: string[];
var b/*1*/b = _.map(aa, x/*7*/x => xx.length);    // should be number[]
var c/*2*/c = _(aa).map(x/*8*/x => xx.length);    // should be number[]
var d/*3*/d = aa.map(xx => x/*9*/x.length);       // should be number[]
var aaa: any[];
var b/*4*/bb = _.map(aaa, xx => xx.length); // should be any[]
var c/*5*/cc = _(aaa).map(xx => xx.length);  // Should not error, should be any[]
var d/*6*/dd = aaa.map(xx => xx.length);     // should not error, should be any[]`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyQuickInfoAt(t, "1", "var bb: number[]", "")
	f.VerifyQuickInfoAt(t, "2", "var cc: number[]", "")
	f.VerifyQuickInfoAt(t, "3", "var dd: number[]", "")
	f.VerifyQuickInfoAt(t, "4", "var bbb: any[]", "")
	f.VerifyQuickInfoAt(t, "5", "var ccc: any[]", "")
	f.VerifyQuickInfoAt(t, "6", "var ddd: any[]", "")
	f.VerifyQuickInfoAt(t, "7", "(parameter) xx: string", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) xx: string", "")
	f.VerifyQuickInfoAt(t, "9", "(parameter) xx: string", "")
}
