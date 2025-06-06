package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionInFunctionLikeBody_includesPrimitiveTypes(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `class Foo<T> { }
class Bar { }
function includesTypes() {
    new Foo</*1*/
}
function excludesTypes1() {
    new Bar</*2*/
}
function excludesTypes2() {
    1</*3*/
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)), Label: "string"}, &lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)), Label: "String"}},
		},
	})
	f.VerifyCompletions(t, []string{"2", "3"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Excludes: []string{"string"},
		},
	})
}
