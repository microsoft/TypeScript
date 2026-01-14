package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExhaustiveCaseCompletions1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
enum E {
    A = 0,
    B = "B",
    C = "C",
}
// Mixed union
declare const u: E.A | E.B | 1;
switch (u) {
    case/*1*/
}
// Union enum
declare const e: E;
switch (e) {
    case/*2*/
}
enum F {
    D = 1 << 0,
    E = 1 << 1,
    F = 1 << 2,
}

declare const f: F;
switch (f) {
    case/*3*/
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
					Label:            "case 1: ...",
					InsertText:       PtrTo("case 1:$1\ncase E.A:$2\ncase E.B:$3"),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
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
					Label:            "case E.A: ...",
					InsertText:       PtrTo("case E.A:$1\ncase E.B:$2\ncase E.C:$3"),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case F.D: ...",
					InsertText:       PtrTo("case F.D:$1\ncase F.E:$2\ncase F.F:$3"),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}
