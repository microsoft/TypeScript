package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestInheritedModuleMembersForClodule2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
    export module A {
        var o;
    }
}
module M {
    export class A { a = 1;}
}
module M {
    export class A { /**/b }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyQuickInfoExists(t)
	f.VerifyNumberOfErrorsInCurrentFile(t, 4)
}
