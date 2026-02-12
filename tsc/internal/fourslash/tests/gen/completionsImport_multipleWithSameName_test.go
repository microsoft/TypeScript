package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_multipleWithSameName(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @noLib: true
// @Filename: /global.d.ts
declare var foo: number;
// @Filename: /a.ts
export const foo = 0;
// @Filename: /b.ts
export const foo = 1;
// @Filename: /c.ts
fo/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
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
						Label:    "foo",
						Detail:   new("var foo: number"),
						Kind:     new(lsproto.CompletionItemKindVariable),
						SortText: new(string(ls.SortTextGlobalsOrKeywords)),
					},
					&lsproto.CompletionItem{
						Label: "foo",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./a",
							},
						},
						Detail:              new("const foo: 0"),
						Kind:                new(lsproto.CompletionItemKindVariable),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "foo",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./b",
							},
						},
						Detail:              new("const foo: 1"),
						Kind:                new(lsproto.CompletionItemKindVariable),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
					},
				}, true),
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, new(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "foo",
		Source:      "./b",
		Description: "Add import from \"./b\"",
		NewFileContent: new(`import { foo } from "./b";

fo`),
	})
}
