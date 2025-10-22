package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider_wildcardExports3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/packages/ui/package.json
{
  "name": "@repo/ui",
  "version": "1.0.0",
  "exports": {
    "./*": "./src/*.tsx"
  }
}
// @Filename: /home/src/workspaces/project/packages/ui/src/Card.tsx
export const Card = () => null;
// @Filename: /home/src/workspaces/project/apps/web/package.json
{
  "name": "web",
  "version": "1.0.0",
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
// @Filename: /home/src/workspaces/project/apps/web/tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "jsx": "preserve"
  },
 "include": ["app"]
}
// @Filename: /home/src/workspaces/project/apps/web/app/index.tsx
(<Card/**/ />);
// @link: /home/src/workspaces/project/packages/ui -> /home/src/workspaces/project/apps/web/node_modules/@repo/ui`
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
					Label: "Card",
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "@repo/ui/Card",
						},
					})),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            PtrTo(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
