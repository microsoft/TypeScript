package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSignatureHelpOnTypeArgumentsWithUnresolvedTarget(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
/*1*/un/*2*/resolvedVal/*3*/</*4*/Un/*5*/resolvedType/*6*/>/*7*/(/*8*/un/*9*/resolvedVal/*10*/);
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToEachMarker(t, nil, func(marker *fourslash.Marker, index int) {
		f.VerifyNoSignatureHelp(t)
	})
}
