package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsEnumsFourslash(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** Enum of colors*/
enum /*1*/Colors {
    /** Fancy name for 'blue'*/
    /*2*/Cornflower,
    /** Fancy name for 'pink'*/
    /*3*/FancyPink
}
var /*4*/x = /*5*/Colors./*6*/Cornflower;
x = Colors./*7*/FancyPink;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "enum Colors", "Enum of colors")
	f.VerifyQuickInfoAt(t, "2", "(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'")
	f.VerifyQuickInfoAt(t, "3", "(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'")
	f.VerifyQuickInfoAt(t, "4", "var x: Colors", "")
	f.VerifyQuickInfoAt(t, "5", "enum Colors", "Enum of colors")
	f.VerifyQuickInfoAt(t, "6", "(enum member) Colors.Cornflower = 0", "Fancy name for 'blue'")
	f.VerifyQuickInfoAt(t, "7", "(enum member) Colors.FancyPink = 1", "Fancy name for 'pink'")
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "Colors",
					Detail: PtrTo("enum Colors"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Enum of colors",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"6", "7"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "Cornflower",
					Detail: PtrTo("(enum member) Colors.Cornflower = 0"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Fancy name for 'blue'",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "FancyPink",
					Detail: PtrTo("(enum member) Colors.FancyPink = 1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Fancy name for 'pink'",
						},
					},
				},
			},
		},
	})
}
