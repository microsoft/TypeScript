package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_named_didNotExistBefore(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /a.ts
export function Test1() {}
export function Test2() {}
// @Filename: /b.ts
import { Test2 } from "./a";
t/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsPlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:  "Test2",
						Detail: new("(alias) function Test2(): void\nimport Test2"),
						Kind:   new(lsproto.CompletionItemKindVariable),
					},
					&lsproto.CompletionItem{
						Label: "Test1",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./a",
							},
						},
						Detail:              new("function Test1(): void"),
						Kind:                new(lsproto.CompletionItemKindFunction),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
						LabelDetails: &lsproto.CompletionItemLabelDetails{
							Description: new("./a"),
						},
					},
				}, true),
		},
	}).AndApplyCodeAction(t, &fourslash.CompletionsExpectedCodeAction{
		Name:        "Test1",
		Source:      "./a",
		Description: "Update import from \"./a\"",
		NewFileContent: `import { Test1, Test2 } from "./a";
t`,
	})
}
