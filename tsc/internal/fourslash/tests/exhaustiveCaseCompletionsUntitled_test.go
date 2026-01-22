package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test exhaustive case completions for locally defined enum in untitled file.
func TestExhaustiveCaseCompletionsUntitledLocalEnum(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @filename: ^/untitled/ts-nul-authority/Untitled-1.ts
enum E {
    A = "A",
    B = "B",
    C = "C",
}
declare const e: E;
switch (e) {
    case/**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Locally defined enum should provide exhaustive case completions in untitled file
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
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
}

// Test exhaustive case completions for globally declared enum in untitled file.
func TestExhaustiveCaseCompletionsUntitledGlobalEnum(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @filename: /home/src/project/globals.d.ts
declare enum Direction {
	Up = "Up",
	Down = "Down",
	Left = "Left",
	Right = "Right",
}
declare const direction: Direction;

// @filename: ^/untitled/ts-nul-authority/Untitled-1.ts
switch (direction) {
    case/**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// Globally declared enum should provide exhaustive case completions in untitled file
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case Direction.Up: ...",
					InsertText:       PtrTo("case Direction.Up:$1\ncase Direction.Down:$2\ncase Direction.Left:$3\ncase Direction.Right:$4"),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}

// Test exhaustive case completions for string literal union in untitled file.
func TestExhaustiveCaseCompletionsUntitledStringLiterals(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @filename: ^/untitled/ts-nul-authority/Untitled-1.ts
export {};
declare const status: "pending" | "success" | "error";
switch (status) {
    case/**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	// String literal unions should provide exhaustive case completions in untitled file
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            `case "error": ...`,
					InsertText:       PtrTo(`case "error":$1` + "\n" + `case "pending":$2` + "\n" + `case "success":$3`),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}

// Test that imported enum type reference doesn't crash.
// Turns out the easiest way to do this is to provide the completions
// without associated auto-import edits, which is a pretty nice UX anyway.
func TestExhaustiveCaseCompletionsUntitledImportedEnum(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @filename: /home/src/project/enums.ts
export enum Status {
    Active,
    Inactive,
    Pending,
}

// @filename: ^/untitled/ts-nul-authority/Untitled-1.ts
declare const s: import("/home/src/project/enums").Status;
switch (s) {
    case/**/
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:            "case Status.Active: ...",
					InsertText:       PtrTo("case Status.Active:$1\ncase Status.Inactive:$2\ncase Status.Pending:$3"),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
				},
			},
		},
	})
}
