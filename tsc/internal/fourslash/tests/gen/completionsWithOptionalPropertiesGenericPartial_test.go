package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsWithOptionalPropertiesGenericPartial(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface Foo {
    a_a: boolean;
    a_b: boolean;
    a_c: boolean;
    b_a: boolean;
}
function partialFoo<T extends Partial<Foo>>(t: T) {return t}
partialFoo({ /*1*/ });`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a_a?",
					InsertText: PtrTo("a_a"),
					FilterText: PtrTo("a_a"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "a_b?",
					InsertText: PtrTo("a_b"),
					FilterText: PtrTo("a_b"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "a_c?",
					InsertText: PtrTo("a_c"),
					FilterText: PtrTo("a_c"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "b_a?",
					InsertText: PtrTo("b_a"),
					FilterText: PtrTo("b_a"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
