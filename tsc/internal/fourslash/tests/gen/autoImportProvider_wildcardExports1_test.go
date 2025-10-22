package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_wildcardExports1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
        "./*": "./a/*.js",
        "./b/*.js": "./b/*.js",
        "./c/*": "./c/*",
        "./d/*": {
            "import": "./d/*.mjs"
        }
    }
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/a/a1.d.ts
export const a1: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/b/b1.d.ts
export const b1: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/b/b2.d.mts
export const NOT_REACHABLE: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/c/c1.d.ts
export const c1: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/c/subfolder/c2.d.mts
export const c2: number;
// @Filename: /home/src/workspaces/project/node_modules/pkg/d/d1.d.mts
export const d1: number;
// @Filename: /home/src/workspaces/project/package.json
{
    "type": "module",
    "dependencies": {
        "pkg": "1.0.0"
    }
}
// @Filename: /home/src/workspaces/project/tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext"
    }
}
// @Filename: /home/src/workspaces/project/main.ts
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
					Label: "a1",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/a1",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "b1",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/b/b1.js",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "c1",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/c/c1.js",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "c2",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/c/subfolder/c2.mjs",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
				&lsproto.CompletionItem{
					Label: "d1",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/d/d1",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
			Excludes: []string{
				"NOT_REACHABLE",
			},
		},
	})
}
