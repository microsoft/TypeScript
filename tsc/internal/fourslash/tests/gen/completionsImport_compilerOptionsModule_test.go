package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_compilerOptionsModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @module: commonjs
// @Filename: /node_modules/a/index.d.ts
export const foo = 0;
// @Filename: /b.js
const a = require("./a");
fo/*b*/
// @Filename: /c.js
const x = 0;/*c*/
// @Filename: /c1.js
// @ts-check
const x = 0;/*ccheck*/
// @Filename: /c2.ts
const x = 0;/*cts*/
// @Filename: /d.js
const a = import("./a"); // Does not make this an external module
fo/*d*/
// @Filename: /d1.js
// @ts-check
const a = import("./a"); // Does not make this an external module
fo/*dcheck*/
// @Filename: /d2.ts
const a = import("./a"); // Does not make this an external module
fo/*dts*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"b", "c", "ccheck", "cts", "d", "dcheck", "dts"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "foo",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "a",
						},
					})),
					Detail:              PtrTo("const foo: 0"),
					Kind:                PtrTo(lsproto.CompletionItemKindVariable),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
