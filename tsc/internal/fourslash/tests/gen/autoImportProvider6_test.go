package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider6(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{ "compilerOptions": { "module": "commonjs", "lib": ["es2019"] } }
// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "antd": "*", "react": "*" } }
// @Filename: /home/src/workspaces/project/node_modules/@types/react/index.d.ts
export declare function Component(): void;
// @Filename: /home/src/workspaces/project/node_modules/antd/index.d.ts
import "react";
// @Filename: /home/src/workspaces/project/index.ts
Component/**/`
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
					Label:               "Component",
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "react",
						},
					})),
					SortText: PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
