package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsUniqueSymbol_import(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /globals.d.ts
declare const Symbol: () => symbol;
// @Filename: /a.ts
const privateSym = Symbol();
export const publicSym = Symbol();
export interface I {
    [privateSym]: number;
    [publicSym]: number;
    [defaultPublicSym]: number;
    n: number;
}
export const i: I;
// @Filename: /user.ts
import { i } from "./a";
i[|./**/|];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"n",
				&lsproto.CompletionItem{
					Label:      "publicSym",
					InsertText: PtrTo("[publicSym]"),
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./a",
						},
					})),
					SortText:            PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "publicSym",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "publicSym",
		Source:      "./a",
		Description: "Update import from \"./a\"",
		NewFileContent: PtrTo(`import { i, publicSym } from "./a";
i.;`),
	})
}
