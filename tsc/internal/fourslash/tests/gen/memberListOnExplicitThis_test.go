package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberListOnExplicitThis(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Restricted {
   n: number;
}
class C1 implements Restricted {
   n: number;
   m: number;
   f(this: this) {this./*1*/} // test on 'this.'
   g(this: Restricted) {this./*2*/}
}
function f(this: void) {this./*3*/}
function g(this: Restricted) {this./*4*/}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f",
					Detail: ptrTo("(method) C1.f(this: this): void"),
				},
				&lsproto.CompletionItem{
					Label:  "g",
					Detail: ptrTo("(method) C1.g(this: Restricted): void"),
				},
				&lsproto.CompletionItem{
					Label:  "m",
					Detail: ptrTo("(property) C1.m: number"),
				},
				&lsproto.CompletionItem{
					Label:  "n",
					Detail: ptrTo("(property) C1.n: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"2", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "n",
					Detail: ptrTo("(property) Restricted.n: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", nil)
}
