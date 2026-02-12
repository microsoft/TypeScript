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
	fourslash.SkipIfFailing(t)
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
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
					InsertText: new("a_a"),
					FilterText: new("a_a"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "a_b?",
					InsertText: new("a_b"),
					FilterText: new("a_b"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "a_c?",
					InsertText: new("a_c"),
					FilterText: new("a_c"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "b_a?",
					InsertText: new("b_a"),
					FilterText: new("b_a"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
