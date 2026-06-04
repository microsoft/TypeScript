package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoVerbosityJSDocNamespacedTypedef(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @checkJs: true
// @Filename: /index.js
// Namespaced typedef
/** @typedef {string} /*ns*/NS./*t*/T */

// Namespaced typedef aliased to qualified namespaced typedef.
/** @typedef {NS.T} NS./*u*/U */

// Namespaced typedef aliased to implicitly-resolved typedef.
/** @typedef {U} NS./*v*/V */
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{
		"ns": {0, 1},
		"t":  {0, 1},
		"u":  {0, 1},
		"v":  {0, 1},
	})
}
