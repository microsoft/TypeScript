package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpExpandedTuplesArgumentIndex(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(...args: [string, string] | [number, string, string]
) {

}

foo(123/*1*/,)
foo(""/*2*/, ""/*3*/)
foo(123/*4*/, ""/*5*/, )
foo(123/*6*/, ""/*7*/, ""/*8*/)`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_0", ParameterSpan: "args_0: number", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: string, args_1: string): void", ParameterCount: 2, ParameterName: "args_0", ParameterSpan: "args_0: string", OverloadsCount: 2, OverrideSelectedItemIndex: 0, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: string, args_1: string): void", ParameterCount: 2, ParameterName: "args_1", ParameterSpan: "args_1: string", OverloadsCount: 2, OverrideSelectedItemIndex: 0, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_0", ParameterSpan: "args_0: number", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_1", ParameterSpan: "args_1: string", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_0", ParameterSpan: "args_0: number", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "7")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_1", ParameterSpan: "args_1: string", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(args_0: number, args_1: string, args_2: string): void", ParameterCount: 3, ParameterName: "args_2", ParameterSpan: "args_2: string", OverloadsCount: 2, OverrideSelectedItemIndex: 1, IsVariadic: false, IsVariadicSet: true})
}
