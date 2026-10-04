package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestJsxAttributeCompletionStyleNoSnippet(t *testing.T) {
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
					Label: "prop_b",
				},
				&lsproto.CompletionItem{
					Label: "prop_c",
				},
				&lsproto.CompletionItem{
					Label: "prop_d",
				},
				&lsproto.CompletionItem{
					Label: "prop_e",
				},
				&lsproto.CompletionItem{
					Label: "prop_f",
				},
				&lsproto.CompletionItem{
					Label: "prop_g",
				},
				&lsproto.CompletionItem{
					Label:      "prop_h?",
					TextEdit:   InsertReplaceTextEdit("prop_h", f.Ranges()[0].LSRange),
					FilterText: new("prop_h"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_i?",
					TextEdit:   InsertReplaceTextEdit("prop_i", f.Ranges()[0].LSRange),
					FilterText: new("prop_i"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_j?",
					TextEdit:   InsertReplaceTextEdit("prop_j", f.Ranges()[0].LSRange),
					FilterText: new("prop_j"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{JsxAttributeCompletionStyle: lsutil.JsxAttributeCompletionStyleAuto},
	})
}
