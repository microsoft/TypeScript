package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionInJsDoc(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: Foo.js
 /** @/*1*/ */
 var v1;

 /** @p/*2*/ */
 var v2;

 /** @param /*3*/ */
 var v3;

 /** @param { n/*4*/ } bar */
 var v4;

 /** @type { n/*5*/ } */
 var v5;

 // @/*6*/
 var v6;

 // @pa/*7*/
 var v7;

 /** @return { n/*8*/ } */
 var v8;

 /** /*9*/ */

 /**
  /*10*/
 */

 /**
  * /*11*/
  */

 /**
           /*12*/
  */

 /**
   *       /*13*/
   */

 /**
   * some comment /*14*/
   */

 /**
   * @param /*15*/
   */

 /** @param /*16*/ */

 /**
   * jsdoc inline tag {@/*17*/}
   */`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, []string{"1", "2"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"constructor", "param", "type", "method", "template"},
		},
	})
	f.VerifyCompletions(t, []string{"3", "15", "16"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Exact: []fourslash.ExpectedCompletionItem{},
		},
	})
	f.VerifyCompletions(t, []string{"4", "5", "8"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{SortText: ptrTo(string(ls.SortTextGlobalsOrKeywords)), Label: "number"}},
		},
	})
	f.VerifyCompletions(t, []string{"6", "7", "14"}, nil)
	f.VerifyCompletions(t, []string{"9", "10", "11", "12", "13"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"@argument", "@returns"},
		},
	})
	f.VerifyCompletions(t, []string{"17"}, &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{"link", "tutorial"},
		},
	})
}
