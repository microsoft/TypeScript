package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test that requesting completions after a keyword in an import statement
// doesn't crash with a nil pointer dereference.
// Reproduces issue: import super/*cursor*/
// Before the fix, this would panic with: runtime error: invalid memory address or nil pointer dereference
func TestCompletionImportKeywordNoCrash(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	emptyCommitChars := []string{}

	// Test with "super" keyword
	{
		const content = `import super/*1*/`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &emptyCommitChars,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{
					"type",
				},
			},
		})
		done()
	}

	// Test with "this" keyword
	{
		const content = `import this/*1*/`
		f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
		f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &emptyCommitChars,
			},
			Items: &fourslash.CompletionsExpectedItems{
				Includes: []fourslash.CompletionsExpectedItem{
					"type",
				},
			},
		})
		done()
	}
}
