package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionJsxNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: file.tsx
<Foo/>/*1*/
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
