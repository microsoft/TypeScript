package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPasteLambdaOverModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Paste(t, "module B { }")
	f.GoToBOF(t)
	f.DeleteAtCaret(t, 12)
	f.Insert(t, "var t = (public x) => { };")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
