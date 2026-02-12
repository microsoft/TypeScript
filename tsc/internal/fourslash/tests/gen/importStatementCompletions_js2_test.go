package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestImportStatementCompletions_js2(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @target: es2020
// @checkJs: true
// @module: commonjs
// @esModuleInterop: false
// @allowSyntheticDefaultImports: false
// @noEmit: true
// @Filename: /node_modules/react/index.d.ts
declare namespace React {
   export class Component {}
}
export = React;
// @Filename: /test.js
[|import R/**/|]`
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
					Label:      "React",
					InsertText: new("import * as React from \"react\";"),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{
							ModuleSpecifier: "react",
						},
					},
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "React",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
}
