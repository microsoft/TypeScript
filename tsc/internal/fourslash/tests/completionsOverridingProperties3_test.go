package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsOverridingProperties3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface I {
    prop: string;
}
class C implements I {
    public pr/**/: string | number;
}`
	f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport: new(true),
		},
	}), content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "prop",
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
}
