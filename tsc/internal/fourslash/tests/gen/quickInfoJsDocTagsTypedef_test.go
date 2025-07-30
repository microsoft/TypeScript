package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocTagsTypedef(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noEmit: true
// @allowJs: true
// @Filename: quickInfoJsDocTagsTypedef.js
/**
 * Bar comment
 * @typedef {Object} /*1*/Bar
 * @property {string} baz - baz comment
 * @property {string} qux - qux comment
 */

/**
 * foo comment
 * @param {/*2*/Bar} x - x comment
 * @returns {Bar}
 */
function foo(x) {
    return x;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
