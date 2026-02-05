package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoCloduleWithRecursiveReference(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace M {
    export class C {
        foo() { }
    }
    export namespace C {
    export var /**/C = M.C
  }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "", "var M.C.C: typeof M.C", "")
	f.VerifyNoErrors(t)
}
