package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsImport_preferUpdatingExistingImport(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @module: commonjs
// @Filename: /deep/module/why/you/want/this/path.ts
export const x = 0;
export const y = 1;
// @Filename: /nice/reexport.ts
import { x, y } from "../deep/module/why/you/want/this/path";
export { x, y };
// @Filename: /index.ts
import { x } from "./deep/module/why/you/want/this/path";

y/**/`
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
					"x",
					&lsproto.CompletionItem{
						Label: "y",
						Data: &lsproto.CompletionItemData{
							AutoImport: &lsproto.AutoImportFix{
								ModuleSpecifier: "./deep/module/why/you/want/this/path",
							},
						},
						SortText:            new(string(ls.SortTextAutoImportSuggestions)),
						AdditionalTextEdits: fourslash.AnyTextEdits,
					},
				}, false,
			),
		},
	})
}
