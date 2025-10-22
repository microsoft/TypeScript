package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportSuggestionsCache_invalidPackageJson(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/jsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
  },
}
// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
declare module 'fs' {
  export function readFile(): void;
}
declare module 'util' {
  export function promisify(): void;
}
// @Filename: /home/src/workspaces/project/package.json
{ "mod" }
// @Filename: /home/src/workspaces/project/a.js

readF/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "readFile",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "fs",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
