package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_namespaceSameNameAsIntrinsic(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/fp-ts/package.json
{ "name": "fp-ts", "version": "0.10.4" }
// @Filename: /home/src/workspaces/project/node_modules/fp-ts/index.d.ts
export * as string from "./lib/string";
// @Filename: /home/src/workspaces/project/node_modules/fp-ts/lib/string.d.ts
export declare const fromString: (s: string) => string;
export type SafeString = string;
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "fp-ts": "^0.10.4" } }
// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs" } }
// @Filename: /home/src/workspaces/project/index.ts
type A = { name: string/**/ }`
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
					Label:    "string",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
				&lsproto.CompletionItem{
					Label:    "string",
					SortText: PtrTo(string(ls.SortTextAutoImportSuggestions)),
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "fp-ts",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
				},
			},
		},
	})
}
