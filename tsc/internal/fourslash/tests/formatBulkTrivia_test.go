package fourslash_test

import (
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestFormatBulkTrivia(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	comment := "/* " + strings.Repeat("Documentation ", 32) + "\u4e2d \U0001f600 */"
	content := "function f(){\n" +
		strings.Repeat(" ", 129) + comment + "\n" +
		strings.Repeat(" ", 129) + "return \"\u4e2d \U0001f600\";\n}"
	expected := "function f() {\n    " + comment + "\n    return \"\u4e2d \U0001f600\";\n}"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, expected)
	f.FormatDocument(t, "")
	f.VerifyCurrentFileContent(t, expected)
}
