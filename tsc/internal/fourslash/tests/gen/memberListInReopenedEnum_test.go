package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberListInReopenedEnum(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `namespace M {
    enum E {
        A, B
    }
    enum E {
        C = 0, D
    }
    var x = E./*1*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "A",
					Detail: PtrTo("(enum member) E.A = 0"),
				},
				&lsproto.CompletionItem{
					Label:  "B",
					Detail: PtrTo("(enum member) E.B = 1"),
				},
				&lsproto.CompletionItem{
					Label:  "C",
					Detail: PtrTo("(enum member) E.C = 0"),
				},
				&lsproto.CompletionItem{
					Label:  "D",
					Detail: PtrTo("(enum member) E.D = 1"),
				},
			},
		},
	})
}
