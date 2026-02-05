package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsInterfaceFourslash(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @lib: es5
/** this is interface 1*/
interface i/*1*/1 {
}
var i1/*2*/_i: i1;
interface nc_/*3*/i1 {
}
var nc_/*4*/i1_i: nc_i1;
/** this is interface 2 with members*/
interface i/*5*/2 {
    /** this is x*/
    x: number;
    /** this is foo*/
    foo: (/**param help*/b: number) => string;
    /** this is indexer*/
    [/**string param*/i: string]: number;
    /**new method*/
    new (/** param*/i: i1);
    nc_x: number;
    nc_foo: (b: number) => string;
    [i: number]: number;
    /** this is call signature*/
    (/**paramhelp a*/a: number,/**paramhelp b*/ b: number) : number;
    /** this is fnfoo*/
    fnfoo(/**param help*/b: number): string;
    nc_fnfoo(b: number): string;
}
var i2/*6*/_i: /*34i*/i2;
var i2_i/*7*/_x = i2_i./*8*/x;
var i2_i/*9*/_foo = i2_i.f/*10*/oo;
var i2_i_f/*11*/oo_r = i2_i.f/*12q*/oo(/*12*/30);
var i2_i_i2_/*13*/si = i2/*13q*/_i["hello"];
var i2_i_i2/*14*/_ii = i2/*14q*/_i[30];
var i2_/*15*/i_n = new i2/*16q*/_i(/*16*/i1_i);
var i2_i/*17*/_nc_x = i2_i.n/*18*/c_x;
var i2_i_/*19*/nc_foo = i2_i.n/*20*/c_foo;
var i2_i_nc_f/*21*/oo_r = i2_i.nc/*22q*/_foo(/*22*/30);
var i2/*23*/_i_r = i2/*24q*/_i(/*24*/10, /*25*/20);
var i2_i/*26*/_fnfoo = i2_i.fn/*27*/foo;
var i2_i_/*28*/fnfoo_r = i2_i.fn/*29q*/foo(/*29*/10);
var i2_i/*30*/_nc_fnfoo = i2_i.nc_fn/*31*/foo;
var i2_i_nc_/*32*/fnfoo_r = i2_i.nc/*33q*/_fnfoo(/*33*/10);
/*34*/
interface i3 {
    /** Comment i3 x*/
    x: number;
    /** Function i3 f*/
    f(/**number parameter*/a: number): string;
    /** i3 l*/
    l: (/**comment i3 l b*/b: number) => string;
    nc_x: number;
    nc_f(a: number): string;
    nc_l: (b: number) => string;
}
var i3_i: i3;
i3_i = {
    /*35*/f: /**own f*/ (/**i3_i a*/a: number) => "Hello" + /*36*/a,
    l: this./*37*/f,
    /** own x*/
    x: this.f(/*38*/10),
    nc_x: this.l(/*39*/this.x),
    nc_f: this.f,
    nc_l: this.l
};
/*40*/i/*40q*/3_i./*41*/f(/*42*/10);
i3_i./*43q*/l(/*43*/10);
i3_i.nc_/*44q*/f(/*44*/10);
i3_i.nc/*45q*/_l(/*45*/10);`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyQuickInfoAt(t, "1", "interface i1", "this is interface 1")
	f.VerifyQuickInfoAt(t, "2", "var i1_i: i1", "")
	f.VerifyQuickInfoAt(t, "3", "interface nc_i1", "")
	f.VerifyQuickInfoAt(t, "4", "var nc_i1_i: nc_i1", "")
	f.VerifyQuickInfoAt(t, "5", "interface i2", "this is interface 2 with members")
	f.VerifyQuickInfoAt(t, "6", "var i2_i: i2", "")
	f.VerifyQuickInfoAt(t, "7", "var i2_i_x: number", "")
	f.VerifyQuickInfoAt(t, "8", "(property) i2.x: number", "this is x")
	f.VerifyCompletions(t, "8", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: CompletionFunctionMembersWithPrototypePlus(
				[]fourslash.CompletionsExpectedItem{
					&lsproto.CompletionItem{
						Label:  "x",
						Detail: PtrTo("(property) i2.x: number"),
						Documentation: &lsproto.StringOrMarkupContent{
							MarkupContent: &lsproto.MarkupContent{
								Kind:  lsproto.MarkupKindMarkdown,
								Value: "this is x",
							},
						},
					},
					&lsproto.CompletionItem{
						Label:  "foo",
						Detail: PtrTo("(property) i2.foo: (b: number) => string"),
						Documentation: &lsproto.StringOrMarkupContent{
							MarkupContent: &lsproto.MarkupContent{
								Kind:  lsproto.MarkupKindMarkdown,
								Value: "this is foo",
							},
						},
					},
					&lsproto.CompletionItem{
						Label:  "nc_x",
						Detail: PtrTo("(property) i2.nc_x: number"),
					},
					&lsproto.CompletionItem{
						Label:  "nc_foo",
						Detail: PtrTo("(property) i2.nc_foo: (b: number) => string"),
					},
					&lsproto.CompletionItem{
						Label:  "fnfoo",
						Detail: PtrTo("(method) i2.fnfoo(b: number): string"),
						Documentation: &lsproto.StringOrMarkupContent{
							MarkupContent: &lsproto.MarkupContent{
								Kind:  lsproto.MarkupKindMarkdown,
								Value: "this is fnfoo",
							},
						},
					},
					&lsproto.CompletionItem{
						Label:  "nc_fnfoo",
						Detail: PtrTo("(method) i2.nc_fnfoo(b: number): string"),
					},
				}),
		},
	})
	f.VerifyQuickInfoAt(t, "9", "var i2_i_foo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "10", "(property) i2.foo: (b: number) => string", "this is foo")
	f.VerifyQuickInfoAt(t, "11", "var i2_i_foo_r: string", "")
	f.GoToMarker(t, "12")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "", ParameterDocComment: "param help"})
	f.VerifyQuickInfoAt(t, "12q", "(property) i2.foo: (b: number) => string", "this is foo")
	f.VerifyQuickInfoAt(t, "13", "var i2_i_i2_si: number", "")
	f.VerifyQuickInfoAt(t, "13q", "var i2_i: i2", "")
	f.VerifyQuickInfoAt(t, "14", "var i2_i_i2_ii: number", "")
	f.VerifyQuickInfoAt(t, "14q", "var i2_i: i2", "")
	f.VerifyQuickInfoAt(t, "15", "var i2_i_n: any", "")
	f.GoToMarker(t, "16")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "new method", ParameterDocComment: "param"})
	f.VerifyQuickInfoAt(t, "16q", "var i2_i: i2\nnew (i: i1) => any", "new method")
	f.VerifyQuickInfoAt(t, "17", "var i2_i_nc_x: number", "")
	f.VerifyQuickInfoAt(t, "18", "(property) i2.nc_x: number", "")
	f.VerifyQuickInfoAt(t, "19", "var i2_i_nc_foo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "20", "(property) i2.nc_foo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "21", "var i2_i_nc_foo_r: string", "")
	f.GoToMarker(t, "22")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "22q", "(property) i2.nc_foo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "23", "var i2_i_r: number", "")
	f.GoToMarker(t, "24")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is call signature", ParameterDocComment: "paramhelp a"})
	f.VerifyQuickInfoAt(t, "24q", "var i2_i: i2\n(a: number, b: number) => number", "this is call signature")
	f.GoToMarker(t, "25")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is call signature", ParameterDocComment: "paramhelp b"})
	f.VerifyQuickInfoAt(t, "26", "var i2_i_fnfoo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "27", "(method) i2.fnfoo(b: number): string", "this is fnfoo")
	f.VerifyQuickInfoAt(t, "28", "var i2_i_fnfoo_r: string", "")
	f.GoToMarker(t, "29")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is fnfoo", ParameterDocComment: "param help"})
	f.VerifyQuickInfoAt(t, "29q", "(method) i2.fnfoo(b: number): string", "this is fnfoo")
	f.VerifyQuickInfoAt(t, "30", "var i2_i_nc_fnfoo: (b: number) => string", "")
	f.VerifyQuickInfoAt(t, "31", "(method) i2.nc_fnfoo(b: number): string", "")
	f.VerifyQuickInfoAt(t, "32", "var i2_i_nc_fnfoo_r: string", "")
	f.GoToMarker(t, "33")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "33q", "(method) i2.nc_fnfoo(b: number): string", "")
	f.VerifyCompletions(t, "34", &fourslash.CompletionsExpectedList{
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
				},
				&lsproto.CompletionItem{
					Label:  "nc_i1_i",
					Detail: PtrTo("var nc_i1_i: nc_i1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_i",
					Detail: PtrTo("var i2_i: i2"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_x",
					Detail: PtrTo("var i2_i_x: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_foo",
					Detail: PtrTo("var i2_i_foo: (b: number) => string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_foo_r",
					Detail: PtrTo("var i2_i_foo_r: string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_i2_si",
					Detail: PtrTo("var i2_i_i2_si: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_i2_ii",
					Detail: PtrTo("var i2_i_i2_ii: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_n",
					Detail: PtrTo("var i2_i_n: any"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_nc_x",
					Detail: PtrTo("var i2_i_nc_x: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_nc_foo",
					Detail: PtrTo("var i2_i_nc_foo: (b: number) => string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_nc_foo_r",
					Detail: PtrTo("var i2_i_nc_foo_r: string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_r",
					Detail: PtrTo("var i2_i_r: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_fnfoo",
					Detail: PtrTo("var i2_i_fnfoo: (b: number) => string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_fnfoo_r",
					Detail: PtrTo("var i2_i_fnfoo_r: string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_nc_fnfoo",
					Detail: PtrTo("var i2_i_nc_fnfoo: (b: number) => string"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_i_nc_fnfoo_r",
					Detail: PtrTo("var i2_i_nc_fnfoo_r: string"),
				},
			},
			Excludes: []string{
				"i1",
				"nc_i1",
				"i2",
			},
		},
	})
	f.VerifyCompletions(t, "34i", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1",
					Detail: PtrTo("interface i1"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "this is interface 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_i1",
					Detail: PtrTo("interface nc_i1"),
				},
				&lsproto.CompletionItem{
					Label:  "i2",
					Detail: PtrTo("interface i2"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "this is interface 2 with members",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "36", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "a",
					Detail: PtrTo("(parameter) a: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i3_i a",
						},
					},
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "40q", "var i3_i: i3", "")
	f.VerifyCompletions(t, "40", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i3_i",
					Detail: PtrTo("var i3_i: i3"),
				},
			},
			Excludes: []string{
				"i3",
			},
		},
	})
	f.GoToMarker(t, "41")
	f.VerifyQuickInfoIs(t, "(method) i3.f(a: number): string", "Function i3 f")
	f.VerifyCompletions(t, "41", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f",
					Detail: PtrTo("(method) i3.f(a: number): string"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Function i3 f",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "l",
					Detail: PtrTo("(property) i3.l: (b: number) => string"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i3 l",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_f",
					Detail: PtrTo("(method) i3.nc_f(a: number): string"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l",
					Detail: PtrTo("(property) i3.nc_l: (b: number) => string"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_x",
					Detail: PtrTo("(property) i3.nc_x: number"),
				},
				&lsproto.CompletionItem{
					Label:  "x",
					Detail: PtrTo("(property) i3.x: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "Comment i3 x",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "42")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "Function i3 f", ParameterDocComment: "number parameter"})
	f.GoToMarker(t, "43")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "", ParameterDocComment: "comment i3 l b"})
	f.VerifyQuickInfoAt(t, "43q", "(property) i3.l: (b: number) => string", "i3 l")
	f.GoToMarker(t, "44")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "44q", "(method) i3.nc_f(a: number): string", "")
	f.GoToMarker(t, "45")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "45q", "(property) i3.nc_l: (b: number) => string", "")
}
