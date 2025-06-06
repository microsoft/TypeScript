package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxCompletion7(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
 declare module JSX {
     interface Element { }
     interface IntrinsicElements {
         div: { ONE: string; TWO: number; }
     }
 }
 let y = { ONE: '' };
 var x = <div {...y} /**/ />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextLocationPriority)), Label: "TWO"}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), SortText: ptrTo(string(ls.SortTextMemberDeclaredBySpreadAssignment)), Label: "ONE"}},
		},
	})
}
