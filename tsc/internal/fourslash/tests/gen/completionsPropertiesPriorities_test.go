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
	fourslash.SkipIfFailing(t)
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
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
					SortText: new(string(ls.SortTextLocationPriority)),
					Kind:     new(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:      "c?",
					InsertText: new("c"),
					FilterText: new("c"),
					SortText:   new(string(ls.SortTextOptionalMember)),
					Kind:       new(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: new(string(ls.SortTextMemberDeclaredBySpreadAssignment)),
					Kind:     new(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:      "B?",
					InsertText: new("B"),
					FilterText: new("B"),
					SortText:   new(string(ls.SortTextMemberDeclaredBySpreadAssignment)),
					Kind:       new(lsproto.CompletionItemKindField),
				},
			},
		},
	})
}
