package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonExportsWildcard3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/foo/package.json
{
  "types": "index.d.ts",
  "exports": {
    "./component-*": {
      "types@>=4.3.5": "types/components/*.d.ts"
    }
  }
}
// @Filename: /node_modules/foo/nope.d.ts
export const nope = 0;
// @Filename: /node_modules/foo/types/components/index.d.ts
export const index = 0;
// @Filename: /node_modules/foo/types/components/blah.d.ts
export const blah = 0;
// @Filename: /node_modules/foo/types/components/subfolder/one.d.ts
export const one = 0;
// @Filename: /a.ts
import { } from "foo//**/";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "component-blah",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("component-blah.d.ts"),
				},
				&lsproto.CompletionItem{
					Label:  "component-index",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("component-index.d.ts"),
				},
				&lsproto.CompletionItem{
					Label:  "component-subfolder",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("component-subfolder"),
				},
			},
		},
	})
	f.Insert(t, "component-subfolder/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "one",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("one.d.ts"),
				},
			},
		},
	})
}
