package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion13(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
 declare module JSX {
     interface Element { }
     interface IntrinsicElements {
     }
     interface ElementAttributesProperty { props; }
 }
 interface ClickableProps {
     children?: string;
     className?: string;
 }
 interface ButtonProps extends ClickableProps {
     onClick(event?: React.MouseEvent<HTMLButtonElement>): void;
 }
 interface LinkProps extends ClickableProps {
     goTo: string;
 }
 declare function MainButton(buttonProps: ButtonProps): JSX.Element;
 declare function MainButton(linkProps: LinkProps): JSX.Element;
 declare function MainButton(props: ButtonProps | LinkProps): JSX.Element;
 let opt = <MainButton /*1*/ />;
 let opt = <MainButton children="chidlren" /*2*/ />;
 let opt = <MainButton onClick={()=>{}} /*3*/ />;
 let opt = <MainButton onClick={()=>{}} ignore-prop /*4*/ />;
 let opt = <MainButton goTo="goTo" /*5*/ />;
 let opt = <MainButton wrong /*6*/ />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "6"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"goTo", "onClick", &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "children?", InsertText: ptrTo("children"), FilterText: ptrTo("children")}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "className?", InsertText: ptrTo("className"), FilterText: ptrTo("className")}},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"goTo", "onClick", &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "className?", InsertText: ptrTo("className"), FilterText: ptrTo("className")}},
		},
	})
	f.VerifyCompletions(t, []string{"3", "4", "5"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "children?", InsertText: ptrTo("children"), FilterText: ptrTo("children")}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextOptionalMember)), Label: "className?", InsertText: ptrTo("className"), FilterText: ptrTo("className")}},
		},
	})
}
