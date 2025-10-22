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
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /someModule.ts
export const someModule = 0;
export default 1;
// @Filename: /index.ts
someMo/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "./someModule",
							},
						})),
						Detail:              PtrTo("(property) default: 1"),
						Kind:                PtrTo(lsproto.CompletionItemKindField),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "someModule",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "./someModule",
							},
						})),
						Detail:              PtrTo("const someModule: 0"),
						Kind:                PtrTo(lsproto.CompletionItemKindVariable),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, true),
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:   "someModule",
		Source: "./someModule",
		AutoImportData: &ls.AutoImportData{
			ExportName: "default",
			FileName:   "/someModule.ts",
		},
		Description: "Add import from \"./someModule\"",
		NewFileContent: PtrTo(`import someModule from "./someModule";

someMo`),
	})
}
