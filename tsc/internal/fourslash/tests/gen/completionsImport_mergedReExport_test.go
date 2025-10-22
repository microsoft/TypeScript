package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_mergedReExport(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs" } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "@jest/types": "*", "ts-jest": "*" } }
// @Filename: /home/src/workspaces/project/node_modules/@jest/types/package.json
{ "name": "@jest/types" }
// @Filename: /home/src/workspaces/project/node_modules/@jest/types/index.d.ts
import type * as Config from "./Config";
export type { Config };
// @Filename: /home/src/workspaces/project/node_modules/@jest/types/Config.d.ts
export interface ConfigGlobals {
    [K: string]: unknown;
}
// @Filename: /home/src/workspaces/project/node_modules/ts-jest/index.d.ts
export {};
declare module "@jest/types" {
    namespace Config {
        interface ConfigGlobals {
            'ts-jest': any;
        }
    }
}
// @Filename: /home/src/workspaces/project/index.ts
C/**/`
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
					Label: "Config",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "@jest/types",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
	f.Insert(t, "o")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "Config",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "@jest/types",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
