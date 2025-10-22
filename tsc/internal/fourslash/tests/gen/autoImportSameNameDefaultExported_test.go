package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportSameNameDefaultExported(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @Filename: /node_modules/antd/index.d.ts
declare function Table(): void;
export default Table;
// @Filename: /node_modules/rc-table/index.d.ts
declare function Table(): void;
export default Table;
// @Filename: /index.ts
Table/**/`
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
						Label: "Table",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "antd",
							},
						})),
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
						AdditionalTextEdits: fourslash.AnyTextEdits,
					},
					&lsproto.CompletionItem{
						Label: "Table",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "rc-table",
							},
						})),
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
						AdditionalTextEdits: fourslash.AnyTextEdits,
					},
				}, false),
		},
	})
}
