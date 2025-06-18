package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
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
	f.VerifyCompletions(t, "tag", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"param"},
		},
	})
	f.VerifyCompletions(t, "comment", nil)
	f.VerifyCompletions(t, "openQuote", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
	f.VerifyCompletions(t, "closeQuote", nil)
	f.VerifyCompletions(t, "openSingleQuote", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
	f.VerifyCompletions(t, "closeSingleQuote", nil)
	f.VerifyCompletions(t, "openTemplate", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "a"}, &lsproto.CompletionItem{Label: "b"}},
		},
	})
	f.VerifyCompletions(t, "closeTemplate", nil)
	f.VerifyCompletions(t, "quoteInComment", nil)
	f.VerifyCompletions(t, "lessInComment", nil)
	f.VerifyCompletions(t, "openTag", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"div"},
		},
	})
	f.VerifyCompletions(t, "lessThan", nil)
	f.VerifyCompletions(t, "closeTag", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"div>"},
		},
	})
	f.VerifyCompletions(t, "path", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &[]string{},
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{"importMe"},
		},
	})
	f.VerifyCompletions(t, "divide", nil)
}
