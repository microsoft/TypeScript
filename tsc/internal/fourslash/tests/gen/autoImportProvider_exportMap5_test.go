package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_exportMap5(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @types package lookup
// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext"
  }
}
// @Filename: /home/src/workspaces/project/package.json
{
  "type": "module",
  "dependencies": {
    "dependency": "^1.0.0"
  }
}
// @Filename: /home/src/workspaces/project/node_modules/dependency/package.json
{
  "type": "module",
  "name": "dependency",
  "version": "1.0.0",
  "exports": {
    ".": "./lib/index.js",
    "./lol": "./lib/lol.js"
  }
}
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.js
export function fooFromIndex() {}
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.js
export function fooFromLol() {}
// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/package.json
{
  "type": "module",
  "name": "@types/dependency",
  "version": "1.0.0",
  "exports": {
    ".": "./lib/index.d.ts",
    "./lol": "./lib/lol.d.ts"
  }
}
// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/lib/index.d.ts
export declare function fooFromIndex(): void;
// @Filename: /home/src/workspaces/project/node_modules/@types/dependency/lib/lol.d.ts
export declare function fooFromLol(): void;
// @Filename: /home/src/workspaces/project/src/foo.ts
fooFrom/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "fooFromIndex",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "dependency",
						},
					})),
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					AdditionalTextEdits: fourslash.AnyTextEdits,
				},
				&lsproto.CompletionItem{
					Label: "fooFromLol",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "dependency/lol",
						},
					})),
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					AdditionalTextEdits: fourslash.AnyTextEdits,
				},
			},
		},
	})
}
