package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJsDocTags11(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noEmit: true
// @allowJs: true
// @Filename: quickInfoJsDocTags11.js
/**
 * @param {T1} a
 * @param {T2} b
 * @template {number} T1 Comment T1
 * @template {number} T2 Comment T2
 */
const /**/foo = (a, b) => {};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineHover(t)
}
