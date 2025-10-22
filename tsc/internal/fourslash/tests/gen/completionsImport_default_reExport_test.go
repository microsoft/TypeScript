package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_default_reExport(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @allowJs: true
// @Filename: /file1.js
const a = 1;
export {
    a as b
};
export default a;
// @Filename: /file2.js
import * as foo from './file1';
/**/
export default foo.b;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionGlobalsInJSPlus(
				[]fourslash.CompletionsExpectedItem{
					"foo",
					&lsproto.CompletionItem{
						Label: "a",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "./file1",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
					&lsproto.CompletionItem{
						Label: "b",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "./file1",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
}
