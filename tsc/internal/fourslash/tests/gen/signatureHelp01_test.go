package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelp01(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo(data: number) {
}

function bar {
    foo(/*1*/)
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "1")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "", ParameterCount: 1})
}
