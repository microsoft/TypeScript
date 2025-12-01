package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelp_contextual(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    m(n: number, s: string): void;
    m2: () => void;
}
declare function takesObj(i: I): void;
takesObj({ m: (/*takesObj0*/) });
takesObj({ m(/*takesObj1*/) });
takesObj({ m: function(/*takesObj2*/) });
takesObj({ m2: (/*takesObj3*/) });

declare function takesCb(cb: (n: number, s: string, b: boolean) => void): void;
takesCb((/*contextualParameter1*/));
takesCb((/*contextualParameter1b*/) => {});
takesCb((n, /*contextualParameter2*/));
takesCb((n, s, /*contextualParameter3*/));
takesCb((n,/*contextualParameter3_2*/ s, b));
takesCb((n, s, b, /*contextualParameter4*/));

type Cb = () => void;
const cb: Cb = (/*contextualTypeAlias*/)

const cb2: () => void = (/*contextualFunctionType*/)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "takesObj0")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m(n: number, s: string): void", ParameterCount: 2, ParameterName: "n", ParameterSpan: "n: number"})
	f.GoToMarker(t, "takesObj1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m(n: number, s: string): void", ParameterCount: 2, ParameterName: "n", ParameterSpan: "n: number"})
	f.GoToMarker(t, "takesObj2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m(n: number, s: string): void", ParameterCount: 2, ParameterName: "n", ParameterSpan: "n: number"})
	f.GoToMarker(t, "takesObj3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "m2(): void", ParameterCount: 0})
	f.GoToMarker(t, "contextualParameter1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3, ParameterName: "n", ParameterSpan: "n: number"})
	f.GoToMarker(t, "contextualParameter1b")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3, ParameterName: "n", ParameterSpan: "n: number"})
	f.GoToMarker(t, "contextualParameter2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3, ParameterName: "s", ParameterSpan: "s: string"})
	f.GoToMarker(t, "contextualParameter3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3, ParameterName: "b", ParameterSpan: "b: boolean"})
	f.GoToMarker(t, "contextualParameter3_2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3, ParameterName: "s", ParameterSpan: "s: string"})
	f.GoToMarker(t, "contextualParameter4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb(n: number, s: string, b: boolean): void", ParameterCount: 3})
	f.GoToMarker(t, "contextualTypeAlias")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Cb(): void", ParameterCount: 0})
	f.GoToMarker(t, "contextualFunctionType")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "cb2(): void", ParameterCount: 0})
}
