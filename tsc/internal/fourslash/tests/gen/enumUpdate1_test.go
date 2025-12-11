package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestEnumUpdate1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
	export enum E {
		A = 1,
		B = 2,
		C = 3,
		/*1*/
	}
}
module M {
	function foo(): M.E {
		return M.E.A;
	}
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.Insert(t, "D = C << 1,")
	f.VerifyNoErrors(t)
}
