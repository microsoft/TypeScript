package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeCompletionStyleAuto(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: foo.tsx
declare namespace JSX {
    interface Element { }
    interface IntrinsicElements {
        foo: {
            prop_a: boolean;
            prop_b: string;
            prop_c: any;
            prop_d: { p1: string; }
            prop_e: string | undefined;
            prop_f: boolean | undefined | { p1: string; };
            prop_g: { p1: string; } | undefined;
            prop_h?: string;
            prop_i?: boolean;
            prop_j?: { p1: string; };
            prop_string_literal_union?: 'input' | 'password' | (string & {})
        }
    }
}

<foo [|prop_/**/|] />`
	f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport: new(true),
		},
	}), content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "prop_a",
				},
				&lsproto.CompletionItem{
					Label:            "prop_b",
					TextEdit:         InsertReplaceTextEdit("prop_b=\"$1\"", f.Ranges()[0].LSRange),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_c",
					TextEdit:         InsertReplaceTextEdit("prop_c={$1}", f.Ranges()[0].LSRange),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_d",
					TextEdit:         InsertReplaceTextEdit("prop_d={$1}", f.Ranges()[0].LSRange),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_e",
					TextEdit:         InsertReplaceTextEdit("prop_e=\"$1\"", f.Ranges()[0].LSRange),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label: "prop_f",
				},
				&lsproto.CompletionItem{
					Label:            "prop_g",
					TextEdit:         InsertReplaceTextEdit("prop_g={$1}", f.Ranges()[0].LSRange),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_h?",
					TextEdit:         InsertReplaceTextEdit("prop_h=\"$1\"", f.Ranges()[0].LSRange),
					FilterText:       new("prop_h"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_i?",
					TextEdit:   InsertReplaceTextEdit("prop_i", f.Ranges()[0].LSRange),
					FilterText: new("prop_i"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_j?",
					TextEdit:         InsertReplaceTextEdit("prop_j={$1}", f.Ranges()[0].LSRange),
					FilterText:       new("prop_j"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_string_literal_union?",
					TextEdit:         InsertReplaceTextEdit("prop_string_literal_union=\"$1\"", f.Ranges()[0].LSRange),
					FilterText:       new("prop_string_literal_union"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{JsxAttributeCompletionStyle: lsutil.JsxAttributeCompletionStyleAuto},
	})
}
