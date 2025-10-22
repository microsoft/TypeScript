package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_wildcardExports2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "1.0.0",
    "exports": {
        "./core/*": {
            "types": "./lib/core/*.d.ts",
            "default": "./lib/core/*.js"
        }
    }
}
// @Filename: /home/src/workspaces/project/node_modules/pkg/lib/core/test.d.ts
export function test(): void;
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
					Label: "test",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "pkg/core/test",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
