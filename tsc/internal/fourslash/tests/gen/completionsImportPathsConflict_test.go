package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImportPathsConflict(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "paths": {
          "@reduxjs/toolkit": ["src/index.ts"],
          "@internal/*": ["src/*"]
        }
    }
}
// @Filename: /src/index.ts
export { configureStore } from "./configureStore";
// @Filename: /src/configureStore.ts
export function configureStore() {}
// @Filename: /src/tests/createAsyncThunk.typetest.ts
import {} from "@reduxjs/toolkit";
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "configureStore",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "@reduxjs/toolkit",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:   "configureStore",
		Source: "@reduxjs/toolkit",
		AutoImportData: &ls.AutoImportData{
			ExportName:      "configureStore",
			FileName:        "/src/configureStore.ts",
			ModuleSpecifier: "@reduxjs/toolkit",
		},
		Description: "Update import from \"@reduxjs/toolkit\"",
		NewFileContent: PtrTo(`import { configureStore } from "@reduxjs/toolkit";
`),
	})
}
