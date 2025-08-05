package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestSyntheticImportFromBabelGeneratedFile1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @allowSyntheticDefaultImports: true
// @Filename: /a.js
exports.__esModule = true;
exports.default = f;
/**
 * Run this function
 * @param {string} t
 */
function f(t) {}
// @Filename: /b.js
import f from "./a"
/**/f`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "", "(alias) function f(t: string): void\nimport f", "Run this function")
}
