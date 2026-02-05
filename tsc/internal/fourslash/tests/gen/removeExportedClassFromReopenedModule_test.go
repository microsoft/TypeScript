package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRemoveExportedClassFromReopenedModule(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace multiM { }

namespace multiM {
    /*1*/export class c { }
}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "1")
	f.DeleteAtCaret(t, 18)
	f.GoToEOF(t)
	f.Insert(t, "new multiM.c();")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
