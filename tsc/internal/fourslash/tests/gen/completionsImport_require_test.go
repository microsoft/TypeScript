package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_require(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /a.ts
export const foo = 0;
// @Filename: /b.js
import * as s from "something";
fo/*b*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "b", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "foo",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					Detail:              PtrTo("const foo: 0"),
					Kind:                PtrTo(lsproto.CompletionItemKindVariable),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("b"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "foo",
		Source:      "./a",
		Description: "Add import from \"./a\"",
		NewFileContent: PtrTo(`import * as s from "something";
import { foo } from "./a";
fo`),
	})
}
