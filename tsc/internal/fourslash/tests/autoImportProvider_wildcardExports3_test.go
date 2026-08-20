package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportProvider_wildcardExports3(t *testing.T) {
	t.Parallel()
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
    "jsx": "preserve",
    "lib": ["es5"]
  },
 "include": ["app"]
}
// @Filename: /home/src/workspaces/project/apps/web/app/index.tsx
(<Card/**/ />);
// @link: /home/src/workspaces/project/packages/ui -> /home/src/workspaces/project/apps/web/node_modules/@repo/ui`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
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
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "@repo/ui/Card",
						},
					},
					AdditionalTextEdits: fourslash.AnyTextEdits,
					SortText:            new(string(ls.SortTextAutoImportSuggestions)),
				},
			},
		},
	})
}
