package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsSnippetEscaping(t *testing.T) {
	t.Parallel()
	const content = `// @strict: true
interface I {
  "a\\b"(): void;
  "c$d"(): void;
  m(x: "a\\b"): void;
}
class C implements I {
  /*c*/
}
const o: I = {
  /*o*/
};
declare const s: "a\\b" | "x";
switch (s) {
  case/*s*/
}`
	preferences := &lsutil.UserPreferences{
		IncludeCompletionsWithClassMemberSnippets:         core.TSTrue,
		IncludeCompletionsWithObjectLiteralMethodSnippets: core.TSTrue,
	}
	for _, snippet := range []bool{true, false} {
		name := "plain"
		var insertTextFormat *lsproto.InsertTextFormat
		classMemberM := `m(x: "a\\b"): void {` + "\n}"
		classMember := `"c$d"(): void {` + "\n}"
		objectMethodA := `"a\\b"() {` + "\n},"
		objectMethodC := `"c$d"() {` + "\n},"
		if snippet {
			name = "snippet"
			insertTextFormat = new(lsproto.InsertTextFormatSnippet)
			classMemberM = `m(x: "a\\\\b"): void {` + "\n    $0\n}"
			classMember = `"c\$d"(): void {` + "\n    $0\n}"
			objectMethodA = `"a\\\\b"() {` + "\n    $0\n},"
			objectMethodC = `"c\$d"() {` + "\n    $0\n},"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
				CompletionItem: &lsproto.ClientCompletionItemOptions{SnippetSupport: new(snippet)},
			}), content)
			defer done()
			f.VerifyCompletions(t, "c", &fourslash.CompletionsExpectedList{
				IsIncomplete: false,
				ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
					CommitCharacters: &[]string{},
					EditRange:        Ignored,
				},
				Items: &fourslash.CompletionsExpectedItems{
					Includes: []fourslash.CompletionsExpectedItem{
						&lsproto.CompletionItem{
							Label:            "m",
							InsertText:       new(classMemberM),
							InsertTextFormat: insertTextFormat,
						},
						&lsproto.CompletionItem{
							Label:            "c$d",
							InsertText:       new(classMember),
							InsertTextFormat: insertTextFormat,
						},
					},
				},
				UserPreferences: preferences,
			})
			f.VerifyCompletions(t, "o", &fourslash.CompletionsExpectedList{
				IsIncomplete: false,
				ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
					CommitCharacters: &DefaultCommitCharacters,
					EditRange:        Ignored,
				},
				Items: &fourslash.CompletionsExpectedItems{
					Includes: []fourslash.CompletionsExpectedItem{
						&lsproto.CompletionItem{
							Label:            `"a\\b"()`,
							SortText:         new("11\x00\"a\\\\b\"\x001"),
							InsertText:       new(objectMethodA),
							InsertTextFormat: insertTextFormat,
						},
						&lsproto.CompletionItem{
							Label:            "c$d()",
							SortText:         new("11\x00c$d\x001"),
							InsertText:       new(objectMethodC),
							InsertTextFormat: insertTextFormat,
						},
					},
				},
				UserPreferences: preferences,
			})
			if snippet {
				f.VerifyCompletions(t, "s", &fourslash.CompletionsExpectedList{
					IsIncomplete: false,
					ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
						CommitCharacters: &DefaultCommitCharacters,
						EditRange:        Ignored,
					},
					Items: &fourslash.CompletionsExpectedItems{
						Includes: []fourslash.CompletionsExpectedItem{
							&lsproto.CompletionItem{
								Label:            `case "a\\b": ...`,
								InsertText:       new(`case "a\\\\b":$1` + "\n" + `case "x":$2`),
								SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
								InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
							},
						},
					},
				})
			}
		})
	}
}
