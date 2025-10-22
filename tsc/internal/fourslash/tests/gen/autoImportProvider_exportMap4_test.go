package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_exportMap4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
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
    "types": "./lib/index.d.ts",
    "require": "./lib/lol.js"
  }
}
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
export function fooFromIndex(): void;
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
export function fooFromLol(): void;
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
			},
			Excludes: []string{
				"fooFromLol",
			},
		},
	})
}
