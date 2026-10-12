package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

// verifyImportStatementFilterText checks the completions offered at `/**/` in the import statement `typed`. The edit
// range of an import statement completion covers the whole statement typed so far, and VS Code matches that text
// against the filter text, so the filter text must be the inserted statement rather than the bare export name.
func verifyImportStatementFilterText(t *testing.T, typed string) {
	t.Helper()
	content := "// @Filename: /mod.ts\nexport const foo = 0;\n// @Filename: /index.ts\n[|" + typed + "|]"
	f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport: new(true),
		},
	}), content)
	defer done()

	const text = `import { foo$1 } from "./mod";`
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "foo",
					InsertText: new(text),
					FilterText: new(text),
					Data: &lsproto.CompletionItemData{
						AutoImport: &lsproto.AutoImportFix{ModuleSpecifier: "./mod"},
					},
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{NewText: text, Range: f.Ranges()[0].LSRange},
					},
				},
			},
		},
	})
}

func TestImportStatementCompletions_bareBrace(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	verifyImportStatementFilterText(t, "import {/**/")
}

func TestImportStatementCompletions_bracePrefix(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	verifyImportStatementFilterText(t, "import { fo/**/")
}
