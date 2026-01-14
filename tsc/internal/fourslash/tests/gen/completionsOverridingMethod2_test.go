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
					InsertText:       PtrTo("\"\\$usd\"(a: number): number {\n    $0\n}"),
					FilterText:       PtrTo("$usd"),
					SortText:         PtrTo(string(ls.SortTextLocationPriority)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "$cad",
					InsertText:       PtrTo("\\$cad(b: number): number {\n    $0\n}"),
					FilterText:       PtrTo("$cad"),
					SortText:         PtrTo(string(ls.SortTextLocationPriority)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "cla$$y",
					InsertText:       PtrTo("cla\\$\\$y(c: number): number {\n    $0\n}"),
					FilterText:       PtrTo("cla$$y"),
					SortText:         PtrTo(string(ls.SortTextLocationPriority)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "isDollarAmountString",
					InsertText:       PtrTo("isDollarAmountString(s: string): s is `\\$\\${number}` {\n    $0\n}"),
					FilterText:       PtrTo("isDollarAmountString"),
					SortText:         PtrTo(string(ls.SortTextLocationPriority)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}
