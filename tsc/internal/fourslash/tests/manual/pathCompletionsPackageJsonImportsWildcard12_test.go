package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestPathCompletionsPackageJsonImportsWildcard12(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: node18
// @Filename: /package.json
 {
   "name": "repo",
   "imports": {
     "#foo/_*/suffix": "./src/*.ts"
   }
 }
// @Filename: /src/b.ts
export const x = 0;
// @Filename: /src/dir/x.ts
/export const x = 0;
// @Filename: /src/a.ts
import {} from "#foo//*0*/";
import {} from "#foo/dir//*1*/"; // invalid
import {} from "#foo/[|_|]/*2*/";
import {} from "#foo/_dir//*3*/";`
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
					Label:  "_a/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_a/suffix.ts"),
				},
				&lsproto.CompletionItem{
					Label:  "_b/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_b/suffix.ts"),
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
					Label:  "_a/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_a/suffix.ts"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							Range:   f.Ranges()[0].LSRange,
							NewText: "_a/suffix",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "_b/suffix",
					Kind:   new(lsproto.CompletionItemKindFile),
					Detail: new("_b/suffix.ts"),
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
					Detail: new("x/suffix.ts"),
				},
			},
		},
	})
}
