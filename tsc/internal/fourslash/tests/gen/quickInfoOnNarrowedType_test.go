package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoOnNarrowedType(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strictNullChecks: true
function foo(strOrNum: string | number) {
    if (typeof /*1*/strOrNum === "number") {
        return /*2*/strOrNum;
    }
    else {
        return /*3*/strOrNum.length;
    }
}
function bar() {
   let s: string | undefined;
   /*4*/s;
   /*5*/s = "abc";
   /*6*/s;
}
class Foo {
    #privateProperty: string[] | null;
    constructor() {
        this.#privateProperty = null;
    }
    testMethod() {
        if (this.#privateProperty === null)
            return;
        this./*7*/#privateProperty;
    }
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) strOrNum: string | number", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) strOrNum: number", "")
	f.VerifyQuickInfoAt(t, "3", "(parameter) strOrNum: string", "")
	f.VerifyQuickInfoAt(t, "4", "let s: string | undefined", "")
	f.VerifyQuickInfoAt(t, "5", "let s: string | undefined", "")
	f.VerifyQuickInfoAt(t, "6", "let s: string", "")
	f.VerifyQuickInfoAt(t, "7", "(property) Foo.#privateProperty: string[]", "")
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "strOrNum",
					Detail: PtrTo("(parameter) strOrNum: string | number"),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "strOrNum",
					Detail: PtrTo("(parameter) strOrNum: number"),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "strOrNum",
					Detail: PtrTo("(parameter) strOrNum: string"),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"4", "5"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "s",
					Detail: PtrTo("let s: string | undefined"),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "s",
					Detail: PtrTo("let s: string"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "#privateProperty",
					Detail: PtrTo("(property) Foo.#privateProperty: string[]"),
				},
			},
		},
	})
}
