package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsxAttributeCompletionStyleNone(t *testing.T) {
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
					InsertText: new("prop_h"),
					FilterText: new("prop_h"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_i?",
					InsertText: new("prop_i"),
					FilterText: new("prop_i"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
				&lsproto.CompletionItem{
					Label:      "prop_j?",
					InsertText: new("prop_j"),
					FilterText: new("prop_j"),
					SortText:   new(string(ls.SortTextOptionalMember)),
				},
			},
		},
	})
}
