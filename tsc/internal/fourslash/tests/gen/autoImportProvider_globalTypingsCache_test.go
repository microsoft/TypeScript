package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_globalTypingsCache(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/package.json
 { "name": "@types/react-router-dom", "version": "16.8.4", "types": "index.d.ts" }
// @Filename: /home/src/Library/Caches/typescript/node_modules/@types/react-router-dom/index.d.ts
 export class BrowserRouterFromDts {}
// @Filename: /home/src/workspaces/project/package.json
 { "dependencies": { "react-router-dom": "*" } }
// @Filename: /home/src/workspaces/project/tsconfig.json
 { "compilerOptions": { "module": "commonjs", "allowJs": true, "checkJs": true, "maxNodeModuleJsDepth": 2 }, "typeAcquisition": { "enable": true } }
// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/package.json
 { "name": "react-router-dom", "version": "16.8.4", "main": "index.js" }
// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/index.js
 import "./BrowserRouter";
 export {};
// @Filename: /home/src/workspaces/project/node_modules/react-router-dom/BrowserRouter.js
 export const BrowserRouterFromJs = () => null;
// @Filename: /home/src/workspaces/project/index.js
BrowserRouter/**/`
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
					&lsproto.CompletionItem{
						Label: "BrowserRouterFromDts",
						Data: PtrTo(any(&ls.CompletionItemData{
							AutoImport: &ls.AutoImportData{
								ModuleSpecifier: "react-router-dom",
							},
						})),
						AdditionalTextEdits: fourslash.AnyTextEdits,
						SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
					},
				}, false),
		},
	})
}
