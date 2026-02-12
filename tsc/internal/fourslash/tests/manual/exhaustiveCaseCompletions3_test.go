package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Where exhaustive case completions are available.
func TestExhaustiveCaseCompletions3(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: /main.ts
enum E {
    A = 0,
    B = "B",
    C = "C",
}
declare const u: E;
switch (u) {
    case/*1*/
}
switch (u) {
    /*2*/
}
switch (u) {
    case 1:
    /*3*/
}
switch (u) {
    [|c|]/*4*/   
}
switch (u) {
    case /*5*/
}
/*6*/
switch (u) {
    /*7*/

switch (u) {
    case E./*8*/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	exhaustiveCaseCompletion := &lsproto.CompletionItem{
		Label:            "case E.A: ...",
		InsertText:       new("case E.A:$1\ncase E.B:$2\ncase E.C:$3"),
		SortText:         new(string(ls.SortTextGlobalsOrKeywords)),
		InsertTextFormat: new(lsproto.InsertTextFormatSnippet),
	}

	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{exhaustiveCaseCompletion},
		},
	})

	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{exhaustiveCaseCompletion},
		},
	})

	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{exhaustiveCaseCompletion},
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
					Label: "case E.A: ...",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						InsertReplaceEdit: &lsproto.InsertReplaceEdit{
							NewText: "case E.A:$1\ncase E.B:$2\ncase E.C:$3",
							Insert:  f.Ranges()[0].LSRange,
							Replace: f.Ranges()[0].LSRange,
						},
					},
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
			Includes: []fourslash.CompletionsExpectedItem{exhaustiveCaseCompletion},
		},
	})

	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{"E", "u", exhaustiveCaseCompletion},
		},
	})

	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{exhaustiveCaseCompletion},
		},
	})

	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"A",
				"B",
				"C",
			},
		},
	})
}
