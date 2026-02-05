package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestUnusedLabelAfterEdit(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowUnusedLabels: false
myLabel: while (true) {
    if (Math.random() > 0.5) {
        /*marker*/break myLabel;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
	f.GoToMarker(t, "marker")
	f.DeleteAtCaret(t, 14)
	f.Insert(t, "break;")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
	f.GoToMarker(t, "marker")
	f.DeleteAtCaret(t, 6)
	f.Insert(t, "break myLabel;")
	f.VerifyNumberOfErrorsInCurrentFile(t, 0)
}
