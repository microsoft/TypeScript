package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsSrcNoDistWildcard3(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "declarationDir": "types"
  }
}
// @Filename: /home/src/workspaces/project/package.json
{
  "types": "index.d.ts",
  "imports": {
    "#component-*": {
      "types@>=4.3.5": "types/components/*.d.ts"
    }
  }
}
// @Filename: /home/src/workspaces/project/nope.ts
export const nope = 0;
// @Filename: /home/src/workspaces/project/src/components/index.ts
export const index = 0;
// @Filename: /home/src/workspaces/project/src/components/blah.ts
export const blah = 0;
// @Filename: /home/src/workspaces/project/src/components/subfolder/one.ts
export const one = 0;
// @Filename: /home/src/workspaces/project/src/a.ts
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
					Label: "#component-blah",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "#component-index",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "#component-subfolder",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
			},
		},
	})
	f.Insert(t, "#component-subfolder/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "one",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
}
