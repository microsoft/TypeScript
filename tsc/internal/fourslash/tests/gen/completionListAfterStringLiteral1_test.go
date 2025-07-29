package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionListAfterStringLiteral1(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `"a"./**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				"toString",
				"charAt",
				"charCodeAt",
				"concat",
				"indexOf",
				"lastIndexOf",
				"localeCompare",
				"match",
				"replace",
				"search",
				"slice",
				"split",
				"substring",
				"toLowerCase",
				"toLocaleLowerCase",
				"toUpperCase",
				"toLocaleUpperCase",
				"trim",
				"length",
				&lsproto.CompletionItem{
					Label:    "substr",
					SortText: PtrTo(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
				},
				"valueOf",
			},
		},
	})
}
