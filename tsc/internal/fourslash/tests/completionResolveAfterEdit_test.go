package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionResolveAfterEdit(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: a.ts
interface I {
	x: number;
	y: number;
}
declare const u: I;
/*a*/

// @filename: 1.ts
/*b*/
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "a")
	completions := f.GetCompletions(t, nil /*userPreferences*/)
	if completions == nil || len(completions.Items) == 0 {
		t.Fatal("Expected completions but got none")
	}
	firstItem := completions.Items[0]

	f.GoToMarker(t, "b")
	f.Insert(t, "1")

	resolved := f.ResolveCompletionItem(t, firstItem)
	if resolved == nil {
		t.Fatal("Expected resolved completion item but got nil")
	}
}

func TestResolveImportStatementCompletion(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @filename: a.ts
export const u = 1;

// @filename: 1.ts
[|import u/*a*/|]
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "u",
					InsertText: new(`import { u } from "./a";`),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{ModuleSpecifier: "./a"},
					},
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: `import { u } from "./a";`,
							Range:   f.Ranges()[0].LSRange,
						},
					},
					AdditionalTextEdits: fourslash.NoTextEdits,
				},
			},
		},
	})
}
