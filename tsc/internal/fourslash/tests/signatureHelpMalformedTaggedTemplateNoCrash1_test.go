package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestSignatureHelpMalformedTaggedTemplateNoCrash1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const content = "`${1}\n/*m1*/\n// ``\n"

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "m1")
	f.VerifyNoSignatureHelpWithContext(t, &lsproto.SignatureHelpContext{
		TriggerKind: lsproto.SignatureHelpTriggerKindInvoked,
		IsRetrigger: false,
	})
}
