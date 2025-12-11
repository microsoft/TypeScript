package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoInFunctionTypeReference2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class C<T> {
    map(fn: (/*1*/k: string, /*2*/value: T, context: any) => void, context: any) {
    }
}
var c: C<number>;
c.map(/*3*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "(parameter) k: string", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) value: T", "")
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "map(fn: (k: string, value: number, context: any) => void, context: any): void"})
}
