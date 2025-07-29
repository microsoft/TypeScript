package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsLiterals(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `const x: 0 | "one" = /**/;
const y: 0 | "one" | 1n = /*1*/;
const y2: 0 | "one" | 1n = 'one'/*2*/;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "0",
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					Detail: PtrTo("0"),
				},
				&lsproto.CompletionItem{
					Label:  "\"one\"",
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					Detail: PtrTo("\"one\""),
				},
			},
		},
	})
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "0",
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					Detail: PtrTo("0"),
				},
				&lsproto.CompletionItem{
					Label:  "\"one\"",
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					Detail: PtrTo("\"one\""),
				},
				&lsproto.CompletionItem{
					Label:  "1n",
					Kind:   PtrTo(lsproto.CompletionItemKindConstant),
					Detail: PtrTo("1n"),
				},
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
			Excludes: []string{
				"\"one\"",
			},
		},
	})
}
