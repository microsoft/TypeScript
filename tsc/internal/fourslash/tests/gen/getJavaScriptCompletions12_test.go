package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGetJavaScriptCompletions12(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowNonTsExtensions: true
// @Filename: Foo.js
/**
 * @param {number} input
 * @param {string} currency
 * @returns {number}
 */
var convert = function(input, currency) {
    switch(currency./*1*/) {
            case "USD":
            input./*2*/;
            case "EUR":
                return "" + rateToUsd.EUR;
            case "CNY":
                return {} + rateToUsd.CNY;
    }
}
convert(1, "")./*3*/
/**
 * @param {number} x
 */
var test1 = function(x) { return x./*4*/ }, test2 = function(a) { return a./*5*/ };`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "1", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "charCodeAt",
					Kind:  PtrTo(lsproto.CompletionItemKindMethod),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"2", "3", "4"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label: "toExponential",
					Kind:  PtrTo(lsproto.CompletionItemKindMethod),
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:    "test1",
					Kind:     PtrTo(lsproto.CompletionItemKindText),
					SortText: PtrTo(string(ls.SortTextJavascriptIdentifiers)),
				},
			},
		},
	})
}
