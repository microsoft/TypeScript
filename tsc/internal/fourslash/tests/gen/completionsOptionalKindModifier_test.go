package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsOptionalKindModifier(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface A { a?: number; method?(): number; };
function f(x: A) {
x./*a*/;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "a", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindField), Label: "a?", InsertText: ptrTo("a"), FilterText: ptrTo("a")}, &lsproto.CompletionItem{Kind: ptrTo(lsproto.CompletionItemKindMethod), Label: "method?", InsertText: ptrTo("method"), FilterText: ptrTo("method")}},
		},
	})
}
