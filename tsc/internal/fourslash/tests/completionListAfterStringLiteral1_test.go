package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListAfterStringLiteral1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
"a"./**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
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
					SortText: new(string(ls.DeprecateSortText(ls.SortTextLocationPriority))),
					Tags:     &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated},
				},
				"valueOf",
			},
		},
	})
}
