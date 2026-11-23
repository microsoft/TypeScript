package fourslash_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestAutoImportQuotedModuleSpecifier(t *testing.T) {
	t.Parallel()
	for _, quote := range []struct {
		preference lsutil.QuotePreference
		specifier  string
	}{
		{lsutil.QuotePreferenceSingle, `'dep/a\'b"c'`},
		{lsutil.QuotePreferenceDouble, `"dep/a'b\"c"`},
	} {
		for _, test := range []struct {
			name        string
			extension   string
			declaration string
			usage       string
			result      string
			statement   string
			snippet     bool
		}{
			{
				name:        "named",
				extension:   "mts",
				declaration: "export class Foo {}",
				usage:       "Foo/**/;",
				result:      "import { Foo } from %s;\n\nFoo;",
				statement:   "import { Foo$1 } from %s;",
				snippet:     true,
			},
			{
				name:        "namedNoSnippet",
				extension:   "mts",
				declaration: "export class Foo {}",
				usage:       "Foo/**/;",
				result:      "import { Foo } from %s;\n\nFoo;",
				statement:   "import { Foo } from %s;",
			},
			{
				name:        "default",
				extension:   "mts",
				declaration: "export default class Foo {}",
				usage:       "Foo/**/;",
				result:      "import Foo from %s;\n\nFoo;",
				statement:   "import Foo$1 from %s;",
				snippet:     true,
			},
			{
				name:        "require",
				extension:   "cjs",
				declaration: "export class Foo {}",
				usage:       "Foo/**/;",
				result:      "const { Foo } = require(%s);\n\nFoo;",
			},
			{
				name:        "jsdoc",
				extension:   "js",
				declaration: "export interface Foo {}",
				usage:       "/** @type {Foo/**/} */\nlet value;",
				result:      "/** @type {import(%s).Foo} */\nlet value;",
			},
		} {
			t.Run(string(quote.preference)+"/"+test.name, func(t *testing.T) {
				t.Parallel()
				defer testutil.RecoverAndFail(t, "Panic on fourslash test")
				content := fmt.Sprintf(`// @Filename: /tsconfig.json
{
  "compilerOptions": {
    "module": "node20",
    "allowJs": true,
    "checkJs": true,
    "noEmit": true
  }
}
// @Filename: /node_modules/dep/package.json
{
  "name": "dep",
  "exports": { "./a'b\"c": "./index.d.ts" }
}
// @Filename: /node_modules/dep/index.d.ts
%s
// @Filename: /fix.%s
%s
// @Filename: /completion.%s
%s
// @Filename: /all.%s
%s
// @Filename: /statement.%s
[|import F/*statement*/|]`,
					test.declaration, test.extension, test.usage, test.extension,
					strings.ReplaceAll(test.usage, "/**/", "/*completion*/"), test.extension,
					strings.ReplaceAll(test.usage, "/**/", "/*all*/")+"\n"+
						strings.ReplaceAll(strings.ReplaceAll(test.usage, "/**/", ""), "value", "other"), test.extension)
				f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
					CompletionItem: &lsproto.ClientCompletionItemOptions{SnippetSupport: new(test.snippet)},
				}), content)
				defer done()
				preferences := lsutil.NewDefaultUserPreferences()
				preferences.QuotePreference = quote.preference
				expected := fmt.Sprintf(test.result, quote.specifier)

				f.GoToMarker(t, "")
				f.VerifyImportFixAtPosition(t, []string{expected}, &preferences)
				reset := f.ConfigureWithReset(t, preferences)
				defer reset()
				f.GoToMarker(t, "all")
				allExpected := expected + "\nFoo;"
				if test.name == "jsdoc" {
					allExpected = expected + "\n" + strings.ReplaceAll(expected, "value", "other")
				}
				f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
					FixID:          "fixMissingImport",
					NewFileContent: allExpected,
				})

				f.VerifyApplyCodeActionFromCompletion(t, new("completion"), &fourslash.ApplyCodeActionFromCompletionOptions{
					Name:            "Foo",
					Source:          `dep/a'b"c`,
					UserPreferences: &preferences,
					NewFileContent:  new(expected),
				})

				if test.statement != "" {
					statement := fmt.Sprintf(test.statement, quote.specifier)
					var insertTextFormat *lsproto.InsertTextFormat
					if test.snippet {
						// Snippets escape backslashes independently of string literal escaping.
						statement = strings.ReplaceAll(statement, `\`, `\\`)
						insertTextFormat = new(lsproto.InsertTextFormatSnippet)
					}
					f.VerifyCompletions(t, "statement", &fourslash.CompletionsExpectedList{
						IsIncomplete: false,
						ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
							CommitCharacters: &[]string{},
							EditRange:        Ignored,
						},
						Items: &fourslash.CompletionsExpectedItems{
							Includes: []fourslash.CompletionsExpectedItem{
								&lsproto.CompletionItem{
									Label:            "Foo",
									InsertText:       new(statement),
									InsertTextFormat: insertTextFormat,
									TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
										TextEdit: &lsproto.TextEdit{
											NewText: statement,
											Range:   f.Ranges()[0].LSRange,
										},
									},
									Data: &lsproto.CompletionItemData{
										AutoImport: &lsproto.AutoImportFix{ModuleSpecifier: `dep/a'b"c`},
									},
								},
							},
						},
					})
				}
			})
		}
	}
}
