package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSExport(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: a.js
// @allowJs: true
/**
 * @enum {string}
 */
const testString = {
    one: "1",
    two: "2"
};

export { test/**/String };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(alias) type testString = string\n(alias) const testString: {\n    one: string;\n    two: string;\n}\nexport testString", "")
}
