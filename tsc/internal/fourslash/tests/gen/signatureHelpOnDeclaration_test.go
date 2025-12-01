package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnDeclaration(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f</**/
x`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyNoSignatureHelpForMarkers(t, "")
}
