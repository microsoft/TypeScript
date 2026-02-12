package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonExportsWildcard12(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /node_modules/foo/package.json
 {
   "name": "foo",
   "exports": {
     "./bar/_*/suffix": "./dist/*.js"
   }
 }
// @Filename: /node_modules/foo/dist/b.d.ts
export const x = 0;
// @Filename: /node_modules/foo/dist/dir/x.d.ts
/export const x = 0;
// @Filename: /a.mts
import {} from "foo/bar//*0*/";
import {} from "foo/bar/dir//*1*/"; // invalid
import {} from "foo/bar/[|_|]/*2*/";
import {} from "foo/bar/_dir//*3*/";`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "0", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "_b/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_b/suffix.d.ts"),
				},
				&lsproto.CompletionItem{
					Label:  "_dir",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("_dir"),
				},
			},
		},
	})
	f.VerifyCompletions(t, "1", nil)
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "_b/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_b/suffix.d.ts"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							Range:   f.Ranges()[0].LSRange,
							NewText: "_b/suffix",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "_dir",
					Kind:   new(lsproto.CompletionItemKindFolder),
					Detail: new("_dir"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							Range:   f.Ranges()[0].LSRange,
							NewText: "_dir",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "x/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("x/suffix.d.ts"),
				},
			},
		},
	})
}
