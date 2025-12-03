package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsVariables(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** This is my variable*/
var myV/*1*/ariable = 10;
/*2*/
/** d variable*/
var d = 10;
myVariable = d;
/*3*/
/** foos comment*/
function foo() {
}
/** fooVar comment*/
var foo/*12*/Var: () => void;
/*4*/
f/*5q*/oo(/*5*/);
fo/*6q*/oVar(/*6*/);
fo/*13*/oVar = f/*14*/oo;
/*7*/
f/*8q*/oo(/*8*/);
foo/*9q*/Var(/*9*/);
var fooVarVar = /*9aq*/fooVar;
/**class comment*/
class c {
    /** constructor comment*/
    constructor() {
    }
}
/**instance comment*/
var i = new c();
/*10*/
/** interface comments*/
interface i1 {
}
/**interface instance comments*/
var i1_i: i1;
/*11*/
function foo2(a: number): void;
function foo2(b: string): void;
function foo2(aOrb) {
}
var x = fo/*15*/o2;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "var myVariable: number", "This is my variable")
	f.VerifyCompletions(t, "2", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "myVariable",
					Detail: PtrTo("var myVariable: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "This is my variable",
						},
					},
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "myVariable",
					Detail: PtrTo("var myVariable: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "This is my variable",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "d",
					Detail: PtrTo("var d: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "d variable",
						},
					},
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
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "foo",
					Detail: PtrTo("function foo(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "foos comment",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "fooVar",
					Detail: PtrTo("var fooVar: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "fooVar comment",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foos comment"})
	f.VerifyQuickInfoAt(t, "5q", "function foo(): void", "foos comment")
	f.GoToMarker(t, "6")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "fooVar comment"})
	f.VerifyQuickInfoAt(t, "6q", "var fooVar: () => void", "fooVar comment")
	f.VerifyCompletions(t, "7", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "foo",
					Detail: PtrTo("function foo(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "foos comment",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "fooVar",
					Detail: PtrTo("var fooVar: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "fooVar comment",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foos comment"})
	f.VerifyQuickInfoAt(t, "8q", "function foo(): void", "foos comment")
	f.GoToMarker(t, "9")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "fooVar comment"})
	f.VerifyQuickInfoAt(t, "9q", "var fooVar: () => void", "fooVar comment")
	f.VerifyQuickInfoAt(t, "9aq", "var fooVar: () => void", "fooVar comment")
	f.VerifyCompletions(t, "10", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i",
					Detail: PtrTo("var i: c"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "instance comment",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "11", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1_i",
					Detail: PtrTo("var i1_i: i1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "interface instance comments",
						},
					},
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "12", "var fooVar: () => void", "fooVar comment")
	f.VerifyQuickInfoAt(t, "13", "var fooVar: () => void", "fooVar comment")
	f.VerifyQuickInfoAt(t, "14", "function foo(): void", "foos comment")
	f.VerifyQuickInfoAt(t, "15", "function foo2(a: number): void (+1 overload)", "")
}
