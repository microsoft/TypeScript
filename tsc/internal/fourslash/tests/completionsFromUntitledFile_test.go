package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsFromUntitledFile(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// Test that completions work in untitled files without crashing.
	// Regression test for https://github.com/microsoft/typescript-go/issues/2550
	const content = `// @filename: /home/src/project/utils.ts
export function helper() {}

// @filename: ^/untitled/ts-nul-authority/Untitled-1.ts
/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	// Request completions - this should not crash
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			// We don't care about the exact completions, just that it doesn't crash
			Includes: nil,
		},
	})
}
