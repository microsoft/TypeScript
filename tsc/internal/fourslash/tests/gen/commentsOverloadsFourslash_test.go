package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsOverloadsFourslash(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** this is signature 1*/
function /*1*/f1(/**param a*/a: number): number;
function /*2*/f1(b: string): number;
function /*3*/f1(aOrb: any) {
    return 10;
}
f/*4q*/1(/*4*/"hello");
f/*o4q*/1(/*o4*/10);
function /*5*/f2(/**param a*/a: number): number;
/** this is signature 2*/
function /*6*/f2(b: string): number;
/** this is f2 var comment*/
function /*7*/f2(aOrb: any) {
    return 10;
}
f/*8q*/2(/*8*/"hello");
f/*o8q*/2(/*o8*/10);
function /*9*/f3(a: number): number;
function /*10*/f3(b: string): number;
function /*11*/f3(aOrb: any) {
    return 10;
}
f/*12q*/3(/*12*/"hello");
f/*o12q*/3(/*o12*/10);
/** this is signature 4 - with number parameter*/
function /*13*/f4(/**param a*/a: number): number;
/** this is signature 4 - with string parameter*/
function /*14*/f4(b: string): number;
function /*15*/f4(aOrb: any) {
    return 10;
}
f/*16q*/4(/*16*/"hello");
f/*o16q*/4(/*o16*/10);
/*17*/
interface i1 {
    /**this signature 1*/
    (/**param a*/ a: number): number;
    /**this is signature 2*/
    (b: string): number;
    /** foo 1*/
    foo(a: number): number;
    /** foo 2*/
    foo(b: string): number;
    foo2(a: number): number;
    /** foo2 2*/
    foo2(b: string): number;
    foo3(a: number): number;
    foo3(b: string): number;
    /** foo4 1*/
    foo4(a: number): number;
    foo4(b: string): number;
    /** new 1*/
    new (a: string);
    new (b: number);
}
var i1_i: i1;
interface i2 {
    new (a: string);
    /** new 2*/
    new (b: number);
    (a: number): number;
    /**this is signature 2*/
    (b: string): number;
}
var i2_i: i2;
interface i3 {
    /** new 1*/
    new (a: string);
    /** new 2*/
    new (b: number);
    /**this is signature 1*/
    (a: number): number;
    (b: string): number;
}
var i3_i: i3;
interface i4 {
    new (a: string);
    new (b: number);
    (a: number): number;
    (b: string): number;
}
var i4_i: i4;
new /*18*/i1/*19q*/_i(/*19*/10);
new i/*20q*/1_i(/*20*/"Hello");
i/*21q*/1_i(/*21*/10);
i/*22q*/1_i(/*22*/"hello");
i1_i./*23*/f/*24q*/oo(/*24*/10);
i1_i.f/*25q*/oo(/*25*/"hello");
i1_i.fo/*26q*/o2(/*26*/10);
i1_i.fo/*27q*/o2(/*27*/"hello");
i1_i.fo/*28q*/o3(/*28*/10);
i1_i.fo/*29q*/o3(/*29*/"hello");
i1_i.fo/*30q*/o4(/*30*/10);
i1_i.fo/*31q*/o4(/*31*/"hello");
new i2/*32q*/_i(/*32*/10);
new i2/*33q*/_i(/*33*/"Hello");
i/*34q*/2_i(/*34*/10);
i2/*35q*/_i(/*35*/"hello");
new i/*36q*/3_i(/*36*/10);
new i3/*37q*/_i(/*37*/"Hello");
i3/*38q*/_i(/*38*/10);
i3/*39q*/_i(/*39*/"hello");
new i4/*40q*/_i(/*40*/10);
new i/*41q*/4_i(/*41*/"Hello");
i4/*42q*/_i(/*42*/10);
i4/*43q*/_i(/*43*/"hello");
class c {
    public /*93*/prop1(a: number): number;
    public /*94*/prop1(b: string): number;
    public /*95*/prop1(aorb: any) {
        return 10;
    }
    /** prop2 1*/
    public /*96*/prop2(a: number): number;
    public /*97*/prop2(b: string): number;
    public /*98*/prop2(aorb: any) {
        return 10;
    }
    public /*99*/prop3(a: number): number;
    /** prop3 2*/
    public /*100*/prop3(b: string): number;
    public /*101*/prop3(aorb: any) {
        return 10;
    }
    /** prop4 1*/
    public /*102*/prop4(a: number): number;
    /** prop4 2*/
    public /*103*/prop4(b: string): number;
    public /*104*/prop4(aorb: any) {
        return 10;
    }
    /** prop5 1*/
    public /*105*/prop5(a: number): number;
    /** prop5 2*/
    public /*106*/prop5(b: string): number;
    /** Prop5 implementaion*/
    public /*107*/prop5(aorb: any) {
        return 10;
    }
}
class c1 {
    /*78*/constructor(a: number);
    /*79*/constructor(b: string);
    /*80*/constructor(aorb: any) {
    }
}
class c2 {
    /** c2 1*/
    /*81*/constructor(a: number);
    /*82*/constructor(b: string);
    /*83*/constructor(aorb: any) {
    }
}
class c3 {
    /*84*/constructor(a: number);
    /** c3 2*/
    /*85*/constructor(b: string);
    /*86*/constructor(aorb: any) {
    }
}
class c4 {
    /** c4 1*/
    /*87*/constructor(a: number);
    /** c4 2*/
    /*88*/constructor(b: string);
    /*89*/constructor(aorb: any) {
    }
}
class c5 {
    /** c5 1*/
    /*90*/constructor(a: number);
    /** c5 2*/
    /*91*/constructor(b: string);
    /** c5 implementation*/
    /*92*/constructor(aorb: any) {
    }
}
var c_i = new c();
c_i./*44*/pro/*45q*/p1(/*45*/10);
c_i.pr/*46q*/op1(/*46*/"hello");
c_i.pr/*47q*/op2(/*47*/10);
c_i.pr/*48q*/op2(/*48*/"hello");
c_i.pro/*49q*/p3(/*49*/10);
c_i.pr/*50q*/op3(/*50*/"hello");
c_i.pr/*51q*/op4(/*51*/10);
c_i.pr/*52q*/op4(/*52*/"hello");
c_i.pr/*53q*/op5(/*53*/10);
c_i.pr/*54q*/op5(/*54*/"hello");
var c1/*66*/_i_1 = new c/*55q*/1(/*55*/10);
var c1_i_2 = new c/*56q*/1(/*56*/"hello");
var c2_i_1 = new c/*57q*/2(/*57*/10);
var c/*67*/2_i_2 = new c/*58q*/2(/*58*/"hello");
var c3_i_1 = new c/*59q*/3(/*59*/10);
var c/*68*/3_i_2 = new c/*60q*/3(/*60*/"hello");
var c4/*69*/_i_1 = new c/*61q*/4(/*61*/10);
var c4_i_2 = new c/*62q*/4(/*62*/"hello");
var c/*70*/5_i_1 = new c/*63q*/5(/*63*/10);
var c5_i_2 = new c/*64q*/5(/*64*/"hello");
/** This is multiOverload F1 1*/
function multiOverload(a: number): string;
/** This is multiOverload F1 2*/
function multiOverload(b: string): string;
/** This is multiOverload F1 3*/
function multiOverload(c: boolean): string;
/** This is multiOverload Implementation */
function multiOverload(d): string {
    return "Hello";
}
multiOverl/*71*/oad(10);
multiOverl/*72*/oad("hello");
multiOverl/*73*/oad(true);
/** This is ambient F1 1*/
declare function ambientF1(a: number): string;
/** This is ambient F1 2*/
declare function ambientF1(b: string): string;
/** This is ambient F1 3*/
declare function ambientF1(c: boolean): boolean;
/*65*/
ambient/*74*/F1(10);
ambient/*75*/F1("hello");
ambient/*76*/F1(true);
function foo(a/*77*/a: i3) {
}
foo(null);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "function f1(a: number): number (+1 overload)", "this is signature 1")
	f.VerifyQuickInfoAt(t, "2", "function f1(b: string): number (+1 overload)", "this is signature 1")
	f.VerifyQuickInfoAt(t, "3", "function f1(a: number): number (+1 overload)", "this is signature 1")
	f.VerifyQuickInfoAt(t, "4q", "function f1(b: string): number (+1 overload)", "this is signature 1")
	f.VerifyQuickInfoAt(t, "o4q", "function f1(a: number): number (+1 overload)", "this is signature 1")
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.GoToMarker(t, "o4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 1", ParameterDocComment: "param a", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "5", "function f2(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "6", "function f2(b: string): number (+1 overload)", "this is signature 2")
	f.VerifyQuickInfoAt(t, "7", "function f2(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "8q", "function f2(b: string): number (+1 overload)", "this is signature 2")
	f.VerifyQuickInfoAt(t, "o8q", "function f2(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 2", OverloadsCount: 2})
	f.GoToMarker(t, "o8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{ParameterDocComment: "param a", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "9", "function f3(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "10", "function f3(b: string): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "11", "function f3(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "12q", "function f3(b: string): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "o12q", "function f3(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "12")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.GoToMarker(t, "o12")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "13", "function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter")
	f.VerifyQuickInfoAt(t, "14", "function f4(b: string): number (+1 overload)", "this is signature 4 - with string parameter")
	f.VerifyQuickInfoAt(t, "15", "function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter")
	f.VerifyQuickInfoAt(t, "16q", "function f4(b: string): number (+1 overload)", "this is signature 4 - with string parameter")
	f.VerifyQuickInfoAt(t, "o16q", "function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter")
	f.GoToMarker(t, "16")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 4 - with string parameter", OverloadsCount: 2})
	f.GoToMarker(t, "o16")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 4 - with number parameter", ParameterDocComment: "param a", OverloadsCount: 2})
	f.VerifyCompletions(t, "17", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("function f1(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "this is signature 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f2",
					Detail: PtrTo("function f2(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "f3",
					Detail: PtrTo("function f3(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "f4",
					Detail: PtrTo("function f4(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "this is signature 4 - with number parameter",
						},
					},
				},
			},
		},
	})
	f.VerifyCompletions(t, "18", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1_i",
					Detail: PtrTo("var i1_i: i1\nnew (b: number) => any (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "new 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_i",
					Detail: PtrTo("var i2_i: i2\nnew (a: string) => any (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "i3_i",
					Detail: PtrTo("var i3_i: i3\nnew (a: string) => any (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "new 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i4_i",
					Detail: PtrTo("var i4_i: i4\nnew (a: string) => any (+1 overload)"),
				},
			},
			Excludes: []string{
				"i1",
				"i2",
				"i3",
				"i4",
			},
		},
	})
	f.GoToMarker(t, "19")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "19q", "var i1_i: i1\nnew (b: number) => any (+1 overload)", "new 1")
	f.GoToMarker(t, "20")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "new 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "20q", "var i1_i: i1\nnew (a: string) => any (+1 overload)", "new 1")
	f.GoToMarker(t, "21")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this signature 1", ParameterDocComment: "param a", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "21q", "var i1_i: i1\n(a: number) => number (+1 overload)", "this signature 1")
	f.GoToMarker(t, "22")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 2", OverloadsCount: 2})
	f.GoToMarker(t, "22q")
	f.VerifyQuickInfoAt(t, "22q", "var i1_i: i1\n(b: string) => number (+1 overload)", "this is signature 2")
	f.VerifyCompletions(t, "23", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "foo",
					Detail: PtrTo("(method) i1.foo(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "foo 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "foo2",
					Detail: PtrTo("(method) i1.foo2(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "foo3",
					Detail: PtrTo("(method) i1.foo3(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "foo4",
					Detail: PtrTo("(method) i1.foo4(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "foo4 1",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "24")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foo 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "24q", "(method) i1.foo(a: number): number (+1 overload)", "foo 1")
	f.GoToMarker(t, "25")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foo 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "25q", "(method) i1.foo(b: string): number (+1 overload)", "foo 2")
	f.GoToMarker(t, "26")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "26q", "(method) i1.foo2(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "27")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foo2 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "27q", "(method) i1.foo2(b: string): number (+1 overload)", "foo2 2")
	f.GoToMarker(t, "28")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "28q", "(method) i1.foo3(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "29")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "29q", "(method) i1.foo3(b: string): number (+1 overload)", "")
	f.GoToMarker(t, "30")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "foo4 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "30q", "(method) i1.foo4(a: number): number (+1 overload)", "foo4 1")
	f.GoToMarker(t, "31")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "31q", "(method) i1.foo4(b: string): number (+1 overload)", "foo4 1")
	f.GoToMarker(t, "32")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "new 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "32q", "var i2_i: i2\nnew (b: number) => any (+1 overload)", "new 2")
	f.GoToMarker(t, "33")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "33q", "var i2_i: i2\nnew (a: string) => any (+1 overload)", "")
	f.GoToMarker(t, "34")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "34q", "var i2_i: i2\n(a: number) => number (+1 overload)", "")
	f.GoToMarker(t, "35")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "35q", "var i2_i: i2\n(b: string) => number (+1 overload)", "this is signature 2")
	f.GoToMarker(t, "36")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "new 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "36q", "var i3_i: i3\nnew (b: number) => any (+1 overload)", "new 2")
	f.GoToMarker(t, "37")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "new 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "37q", "var i3_i: i3\nnew (a: string) => any (+1 overload)", "new 1")
	f.GoToMarker(t, "38")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "this is signature 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "38q", "var i3_i: i3\n(a: number) => number (+1 overload)", "this is signature 1")
	f.GoToMarker(t, "39")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "39q", "var i3_i: i3\n(b: string) => number (+1 overload)", "this is signature 1")
	f.GoToMarker(t, "40")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "40q", "var i4_i: i4\nnew (b: number) => any (+1 overload)", "")
	f.GoToMarker(t, "41")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "41q", "var i4_i: i4\nnew (a: string) => any (+1 overload)", "")
	f.GoToMarker(t, "42")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "42q", "var i4_i: i4\n(a: number) => number (+1 overload)", "")
	f.GoToMarker(t, "43")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "43q", "var i4_i: i4\n(b: string) => number (+1 overload)", "")
	f.VerifyCompletions(t, "44", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Exact: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "prop1",
					Detail: PtrTo("(method) c.prop1(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "prop2",
					Detail: PtrTo("(method) c.prop2(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "prop2 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "prop3",
					Detail: PtrTo("(method) c.prop3(a: number): number (+1 overload)"),
				},
				&lsproto.CompletionItem{
					Label:  "prop4",
					Detail: PtrTo("(method) c.prop4(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "prop4 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "prop5",
					Detail: PtrTo("(method) c.prop5(a: number): number (+1 overload)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "prop5 1",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "45")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "45q", "(method) c.prop1(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "46")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "46q", "(method) c.prop1(b: string): number (+1 overload)", "")
	f.GoToMarker(t, "47")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop2 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "47q", "(method) c.prop2(a: number): number (+1 overload)", "prop2 1")
	f.GoToMarker(t, "48")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "48q", "(method) c.prop2(b: string): number (+1 overload)", "prop2 1")
	f.GoToMarker(t, "49")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "49q", "(method) c.prop3(a: number): number (+1 overload)", "")
	f.GoToMarker(t, "50")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop3 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "50q", "(method) c.prop3(b: string): number (+1 overload)", "prop3 2")
	f.GoToMarker(t, "51")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop4 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "51q", "(method) c.prop4(a: number): number (+1 overload)", "prop4 1")
	f.GoToMarker(t, "52")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop4 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "52q", "(method) c.prop4(b: string): number (+1 overload)", "prop4 2")
	f.GoToMarker(t, "53")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop5 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "53q", "(method) c.prop5(a: number): number (+1 overload)", "prop5 1")
	f.GoToMarker(t, "54")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "prop5 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "54q", "(method) c.prop5(b: string): number (+1 overload)", "prop5 2")
	f.GoToMarker(t, "55")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "55q", "constructor c1(a: number): c1 (+1 overload)", "")
	f.GoToMarker(t, "56")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "56q", "constructor c1(b: string): c1 (+1 overload)", "")
	f.GoToMarker(t, "57")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "57q", "constructor c2(a: number): c2 (+1 overload)", "c2 1")
	f.GoToMarker(t, "58")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "58q", "constructor c2(b: string): c2 (+1 overload)", "c2 1")
	f.GoToMarker(t, "59")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "59q", "constructor c3(a: number): c3 (+1 overload)", "")
	f.GoToMarker(t, "60")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c3 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "60q", "constructor c3(b: string): c3 (+1 overload)", "c3 2")
	f.GoToMarker(t, "61")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c4 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "61q", "constructor c4(a: number): c4 (+1 overload)", "c4 1")
	f.GoToMarker(t, "62")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c4 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "62q", "constructor c4(b: string): c4 (+1 overload)", "c4 2")
	f.GoToMarker(t, "63")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c5 1", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "63q", "constructor c5(a: number): c5 (+1 overload)", "c5 1")
	f.GoToMarker(t, "64")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c5 2", OverloadsCount: 2})
	f.VerifyQuickInfoAt(t, "64q", "constructor c5(b: string): c5 (+1 overload)", "c5 2")
	f.VerifyCompletions(t, "65", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c",
					Detail: PtrTo("class c"),
				},
				&lsproto.CompletionItem{
					Label:  "c1",
					Detail: PtrTo("class c1"),
				},
				&lsproto.CompletionItem{
					Label:  "c2",
					Detail: PtrTo("class c2"),
				},
				&lsproto.CompletionItem{
					Label:  "c3",
					Detail: PtrTo("class c3"),
				},
				&lsproto.CompletionItem{
					Label:  "c4",
					Detail: PtrTo("class c4"),
				},
				&lsproto.CompletionItem{
					Label:  "c5",
					Detail: PtrTo("class c5"),
				},
				&lsproto.CompletionItem{
					Label:  "c_i",
					Detail: PtrTo("var c_i: c"),
				},
				&lsproto.CompletionItem{
					Label:  "c1_i_1",
					Detail: PtrTo("var c1_i_1: c1"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_i_1",
					Detail: PtrTo("var c2_i_1: c2"),
				},
				&lsproto.CompletionItem{
					Label:  "c3_i_1",
					Detail: PtrTo("var c3_i_1: c3"),
				},
				&lsproto.CompletionItem{
					Label:  "c4_i_1",
					Detail: PtrTo("var c4_i_1: c4"),
				},
				&lsproto.CompletionItem{
					Label:  "c5_i_1",
					Detail: PtrTo("var c5_i_1: c5"),
				},
				&lsproto.CompletionItem{
					Label:  "c1_i_2",
					Detail: PtrTo("var c1_i_2: c1"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_i_2",
					Detail: PtrTo("var c2_i_2: c2"),
				},
				&lsproto.CompletionItem{
					Label:  "c3_i_2",
					Detail: PtrTo("var c3_i_2: c3"),
				},
				&lsproto.CompletionItem{
					Label:  "c4_i_2",
					Detail: PtrTo("var c4_i_2: c4"),
				},
				&lsproto.CompletionItem{
					Label:  "c5_i_2",
					Detail: PtrTo("var c5_i_2: c5"),
				},
				&lsproto.CompletionItem{
					Label:  "multiOverload",
					Detail: PtrTo("function multiOverload(a: number): string (+2 overloads)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "This is multiOverload F1 1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "ambientF1",
					Detail: PtrTo("function ambientF1(a: number): string (+2 overloads)"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "This is ambient F1 1",
						},
					},
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "66", "var c1_i_1: c1", "")
	f.VerifyQuickInfoAt(t, "67", "var c2_i_2: c2", "")
	f.VerifyQuickInfoAt(t, "68", "var c3_i_2: c3", "")
	f.VerifyQuickInfoAt(t, "69", "var c4_i_1: c4", "")
	f.VerifyQuickInfoAt(t, "70", "var c5_i_1: c5", "")
	f.VerifyQuickInfoAt(t, "71", "function multiOverload(a: number): string (+2 overloads)", "This is multiOverload F1 1")
	f.VerifyQuickInfoAt(t, "72", "function multiOverload(b: string): string (+2 overloads)", "This is multiOverload F1 2")
	f.VerifyQuickInfoAt(t, "73", "function multiOverload(c: boolean): string (+2 overloads)", "This is multiOverload F1 3")
	f.VerifyQuickInfoAt(t, "74", "function ambientF1(a: number): string (+2 overloads)", "This is ambient F1 1")
	f.VerifyQuickInfoAt(t, "75", "function ambientF1(b: string): string (+2 overloads)", "This is ambient F1 2")
	f.VerifyQuickInfoAt(t, "76", "function ambientF1(c: boolean): boolean (+2 overloads)", "This is ambient F1 3")
	f.VerifyQuickInfoAt(t, "77", "(parameter) aa: i3", "")
	f.VerifyQuickInfoAt(t, "78", "constructor c1(a: number): c1 (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "79", "constructor c1(b: string): c1 (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "80", "constructor c1(a: number): c1 (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "81", "constructor c2(a: number): c2 (+1 overload)", "c2 1")
	f.VerifyQuickInfoAt(t, "82", "constructor c2(b: string): c2 (+1 overload)", "c2 1")
	f.VerifyQuickInfoAt(t, "83", "constructor c2(a: number): c2 (+1 overload)", "c2 1")
	f.VerifyQuickInfoAt(t, "84", "constructor c3(a: number): c3 (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "85", "constructor c3(b: string): c3 (+1 overload)", "c3 2")
	f.VerifyQuickInfoAt(t, "86", "constructor c3(a: number): c3 (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "87", "constructor c4(a: number): c4 (+1 overload)", "c4 1")
	f.VerifyQuickInfoAt(t, "88", "constructor c4(b: string): c4 (+1 overload)", "c4 2")
	f.VerifyQuickInfoAt(t, "89", "constructor c4(a: number): c4 (+1 overload)", "c4 1")
	f.VerifyQuickInfoAt(t, "90", "constructor c5(a: number): c5 (+1 overload)", "c5 1")
	f.VerifyQuickInfoAt(t, "91", "constructor c5(b: string): c5 (+1 overload)", "c5 2")
	f.VerifyQuickInfoAt(t, "92", "constructor c5(a: number): c5 (+1 overload)", "c5 1")
	f.VerifyQuickInfoAt(t, "93", "(method) c.prop1(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "94", "(method) c.prop1(b: string): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "95", "(method) c.prop1(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "96", "(method) c.prop2(a: number): number (+1 overload)", "prop2 1")
	f.VerifyQuickInfoAt(t, "97", "(method) c.prop2(b: string): number (+1 overload)", "prop2 1")
	f.VerifyQuickInfoAt(t, "98", "(method) c.prop2(a: number): number (+1 overload)", "prop2 1")
	f.VerifyQuickInfoAt(t, "99", "(method) c.prop3(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "100", "(method) c.prop3(b: string): number (+1 overload)", "prop3 2")
	f.VerifyQuickInfoAt(t, "101", "(method) c.prop3(a: number): number (+1 overload)", "")
	f.VerifyQuickInfoAt(t, "102", "(method) c.prop4(a: number): number (+1 overload)", "prop4 1")
	f.VerifyQuickInfoAt(t, "103", "(method) c.prop4(b: string): number (+1 overload)", "prop4 2")
	f.VerifyQuickInfoAt(t, "104", "(method) c.prop4(a: number): number (+1 overload)", "prop4 1")
	f.VerifyQuickInfoAt(t, "105", "(method) c.prop5(a: number): number (+1 overload)", "prop5 1")
	f.VerifyQuickInfoAt(t, "106", "(method) c.prop5(b: string): number (+1 overload)", "prop5 2")
	f.VerifyQuickInfoAt(t, "107", "(method) c.prop5(a: number): number (+1 overload)", "prop5 1")
}
