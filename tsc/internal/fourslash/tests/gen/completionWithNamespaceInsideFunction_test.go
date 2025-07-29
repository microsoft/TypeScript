package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionWithNamespaceInsideFunction(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `function f() {
    namespace n {
        interface I {
            x: number
        }
        /*1*/
    }
    /*2*/
}
/*3*/
function f2() {
    namespace n2 {
        class I2 {
            x: number
        }
        /*11*/
    }
    /*22*/
}
/*33*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2", "3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f",
					Detail: PtrTo("function f(): void"),
				},
			},
			Excludes: []string{
				"n",
				"I",
			},
		},
	})
	f.VerifyCompletions(t, "11", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f2",
					Detail: PtrTo("function f2(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "n2",
					Detail: PtrTo("namespace n2"),
				},
				&lsproto.CompletionItem{
					Label:  "I2",
					Detail: PtrTo("class I2"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "22", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f2",
					Detail: PtrTo("function f2(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "n2",
					Detail: PtrTo("namespace n2"),
				},
			},
			Excludes: []string{
				"I2",
			},
		},
	})
	f.VerifyCompletions(t, "33", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f2",
					Detail: PtrTo("function f2(): void"),
				},
			},
			Excludes: []string{
				"n2",
				"I2",
			},
		},
	})
}
