package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCommentsInheritanceFourslash(t *testing.T) {
	fourslash.SkipIfFailing(t)
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/** i1 is interface with properties*/
interface i1 {
    /** i1_p1*/
    i1_p1: number;
    /** i1_f1*/
    i1_f1(): void;
    /** i1_l1*/
    i1_l1: () => void;
    i1_nc_p1: number;
    i1_nc_f1(): void;
    i1_nc_l1: () => void;
    p1: number;
    f1(): void;
    l1: () => void;
    nc_p1: number;
    nc_f1(): void;
    nc_l1: () => void;
}
class c1 implements i1 {
    public i1_p1: number;
    public i1_f1() {
    }
    public i1_l1: () => void;
    public i1_nc_p1: number;
    public i1_nc_f1() {
    }
    public i1_nc_l1: () => void;
    /** c1_p1*/
    public p1: number;
    /** c1_f1*/
    public f1() {
    }
    /** c1_l1*/
    public l1: () => void;
    /** c1_nc_p1*/
    public nc_p1: number;
    /** c1_nc_f1*/
    public nc_f1() {
    }
    /** c1_nc_l1*/
    public nc_l1: () => void;
}
var i1/*1iq*/_i: /*16i*/i1;
i1_i./*1*/i/*2q*/1_f1(/*2*/);
i1_i.i1_n/*3q*/c_f1(/*3*/);
i1_i.f/*4q*/1(/*4*/);
i1_i.nc/*5q*/_f1(/*5*/);
i1_i.i1/*l2q*/_l1(/*l2*/);
i1_i.i1_/*l3q*/nc_l1(/*l3*/);
i1_i.l/*l4q*/1(/*l4*/);
i1_i.nc/*l5q*/_l1(/*l5*/);
var c1/*6iq*/_i = new c1();
c1_i./*6*/i1/*7q*/_f1(/*7*/);
c1_i.i1_nc/*8q*/_f1(/*8*/);
c1_i.f/*9q*/1(/*9*/);
c1_i.nc/*10q*/_f1(/*10*/);
c1_i.i1/*l7q*/_l1(/*l7*/);
c1_i.i1_n/*l8q*/c_l1(/*l8*/);
c1_i.l/*l9q*/1(/*l9*/);
c1_i.nc/*l10q*/_l1(/*l10*/);
// assign to interface
i1_i = c1_i;
i1_i./*11*/i1/*12q*/_f1(/*12*/);
i1_i.i1_nc/*13q*/_f1(/*13*/);
i1_i.f/*14q*/1(/*14*/);
i1_i.nc/*15q*/_f1(/*15*/);
i1_i.i1/*l12q*/_l1(/*l12*/);
i1_i.i1/*l13q*/_nc_l1(/*l13*/);
i1_i.l/*l14q*/1(/*l14*/);
i1_i.nc/*l15q*/_l1(/*l15*/);
/*16*/
class c2 {
    /** c2 c2_p1*/
    public c2_p1: number;
    /** c2 c2_f1*/
    public c2_f1() {
    }
    /** c2 c2_prop*/
    public get c2_prop() {
        return 10;
    }
    public c2_nc_p1: number;
    public c2_nc_f1() {
    }
    public get c2_nc_prop() {
        return 10;
    }
    /** c2 p1*/
    public p1: number;
    /** c2 f1*/
    public f1() {
    }
    /** c2 prop*/
    public get prop() {
        return 10;
    }
    public nc_p1: number;
    public nc_f1() {
    }
    public get nc_prop() {
        return 10;
    }
    /** c2 constructor*/
    constr/*55*/uctor(a: number) {
        this.c2_p1 = a;
    }
}
class c3 extends c2 {
    cons/*56*/tructor() {
        su/*18sq*/per(10);
        this.p1 = s/*18spropq*/uper./*18spropProp*/c2_p1;
    }
    /** c3 p1*/
    public p1: number;
    /** c3 f1*/
    public f1() {
    }
    /** c3 prop*/
    public get prop() {
        return 10;
    }
    public nc_p1: number;
    public nc_f1() {
    }
    public get nc_prop() {
        return 10;
    }
}
var c/*17iq*/2_i = new c/*17q*/2(/*17*/10);
var c/*18iq*/3_i = new c/*18q*/3(/*18*/);
c2_i./*19*/c2/*20q*/_f1(/*20*/);
c2_i.c2_nc/*21q*/_f1(/*21*/);
c2_i.f/*22q*/1(/*22*/);
c2_i.nc/*23q*/_f1(/*23*/);
c3_i./*24*/c2/*25q*/_f1(/*25*/);
c3_i.c2_nc/*26q*/_f1(/*26*/);
c3_i.f/*27q*/1(/*27*/);
c3_i.nc/*28q*/_f1(/*28*/);
// assign
c2_i = c3_i;
c2_i./*29*/c2/*30q*/_f1(/*30*/);
c2_i.c2_nc_/*31q*/f1(/*31*/);
c2_i.f/*32q*/1(/*32*/);
c2_i.nc/*33q*/_f1(/*33*/);
class c4 extends c2 {
}
var c4/*34iq*/_i = new c/*34q*/4(/*34*/10);
/*35*/
interface i2 {
    /** i2_p1*/
    i2_p1: number;
    /** i2_f1*/
    i2_f1(): void;
    /** i2_l1*/
    i2_l1: () => void;
    i2_nc_p1: number;
    i2_nc_f1(): void;
    i2_nc_l1: () => void;
    /** i2 p1*/
    p1: number;
    /** i2 f1*/
    f1(): void;
    /** i2 l1*/
    l1: () => void;
    nc_p1: number;
    nc_f1(): void;
    nc_l1: () => void;
}
interface i3 extends i2 {
    /** i3 p1*/
    p1: number;
    /** i3 f1*/
    f1(): void;
    /** i3 l1*/
    l1: () => void;
    nc_p1: number;
    nc_f1(): void;
    nc_l1: () => void;
}
var i2/*36iq*/_i: /*51i*/i2;
var i3/*37iq*/_i: i3;
i2_i./*36*/i2/*37q*/_f1(/*37*/);
i2_i.i2_n/*38q*/c_f1(/*38*/);
i2_i.f/*39q*/1(/*39*/);
i2_i.nc/*40q*/_f1(/*40*/);
i2_i.i2_/*l37q*/l1(/*l37*/);
i2_i.i2_nc/*l38q*/_l1(/*l38*/);
i2_i.l/*l39q*/1(/*l39*/);
i2_i.nc_/*l40q*/l1(/*l40*/);
i3_i./*41*/i2_/*42q*/f1(/*42*/);
i3_i.i2_nc/*43q*/_f1(/*43*/);
i3_i.f/*44q*/1(/*44*/);
i3_i.nc_/*45q*/f1(/*45*/);
i3_i.i2_/*l42q*/l1(/*l42*/);
i3_i.i2_nc/*l43q*/_l1(/*l43*/);
i3_i.l/*l44q*/1(/*l44*/);
i3_i.nc_/*l45q*/l1(/*l45*/);
// assign to interface
i2_i = i3_i;
i2_i./*46*/i2/*47q*/_f1(/*47*/);
i2_i.i2_nc_/*48q*/f1(/*48*/);
i2_i.f/*49q*/1(/*49*/);
i2_i.nc/*50q*/_f1(/*50*/);
i2_i.i2_/*l47q*/l1(/*l47*/);
i2_i.i2_nc/*l48q*/_l1(/*l48*/);
i2_i.l/*l49q*/1(/*l49*/);
i2_i.nc_/*l50q*/l1(/*l50*/);
/*51*/
/**c5 class*/
class c5 {
    public b: number;
}
class c6 extends c5 {
    public d;
    const/*57*/ructor() {
        /*52*/super();
        this.d = /*53*/super./*54*/b;
    }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCompletions(t, []string{"1", "11"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1_p1",
					Detail: PtrTo("(property) i1.i1_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_f1",
					Detail: PtrTo("(method) i1.i1_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_l1",
					Detail: PtrTo("(property) i1.i1_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_p1",
					Detail: PtrTo("(property) i1.i1_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_f1",
					Detail: PtrTo("(method) i1.i1_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_l1",
					Detail: PtrTo("(property) i1.i1_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) i1.p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) i1.f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) i1.l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) i1.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) i1.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) i1.nc_l1: () => void"),
				},
			},
		},
	})
	f.GoToMarker(t, "2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i1_f1"})
	f.GoToMarker(t, "3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l2")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l3")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l4")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l5")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "1iq", "var i1_i: i1", "")
	f.VerifyQuickInfoAt(t, "2q", "(method) i1.i1_f1(): void", "i1_f1")
	f.VerifyQuickInfoAt(t, "3q", "(method) i1.i1_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "4q", "(method) i1.f1(): void", "")
	f.VerifyQuickInfoAt(t, "5q", "(method) i1.nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "l2q", "(property) i1.i1_l1: () => void", "i1_l1")
	f.VerifyQuickInfoAt(t, "l3q", "(property) i1.i1_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l4q", "(property) i1.l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l5q", "(property) i1.nc_l1: () => void", "")
	f.VerifyCompletions(t, "6", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1_p1",
					Detail: PtrTo("(property) c1.i1_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_f1",
					Detail: PtrTo("(method) c1.i1_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_l1",
					Detail: PtrTo("(property) c1.i1_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_p1",
					Detail: PtrTo("(property) c1.i1_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_f1",
					Detail: PtrTo("(method) c1.i1_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_l1",
					Detail: PtrTo("(property) c1.i1_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) c1.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) c1.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) c1.l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) c1.nc_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_nc_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) c1.nc_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_nc_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) c1.nc_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c1_nc_l1",
						},
					},
				},
			},
		},
	})
	f.GoToMarker(t, "7")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i1_f1"})
	f.GoToMarker(t, "9")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c1_f1"})
	f.GoToMarker(t, "10")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c1_nc_f1"})
	f.GoToMarker(t, "l9")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c1_l1"})
	f.GoToMarker(t, "l10")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c1_nc_l1"})
	f.GoToMarker(t, "8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l7")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l8")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "6iq", "var c1_i: c1", "")
	f.VerifyQuickInfoAt(t, "7q", "(method) c1.i1_f1(): void", "i1_f1")
	f.VerifyQuickInfoAt(t, "8q", "(method) c1.i1_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "9q", "(method) c1.f1(): void", "c1_f1")
	f.VerifyQuickInfoAt(t, "10q", "(method) c1.nc_f1(): void", "c1_nc_f1")
	f.VerifyQuickInfoAt(t, "l7q", "(property) c1.i1_l1: () => void", "i1_l1")
	f.VerifyQuickInfoAt(t, "l8q", "(property) c1.i1_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l9q", "(property) c1.l1: () => void", "c1_l1")
	f.VerifyQuickInfoAt(t, "l10q", "(property) c1.nc_l1: () => void", "c1_nc_l1")
	f.VerifyCompletions(t, "11", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i1_p1",
					Detail: PtrTo("(property) i1.i1_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_f1",
					Detail: PtrTo("(method) i1.i1_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_l1",
					Detail: PtrTo("(property) i1.i1_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i1_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_p1",
					Detail: PtrTo("(property) i1.i1_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_f1",
					Detail: PtrTo("(method) i1.i1_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i1_nc_l1",
					Detail: PtrTo("(property) i1.i1_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) i1.p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) i1.f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) i1.l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) i1.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) i1.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) i1.nc_l1: () => void"),
				},
			},
		},
	})
	f.GoToMarker(t, "12")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i1_f1"})
	f.GoToMarker(t, "13")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "14")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "15")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l12")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l13")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l14")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l15")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "12q", "(method) i1.i1_f1(): void", "i1_f1")
	f.VerifyQuickInfoAt(t, "13q", "(method) i1.i1_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "14q", "(method) i1.f1(): void", "")
	f.VerifyQuickInfoAt(t, "15q", "(method) i1.nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "l12q", "(property) i1.i1_l1: () => void", "i1_l1")
	f.VerifyQuickInfoAt(t, "l13q", "(property) i1.i1_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l14q", "(property) i1.l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l15q", "(property) i1.nc_l1: () => void", "")
	f.VerifyCompletions(t, "16", &fourslash.CompletionsExpectedList{
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
					Label:  "c1",
					Detail: PtrTo("class c1"),
				},
				&lsproto.CompletionItem{
					Label:  "c1_i",
					Detail: PtrTo("var c1_i: c1"),
				},
			},
			Excludes: []string{
				"i1",
			},
		},
	})
	f.VerifyCompletions(t, "16i", &fourslash.CompletionsExpectedList{
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
							Value: "i1 is interface with properties",
						},
					},
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "17iq", "var c2_i: c2", "")
	f.VerifyQuickInfoAt(t, "18iq", "var c3_i: c3", "")
	f.GoToMarker(t, "17")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 constructor"})
	f.GoToMarker(t, "18")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "18sq", "constructor c2(a: number): c2", "c2 constructor")
	f.VerifyQuickInfoAt(t, "18spropq", "class c2", "")
	f.VerifyQuickInfoAt(t, "18spropProp", "(property) c2.c2_p1: number", "c2 c2_p1")
	f.VerifyQuickInfoAt(t, "17q", "constructor c2(a: number): c2", "c2 constructor")
	f.VerifyQuickInfoAt(t, "18q", "constructor c3(): c3", "")
	f.VerifyCompletions(t, []string{"19", "29"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c2_p1",
					Detail: PtrTo("(property) c2.c2_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_f1",
					Detail: PtrTo("(method) c2.c2_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_prop",
					Detail: PtrTo("(property) c2.c2_prop: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_prop",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_p1",
					Detail: PtrTo("(property) c2.c2_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_f1",
					Detail: PtrTo("(method) c2.c2_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_prop",
					Detail: PtrTo("(property) c2.c2_nc_prop: number"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) c2.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) c2.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "prop",
					Detail: PtrTo("(property) c2.prop: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 prop",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) c2.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) c2.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_prop",
					Detail: PtrTo("(property) c2.nc_prop: number"),
				},
			},
		},
	})
	f.GoToMarker(t, "20")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 c2_f1"})
	f.GoToMarker(t, "22")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 f1"})
	f.GoToMarker(t, "21")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "23")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "20q", "(method) c2.c2_f1(): void", "c2 c2_f1")
	f.VerifyQuickInfoAt(t, "21q", "(method) c2.c2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "22q", "(method) c2.f1(): void", "c2 f1")
	f.VerifyQuickInfoAt(t, "23q", "(method) c2.nc_f1(): void", "")
	f.VerifyCompletions(t, "24", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c2_p1",
					Detail: PtrTo("(property) c2.c2_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_f1",
					Detail: PtrTo("(method) c2.c2_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_prop",
					Detail: PtrTo("(property) c2.c2_prop: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c2 c2_prop",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_p1",
					Detail: PtrTo("(property) c2.c2_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_f1",
					Detail: PtrTo("(method) c2.c2_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_nc_prop",
					Detail: PtrTo("(property) c2.c2_nc_prop: number"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) c3.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c3 p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) c3.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c3 f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "prop",
					Detail: PtrTo("(property) c3.prop: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "c3 prop",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) c3.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) c3.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_prop",
					Detail: PtrTo("(property) c3.nc_prop: number"),
				},
			},
		},
	})
	f.GoToMarker(t, "25")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 c2_f1"})
	f.GoToMarker(t, "27")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c3 f1"})
	f.GoToMarker(t, "26")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "28")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "25q", "(method) c2.c2_f1(): void", "c2 c2_f1")
	f.VerifyQuickInfoAt(t, "26q", "(method) c2.c2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "27q", "(method) c3.f1(): void", "c3 f1")
	f.VerifyQuickInfoAt(t, "28q", "(method) c3.nc_f1(): void", "")
	f.GoToMarker(t, "30")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 c2_f1"})
	f.GoToMarker(t, "32")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 f1"})
	f.GoToMarker(t, "31")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "33")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "30q", "(method) c2.c2_f1(): void", "c2 c2_f1")
	f.VerifyQuickInfoAt(t, "31q", "(method) c2.c2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "32q", "(method) c2.f1(): void", "c2 f1")
	f.VerifyQuickInfoAt(t, "33q", "(method) c2.nc_f1(): void", "")
	f.GoToMarker(t, "34")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "c2 constructor"})
	f.VerifyQuickInfoAt(t, "34iq", "var c4_i: c4", "")
	f.VerifyQuickInfoAt(t, "34q", "constructor c4(a: number): c4", "c2 constructor")
	f.VerifyCompletions(t, "35", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "c2",
					Detail: PtrTo("class c2"),
				},
				&lsproto.CompletionItem{
					Label:  "c2_i",
					Detail: PtrTo("var c2_i: c2"),
				},
				&lsproto.CompletionItem{
					Label:  "c3",
					Detail: PtrTo("class c3"),
				},
				&lsproto.CompletionItem{
					Label:  "c3_i",
					Detail: PtrTo("var c3_i: c3"),
				},
				&lsproto.CompletionItem{
					Label:  "c4",
					Detail: PtrTo("class c4"),
				},
				&lsproto.CompletionItem{
					Label:  "c4_i",
					Detail: PtrTo("var c4_i: c4"),
				},
			},
		},
	})
	f.VerifyCompletions(t, []string{"36", "46"}, &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i2_p1",
					Detail: PtrTo("(property) i2.i2_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_f1",
					Detail: PtrTo("(method) i2.i2_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_l1",
					Detail: PtrTo("(property) i2.i2_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_p1",
					Detail: PtrTo("(property) i2.i2_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_f1",
					Detail: PtrTo("(method) i2.i2_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_l1",
					Detail: PtrTo("(property) i2.i2_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) i2.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) i2.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) i2.l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) i2.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) i2.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) i2.nc_l1: () => void"),
				},
			},
		},
	})
	f.GoToMarker(t, "37")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i2_f1"})
	f.GoToMarker(t, "39")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i2 f1"})
	f.GoToMarker(t, "38")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "40")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l37")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l37")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l39")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l40")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "36iq", "var i2_i: i2", "")
	f.VerifyQuickInfoAt(t, "37iq", "var i3_i: i3", "")
	f.VerifyQuickInfoAt(t, "37q", "(method) i2.i2_f1(): void", "i2_f1")
	f.VerifyQuickInfoAt(t, "38q", "(method) i2.i2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "39q", "(method) i2.f1(): void", "i2 f1")
	f.VerifyQuickInfoAt(t, "40q", "(method) i2.nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "l37q", "(property) i2.i2_l1: () => void", "i2_l1")
	f.VerifyQuickInfoAt(t, "l38q", "(property) i2.i2_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l39q", "(property) i2.l1: () => void", "i2 l1")
	f.VerifyQuickInfoAt(t, "l40q", "(property) i2.nc_l1: () => void", "")
	f.VerifyCompletions(t, "41", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i2_p1",
					Detail: PtrTo("(property) i2.i2_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_f1",
					Detail: PtrTo("(method) i2.i2_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_l1",
					Detail: PtrTo("(property) i2.i2_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_p1",
					Detail: PtrTo("(property) i2.i2_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_f1",
					Detail: PtrTo("(method) i2.i2_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_l1",
					Detail: PtrTo("(property) i2.i2_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) i3.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i3 p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) i3.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i3 f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) i3.l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i3 l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) i3.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) i3.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) i3.nc_l1: () => void"),
				},
			},
		},
	})
	f.GoToMarker(t, "42")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i2_f1"})
	f.GoToMarker(t, "44")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i3 f1"})
	f.GoToMarker(t, "43")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "45")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l42")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l43")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l44")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l45")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "42q", "(method) i2.i2_f1(): void", "i2_f1")
	f.VerifyQuickInfoAt(t, "43q", "(method) i2.i2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "44q", "(method) i3.f1(): void", "i3 f1")
	f.VerifyQuickInfoAt(t, "45q", "(method) i3.nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "l42q", "(property) i2.i2_l1: () => void", "i2_l1")
	f.VerifyQuickInfoAt(t, "l43q", "(property) i2.i2_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l44q", "(property) i3.l1: () => void", "i3 l1")
	f.VerifyQuickInfoAt(t, "l45q", "(property) i3.nc_l1: () => void", "")
	f.VerifyCompletions(t, "46", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i2_p1",
					Detail: PtrTo("(property) i2.i2_p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_f1",
					Detail: PtrTo("(method) i2.i2_f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_l1",
					Detail: PtrTo("(property) i2.i2_l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2_l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_p1",
					Detail: PtrTo("(property) i2.i2_nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_f1",
					Detail: PtrTo("(method) i2.i2_nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "i2_nc_l1",
					Detail: PtrTo("(property) i2.i2_nc_l1: () => void"),
				},
				&lsproto.CompletionItem{
					Label:  "p1",
					Detail: PtrTo("(property) i2.p1: number"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 p1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "f1",
					Detail: PtrTo("(method) i2.f1(): void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 f1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "l1",
					Detail: PtrTo("(property) i2.l1: () => void"),
					Documentation: &lsproto.StringOrMarkupContent{
						MarkupContent: &lsproto.MarkupContent{
							Kind:  lsproto.MarkupKindMarkdown,
							Value: "i2 l1",
						},
					},
				},
				&lsproto.CompletionItem{
					Label:  "nc_p1",
					Detail: PtrTo("(property) i2.nc_p1: number"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_f1",
					Detail: PtrTo("(method) i2.nc_f1(): void"),
				},
				&lsproto.CompletionItem{
					Label:  "nc_l1",
					Detail: PtrTo("(property) i2.nc_l1: () => void"),
				},
			},
		},
	})
	f.GoToMarker(t, "47")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i2_f1"})
	f.GoToMarker(t, "49")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: "i2 f1"})
	f.GoToMarker(t, "48")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l47")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l48")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l49")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.GoToMarker(t, "l50")
	f.VerifySignatureHelp(t, fourslash.VerifySignatureHelpOptions{DocComment: ""})
	f.VerifyQuickInfoAt(t, "47q", "(method) i2.i2_f1(): void", "i2_f1")
	f.VerifyQuickInfoAt(t, "48q", "(method) i2.i2_nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "49q", "(method) i2.f1(): void", "i2 f1")
	f.VerifyQuickInfoAt(t, "50q", "(method) i2.nc_f1(): void", "")
	f.VerifyQuickInfoAt(t, "l47q", "(property) i2.i2_l1: () => void", "i2_l1")
	f.VerifyQuickInfoAt(t, "l48q", "(property) i2.i2_nc_l1: () => void", "")
	f.VerifyQuickInfoAt(t, "l49q", "(property) i2.l1: () => void", "i2 l1")
	f.VerifyQuickInfoAt(t, "l40q", "(property) i2.nc_l1: () => void", "")
	f.VerifyCompletions(t, "51", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i2_i",
					Detail: PtrTo("var i2_i: i2"),
				},
				&lsproto.CompletionItem{
					Label:  "i3_i",
					Detail: PtrTo("var i3_i: i3"),
				},
			},
			Excludes: []string{
				"i2",
				"i3",
			},
		},
	})
	f.VerifyCompletions(t, "51i", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &DefaultCommitCharacters,
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				&lsproto.CompletionItem{
					Label:  "i2",
					Detail: PtrTo("interface i2"),
				},
				&lsproto.CompletionItem{
					Label:  "i3",
					Detail: PtrTo("interface i3"),
				},
			},
		},
	})
	f.VerifyQuickInfoAt(t, "52", "constructor c5(): c5", "c5 class")
	f.VerifyQuickInfoAt(t, "53", "class c5", "c5 class")
	f.VerifyQuickInfoAt(t, "54", "(property) c5.b: number", "")
	f.VerifyQuickInfoAt(t, "55", "constructor c2(a: number): c2", "c2 constructor")
	f.VerifyQuickInfoAt(t, "56", "constructor c3(): c3", "")
	f.VerifyQuickInfoAt(t, "57", "constructor c6(): c6", "")
}
