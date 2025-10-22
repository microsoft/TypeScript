package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_exportMap8(t *testing.T) {
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
    "./lol": {
      "import": "./lib/index.js",
      "require": "./lib/lol.js"
    }
  }
}
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/index.d.ts
export function fooFromIndex(): void;
// @Filename: /home/src/workspaces/project/node_modules/dependency/lib/lol.d.ts
export function fooFromLol(): void;
// @Filename: /home/src/workspaces/project/src/bar.ts
import { fooFromIndex } from "dependency";
// @Filename: /home/src/workspaces/project/src/foo.cts
fooFrom/*cts*/
// @Filename: /home/src/workspaces/project/src/foo.mts
fooFrom/*mts*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToMarker(t, "cts")
	f.VerifyCompletions(t, "cts", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
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
			Excludes: []string{
				"fooFromIndex",
			},
		},
	})
	f.GoToMarker(t, "mts")
	f.VerifyCompletions(t, "mts", &fourslash.CompletionsExpectedList{
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
							ModuleSpecifier: "dependency/lol",
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
