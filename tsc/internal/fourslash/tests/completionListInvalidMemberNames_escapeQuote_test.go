package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionListInvalidMemberNames_escapeQuote(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare const x: { "\"'": 0 };
x[|./**/|];`
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
					Label:      "\"'",
					InsertText: new("[\"\\\"'\"]"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "[\"\\\"'\"]",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "\"'",
					InsertText: new("['\"\\'']"),
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "['\"\\'']",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{QuotePreference: lsutil.QuotePreference("single")},
	})
}

func TestStringCompletionEscaping(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface Properties {
    "a'b\"c${x}\\z": number;
}
declare const value: Properties;
value["[|/*double*/|]"];
value['[|/*single*/|]'];
value[` + "`[|/*template*/|]`" + `];
type Indexed = Properties['[|/*indexed*/|]'];
"[|/*in*/|]" in value;
const object: Properties = { '[|/*object*/|]': 1 };
declare function f(value: "a'b\"c${x}\\z"): void;
f('[|/*typeSingle*/|]');
f(` + "`[|/*typeTemplate*/|]`" + `);
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	for i, test := range []struct {
		marker     string
		label      string
		insertText string
		newText    string
	}{
		{"double", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"single", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"template", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"indexed", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"in", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"object", `a'b"c${x}\z`, "", `a'b"c${x}\z`},
		{"typeSingle", `a'b\"c${x}\\z`, "", `a'b\"c${x}\\z`},
		{"typeTemplate", `a'b"c\${x}\\z`, "", `a'b"c\${x}\\z`},
	} {
		item := &lsproto.CompletionItem{
			Label: test.label,
			TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
				TextEdit: &lsproto.TextEdit{NewText: test.newText, Range: f.Ranges()[i].LSRange},
			},
		}
		if test.insertText != "" {
			item.InsertText = &test.insertText
		}
		f.VerifyCompletions(t, test.marker, &fourslash.CompletionsExpectedList{
			IsIncomplete: false,
			ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
				CommitCharacters: &DefaultCommitCharacters,
				EditRange:        Ignored,
			},
			Items: &fourslash.CompletionsExpectedItems{Includes: []fourslash.CompletionsExpectedItem{item}},
		})
	}
}

func TestStringCompletionEscapingUnterminated(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare const value: { "a'b": number };
value['/*completion*/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "completion", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{Label: "a'b"},
			},
		},
	})
}
