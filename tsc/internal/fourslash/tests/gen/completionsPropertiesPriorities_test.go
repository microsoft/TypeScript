package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsPropertiesPriorities(t *testing.T) {
	t.Parallel()

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
	f.VerifyCompletions(t, []string{"a"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "d",
					SortText: PtrTo(string(ls.SortTextLocationPriority)),
					Kind:     PtrTo(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:      "c?",
					InsertText: PtrTo("c"),
					FilterText: PtrTo("c"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
					Kind:       PtrTo(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: PtrTo(string(ls.SortTextMemberDeclaredBySpreadAssignment)),
					Kind:     PtrTo(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:      "B?",
					InsertText: PtrTo("B"),
					FilterText: PtrTo("B"),
					SortText:   PtrTo(string(ls.SortTextMemberDeclaredBySpreadAssignment)),
					Kind:       PtrTo(lsproto.CompletionItemKindField),
				},
			},
		},
	})
}
