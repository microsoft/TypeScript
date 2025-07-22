package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsOptionalKindModifier(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { a?: number; method?(): number; };
function f(x: A) {
x./*a*/;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "a?",
					InsertText: ptrTo("a"),
					FilterText: ptrTo("a"),
					Kind:       ptrTo(lsproto.CompletionItemKindField),
				},
				&lsproto.CompletionItem{
					Label:      "method?",
					InsertText: ptrTo("method"),
					FilterText: ptrTo("method"),
					Kind:       ptrTo(lsproto.CompletionItemKindMethod),
				},
			},
		},
	})
}
