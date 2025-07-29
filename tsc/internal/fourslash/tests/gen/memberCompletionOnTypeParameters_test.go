package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestMemberCompletionOnTypeParameters(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo {
    x: number;
    y: string;
}

function foo<S, T extends IFoo, U extends Object, V extends IFoo>() {
    var s:S, t: T, u: U, v: V;
    s./*S*/;    // no constraint, no completion
    t./*T*/;    // IFoo
    u./*U*/;    // IFoo
    v./*V*/;    // IFoo
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "S", nil)
	f.VerifyCompletions(t, []string{"T", "V"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(property) IFoo.x: number"),
				},
				&lsproto.CompletionItem{
					Label:  "y",
					Detail: PtrTo("(property) IFoo.y: string"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "U", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"constructor",
				"toString",
				"toLocaleString",
				"valueOf",
				"hasOwnProperty",
				"isPrototypeOf",
				"propertyIsEnumerable",
			},
		},
	})
}
