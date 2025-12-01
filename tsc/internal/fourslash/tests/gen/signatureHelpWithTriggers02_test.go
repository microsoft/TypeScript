package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpWithTriggers02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function foo<T>(x: T, y: T): T;
declare function bar<U>(x: U, y: U): U;

foo(bar/*1*/)`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.Insert(t, "(")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "bar(x: unknown, y: unknown): unknown"})
	f.Backspace(t, 1)
	f.Insert(t, "<")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "bar<U>(x: U, y: U): U"})
	f.Backspace(t, 1)
	f.Insert(t, ",")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(x: <U>(x: U, y: U) => U, y: <U>(x: U, y: U) => U): <U>(x: U, y: U) => U"})
	f.Backspace(t, 1)
}
