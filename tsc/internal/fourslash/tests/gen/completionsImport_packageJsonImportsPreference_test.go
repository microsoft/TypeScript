package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_packageJsonImportsPreference(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @allowImportingTsExtensions: true
// @Filename: /project/package.json
{
  "name": "project",
  "version": "1.0.0",
  "imports": {
    "#internal/*": "./src/internal/*.ts"
  }
}
// @Filename: /project/src/internal/foo.ts
export const internalFoo = 0;
// @Filename: /project/src/other.ts
export * from "./internal/foo.ts";
// @Filename: /project/src/main.ts
internalFoo/**/`
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
					Label: "internalFoo",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "#internal/foo",
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
					Label: "internalFoo",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "./other",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{ImportModuleSpecifierPreference: "relative"},
	})
}
