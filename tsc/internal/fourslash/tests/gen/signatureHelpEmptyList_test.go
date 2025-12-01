package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpEmptyList(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function Foo(arg1: string, arg2: string) {
}

Foo(/*1*/);
function Bar<T>(arg1: string, arg2: string) { }
Bar</*2*/>();`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Foo(arg1: string, arg2: string): void", ParameterCount: 2, ParameterName: "arg1", ParameterSpan: "arg1: string"})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "Bar<T>(arg1: string, arg2: string): void"})
}
