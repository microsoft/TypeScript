package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocCodefenceAtSign(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/**
 * text
 * @example Foo
 * ` + "```" + `
 * @Embed[asfasdfasf]
 * ` + "```" + `
 * becomes
 * ` + "```html" + `
 * <div></div>
 * ` + "```" + `
 */
const /*1*/x = 1;

/**
 * Some text
 * ` + "```" + `
 * @tag inside code
 * ` + "```" + `
 * @param y - a number
 */
function /*2*/foo(y: number) {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHover(t)
}
