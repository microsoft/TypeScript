package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestPasteLambdaOverModule(t *testing.T) {
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
