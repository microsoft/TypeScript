package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonExportsWildcard4(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/foo/package.json
{
  "types": "index.d.ts",
  "exports": {
    "./*": "dist/*",
    "./foo/*": "dist/*",
    "./bar/*": "dist/*",
    "./exact-match": "dist/index.d.ts"
  }
}
// @Filename: /node_modules/foo/nope.d.ts
export const nope = 0;
// @Filename: /node_modules/foo/dist/index.d.ts
export const index = 0;
// @Filename: /node_modules/foo/dist/blah.d.ts
export const blah = 0;
// @Filename: /node_modules/foo/dist/foo/onlyInFooFolder.d.ts
export const foo = 0;
// @Filename: /node_modules/foo/dist/subfolder/one.d.ts
export const one = 0;
// @Filename: /a.mts
import { } from "foo//**/";`
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
					Label: "blah.js",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "index.js",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "foo",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
				&lsproto.CompletionItem{
					Label: "subfolder",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
				&lsproto.CompletionItem{
					Label: "bar",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
				&lsproto.CompletionItem{
					Label: "exact-match",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
	f.Insert(t, "foo/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "blah.js",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "index.js",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
				&lsproto.CompletionItem{
					Label: "foo",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
				&lsproto.CompletionItem{
					Label: "subfolder",
					Kind:  PtrTo(lsproto.CompletionItemKindFolder),
				},
			},
		},
	})
	f.Insert(t, "foo/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "onlyInFooFolder.js",
					Kind:  PtrTo(lsproto.CompletionItemKindFile),
				},
			},
		},
	})
}
