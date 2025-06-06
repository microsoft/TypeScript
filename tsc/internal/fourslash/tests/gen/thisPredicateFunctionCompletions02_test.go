package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestThisPredicateFunctionCompletions02(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ` interface Sundries {
     broken: boolean;
 }

 interface Supplies {
     spoiled: boolean;
 }

 interface Crate<T> {
     contents: T;
     isSundries(): this is Crate<Sundries>;
     isSupplies(): this is Crate<Supplies>;
     isPackedTight(): this is (this & {extraContents: T});
 }
 const crate: Crate<any>;
 if (crate.isPackedTight()) {
     crate./*1*/;
 }
 if (crate.isSundries()) {
     crate.contents./*2*/;
     if (crate.isPackedTight()) {
         crate./*3*/;
     }
 }
 if (crate.isSupplies()) {
     crate.contents./*4*/;
     if (crate.isPackedTight()) {
         crate./*5*/;
     }
 }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "3", "5"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"contents", "extraContents", "isPackedTight", "isSundries", "isSupplies"},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"broken"},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"spoiled"},
		},
	})
}
