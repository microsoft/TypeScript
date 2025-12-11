package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpThis(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo<T> {
    public implicitAny(n: number) {
    }
    public explicitThis(this: this, n: number) {
        console.log(this);
    }
    public explicitClass(this: Foo<T>, n: number) {
        console.log(this);
    }
}

function implicitAny(x: number): void {
    return this;
}
function explicitVoid(this: void, x: number): void {
    return this;
}
function explicitLiteral(this: { n: number }, x: number): void {
    console.log(this);
}
let foo = new Foo<number>();
foo.implicitAny(/*1*/);
foo.explicitThis(/*2*/);
foo.explicitClass(/*3*/);
implicitAny(/*4*/12);
explicitVoid(/*5*/13);
let o = { n: 14, m: explicitLiteral };
o.m(/*6*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "n"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "n"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "n"})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "x"})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "x"})
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterName: "x"})
}
