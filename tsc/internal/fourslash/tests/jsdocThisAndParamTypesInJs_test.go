package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// JSDoc `@this` and `@param` types in JS files should be used by completions, hover, and signature help.
func TestJsdocThisAndParamTypesInJs(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @filename: /a.js
/**
 * @this {{ id: string, click: () => void }}
 * @param {{ name: string }} p
 */
function h(p/*paramHover*/) {
  this./*thisCompletions*/;
  p./*paramCompletions*/;
}

/**
 * @param {string} a
 * @param {number} b
 */
function f(a, b) {}
f(/*signatureHelp*/);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "thisCompletions", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"click", "id"},
		},
	})
	f.VerifyCompletions(t, "paramCompletions", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{"name"},
		},
	})
	f.VerifyQuickInfoAt(t, "paramHover", "(parameter) p: {\n    name: string;\n}", "")
	f.GoToMarker(t, "signatureHelp")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{Text: "f(a: string, b: number): void"})
}
