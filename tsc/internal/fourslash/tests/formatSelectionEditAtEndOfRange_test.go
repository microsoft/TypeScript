package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatSelectionEditAtEndOfRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*1*/var x = 1;/*2*/
void 0;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts110 := f.GetOptions()
	opts110.FormatCodeSettings.Semicolons = "remove"
	f.Configure(t, opts110)
	f.FormatSelection(t, "1", "2")
	f.VerifyCurrentFileContent(t, `var x = 1
void 0;`)
}
