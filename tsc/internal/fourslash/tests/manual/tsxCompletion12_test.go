package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion12(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @noLib: true
 declare module JSX {
     interface Element { }
     interface IntrinsicElements {
     }
     interface ElementAttributesProperty { props; }
 }
 interface OptionPropBag {
     propx: number
     propString: "hell"
     optional?: boolean
 }
 declare function Opt(attributes: OptionPropBag): JSX.Element;
 let opt = <Opt /*1*/ />;
 let opt1 = <Opt [|prop|]/*2*/ />;
 let opt2 = <Opt propx={100} /*3*/ />;
 let opt3 = <Opt propx={100} optional /*4*/ />;
 let opt4 = <Opt wrong /*5*/ />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "5"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"propString",
				"propx",
				&lsproto.CompletionItem{
					Label:      "optional?",
					InsertText: PtrTo("optional"),
					FilterText: PtrTo("optional"),
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				"propString",
				"propx",
				&lsproto.CompletionItem{
					Label:      "optional?",
					FilterText: PtrTo("optional"),
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						InsertReplaceEdit: &lsproto.InsertReplaceEdit{
							NewText: "optional",
							Insert:  f.Ranges()[0].LSRange,
							Replace: f.Ranges()[0].LSRange,
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
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"propString",
				&lsproto.CompletionItem{
					Label:      "optional?",
					InsertText: PtrTo("optional"),
					FilterText: PtrTo("optional"),
					Kind:       PtrTo(lsproto.CompletionItemKindField),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				"propString",
			},
		},
	})
}
