package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionInJSDocPropertyWithLinkNoCrash1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @filename: /file.js
export function foo() {}

/**
 * @typedef MyType
 * @property {number} [timeout] - The /*1*/timeout; defaults to {@linkcode DEFAULT}
 */
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{CommitCharacters: &[]string{".", ",", ";"}},
		Items:        &fourslash.CompletionsExpectedItems{},
	})
}
