package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpCallExpressionTuples(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function fnTest(str: string, num: number) { }
declare function wrap<A extends any[], R>(fn: (...a: A) => R) : (...a: A) => R;
var fnWrapped = wrap(fnTest);
fnWrapped/*3*/(/*1*/'', /*2*/5);
function fnTestVariadic (str: string, ...num: number[]) { }
var fnVariadicWrapped = wrap(fnTestVariadic);
fnVariadicWrapped/*4*/(/*5*/'', /*6*/5);
function fnNoParams () { }
var fnNoParamsWrapped = wrap(fnNoParams);
fnNoParamsWrapped/*7*/(/*8*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "3", "var fnWrapped: (str: string, num: number) => void", "")
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "fnWrapped(str: string, num: number): void", ParameterCount: 2, ParameterName: "str", ParameterSpan: "str: string"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "num", ParameterSpan: "num: number"})
	f.VerifyQuickInfoAt(t, "4", "var fnVariadicWrapped: (str: string, ...num: number[]) => void", "")
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "fnVariadicWrapped(str: string, ...num: number[]): void", ParameterCount: 2, ParameterName: "str", ParameterSpan: "str: string", IsVariadic: true, IsVariadicSet: true})
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "num", ParameterSpan: "...num: number[]", IsVariadic: true, IsVariadicSet: true})
	f.VerifyQuickInfoAt(t, "7", "var fnNoParamsWrapped: () => void", "")
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "fnNoParamsWrapped(): void", ParameterCount: 0})
}
