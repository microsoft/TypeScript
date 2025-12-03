package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestFindAllReferencesJsDocTypeLiteral(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: foo.js
/**
 * @param {object} o - very important!
 * @param {string} o.x - a thing, its ok
 * @param {number} o.y - another thing
 * @param {Object} o.nested - very nested
 * @param {boolean} o.nested./*1*/great - much greatness
 * @param {number} o.nested.times - twice? probably!??
 */
 function f(o) { return o.nested./*2*/great; }`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineFindAllReferences(t, "1", "2")
}
