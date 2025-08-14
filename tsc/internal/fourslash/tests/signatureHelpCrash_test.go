package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpTokenCrash2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
function foo<T, U>(x: string, y: T, z: U) {

}

foo<number,number>/*1*/("hello", 123,456)
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifySignatureHelp(t, &fourslash.SignatureHelpCase{
		MarkerInput: "1",
		Expected:    nil,
		Context: &lsproto.SignatureHelpContext{
			IsRetrigger:      false,
			TriggerCharacter: PtrTo("("),
			TriggerKind:      lsproto.SignatureHelpTriggerKindTriggerCharacter,
		},
	})
}
