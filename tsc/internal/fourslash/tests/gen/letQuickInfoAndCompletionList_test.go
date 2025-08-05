package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestLetQuickInfoAndCompletionList(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let /*1*/a = 10;
/*2*/a = 30;
function foo() {
    let /*3*/b = 20;
    /*4*/b = /*5*/a;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("let a: number"),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("let a: number"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("let b: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("let a: number"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("let b: number"),
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "1", "let a: number", "")
	f.VerifyQuickInfoAt(t, "2", "let a: number", "")
	f.VerifyQuickInfoAt(t, "3", "let b: number", "")
	f.VerifyQuickInfoAt(t, "4", "let b: number", "")
	f.VerifyQuickInfoAt(t, "5", "let a: number", "")
}
