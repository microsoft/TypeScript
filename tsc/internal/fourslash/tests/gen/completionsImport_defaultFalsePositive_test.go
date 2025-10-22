package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_defaultFalsePositive(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/foo/index.ts
export default function f(): void;
// @Filename: /node_modules/bar/concat.d.ts
export const concat = 0;
// @Filename: /a.ts
export {};
conca/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/a.ts")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "concat",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "bar/concat",
						},
					})),
					Detail:              PtrTo("const concat: 0"),
					Kind:                PtrTo(lsproto.CompletionItemKindVariable),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "concat",
		Source:      "bar/concat",
		Description: "Add import from \"bar/concat\"",
		NewFileContent: PtrTo(`import { concat } from "bar/concat";

export {};
conca`),
	})
}
