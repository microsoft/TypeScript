package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsPropertiesPriorities(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface I {
  B?: number;
  a: number;
  c?: string;
  d: string
}
const foo = {
  a: 1,
  B: 2
}
const i: I = {
  ...foo,
  /*a*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"a"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextLocationPriority)), Kind: ptrTo(lsproto.CompletionItemKindField), Label: "d"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextOptionalMember)), Kind: ptrTo(lsproto.CompletionItemKindField), Label: "c?", InsertText: ptrTo("c"), FilterText: ptrTo("c")}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextMemberDeclaredBySpreadAssignment)), Kind: ptrTo(lsproto.CompletionItemKindField), Label: "a"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextMemberDeclaredBySpreadAssignment)), Kind: ptrTo(lsproto.CompletionItemKindField), Label: "B?", InsertText: ptrTo("B"), FilterText: ptrTo("B")}},
		},
	})
}
