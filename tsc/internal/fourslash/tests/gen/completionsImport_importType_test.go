package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_importType(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.js
export const x = 0;
export class C {}
/** @typedef {number} T */
// @Filename: /b.js
export const m = 0;
/** @type {/*0*/} */
/** @type {/*1*/} */`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"0", "1"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "C",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					Detail:              PtrTo("class C"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "T",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					Detail:              PtrTo("type T = number"),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
			Excludes: []string{
				"x",
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("0"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "C",
		Source:      "./a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import { C } from "./a";

export const m = 0;
/** @type {} */
/** @type {} */`),
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "T",
		Source:      "./a",
		Description: "Change 'T' to 'import(\"./a\").T'",
		NewFileContent: PtrTo(`import { C } from "./a";

export const m = 0;
/** @type {} */
/** @type {import("./a").} */`),
	})
}
