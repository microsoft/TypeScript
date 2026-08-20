package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestErrorsAfterResolvingVariableDeclOfMergedVariableAndClassDecl(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace M {
    export class C {
        foo() { }
    }
    export namespace C {
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
