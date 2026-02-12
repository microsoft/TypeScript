package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeCompletionStyleAuto(t *testing.T) {
	fourslash.SkipIfFailing(t)
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
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
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
					InsertText:       new("prop_b=\"$1\""),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_c",
					InsertText:       new("prop_c={$1}"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_d",
					InsertText:       new("prop_d={$1}"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_e",
					InsertText:       new("prop_e=\"$1\""),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label: "prop_f",
				},
				&lsproto.CompletionItem{
					Label:            "prop_g",
					InsertText:       new("prop_g={$1}"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_h?",
					InsertText:       new("prop_h=\"$1\""),
					FilterText:       new("prop_h"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_i?",
					InsertText: new("prop_i"),
					FilterText: new("prop_i"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_j?",
					InsertText:       new("prop_j={$1}"),
					FilterText:       new("prop_j"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_string_literal_union?",
					InsertText:       new("prop_string_literal_union=\"$1\""),
					FilterText:       new("prop_string_literal_union"),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
					SortText:         new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
