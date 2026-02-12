package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsOverridingMethod2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: a.ts
interface DollarSign {
    "$usd"(a: number): number;
    $cad(b: number): number;
    cla$$y(c: number): number;
    isDollarAmountString(s: string): s is ` + "`" + `$${number}` + "`" + `
}
class USD implements DollarSign {
    /*a*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "$usd",
					InsertText:       new("\"\\$usd\"(a: number): number {\n    $0\n}"),
					FilterText:       new("$usd"),
					SortText:         new(string(ls.SortTextLocationPriority)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "$cad",
					InsertText:       new("\\$cad(b: number): number {\n    $0\n}"),
					FilterText:       new("$cad"),
					SortText:         new(string(ls.SortTextLocationPriority)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "cla$$y",
					InsertText:       new("cla\\$\\$y(c: number): number {\n    $0\n}"),
					FilterText:       new("cla$$y"),
					SortText:         new(string(ls.SortTextLocationPriority)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "isDollarAmountString",
					InsertText:       new("isDollarAmountString(s: string): s is `\\$\\${number}` {\n    $0\n}"),
					FilterText:       new("isDollarAmountString"),
					SortText:         new(string(ls.SortTextLocationPriority)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}
