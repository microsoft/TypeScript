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
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
					InsertText: PtrTo("on_a"),
					FilterText: PtrTo("on_a"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "on_b?",
					InsertText: PtrTo("on_b"),
					FilterText: PtrTo("on_b"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
