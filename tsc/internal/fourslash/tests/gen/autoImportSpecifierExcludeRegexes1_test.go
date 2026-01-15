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

func TestAutoImportSpecifierExcludeRegexes1(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @Filename: /node_modules/lib/index.d.ts
declare module "ambient" {
    export const x: number;
}
declare module "ambient/utils" {
   export const x: number;
}
// @Filename: /index.ts
x/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient", "ambient/utils"}, nil /*preferences*/)
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"utils"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient", "ambient/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"/UTILS/"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"/UTILS/i"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient", "ambient/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"/ambient/utils/"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"/ambient\\/utils/"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"/.*?$"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"^ambient/"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"ambient$"}})
	f.VerifyImportFixModuleSpecifiers(t, "", []string{"ambient", "ambient/utils"}, &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"oops("}})
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "x",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "ambient",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "x",
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "ambient/utils",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Excludes: []string{
				"ambient/utils",
			},
		},
		UserPreferences: &lsutil.UserPreferences{AutoImportSpecifierExcludeRegexes: []string{"utils"}},
	})
}
