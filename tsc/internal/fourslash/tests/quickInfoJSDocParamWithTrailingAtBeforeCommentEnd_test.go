package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocParamWithTrailingAtBeforeCommentEnd(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
/** @param {string} x trailing @*/
function /*fn*/foo(/*x*/x) {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "fn", "function foo(x: string): void", "\n\n*@param* `x` — trailing @")
	f.VerifyQuickInfoAt(t, "x", "(parameter) x: string", "trailing @")
}
