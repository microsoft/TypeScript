package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsOverridingMethod9(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
// @Filename: a.ts
// @newline: LF
interface IFoo {
    a?: number;
    b?(x: number): void;
}
class Foo implements IFoo {
    /**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
					Label:      "a",
					InsertText: new("a?: number;"),
					FilterText: new("a"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
				&lsproto.CompletionItem{
					Label:      "b",
					InsertText: new("b(x: number): void {\n}"),
					FilterText: new("b"),
					SortText:   new(string(ls.SortTextLocationPriority)),
				},
			},
		},
	})
}
