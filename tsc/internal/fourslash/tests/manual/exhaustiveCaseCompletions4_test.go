package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Filter existing values.
func TestExhaustiveCaseCompletions4(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @newline: LF
enum E {
    A = 0,
    B = "B",
    C = "C",
}
// Filtering existing literals
declare const u: E.A | E.B | 1 | 1n | "1";
switch (u) {
    case E.A:
    case 1:
    case 1n:
    case 0x1n:
    case "1":
    case ` + "`1`" + `:
    case ` + "`1${u}`" + `:
    case/*1*/
}
declare const v: E.A | "1" | "2";
switch (v) {
    case 0:
    case ` + "`1`" + `:
    /*2*/
}
// Filtering repeated enum members
enum F {
    A = "A",
    B = "B",
    C = A,
}
declare const x: F;
switch (x) {
    /*3*/
}
// Enum with computed elements
enum G {
    C = 0,
    D = 1 << 1,
    E = 1 << 2,
    OtherD = D,
    DorE = D | E,
}
declare const y: G;
switch (y) {
    /*4*/
}
switch (y) {
    case 0: // same as G.C
    case 1: // same as G.D, but we don't know it
    case 3: // same as G.DorE, but we don't know
    /*5*/
}

// Already exhaustive switch
enum H {
    A = "A",
    B = "B",
    C = "C",
}
declare const z: H;
switch (z) {
    case H.A:
    case H.B:
    case H.C:
    /*6*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case E.B: ...",
					InsertText:       new("case E.B:$1"),
					SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})

	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            `case "2": ...`,
					InsertText:       new(`case "2":$1`),
					SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})

	// F.A and F.B (no C because C's value is the same as A's)
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case F.A: ...",
					InsertText:       new("case F.A:$1\ncase F.B:$2"),
					SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})

	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case G.C: ...",
					InsertText:       new("case G.C:$1\ncase G.D:$2\ncase G.E:$3\ncase G.DorE:$4"),
					SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})

	f.VerifyCompletions(t, "5", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case G.D: ...",
					InsertText:       new("case G.D:$1\ncase G.E:$2\ncase G.DorE:$3"),
					SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})

	// No exhaustive case completion offered here because the switch is already exhaustive
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: append(
				[]fourslash.CompletionsExpectedItem{"E", "F", "G", "H", "u", "v", "x", "y", "z"},
				CompletionGlobals...,
			),
		},
	})
}
