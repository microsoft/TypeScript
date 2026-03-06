package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFormatSelectionAfterTemplateLiteral1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = "const a = `head${\"x\"};\n`;\n\n/*begin*/export const f = () => {\n    return `world`;\n/*end*/}\n"
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.FormatSelection(t, "begin", "end")
	f.VerifyCurrentFileContent(t, "const a = `head${\"x\"};\n`;\n\nexport const f = () => {\n    return `world`;\n}\n")
}
