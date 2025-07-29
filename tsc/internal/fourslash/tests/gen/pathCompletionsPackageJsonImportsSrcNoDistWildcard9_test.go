package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsSrcNoDistWildcard9(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "allowJs": true
  }
}
// @Filename: /home/src/workspaces/project/package.json
{
  "name": "foo",
  "imports": {
    "#*": "./dist/*.js"
  }
}
// @Filename: /home/src/workspaces/project/src/blah.js
export const blah = 0;
// @Filename: /home/src/workspaces/project/src/index.mts
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
