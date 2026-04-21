package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionAfterExtendsL10nInJs(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @checkJs: true
// @Filename: /interfaces.d.ts
export interface IL10n {}

// @Filename: /genericl10n.js
/** @typedef {import("./interfaces").IL10n} IL10n */

class L10n {
	constructor(options) {
		this.options = options;
	}
}

/**
 * @implements {IL10n}
 */
class GenericL10n extends L10n/*1*/ {
	constructor(lang) {
		super({ lang });
	}
}

`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "1")
	f.GetCompletions(t, nil /*userPreferences*/)
}
