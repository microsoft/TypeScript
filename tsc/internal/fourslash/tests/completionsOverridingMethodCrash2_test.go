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

func TestCompletionsOverridingMethodCrash2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "lib": ["es5"]
  }
}
// @Filename: /home/src/workspaces/project/utils.ts
export class Element {
    // ...
}

export abstract class Component {
    abstract render(): Element;
}
// @Filename: /home/src/workspaces/project/classes.ts
import { Component } from "./utils.js";

export class MyComponent extends Component {
    [|render/**/|]
}`
	f, done := fourslash.NewFourslash(t, fourslash.GetDefaultCapabilitiesWithOptions(&fourslash.ClientCapabilitiesOptions{
		CompletionItem: &lsproto.ClientCompletionItemOptions{
			SnippetSupport: new(true),
		},
	}), content)
	defer done()
	f.GoToMarker(t, "")
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "render",
					TextEdit:            InsertReplaceTextEdit("render(): Element {\n    $0\n}", f.Ranges()[0].LSRange),
					FilterText:          new("render"),
					SortText:            new(string(ls.SortTextLocationPriority)),
					InsertTextFormat:    new(lsproto.InsertTextFormatSnippet),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: &lsproto.CompletionItemData{
						Source: "ClassMemberSnippet/",
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
	f.GoToFile(t, "/home/src/workspaces/project/utils.ts")
	f.GoToMarker(t, "")
	f.Backspace(t, 1)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:               "render",
					TextEdit:            InsertReplaceTextEdit("render(): Element {\n    $0\n}", f.Ranges()[0].LSRange),
					FilterText:          new("render"),
					SortText:            new(string(ls.SortTextLocationPriority)),
					InsertTextFormat:    new(lsproto.InsertTextFormatSnippet),
					AdditionalTextEdits: fourslash.AnyTextEdits,
					Data: &lsproto.CompletionItemData{
						Source: "ClassMemberSnippet/",
					},
				},
			},
		},
		UserPreferences: &lsutil.UserPreferences{IncludeCompletionsWithClassMemberSnippets: core.TSTrue},
	})
}
