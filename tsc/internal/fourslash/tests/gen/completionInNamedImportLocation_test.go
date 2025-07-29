package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionInNamedImportLocation(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: file.ts
export var x = 10;
export var y = 10;
export { x as await, x as interface, x as unique };
export default class C {
}
// @Filename: a.ts
import { /*1*/ } from "./file";
import { x, /*2*/ } from "./file";
import { x, y, /*3*/ } from "./file";
import { x, y, await as await_, /*4*/ } from "./file";
import { x, y, await as await_, interface as interface_, /*5*/ } from "./file";
import { x, y, await as await_, interface as interface_, unique, /*6*/ } from "./file";`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.GoToFile(t, "a.ts")
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "await",
					InsertText: PtrTo("await as await_"),
				},
				&lsproto.CompletionItem{
					Label:      "interface",
					InsertText: PtrTo("interface as interface_"),
				},
				&lsproto.CompletionItem{
					Label: "unique",
				},
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("var x: number"),
				},
				&lsproto.CompletionItem{
					Label:  "y",
					Detail: PtrTo("var y: number"),
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "await",
					InsertText: PtrTo("await as await_"),
				},
				&lsproto.CompletionItem{
					Label:      "interface",
					InsertText: PtrTo("interface as interface_"),
				},
				&lsproto.CompletionItem{
					Label: "unique",
				},
				&lsproto.CompletionItem{
					Label:  "y",
					Detail: PtrTo("var y: number"),
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "await",
					InsertText: PtrTo("await as await_"),
				},
				&lsproto.CompletionItem{
					Label:      "interface",
					InsertText: PtrTo("interface as interface_"),
				},
				&lsproto.CompletionItem{
					Label: "unique",
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:      "interface",
					InsertText: PtrTo("interface as interface_"),
				},
				&lsproto.CompletionItem{
					Label: "unique",
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
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
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "unique",
				},
				&lsproto.CompletionItem{
					Label:    "type",
					SortText: PtrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
		},
	})
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{},
		},
	})
}
