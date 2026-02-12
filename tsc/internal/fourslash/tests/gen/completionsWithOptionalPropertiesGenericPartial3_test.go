package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsWithOptionalPropertiesGenericPartial3(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
interface Foo {
  a: boolean;
}
function partialFoo<T extends Partial<Foo>>(x: T, y: T extends { b?: boolean } ? T & { c: true } : T) {
  return x;
}

partialFoo({ a: true, b: true }, { /*1*/ });`
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
					Label:      "a?",
					InsertText: new("a"),
					FilterText: new("a"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "b?",
					InsertText: new("b"),
					FilterText: new("b"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label: "c",
				},
			},
		},
	})
}
