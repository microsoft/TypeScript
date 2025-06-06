package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestBasicInterfaceMembers(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `export {};
interface Point {
	x: number;
	y: number;
}
declare const p: Point;
p./*a*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "a", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{
				&lsproto.CompletionItem{
					Label:      "x",
					Kind:       ptrTo(lsproto.CompletionItemKindField),
					SortText:   ptrTo(string(ls.SortTextLocationPriority)),
					FilterText: ptrTo(".x"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						InsertReplaceEdit: &lsproto.InsertReplaceEdit{
							NewText: "x",
							Insert: lsproto.Range{
								Start: lsproto.Position{Line: 6, Character: 2},
								End:   lsproto.Position{Line: 6, Character: 2},
							},
							Replace: lsproto.Range{
								Start: lsproto.Position{Line: 6, Character: 2},
								End:   lsproto.Position{Line: 6, Character: 2},
							},
						},
					},
				},
				"y",
			},
		},
	})
}
