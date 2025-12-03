package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTypeArguments(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function f(a: number, b: string, c: boolean): void; // ignored, not generic
declare function f<T extends number>(): void;
declare function f<T, U>(): void;
declare function f<T, U, V extends string>(): void;
f</*f0*/;
f<number, /*f1*/;
f<number, string, /*f2*/;

declare const C: {
    new<T extends number>(): void;
    new<T, U>(): void;
    new<T, U, V extends string>(): void;
};
new C</*C0*/;
new C<number, /*C1*/;
new C<number, string, /*C2*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "f0")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f<T extends number>(): void", ParameterName: "T", ParameterSpan: "T extends number", OverloadsCount: 3})
	f.GoToMarker(t, "f1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f<T, U>(): void", ParameterName: "U", ParameterSpan: "U", OverloadsCount: 2})
	f.GoToMarker(t, "f2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f<T, U, V extends string>(): void", ParameterName: "V", ParameterSpan: "V extends string"})
	f.GoToMarker(t, "C0")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "C<T extends number>(): void", ParameterName: "T", ParameterSpan: "T extends number", OverloadsCount: 3})
	f.GoToMarker(t, "C1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "C<T, U>(): void", ParameterName: "U", ParameterSpan: "U", OverloadsCount: 2})
	f.GoToMarker(t, "C2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "C<T, U, V extends string>(): void", ParameterName: "V", ParameterSpan: "V extends string"})
}
