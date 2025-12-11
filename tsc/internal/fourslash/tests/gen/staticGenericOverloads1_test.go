package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestStaticGenericOverloads1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class A<T> {
    static B<S>(v: A<S>): A<S>;
    static B<S>(v: S): A<S>;
    static B<S>(v: any): A<S> {
        return null;
    }
}
var a = new A<number>();
A.B(/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.Insert(t, "a")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(v: A<number>): A<number>", OverloadsCount: 2})
	f.Insert(t, "); A.B(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(v: A<unknown>): A<unknown>", OverloadsCount: 2})
	f.Insert(t, "a")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "B(v: A<number>): A<number>", OverloadsCount: 2})
}
