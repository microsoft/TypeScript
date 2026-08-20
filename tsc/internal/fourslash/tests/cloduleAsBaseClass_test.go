package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCloduleAsBaseClass(t *testing.T) {
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
						SortText: new(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "bar2",
						SortText: new(string(ls.SortTextLocalDeclarationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "baz",
						SortText: new(string(ls.SortTextLocationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "prototype",
						SortText: new(string(ls.SortTextLocationPriority)),
					},
					&lsproto.CompletionItem{
						Label:    "x",
						SortText: new(string(ls.SortTextLocationPriority)),
					},
				},
			),
		},
	})
	f.Insert(t, "bar()")
	f.VerifyNoErrors(t)
}
