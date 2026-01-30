package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsWildcard4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /package.json
{
  "types": "index.d.ts",
  "imports": {
    "#*": "dist/*",
    "#foo/*": "dist/*",
    "#bar/*": "dist/*",
    "#exact-match": "dist/index.d.ts"
  }
}
// @Filename: /nope.d.ts
export const nope = 0;
// @Filename: /dist/index.d.ts
export const index = 0;
// @Filename: /dist/blah.d.ts
export const blah = 0;
// @Filename: /dist/foo/onlyInFooFolder.d.ts
export const foo = 0;
// @Filename: /dist/subfolder/one.d.ts
export const one = 0;
// @Filename: /a.mts
import { } from "/**/";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "#blah.js",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("#blah.js"),
				},
				&lsproto.CompletionItem{
					Label:  "#index.js",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("#index.js"),
				},
				&lsproto.CompletionItem{
					Label:  "#foo",
					Kind:   PtrTo(lsproto.CompletionItemKindFolder),
					Detail: PtrTo("#foo"),
				},
				&lsproto.CompletionItem{
					Label:  "#subfolder",
					Kind:   PtrTo(lsproto.CompletionItemKindFolder),
					Detail: PtrTo("#subfolder"),
				},
				&lsproto.CompletionItem{
					Label:  "#bar",
					Kind:   PtrTo(lsproto.CompletionItemKindFolder),
					Detail: PtrTo("#bar"),
				},
				&lsproto.CompletionItem{
					Label:  "#exact-match",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("#exact-match.d.ts"),
				},
			},
		},
	})
	f.Insert(t, "#foo/")
	f.VerifyCompletions(t, nil, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "blah.js",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("blah.js"),
				},
				&lsproto.CompletionItem{
					Label:  "index.js",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("index.js"),
				},
				&lsproto.CompletionItem{
					Label:  "foo",
					Kind:   PtrTo(lsproto.CompletionItemKindFolder),
					Detail: PtrTo("foo"),
				},
				&lsproto.CompletionItem{
					Label:  "subfolder",
					Kind:   PtrTo(lsproto.CompletionItemKindFolder),
					Detail: PtrTo("subfolder"),
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
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "onlyInFooFolder.js",
					Kind:   PtrTo(lsproto.CompletionItemKindFile),
					Detail: PtrTo("onlyInFooFolder.js"),
				},
			},
		},
	})
}
