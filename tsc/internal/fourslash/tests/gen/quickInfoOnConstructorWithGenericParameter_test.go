package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnConstructorWithGenericParameter(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    x: number;
}
class Foo<T> {
    y: T;
}
class A {
    foo() { }
}
class B extends A {
    constructor(a: Foo<I>, b: number) {
        super();
    }
}
var x = new /*2*/B(/*1*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(a: Foo<I>, b: number): B"})
	f.Insert(t, "null,")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(a: Foo<I>, b: number): B"})
	f.Insert(t, "10);")
	f.VerifyQuickInfoAt(t, "2", "constructor B(a: Foo<I>, b: number): B", "")
}
