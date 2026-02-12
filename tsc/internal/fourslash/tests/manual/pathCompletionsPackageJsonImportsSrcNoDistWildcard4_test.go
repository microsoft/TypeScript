package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsSrcNoDistWildcard4(t *testing.T) {
	t.Parallel()
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
  "types": "index.d.ts",
  "imports": {
    "#*": "dist/*",
    "#foo/*": "dist/*",
    "#bar/*": "dist/*",
    "#exact-match": "dist/index.d.ts"
  }
}
// @Filename: /home/src/workspaces/project/nope.ts
export const nope = 0;
// @Filename: /home/src/workspaces/project/src/index.ts
export const index = 0;
// @Filename: /home/src/workspaces/project/src/blah.ts
export const blah = 0;
// @Filename: /home/src/workspaces/project/src/foo/onlyInFooFolder.ts
export const foo = 0;
// @Filename: /home/src/workspaces/project/src/subfolder/one.ts
export const one = 0;
// @Filename: /home/src/workspaces/project/src/a.mts
import { } from "/**/";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Unsorted: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "#a.mjs",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("#a.mjs"),
				},
				&lsproto.CompletionItem{
					Label:  "#blah.js",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("#blah.js"),
				},
				&lsproto.CompletionItem{
					Label:  "#index.js",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("#index.js"),
				},
				&lsproto.CompletionItem{
					Label:  "#foo",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("#foo"),
				},
				&lsproto.CompletionItem{
					Label:  "#subfolder",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("#subfolder"),
				},
				&lsproto.CompletionItem{
					Label:  "#bar",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("#bar"),
				},
				&lsproto.CompletionItem{
					Label:  "#exact-match",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("#exact-match.d.ts"),
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
					Label:  "a.mjs",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("a.mjs"),
				},
				&lsproto.CompletionItem{
					Label:  "blah.js",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("blah.js"),
				},
				&lsproto.CompletionItem{
					Label:  "index.js",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("index.js"),
				},
				&lsproto.CompletionItem{
					Label:  "foo",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("foo"),
				},
				&lsproto.CompletionItem{
					Label:  "subfolder",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("subfolder"),
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
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("onlyInFooFolder.js"),
				},
			},
		},
	})
}
