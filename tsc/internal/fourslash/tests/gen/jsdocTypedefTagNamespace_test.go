package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestJsdocTypedefTagNamespace(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js
/**
 * @typedef {string | number} T.NumberLike
 * @typedef {{age: number}} T.People
 * @typedef {string | number} T.O.Q.NumberLike
 * @type {T.NumberLike}
 */
var x; x./*1*/;
/** @type {T.O.Q.NumberLike} */
var x1; x1./*2*/;
/** @type {T.People} */
var x1; x1./*3*/;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyCompletions(t, []string{"1", "3"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"charAt",
				"toExponential",
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
					Label:    "age",
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
			},
		},
	})
}
