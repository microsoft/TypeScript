package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpObjectCreationExpressionNoArgs_NotAvailable(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class sampleCls { constructor(str: string, num: number) { } }
var x = new sampleCls/**/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, "")
}
