package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_reExportDefault2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @checkJs: true
// @Filename: /node_modules/example/package.json
{ "name": "example", "version": "1.0.0", "main": "dist/index.js" }
// @Filename: /node_modules/example/dist/nested/module.d.ts
declare const defaultExport: () => void;
declare const namedExport: () => void;

export default defaultExport;
export { namedExport };
// @Filename: /node_modules/example/dist/index.d.ts
export { default, namedExport } from "./nested/module";
// @Filename: /index.mjs
import { namedExport } from "example";
defaultExp/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsInJSPlus(
				[]fourslash.CompletionsExpectedItem{
					"namedExport",
					&lsproto.CompletionItem{
						Label: "defaultExport",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "example",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
}
