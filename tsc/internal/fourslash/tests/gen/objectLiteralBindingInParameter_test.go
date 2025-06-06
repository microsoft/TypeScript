package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestObjectLiteralBindingInParameter(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I { x1: number; x2: string }
function f(cb: (ev: I) => any) { }
f(({/*1*/}) => 0);
[<I>null].reduce(({/*2*/}, b) => b);
interface Foo {
    m(x: { x1: number, x2: number }): void;
    prop: I;
}
let x: Foo = {
    m({ /*3*/ }) {
    },
    get prop(): I { return undefined; },
    set prop({ /*4*/ }) {
    }
};`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, f.Markers(), &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"x1", "x2"},
		},
	})
}
