package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListForObjectSpread(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let swap = { a: 'yes', b: -1 };
let addAfter: { a: number, b: string, c: boolean } =
    { ...o, c: false }
let addBefore: { a: number, b: string, c: boolean } =
    { c: false, ...o }
let ignore: { a: number, b: string } =
    { b: 'ignored', ...o }
ignore./*1*/a;
let combinedNestedChangeType: { a: number, b: boolean, c: number } =
    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
combinedNestedChangeType./*2*/a;
let spreadNull: { a: number } =
    { a: 7, ...null }
let spreadUndefined: { a: number } =
    { a: 7, ...undefined }
spreadNull./*3*/a;
spreadUndefined./*4*/a;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("(property) a: number"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("(property) b: string"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("(property) a: number"),
				},
				&lsproto.CompletionItem{
					Label:  "b",
					Detail: PtrTo("(property) b: boolean"),
				},
				&lsproto.CompletionItem{
					Label:  "c",
					Detail: PtrTo("(property) c: number"),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"3", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("(property) a: number"),
				},
			},
		},
	})
}
