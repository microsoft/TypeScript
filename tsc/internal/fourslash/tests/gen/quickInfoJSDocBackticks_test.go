package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocBackticks(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: jsdocParseMatchingBackticks.js
/**
 * ` + "`" + `@param` + "`" + ` initial at-param is OK in title comment
 * @param {string} x hi there ` + "`" + `@param` + "`" + `
 * @param {string} y hi there ` + "`" + `@ * param
 *                   this is the margin
 */
export function f(x, y) {
    return x/*x*/ + y/*y*/
}
f/*f*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "f")
	f.VerifyQuickInfoIs(t, "function f(x: string, y: string): string", "`@param` initial at-param is OK in title comment")
	f.GoToMarker(t, "x")
	f.VerifyQuickInfoIs(t, "(parameter) x: string", "hi there `@param`")
	f.GoToMarker(t, "y")
	f.VerifyQuickInfoIs(t, "(parameter) y: string", "hi there `@ * param\nthis is the margin")
}
