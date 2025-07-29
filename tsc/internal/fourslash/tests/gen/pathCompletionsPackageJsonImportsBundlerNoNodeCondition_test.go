package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsBundlerNoNodeCondition(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: bundler
// @Filename: /package.json
{
  "name": "foo",
  "imports": {
    "#only-for-node": {
      "node": "./something.js"
    },
    "#for-everywhere": "./other.js"
  }
}
// @Filename: /something.d.ts
export const index = 0;
// @Filename: /other.d.ts
export const index = 0;
// @Filename: /index.ts
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
					Label: "#for-everywhere",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
}
