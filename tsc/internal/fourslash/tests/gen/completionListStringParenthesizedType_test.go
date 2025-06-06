package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListStringParenthesizedType(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `type T1 = "a" | "b" | "c";
type T2<T extends T1> = {};

type T3 = T2<"[|/*1*/|]">;
type T4 = T2<("[|/*2*/|]")>;
type T5 = T2<(("[|/*3*/|]"))>;
type T6 = T2<((("[|/*4*/|]")))>;

type T7<P extends T1, K extends T1> = {};
type T8 = T7<"a", ((("[|/*5*/|]")))>;

interface Foo {
    a: number;
    b: number;
}
const a: Foo["[|/*6*/|]"];
const b: Foo[("[|/*7*/|]")];
const b: Foo[(("[|/*8*/|]"))];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}, &lsproto.CompletionItem{Label: "c"}},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}, &lsproto.CompletionItem{Label: "c"}},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}, &lsproto.CompletionItem{Label: "c"}},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}, &lsproto.CompletionItem{Label: "c"}},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}, &lsproto.CompletionItem{Label: "c"}},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
	f.VerifyCompletions(t, "8", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
}
