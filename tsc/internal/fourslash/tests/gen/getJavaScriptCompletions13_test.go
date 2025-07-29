package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetJavaScriptCompletions13(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: file1.js
var file1Identifier = 1;
interface Foo { FooProp: number };
// @Filename: file2.js
var file2Identifier1 = 2;
var file2Identifier2 = 2;
/*1*/
file2Identifier2./*2*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"file2Identifier1",
				"file2Identifier2",
				&lsproto.CompletionItem{
					Label:    "file1Identifier",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
			Excludes: []string{
				"FooProp",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "file2Identifier1",
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
				&lsproto.CompletionItem{
					Label:    "file2Identifier2",
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
			},
			Excludes: []string{
				"file1Identifier",
				"FooProp",
			},
		},
	})
}
