package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpIncompleteCalls(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module IncompleteCalls {
    class Foo {
        public f1() { }
        public f2(n: number): number { return 0; }
        public f3(n: number, s: string) : string { return ""; }
    }
    var x = new Foo();
    x.f1();
    x.f2(5);
    x.f3(5, "");
    x.f1(/*incompleteCalls1*/
    x.f2(5,/*incompleteCalls2*/
    x.f3(5,/*incompleteCalls3*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "incompleteCalls1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f1(): void", ParameterCount: 0})
	f.GoToMarker(t, "incompleteCalls2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f2(n: number): number", ParameterCount: 1})
	f.GoToMarker(t, "incompleteCalls3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f3(n: number, s: string): string", ParameterCount: 2, ParameterName: "s", ParameterSpan: "s: string"})
}
