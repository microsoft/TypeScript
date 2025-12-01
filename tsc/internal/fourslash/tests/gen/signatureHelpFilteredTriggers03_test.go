package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpFilteredTriggers03(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare class ViewJayEss {
    constructor(obj: object);
}
new ViewJayEss({
    methods: {
        sayHello/**/
    }
});`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.Insert(t, "(")
	f.VerifyNoSignatureHelpWithContext(t, &lsproto.SignatureHelpContext{TriggerKind: lsproto.SignatureHelpTriggerKindTriggerCharacter, TriggerCharacter: PtrTo("("), IsRetrigger: false})
	f.Insert(t, ") {},")
	f.VerifyNoSignatureHelpWithContext(t, &lsproto.SignatureHelpContext{TriggerKind: lsproto.SignatureHelpTriggerKindTriggerCharacter, TriggerCharacter: PtrTo(","), IsRetrigger: false})
}
