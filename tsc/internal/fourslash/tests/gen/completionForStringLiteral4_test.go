package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionForStringLiteral4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: in.js
/** I am documentation
 * @param {'literal'} p1
 * @param {"literal"} p2
 * @param {'other1' | 'other2'} p3
 * @param {'literal' | number} p4
 * @param {12 | true} p5
 */
function f(p1, p2, p3, p4, p5) {
    return p1 + p2 + p3 + p4 + p5 + '.';
}
f/*1*/('literal', 'literal', "[|o/*2*/ther1|]", 12);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "1")
	f.VerifyQuickInfoExists(t)
	f.VerifyQuickInfoIs(t, "function f(p1: \"literal\", p2: \"literal\", p3: \"other1\" | \"other2\", p4: \"literal\" | number, p5: 12 | true): string", "I am documentation")
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "other1",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "other1",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "other2",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "other2",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
}
