package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_default_symbolName(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false
// @Filename: /node_modules/@types/range-parser/index.d.ts
declare function RangeParser(): string;
declare namespace RangeParser {
    interface Options {
        combine?: boolean;
    }
}
export = RangeParser;
// @Filename: /b.ts
R/*0*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "RangeParser",
					Kind:  PtrTo(lsproto.CompletionItemKindFunction),
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "range-parser",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					Detail:              PtrTo("namespace RangeParser\nfunction RangeParser(): string"),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("0"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "RangeParser",
		Source:      "range-parser",
		Description: "Add import from \"range-parser\"",
		NewFileContent: PtrTo(`import RangeParser = require("range-parser");

R`),
	})
}
