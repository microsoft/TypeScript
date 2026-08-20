package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsImport_windowsPathsProjectRelative(t *testing.T) {
	t.Skip("Known failing fourslash test")
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: c:/project/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "~/noIndex/*": ["./src/noIndex/*"],
      "~/withIndex": ["./src/withIndex/index.ts"]
    }
  }
}
// @Filename: c:/project/package.json
{}
// @Filename: c:/project/src/noIndex/a.ts
export const myFunctionA = () => {};
// @Filename: c:/project/src/withIndex/b.ts
export const myFunctionB = () => {};
// @Filename: c:/project/src/withIndex/index.ts
export * from './b';
// @Filename: c:/project/src/reproduction/1.ts
myFunction/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "myFunctionA",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "~/noIndex/a",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "myFunctionB",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "~/withIndex",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{ImportModuleSpecifierPreference: "non-relative"},
	})
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "myFunctionA",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "../noIndex/a",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "myFunctionB",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "../withIndex",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{ImportModuleSpecifierPreference: "relative"},
	})
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "myFunctionA",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "../noIndex/a",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "myFunctionB",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "../withIndex",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{ImportModuleSpecifierPreference: "project-relative"},
	})
}
