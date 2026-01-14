package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExhaustiveCaseCompletions10(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
declare const u: "$1" | "2";
switch (u) {
    case/*1*/
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = PtrTo(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
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
					Label:      "case \"$1\": ...",
					InsertText: PtrTo("case \"$1\":\ncase \"2\":"),
					SortText:   PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
}
