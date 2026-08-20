package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpNoArguments(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(n: number): string {
}

foo(/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "foo(n: number): string", ParameterName: "n", ParameterSpan: "n: number"})
}
