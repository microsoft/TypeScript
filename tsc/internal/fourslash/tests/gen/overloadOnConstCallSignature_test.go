package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestOverloadOnConstCallSignature(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var foo: {
    (name: string): string;
    (name: 'order'): string;
    (name: 'content'): string;
    (name: 'done'): string;
}
var /*2*/x = foo(/*1*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(name: \"order\"): string", OverloadsCount: 4})
	f.Insert(t, "\"hi\"")
	f.VerifyQuickInfoAt(t, "2", "var x: string", "")
}
