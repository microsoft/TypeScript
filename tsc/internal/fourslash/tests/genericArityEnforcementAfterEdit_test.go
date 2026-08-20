package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestGenericArityEnforcementAfterEdit(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface G<T, U> { }
/**/
var v4: G<G<any>, any>;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "")
	f.Insert(t, " ")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
