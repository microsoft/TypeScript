package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportReExportFromAmbientModule(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
declare module "fs" {
  export function accessSync(path: string): void;
}
// @Filename: /home/src/workspaces/project/node_modules/@types/fs-extra/index.d.ts
export * from "fs";
// @Filename: /home/src/workspaces/project/index.ts
access/**/`
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
					Label: "accessSync",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "fs",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "accessSync",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "fs-extra",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo(""), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:        "accessSync",
		Source:      "fs-extra",
		Description: "Add import from \"fs-extra\"",
		NewFileContent: PtrTo(`import { accessSync } from "fs-extra";

access`),
		AutoImportData: &ls.AutoImportData{
			ExportName:      "accessSync",
			FileName:        "/home/src/workspaces/project/node_modules/@types/fs-extra/index.d.ts",
			ModuleSpecifier: "fs-extra",
		},
	})
}
