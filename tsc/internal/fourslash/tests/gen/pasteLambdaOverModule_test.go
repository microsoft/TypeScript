package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPasteLambdaOverModule(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.Paste(t, "namespace B { }")
	f.GoToBOF(t)
	f.DeleteAtCaret(t, 15)
	f.Insert(t, "var t = (public x) => { };")
	f.VerifyNumberOfErrorsInCurrentFile(t, 1)
}
