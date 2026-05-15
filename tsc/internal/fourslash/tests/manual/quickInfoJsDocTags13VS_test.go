package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocTags13VS(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @filename: ./a.js
/**
 * First overload
 * @overload
 * @param {number} a
 * @returns {void}
 */

/**
 * Second overload
 * @overload
 * @param {string} a
 * @returns {void}
 */

/**
 * @param {string | number} a
 * @returns {void}
 */
function f(a) {}

f(/*a*/1);
f(/*b*/"");`
	f, done := fourslash.NewFourslash(t, &lsproto.ClientCapabilities{VSSupportsVisualStudioExtensions: new(true)}, content)
	defer done()
	f.VerifyBaselineSignatureHelp(t)
}
