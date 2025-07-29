package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsSrcNoDistWildcard6(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist"
  }
}
// @Filename: /home/src/workspaces/project/package.json
{
  "name": "foo",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "imports": {
    "#*": "./dist/*?.d.ts"
  }
}
// @Filename: /home/src/workspaces/project/src/index.ts
export const index = 0;
// @Filename: /home/src/workspaces/project/src/blah?.ts
export const blah = 0;
// @Filename: /home/src/workspaces/project/src/m.mts
import { } from "/**/";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "#blah",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
}
