package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeCompletionStyleBraces(t *testing.T) {
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
					Label:            "prop_a",
					InsertText:       PtrTo("prop_a={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_b",
					InsertText:       PtrTo("prop_b={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_c",
					InsertText:       PtrTo("prop_c={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_d",
					InsertText:       PtrTo("prop_d={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_e",
					InsertText:       PtrTo("prop_e={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_f",
					InsertText:       PtrTo("prop_f={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_g",
					InsertText:       PtrTo("prop_g={$1}"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
				&lsproto.CompletionItem{
					Label:            "prop_h?",
					InsertText:       PtrTo("prop_h={$1}"),
					FilterText:       PtrTo("prop_h"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
					SortText:         PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_i?",
					InsertText:       PtrTo("prop_i={$1}"),
					FilterText:       PtrTo("prop_i"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
					SortText:         PtrTo(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:            "prop_j?",
					InsertText:       PtrTo("prop_j={$1}"),
					FilterText:       PtrTo("prop_j"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
					SortText:         PtrTo(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
