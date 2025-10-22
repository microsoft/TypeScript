package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportTypeCompletions6(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: esnext
// @Filename: /foo.ts
export const foo = { };
export interface Foo { };
// @Filename: /bar.ts
 [|import type * as f/**/|]`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "/bar.ts")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "Foo",
					InsertText: PtrTo("import type { Foo } from \"./foo\";"),
					Data: PtrTo(any(&ls.CompletionItemData{
						AutoImport: &ls.AutoImportData{
							ModuleSpecifier: "./foo",
						},
					})),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "Foo",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
}
