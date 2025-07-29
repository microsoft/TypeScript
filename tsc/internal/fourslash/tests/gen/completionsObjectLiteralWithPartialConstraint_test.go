package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsObjectLiteralWithPartialConstraint(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface MyOptions {
    hello?: boolean;
    world?: boolean;
}
declare function bar<T extends MyOptions>(options?: Partial<T>): void;
bar({ hello: true, /*1*/ });

interface Test {
    keyPath?: string;
    autoIncrement?: boolean;
}

function test<T extends Record<string, Test>>(opt: T) { }

test({
    a: {
        keyPath: 'x.y',
        autoIncrement: true
    },
    b: {
        /*2*/
    }
});
type Colors = {
    rgb: { r: number, g: number, b: number };
    hsl: { h: number, s: number, l: number }
};

function createColor<T extends keyof Colors>(kind: T, values: Colors[T]) { }

createColor('rgb', {
  /*3*/
});

declare function f<T extends 'a' | 'b', U extends { a?: string }, V extends { b?: string }>(x: T, y: { a: U, b: V }[T]): void;

f('a', {
  /*4*/
});

declare function f2<T extends { x?: string }>(x: T): void;
f2({
  /*5*/
});

type X = { a: { a }, b: { b } }

function f4<T extends 'a' | 'b'>(p: { kind: T } & X[T]) { }

f4({
    kind: "a",
    /*6*/
})`
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
					Label:      "world?",
					InsertText: PtrTo("world"),
					FilterText: PtrTo("world"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
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
					Label:      "autoIncrement?",
					InsertText: PtrTo("autoIncrement"),
					FilterText: PtrTo("autoIncrement"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "keyPath?",
					InsertText: PtrTo("keyPath"),
					FilterText: PtrTo("keyPath"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"b",
				"g",
				"r",
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
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a?",
					InsertText: PtrTo("a"),
					FilterText: PtrTo("a"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "x?",
					InsertText: PtrTo("x"),
					FilterText: PtrTo("x"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"a",
			},
		},
	})
}
