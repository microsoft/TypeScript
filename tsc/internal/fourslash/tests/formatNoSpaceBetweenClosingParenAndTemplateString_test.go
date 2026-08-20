package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatNoSpaceBetweenClosingParenAndTemplateString(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `foo() ` + "`" + `abc` + "`" + `;
bar()` + "`" + `def` + "`" + `;
baz()` + "`" + `a${x}b` + "`" + `;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, "foo()`abc`;\nbar()`def`;\nbaz()`a${x}b`;")
}
