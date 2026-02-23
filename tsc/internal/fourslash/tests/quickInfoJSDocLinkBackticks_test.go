package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoJSDocLinkBackticks(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: jsdocParseMatchingBackticks.js
/**
 * ` + "`" + `{@link foo}` + "`" + ` initial at-param is OK in title comment
 * @param {string} x hi there ` + "`" + `{@link foo}` + "`" + `
 */
export function f(x) {
    return x/*x*/
}
f/*f*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "f")
	f.VerifyQuickInfoIs(t, "function f(x: string): string", "`{@link foo}` initial at-param is OK in title comment\n\n*@param* `x` — hi there `{@link foo}`\n")
	f.GoToMarker(t, "x")
	f.VerifyQuickInfoIs(t, "(parameter) x: string", "hi there `{@link foo}`\n")
}
