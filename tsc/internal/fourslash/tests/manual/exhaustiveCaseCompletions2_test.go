package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestExhaustiveCaseCompletions2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: /dep.ts
export enum E {
    A = 0,
    B = "B",
    C = "C",
}
declare const u: E.A | E.B | 1;
export { u };
// @Filename: /main.ts
import { u } from "./dep";
switch (u) {
    case/*1*/
}
// @Filename: /other.ts
import * as d from "./dep";
declare const u: d.E;
switch (u) {
    case/*2*/
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
					Label:               "case 1: ...",
					InsertText:          PtrTo("case 1:$1\ncase E.A:$2\ncase E.B:$3"),
					InsertTextFormat:    PtrTo(lsproto.InsertTextFormatSnippet),
					SortText:            PtrTo(string(ls.SortTextGlobalsOrKeywords)),
					AdditionalTextEdits: fourslash.AnyTextEdits,
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
					Label:            "case d.E.A: ...",
					InsertText:       PtrTo("case d.E.A:$1\ncase d.E.B:$2\ncase d.E.C:$3"),
					InsertTextFormat: PtrTo(lsproto.InsertTextFormatSnippet),
					SortText:         PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyApplyCodeActionFromCompletion(t, PtrTo("1"), &fourslash.ApplyCodeActionFromCompletionOptions{
		Name:   "case 1: ...",
		Source: "SwitchCases/",
		NewFileContent: PtrTo(`import { E, u } from "./dep";
switch (u) {
    case
}`),
	})
}
