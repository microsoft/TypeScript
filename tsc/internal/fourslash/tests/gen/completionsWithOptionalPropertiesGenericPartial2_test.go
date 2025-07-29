package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsWithOptionalPropertiesGenericPartial2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface Foo {
    a: boolean;
}
function partialFoo<T extends Partial<Foo>>(x: T, y: T) {return t}
partialFoo({ a: true, b: true }, { /*1*/ });`
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
					Label:      "a?",
					InsertText: PtrTo("a"),
					FilterText: PtrTo("a"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "b?",
					InsertText: PtrTo("b"),
					FilterText: PtrTo("b"),
					SortText:   PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
