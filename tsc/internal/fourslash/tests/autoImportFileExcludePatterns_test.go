package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportFileExcludePatterns(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: foo.ts
export const mySymbol = 1;
// @Filename: ignoreme.ts
export const ignoredSymbol = 2;
// @Filename: bar.ts
mySym/*1*/
ignoredSym/*2*/`

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.Configure(t, &lsutil.UserPreferences{
		AutoImportFileExcludePatterns:         []string{"*ignoreme.ts"},
		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	})

	// Verify that mySymbol is included, but ignoredSymbol is excluded from completions
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"mySymbol"},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{"ignoredSymbol"},
		},
	})

	// Baseline the auto-imports
	f.BaselineAutoImportsCompletions(t, []string{"1", "2"})
}
