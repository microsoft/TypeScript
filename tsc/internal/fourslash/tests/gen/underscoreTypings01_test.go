package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestUnderscoreTypings01(t *testing.T) {
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

var a: string[];
var /*1*/b = _.map(a, /*2*/x => x.length);    // Was typed any[], should be number[]
var /*3*/c = _(a).map(/*4*/x => x.length);
var /*5*/d = a.map(/*6*/x => x.length);

var aa: any[];
var /*7*/bb = _.map(aa, /*8*/x => x.length);
var /*9*/cc = _(aa).map(/*10*/x => x.length);
var /*11*/dd = aa.map(/*12*/x => x.length);

var e = a.map(x => x./*13*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "var b: number[]", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) x: string", "")
	f.VerifyQuickInfoAt(t, "3", "var c: number[]", "")
	f.VerifyQuickInfoAt(t, "4", "(parameter) x: string", "")
	f.VerifyQuickInfoAt(t, "5", "var d: number[]", "")
	f.VerifyQuickInfoAt(t, "6", "(parameter) x: string", "")
	f.VerifyQuickInfoAt(t, "7", "var bb: any[]", "")
	f.VerifyQuickInfoAt(t, "8", "(parameter) x: any", "")
	f.VerifyQuickInfoAt(t, "9", "var cc: any[]", "")
	f.VerifyQuickInfoAt(t, "10", "(parameter) x: any", "")
	f.VerifyQuickInfoAt(t, "11", "var dd: any[]", "")
	f.VerifyQuickInfoAt(t, "12", "(parameter) x: any", "")
	f.VerifyCompletions(t, "13", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"length",
			},
			Excludes: []string{
				"toFixed",
			},
		},
	})
}
