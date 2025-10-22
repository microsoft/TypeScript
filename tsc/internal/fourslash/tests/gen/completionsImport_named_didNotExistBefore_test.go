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
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @noLib: true
// @Filename: /a.ts
export function Test1() {}
export function Test2() {}
// @Filename: /b.ts
import { Test2 } from "./a";
t/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
						Detail: PtrTo("(alias) function Test2(): void\nimport Test2"),
						Kind:   PtrTo(lsproto.CompletionItemKindVariable),
					},
					&lsproto.CompletionItem{
						Label: "Test1",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "./a",
							},
						})),
						Detail:              PtrTo("function Test1(): void"),
						Kind:                PtrTo(lsproto.CompletionItemKindFunction),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
						LabelDetails: &lsproto.CompletionItemLabelDetails{
							Description: PtrTo("./a"),
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
