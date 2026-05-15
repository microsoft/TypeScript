package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpNestedCalls(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(s: string) { return s; }
function bar(s: string) { return s; }
let s = foo(/*a*/ /*b*/bar/*c*/(/*d*/"hello"/*e*/)/*f*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Markers a, b, c should show foo (outer call)
	f.GoToMarker(t, "a")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(s: string): string"})

	f.GoToMarker(t, "b")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(s: string): string"})

	f.GoToMarker(t, "c")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(s: string): string"})

	// Markers d, e should show bar (inside inner call, including the end boundary)
	f.GoToMarker(t, "d")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "bar(s: string): string"})

	f.GoToMarker(t, "e")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "bar(s: string): string"})

	// Marker f should show foo (after the inner call closes)
	f.GoToMarker(t, "f")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(s: string): string"})
}

func TestSignatureHelpEmptyInnerCall(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(s: string) { return s; }
function bar(s: string) { return s; }
let s = foo(bar(/*a*/));`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Marker a should show bar even though the inner argument list is empty.
	f.GoToMarker(t, "a")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "bar(s: string): string"})
}
