package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion12(t *testing.T) {
	t.Parallel()
	t.Skip()
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
 let opt1 = <Opt prop/*2*/ />;
 let opt2 = <Opt propx={100} /*3*/ />;
 let opt3 = <Opt propx={100} optional /*4*/ />;
 let opt4 = <Opt wrong /*5*/ />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2", "5"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"propString", "propx", &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "optional?", InsertText: ptrTo("optional"), FilterText: ptrTo("optional")}},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"propString", &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "optional?", InsertText: ptrTo("optional"), FilterText: ptrTo("optional")}},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"propString"},
		},
	})
}
