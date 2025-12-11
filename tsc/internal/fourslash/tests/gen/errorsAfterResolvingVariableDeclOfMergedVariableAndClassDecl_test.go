package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestErrorsAfterResolvingVariableDeclOfMergedVariableAndClassDecl(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `module M {
    export class C {
        foo() { }
    }
    export module C {
        export var /*1*/C = M.C;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNoErrors(t)
	f.GoToMarker(t, "1")
	f.Backspace(t, 1)
	f.Insert(t, " ")
	f.VerifyQuickInfoIs(t, "var M.C.C: typeof M.C", "")
	f.VerifyNoErrors(t)
}
