package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	. "github.com/microsoft/TypeScript/tsc/internal/fourslash/tests/util"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCompletionsObjectLiteralMethod2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @newline: LF
// @Filename: a.ts
export interface IFoo {
    bar(x: number): void;
}
// @Filename: b.ts
import { IFoo } from "./a";
export interface IBar {
    foo(f: IFoo): void;
}
// @Filename: c.ts
import { IBar } from "./b";
const obj: IBar = {
    /*a*/
}`
	f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			LabelDetailsSupport: new(true),
		},
	}), content)
	defer done()
	f.VerifyCompletions(t, "a", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "foo",
					SortText: new(string(ls.ObjectLiteralPropertySortText(ls.SortTextLocationPriority, "foo"))),
				},
				&lsproto.CompletionItem{
					Label:      "foo",
					InsertText: new("foo(f) {\n},"),
					SortText:   new(string(ls.SortBelow(ls.ObjectLiteralPropertySortText(ls.SortTextLocationPriority, "foo")))),
					Data: &lsproto.CompletionItemData{
						Source: "ObjectLiteralMethodSnippet/",
					},
					LabelDetails: &lsproto.CompletionItemLabelDetails{
						Detail: new("(f)"),
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithObjectLiteralMethodSnippets: core.TSTrue},
	})
}
