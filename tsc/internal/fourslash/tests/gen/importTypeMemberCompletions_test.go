package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportTypeMemberCompletions(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /ns.ts
export namespace Foo {
    export namespace Bar {
        export class Baz {}
        export interface Bat {}
        export const a: number;
        const b: string;
    }
}
// @Filename: /top.ts
export interface Bat {}
export const a: number;
// @Filename: /equals.ts
class Foo {
 public static bar: string;
 private static baz: number;
}
export = Foo;
// @Filename: /usage1.ts
type A = typeof import("./ns")./*1*/
// @Filename: /usage2.ts
type B = typeof import("./ns").Foo./*2*/
// @Filename: /usage3.ts
type C = typeof import("./ns").Foo.Bar./*3*/
// @Filename: /usage4.ts
type D = import("./ns")./*4*/
// @Filename: /usage5.ts
type E = import("./ns").Foo./*5*/
// @Filename: /usage6.ts
type F = import("./ns").Foo.Bar./*6*/
// @Filename: /usage7.ts
type G = typeof import("./top")./*7*/
// @Filename: /usage8.ts
type H = import("./top")./*8*/
// @Filename: /usage9.ts
type H = typeof import("./equals")./*9*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Foo"},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Bar"},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"a", "Baz"},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Foo"},
		},
	})
	f.VerifyCompletions(t, "5", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Bar"},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Bat", "Baz"},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"a"},
		},
	})
	f.VerifyCompletions(t, "8", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"Bat"},
		},
	})
	f.VerifyCompletions(t, "9", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"bar", "prototype"},
		},
	})
}
