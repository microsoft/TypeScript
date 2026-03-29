package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestRenameQuotedSingleCharacterPropertyName1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "" +
		"\n" +
		"const obj = {\n" +
		"  \"'\"/**/: 1,\n" +
		"}\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineRename(t, nil /*preferences*/, "")
}
