package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionJSDocNoCrash2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @allowJs: true
// @filename: file.js
/**
 * @param {Object} obj
 * @param {string} obj.first The first property
 * @param {string} obj.second The second property
 * @param {string} obj.third The {@link foo} third property
 */
/*1*/function foo(obj) {}
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// The assertion here is simply "does not crash/panic".
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{CommitCharacters: &[]string{".", ",", ";"}},
		Items:        &fourslash.CompletionsExpectedItems{},
	})
}
