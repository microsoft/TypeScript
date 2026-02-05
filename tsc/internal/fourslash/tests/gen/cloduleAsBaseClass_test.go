package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCloduleAsBaseClass(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @strict: false
class A {
    constructor(x: number) { }
    foo() { }
    static bar() { }
}

namespace A {
    export var x = 1;
    export function baz() { }
}

class D extends A {
    constructor() {
        super(1);
    }
    foo2() { }
    static bar2() { }
}

var d: D;
d./*1*/
D./*2*/`
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
				"foo",
				"foo2",
			},
		},
	})
	f.Insert(t, "foo()")
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:    "bar",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "bar2",
						SortText: PtrTo(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "baz",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "x",
						SortText: PtrTo(string(ls.SortTextLocationPriority)),
					},
				}),
		},
	})
	f.Insert(t, "bar()")
	f.VerifyNoErrors(t)
}
