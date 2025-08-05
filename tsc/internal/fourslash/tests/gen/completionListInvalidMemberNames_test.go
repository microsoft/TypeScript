package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInvalidMemberNames(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `var x = {
    "foo ": "space in the name",
    "bar": "valid identifier name",
    "break": "valid identifier name (matches a keyword)",
    "any": "valid identifier name (matches a typescript keyword)",
    "#": "invalid identifier name",
    "$": "valid identifier name",
    "\u0062": "valid unicode identifier name (b)",
    "\u0031\u0062": "invalid unicode identifier name (1b)"
};

x[|./*a*/|];
x["[|/*b*/|]"];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "b", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "foo ",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "foo ",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "bar",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "bar",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "break",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "break",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "any",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "any",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "#",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "#",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "$",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "$",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "b",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "b",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "1b",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "1b",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo ",
					InsertText: PtrTo("[\"foo \"]"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "foo ",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
				"bar",
				"break",
				"any",
				&lsproto.CompletionItem{
					Label:      "#",
					InsertText: PtrTo("[\"#\"]"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "#",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
				"$",
				"b",
				&lsproto.CompletionItem{
					Label:      "1b",
					InsertText: PtrTo("[\"1b\"]"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "1b",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
}
