package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsTriggerCharacter(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: preserve
/** @/*tag*/ */
//</*comment*/
const x: "a" | "b" = "[|/*openQuote*/|]"/*closeQuote*/;
const y: 'a' | 'b' = '[|/*openSingleQuote*/|]'/*closeSingleQuote*/;
const z: 'a' | 'b' = ` + "`" + `[|/*openTemplate*/|]` + "`" + `/*closeTemplate*/;
const q: "` + "`" + `a` + "`" + `" | "` + "`" + `b` + "`" + `" = "[|` + "`" + `/*openTemplateInQuote*/a` + "`" + `/*closeTemplateInQuote*/|]";
// "/*quoteInComment*/ </*lessInComment*/
// @Filename: /foo/importMe.ts
whatever
// @Filename: /a.tsx
declare global {
    namespace JSX {
        interface Element {}
        interface IntrinsicElements {
            div: {};
        }
    }
}
const ctr = </*openTag*/;
const less = 1 </*lessThan*/;
const closeTag = <div> foo <//*closeTag*/;
import something from "./foo//*path*/";
const divide = 1 //*divide*/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "tag", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"param",
			},
		},
	})
	f.VerifyCompletions(t, "comment", nil)
	f.VerifyCompletions(t, "openQuote", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "a",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "a",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "b",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "b",
							Range:   f.Ranges()[0].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "closeQuote", nil)
	f.VerifyCompletions(t, "openSingleQuote", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "a",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "a",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "b",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "b",
							Range:   f.Ranges()[1].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "closeSingleQuote", nil)
	f.VerifyCompletions(t, "openTemplate", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "a",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "a",
							Range:   f.Ranges()[2].LSRange,
						},
					},
				},
				&lsproto.CompletionItem{
					Label: "b",
					TextEdit: &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: "b",
							Range:   f.Ranges()[2].LSRange,
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "closeTemplate", nil)
	f.VerifyCompletions(t, "quoteInComment", nil)
	f.VerifyCompletions(t, "lessInComment", nil)
	f.VerifyCompletions(t, "openTag", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"div",
			},
		},
	})
	f.VerifyCompletions(t, "lessThan", nil)
	f.VerifyCompletions(t, "closeTag", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"div>",
			},
		},
	})
	f.VerifyCompletions(t, "path", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				"importMe",
			},
		},
	})
	f.VerifyCompletions(t, "divide", nil)
}
