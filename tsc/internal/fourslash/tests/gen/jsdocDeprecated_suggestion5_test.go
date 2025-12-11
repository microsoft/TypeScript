package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocDeprecated_suggestion5(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @checkJs: true
// @allowJs: true
// @Filename: jsdocDeprecated_suggestion5.js
/** @typedef {{ email: string, nickName?: string }} U2 */
/** @type {U2} */
const u2 = { email: "" }
/**
 * @callback K
 * @param {any} ctx
 * @return {void}
 */
/** @type {K} */
const cc = _k => {}
/** @enum {number} */
const DOOM = { e: 1, m: 1 }
/** @type {DOOM} */
const kneeDeep = DOOM.e`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifySuggestionDiagnostics(t, nil)
}
