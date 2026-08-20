package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatTemplateStringOnPaste(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const x = ` + "`" + `${0}/*0*/abc/*1*/` + "`" + `;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatSelection(t, "0", "1")
	f.VerifyCurrentFileContent(t, "const x = `${0}abc`;")
}
