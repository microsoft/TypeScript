package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionFilterText3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
declare const foo1: { b: number; "a bc": string; };
if (true) {
    foo1[|.|]/*1*/
} 
else {
    foo1[|.a|]/*2*/
}

declare const foo2: { b: number; "a bc": string; } | undefined;
if (true) {
    foo2[|.|]/*3*/
} else if (false) {
    foo2[|.a|]/*4*/
} else {
    foo2[|?.|]/*5*/
}
`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a bc",
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextLocationPriority)),
					InsertText: PtrTo("[\"a bc\"]"),
					FilterText: PtrTo(".a bc"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "[\"a bc\"]",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a bc",
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextLocationPriority)),
					InsertText: PtrTo("[\"a bc\"]"),
					FilterText: PtrTo(".a bc"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "[\"a bc\"]",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a bc",
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextLocationPriority)),
					InsertText: PtrTo("?.[\"a bc\"]"),
					FilterText: PtrTo(".a bc"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "?.[\"a bc\"]",
							Range:   f.Ranges()[2].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a bc",
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextLocationPriority)),
					InsertText: PtrTo("?.[\"a bc\"]"),
					FilterText: PtrTo(".a bc"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "?.[\"a bc\"]",
							Range:   f.Ranges()[3].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a bc",
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextLocationPriority)),
					InsertText: PtrTo("?.[\"a bc\"]"),
					FilterText: PtrTo("?.a bc"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "?.[\"a bc\"]",
							Range:   f.Ranges()[4].LSRange,
						},
					},
				},
			},
		},
	})
}
