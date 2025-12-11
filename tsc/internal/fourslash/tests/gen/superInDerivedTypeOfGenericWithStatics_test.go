package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSuperInDerivedTypeOfGenericWithStatics(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
   export class C<T extends Date> {
      static foo(): C<Date> {
          return null;
           }
     }
}
class D extends M.C<Date> {
    constructor() {
        /**/ // was an error appearing on super in editing scenarios
       }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Insert(t, "super();")
	f.VerifyNoErrors(t)
}
