package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListInObjectLiteral6(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const foo = {
    a: "a",
    b: "b"
};
function fn<T extends { [key: string]: any }>(obj: T, events: { [Key in ` + "`" + `on_${string & keyof T}` + "`" + `]?: Key }) {}

fn(foo, {
    /*1*/
})
fn({ a: "a", b: "b" }, {
    /*2*/
})`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "on_a?",
					InsertText: new("on_a"),
					FilterText: new("on_a"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "on_b?",
					InsertText: new("on_b"),
					FilterText: new("on_b"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
