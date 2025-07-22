package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJavaScriptModules12(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: mod1.js
var x = require('fs');
/*1*/
// @Filename: mod2.js
var y;
if(true) {
    y = require('fs');
}
/*2*/
// @Filename: glob1.js
var a = require;
/*3*/
// @Filename: glob2.js
var b = '';
/*4*/
// @Filename: consumer.js
/*5*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"x",
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
				&lsproto.CompletionItem{
					Label:    "b",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
			Excludes: []string{
				"y",
			},
		},
	})
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"y",
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
				&lsproto.CompletionItem{
					Label:    "b",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
			Excludes: []string{
				"x",
			},
		},
	})
	f.VerifyCompletions(t, "3", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"a",
				&lsproto.CompletionItem{
					Label:    "b",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
			Excludes: []string{
				"x",
				"y",
			},
		},
	})
	f.VerifyCompletions(t, "4", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
				"b",
			},
			Excludes: []string{
				"x",
				"y",
			},
		},
	})
	f.VerifyCompletions(t, []string{"5"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
			EditRange:        ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "a",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
				&lsproto.CompletionItem{
					Label:    "b",
					SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)),
				},
			},
			Excludes: []string{
				"x",
				"y",
			},
		},
	})
}
