package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatDocumentZeroTabSize(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function foo() {
    if (true) {
        var x = 1;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	opts := f.GetOptions()
	opts.FormatCodeSettings.TabSize = 0
	opts.FormatCodeSettings.IndentSize = 0
	opts.FormatCodeSettings.ConvertTabsToSpaces = true
	f.Configure(t, opts)
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, "function foo() {\nif (true) {\nvar x = 1;\n}\n} ")
}
