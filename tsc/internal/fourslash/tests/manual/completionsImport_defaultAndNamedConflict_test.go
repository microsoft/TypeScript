package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_defaultAndNamedConflict(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /someModule.ts
export const someModule = 0;
export default 1;
// @Filename: /index.ts
someMo/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label: "someModule",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./someModule",
							},
						},
						Detail:              new("const someModule: 0"),
						Kind:                new(lsproto.CompletionItemKindVariable),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "someModule",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./someModule",
							},
						},
						Detail:              new("(property) default: 1"),
						Kind:                new(lsproto.CompletionItemKindField),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
					},
				},
				true,
			),
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:          "someModule",
		Source:        "./someModule",
		AutoImportFix: &lsproto.AutoImportFix{},
		Description:   "Add import from \"./someModule\"",
		NewFileContent: new(`import { someModule } from "./someModule";

someMo`),
	})
}
