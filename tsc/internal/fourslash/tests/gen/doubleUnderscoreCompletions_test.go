package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDoubleUnderscoreCompletions(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: a.js
function MyObject(){
    this.__property = 1;
}
var instance = new MyObject();
instance./*1*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "__property",
					Detail: PtrTo("(property) MyObject.__property: number"),
				},
				&lsproto.CompletionItem{
					Label:    "instance",
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
				&lsproto.CompletionItem{
					Label:    "MyObject",
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
			},
		},
	})
}
