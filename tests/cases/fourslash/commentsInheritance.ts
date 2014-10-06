/// <reference path='fourslash.ts' />

/////** i1 is interface with properties*/
////interface i1 {
////    /** i1_p1*/
////    i1_p1: number;
////    /** i1_f1*/
////    i1_f1(): void;
////    /** i1_l1*/
////    i1_l1: () => void;
////    i1_nc_p1: number;
////    i1_nc_f1(): void;
////    i1_nc_l1: () => void;
////    p1: number;
////    f1(): void;
////    l1: () => void;
////    nc_p1: number;
////    nc_f1(): void;
////    nc_l1: () => void;
////}
////class c1 implements i1 {
////    public i1_p1: number;
////    public i1_f1() {
////    }
////    public i1_l1: () => void;
////    public i1_nc_p1: number;
////    public i1_nc_f1() {
////    }
////    public i1_nc_l1: () => void;
////    /** c1_p1*/
////    public p1: number;
////    /** c1_f1*/
////    public f1() {
////    }
////    /** c1_l1*/
////    public l1: () => void;
////    /** c1_nc_p1*/
////    public nc_p1: number;
////    /** c1_nc_f1*/
////    public nc_f1() {
////    }
////    /** c1_nc_l1*/
////    public nc_l1: () => void;
////}
////var i1/*1iq*/_i: i1;
////i1_i./*1*/i/*2q*/1_f1(/*2*/);
////i1_i.i1_n/*3q*/c_f1(/*3*/);
////i1_i.f/*4q*/1(/*4*/);
////i1_i.nc/*5q*/_f1(/*5*/);
////i1_i.i1/*l2q*/_l1(/*l2*/);
////i1_i.i1_/*l3q*/nc_l1(/*l3*/);
////i1_i.l/*l4q*/1(/*l4*/);
////i1_i.nc/*l5q*/_l1(/*l5*/);
////var c1/*6iq*/_i = new c1();
////c1_i./*6*/i1/*7q*/_f1(/*7*/);
////c1_i.i1_nc/*8q*/_f1(/*8*/);
////c1_i.f/*9q*/1(/*9*/);
////c1_i.nc/*10q*/_f1(/*10*/);
////c1_i.i1/*l7q*/_l1(/*l7*/);
////c1_i.i1_n/*l8q*/c_l1(/*l8*/);
////c1_i.l/*l9q*/1(/*l9*/);
////c1_i.nc/*l10q*/_l1(/*l10*/);
////// assign to interface
////i1_i = c1_i;
////i1_i./*11*/i1/*12q*/_f1(/*12*/);
////i1_i.i1_nc/*13q*/_f1(/*13*/);
////i1_i.f/*14q*/1(/*14*/);
////i1_i.nc/*15q*/_f1(/*15*/);
////i1_i.i1/*l12q*/_l1(/*l12*/);
////i1_i.i1/*l13q*/_nc_l1(/*l13*/);
////i1_i.l/*l14q*/1(/*l14*/);
////i1_i.nc/*l15q*/_l1(/*l15*/);
/////*16*/
////class c2 {
////    /** c2 c2_p1*/
////    public c2_p1: number;
////    /** c2 c2_f1*/
////    public c2_f1() {
////    }
////    /** c2 c2_prop*/
////    public get c2_prop() {
////        return 10;
////    }
////    public c2_nc_p1: number;
////    public c2_nc_f1() {
////    }
////    public get c2_nc_prop() {
////        return 10;
////    }
////    /** c2 p1*/
////    public p1: number;
////    /** c2 f1*/
////    public f1() {
////    }
////    /** c2 prop*/
////    public get prop() {
////        return 10;
////    }
////    public nc_p1: number;
////    public nc_f1() {
////    }
////    public get nc_prop() {
////        return 10;
////    }
////    /** c2 constructor*/
////    constr/*55*/uctor(a: number) {
////        this.c2_p1 = a;
////    }
////}
////class c3 extends c2 {
////    cons/*56*/tructor() {
////        su/*18sq*/per(10);
////        this.p1 = s/*18spropq*/uper./*18spropProp*/c2_p1;
////    }
////    /** c3 p1*/
////    public p1: number;
////    /** c3 f1*/
////    public f1() {
////    }
////    /** c3 prop*/
////    public get prop() {
////        return 10;
////    }
////    public nc_p1: number;
////    public nc_f1() {
////    }
////    public get nc_prop() {
////        return 10;
////    }
////}
////var c/*17iq*/2_i = new c/*17q*/2(/*17*/10);
////var c/*18iq*/3_i = new c/*18q*/3(/*18*/);
////c2_i./*19*/c2/*20q*/_f1(/*20*/);
////c2_i.c2_nc/*21q*/_f1(/*21*/);
////c2_i.f/*22q*/1(/*22*/);
////c2_i.nc/*23q*/_f1(/*23*/);
////c3_i./*24*/c2/*25q*/_f1(/*25*/);
////c3_i.c2_nc/*26q*/_f1(/*26*/);
////c3_i.f/*27q*/1(/*27*/);
////c3_i.nc/*28q*/_f1(/*28*/);
////// assign
////c2_i = c3_i;
////c2_i./*29*/c2/*30q*/_f1(/*30*/);
////c2_i.c2_nc_/*31q*/f1(/*31*/);
////c2_i.f/*32q*/1(/*32*/);
////c2_i.nc/*33q*/_f1(/*33*/);
////class c4 extends c2 {
////}
////var c4/*34iq*/_i = new c/*34q*/4(/*34*/10);
/////*35*/
////interface i2 {
////    /** i2_p1*/
////    i2_p1: number;
////    /** i2_f1*/
////    i2_f1(): void;
////    /** i2_l1*/
////    i2_l1: () => void;
////    i2_nc_p1: number;
////    i2_nc_f1(): void;
////    i2_nc_l1: () => void;
////    /** i2 p1*/
////    p1: number;
////    /** i2 f1*/
////    f1(): void;
////    /** i2 l1*/
////    l1: () => void;
////    nc_p1: number;
////    nc_f1(): void;
////    nc_l1: () => void;
////}
////interface i3 extends i2 {
////    /** i3 p1*/
////    p1: number;
////    /** i3 f1*/
////    f1(): void;
////    /** i3 l1*/
////    l1: () => void;
////    nc_p1: number;
////    nc_f1(): void;
////    nc_l1: () => void;
////}
////var i2/*36iq*/_i: i2;
////var i3/*37iq*/_i: i3;
////i2_i./*36*/i2/*37q*/_f1(/*37*/);
////i2_i.i2_n/*38q*/c_f1(/*38*/);
////i2_i.f/*39q*/1(/*39*/);
////i2_i.nc/*40q*/_f1(/*40*/);
////i2_i.i2_/*l37q*/l1(/*l37*/);
////i2_i.i2_nc/*l38q*/_l1(/*l38*/);
////i2_i.l/*l39q*/1(/*l39*/);
////i2_i.nc_/*l40q*/l1(/*l40*/);
////i3_i./*41*/i2_/*42q*/f1(/*42*/);
////i3_i.i2_nc/*43q*/_f1(/*43*/);
////i3_i.f/*44q*/1(/*44*/);
////i3_i.nc_/*45q*/f1(/*45*/);
////i3_i.i2_/*l42q*/l1(/*l42*/);
////i3_i.i2_nc/*l43q*/_l1(/*l43*/);
////i3_i.l/*l44q*/1(/*l44*/);
////i3_i.nc_/*l45q*/l1(/*l45*/);
////// assign to interface
////i2_i = i3_i;
////i2_i./*46*/i2/*47q*/_f1(/*47*/);
////i2_i.i2_nc_/*48q*/f1(/*48*/);
////i2_i.f/*49q*/1(/*49*/);
////i2_i.nc/*50q*/_f1(/*50*/);
////i2_i.i2_/*l47q*/l1(/*l47*/);
////i2_i.i2_nc/*l48q*/_l1(/*l48*/);
////i2_i.l/*l49q*/1(/*l49*/);
////i2_i.nc_/*l50q*/l1(/*l50*/);
/////*51*/
/////**c5 class*/
////class c5 {
////    public b: number;
////}
////class c6 extends c5 {
////    public d;
////    const/*57*/ructor() {
////        /*52*/super();
////        this.d = /*53*/super./*54*/b;
////    }
////}

goTo.marker('1');
verify.memberListContains("i1_p1", "(property) i1.i1_p1: number", "i1_p1");
verify.memberListContains("i1_f1", "(method) i1.i1_f1(): void", "i1_f1");
verify.memberListContains("i1_l1", "(property) i1.i1_l1: () => void", "i1_l1");
verify.memberListContains("i1_nc_p1", "(property) i1.i1_nc_p1: number", "");
verify.memberListContains("i1_nc_f1", "(method) i1.i1_nc_f1(): void", "");
verify.memberListContains("i1_nc_l1", "(property) i1.i1_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) i1.p1: number", "");
verify.memberListContains("f1", "(method) i1.f1(): void", "");
verify.memberListContains("l1", "(property) i1.l1: () => void", "");
verify.memberListContains("nc_p1", "(property) i1.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) i1.nc_f1(): void", "");
verify.memberListContains("nc_l1", "(property) i1.nc_l1: () => void", "");
goTo.marker('2');
verify.currentSignatureHelpDocCommentIs("i1_f1");
goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('4');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('5');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l2');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l3');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l4');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l5');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('1iq');
verify.quickInfoIs("(var) i1_i: i1", "");
goTo.marker('2q');
verify.quickInfoIs("(method) i1.i1_f1(): void", "i1_f1");
goTo.marker('3q');
verify.quickInfoIs("(method) i1.i1_nc_f1(): void", "");
goTo.marker('4q');
verify.quickInfoIs("(method) i1.f1(): void", "");
goTo.marker('5q');
verify.quickInfoIs("(method) i1.nc_f1(): void", "");
goTo.marker('l2q');
verify.quickInfoIs("(property) i1.i1_l1: () => void", "");
goTo.marker('l3q');
verify.quickInfoIs("(property) i1.i1_nc_l1: () => void", "");
goTo.marker('l4q');
verify.quickInfoIs("(property) i1.l1: () => void", "");
goTo.marker('l5q');
verify.quickInfoIs("(property) i1.nc_l1: () => void", "");

goTo.marker('6');
verify.memberListContains("i1_p1", "(property) c1.i1_p1: number", "");
verify.memberListContains("i1_f1", "(method) c1.i1_f1(): void", "");
verify.memberListContains("i1_l1", "(property) c1.i1_l1: () => void", "");
verify.memberListContains("i1_nc_p1", "(property) c1.i1_nc_p1: number", "");
verify.memberListContains("i1_nc_f1", "(method) c1.i1_nc_f1(): void", "");
verify.memberListContains("i1_nc_l1", "(property) c1.i1_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) c1.p1: number", "c1_p1");
verify.memberListContains("f1", "(method) c1.f1(): void", "c1_f1");
verify.memberListContains("l1", "(property) c1.l1: () => void", "c1_l1");
verify.memberListContains("nc_p1", "(property) c1.nc_p1: number", "c1_nc_p1");
verify.memberListContains("nc_f1", "(method) c1.nc_f1(): void", "c1_nc_f1");
verify.memberListContains("nc_l1", "(property) c1.nc_l1: () => void", "c1_nc_l1");
goTo.marker('7');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('9');
verify.currentSignatureHelpDocCommentIs("c1_f1");
goTo.marker('10');
verify.currentSignatureHelpDocCommentIs("c1_nc_f1");
goTo.marker('l7');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l8');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l9');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l10');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('6iq');
verify.quickInfoIs("(var) c1_i: c1", "");
goTo.marker('7q');
verify.quickInfoIs("(method) c1.i1_f1(): void", "");
goTo.marker('8q');
verify.quickInfoIs("(method) c1.i1_nc_f1(): void", "");
goTo.marker('9q');
verify.quickInfoIs("(method) c1.f1(): void", "c1_f1");
goTo.marker('10q');
verify.quickInfoIs("(method) c1.nc_f1(): void", "c1_nc_f1");
goTo.marker('l7q');
verify.quickInfoIs("(property) c1.i1_l1: () => void", "");
goTo.marker('l8q');
verify.quickInfoIs("(property) c1.i1_nc_l1: () => void", "");
goTo.marker('l9q');
verify.quickInfoIs("(property) c1.l1: () => void", "");
goTo.marker('l10q');
verify.quickInfoIs("(property) c1.nc_l1: () => void", "");

goTo.marker('11');
verify.memberListContains("i1_p1", "(property) i1.i1_p1: number", "i1_p1");
verify.memberListContains("i1_f1", "(method) i1.i1_f1(): void", "i1_f1");
verify.memberListContains("i1_l1", "(property) i1.i1_l1: () => void", "i1_l1");
verify.memberListContains("i1_nc_p1", "(property) i1.i1_nc_p1: number", "");
verify.memberListContains("i1_nc_f1", "(method) i1.i1_nc_f1(): void", "");
verify.memberListContains("i1_nc_l1", "(property) i1.i1_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) i1.p1: number", "");
verify.memberListContains("f1", "(method) i1.f1(): void", "");
verify.memberListContains("l1", "(property) i1.l1: () => void", "");
verify.memberListContains("nc_p1", "(property) i1.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) i1.nc_f1(): void", "");
verify.memberListContains("nc_l1", "(property) i1.nc_l1: () => void", "");
goTo.marker('12');
verify.currentSignatureHelpDocCommentIs("i1_f1");
goTo.marker('13');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('14');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('15');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l12');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l13');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l14');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l15');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('12q');
verify.quickInfoIs("(method) i1.i1_f1(): void", "i1_f1");
goTo.marker('13q');
verify.quickInfoIs("(method) i1.i1_nc_f1(): void", "");
goTo.marker('14q');
verify.quickInfoIs("(method) i1.f1(): void", "");
goTo.marker('15q');
verify.quickInfoIs("(method) i1.nc_f1(): void", "");
goTo.marker('l12q');
verify.quickInfoIs("(property) i1.i1_l1: () => void", "");
goTo.marker('l13q');
verify.quickInfoIs("(property) i1.i1_nc_l1: () => void", "");
goTo.marker('l14q');
verify.quickInfoIs("(property) i1.l1: () => void", "");
goTo.marker('l15q');
verify.quickInfoIs("(property) i1.nc_l1: () => void", "");

goTo.marker('16');
verify.completionListContains("i1", "interface i1", "i1 is interface with properties");
verify.completionListContains("i1_i", "(var) i1_i: i1", "");
verify.completionListContains("c1", "class c1", "");
verify.completionListContains("c1_i", "(var) c1_i: c1", "");

goTo.marker('17iq');
verify.quickInfoIs("(var) c2_i: c2", "");
goTo.marker('18iq');
verify.quickInfoIs("(var) c3_i: c3", "");

goTo.marker('17');
verify.currentSignatureHelpDocCommentIs("c2 constructor");

goTo.marker('18');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('18sq');
verify.quickInfoIs("(constructor) c2(a: number): c2", "c2 constructor");

goTo.marker('18spropq');
verify.quickInfoIs("class c2", "");
goTo.marker('18spropProp');
verify.quickInfoIs("(property) c2.c2_p1: number", "c2 c2_p1");

goTo.marker('17q');
verify.quickInfoIs("(constructor) c2(a: number): c2", "c2 constructor");
goTo.marker('18q');
verify.quickInfoIs("(constructor) c3(): c3", "");

goTo.marker('19');
verify.memberListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.memberListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.memberListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.memberListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.memberListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.memberListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number", "");
verify.memberListContains("p1", "(property) c2.p1: number", "c2 p1");
verify.memberListContains("f1", "(method) c2.f1(): void", "c2 f1");
verify.memberListContains("prop", "(property) c2.prop: number", "c2 prop");
verify.memberListContains("nc_p1", "(property) c2.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) c2.nc_f1(): void", "");
verify.memberListContains("nc_prop", "(property) c2.nc_prop: number", "");
goTo.marker('20');
verify.currentSignatureHelpDocCommentIs("c2 c2_f1");
goTo.marker('21');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('22');
verify.currentSignatureHelpDocCommentIs("c2 f1");
goTo.marker('23');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('20q');
verify.quickInfoIs("(method) c2.c2_f1(): void", "c2 c2_f1");
goTo.marker('21q');
verify.quickInfoIs("(method) c2.c2_nc_f1(): void", "");
goTo.marker('22q');
verify.quickInfoIs("(method) c2.f1(): void", "c2 f1");
goTo.marker('23q');
verify.quickInfoIs("(method) c2.nc_f1(): void", "");

goTo.marker('24');
verify.memberListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.memberListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.memberListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.memberListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.memberListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.memberListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number", "");
verify.memberListContains("p1", "(property) c3.p1: number", "c3 p1");
verify.memberListContains("f1", "(method) c3.f1(): void", "c3 f1");
verify.memberListContains("prop", "(property) c3.prop: number", "c3 prop");
verify.memberListContains("nc_p1", "(property) c3.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) c3.nc_f1(): void", "");
verify.memberListContains("nc_prop", "(property) c3.nc_prop: number", "");
goTo.marker('25');
verify.currentSignatureHelpDocCommentIs("c2 c2_f1");
goTo.marker('26');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('27');
verify.currentSignatureHelpDocCommentIs("c3 f1");
goTo.marker('28');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('25q');
verify.quickInfoIs("(method) c2.c2_f1(): void", "c2 c2_f1");
goTo.marker('26q');
verify.quickInfoIs("(method) c2.c2_nc_f1(): void", "");
goTo.marker('27q');
verify.quickInfoIs("(method) c3.f1(): void", "c3 f1");
goTo.marker('28q');
verify.quickInfoIs("(method) c3.nc_f1(): void", "");

goTo.marker('29');
verify.memberListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.memberListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.memberListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.memberListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.memberListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.memberListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number");
verify.memberListContains("p1", "(property) c2.p1: number", "c2 p1");
verify.memberListContains("f1", "(method) c2.f1(): void", "c2 f1");
verify.memberListContains("prop", "(property) c2.prop: number", "c2 prop");
verify.memberListContains("nc_p1", "(property) c2.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) c2.nc_f1(): void", "");
verify.memberListContains("nc_prop", "(property) c2.nc_prop: number", "");
goTo.marker('30');
verify.currentSignatureHelpDocCommentIs("c2 c2_f1");
goTo.marker('31');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('32');
verify.currentSignatureHelpDocCommentIs("c2 f1");
goTo.marker('33');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('30q');
verify.quickInfoIs("(method) c2.c2_f1(): void", "c2 c2_f1");
goTo.marker('31q');
verify.quickInfoIs("(method) c2.c2_nc_f1(): void", "");
goTo.marker('32q');
verify.quickInfoIs("(method) c2.f1(): void", "c2 f1");
goTo.marker('33q');
verify.quickInfoIs("(method) c2.nc_f1(): void", "");

goTo.marker('34');
verify.currentSignatureHelpDocCommentIs("c2 constructor");
goTo.marker('34iq');
verify.quickInfoIs("(var) c4_i: c4", "");
goTo.marker('34q');
verify.quickInfoIs("(constructor) c4(a: number): c4", "c2 constructor");

goTo.marker('35');
verify.completionListContains("c2", "class c2", "");
verify.completionListContains("c2_i", "(var) c2_i: c2", "");
verify.completionListContains("c3", "class c3", "");
verify.completionListContains("c3_i", "(var) c3_i: c3", "");
verify.completionListContains("c4", "class c4", "");
verify.completionListContains("c4_i", "(var) c4_i: c4", "");

goTo.marker('36');
verify.memberListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.memberListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.memberListContains("i2_l1", "(property) i2.i2_l1: () => void", "i2_l1");
verify.memberListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.memberListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.memberListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) i2.p1: number", "i2 p1");
verify.memberListContains("f1", "(method) i2.f1(): void", "i2 f1");
verify.memberListContains("l1", "(property) i2.l1: () => void", "i2 l1");
verify.memberListContains("nc_p1", "(property) i2.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) i2.nc_f1(): void", "");
verify.memberListContains("nc_l1", "(property) i2.nc_l1: () => void", "");
goTo.marker('37');
verify.currentSignatureHelpDocCommentIs("i2_f1");
goTo.marker('38');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('39');
verify.currentSignatureHelpDocCommentIs("i2 f1");
goTo.marker('40');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l37');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l38');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l39');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l40');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('36iq');
verify.quickInfoIs("(var) i2_i: i2", "");
goTo.marker('37iq');
verify.quickInfoIs("(var) i3_i: i3", "");
goTo.marker('37q');
verify.quickInfoIs("(method) i2.i2_f1(): void", "i2_f1");
goTo.marker('38q');
verify.quickInfoIs("(method) i2.i2_nc_f1(): void", "");
goTo.marker('39q');
verify.quickInfoIs("(method) i2.f1(): void", "i2 f1");
goTo.marker('40q');
verify.quickInfoIs("(method) i2.nc_f1(): void", "");
goTo.marker('l37q');
verify.quickInfoIs("(property) i2.i2_l1: () => void", "");
goTo.marker('l38q');
verify.quickInfoIs("(property) i2.i2_nc_l1: () => void", "");
goTo.marker('l39q');
verify.quickInfoIs("(property) i2.l1: () => void", "");
goTo.marker('l40q');
verify.quickInfoIs("(property) i2.nc_l1: () => void", "");

goTo.marker('41');
verify.memberListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.memberListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.memberListContains("i2_l1", "(property) i2.i2_l1: () => void", "i2_l1");
verify.memberListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.memberListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.memberListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) i3.p1: number", "i3 p1");
verify.memberListContains("f1", "(method) i3.f1(): void", "i3 f1");
verify.memberListContains("l1", "(property) i3.l1: () => void", "i3 l1");
verify.memberListContains("nc_p1", "(property) i3.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) i3.nc_f1(): void", "");
verify.memberListContains("nc_l1", "(property) i3.nc_l1: () => void", "");
goTo.marker('42');
verify.currentSignatureHelpDocCommentIs("i2_f1");
goTo.marker('43');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('44');
verify.currentSignatureHelpDocCommentIs("i3 f1");
goTo.marker('45');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l42');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l43');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l44');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l45');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('42q');
verify.quickInfoIs("(method) i2.i2_f1(): void", "i2_f1");
goTo.marker('43q');
verify.quickInfoIs("(method) i2.i2_nc_f1(): void", "");
goTo.marker('44q');
verify.quickInfoIs("(method) i3.f1(): void", "i3 f1");
goTo.marker('45q');
verify.quickInfoIs("(method) i3.nc_f1(): void", "");
goTo.marker('l42q');
verify.quickInfoIs("(property) i2.i2_l1: () => void", "");
goTo.marker('l43q');
verify.quickInfoIs("(property) i2.i2_nc_l1: () => void", "");
goTo.marker('l44q');
verify.quickInfoIs("(property) i3.l1: () => void", "");
goTo.marker('l45q');
verify.quickInfoIs("(property) i3.nc_l1: () => void", "");

goTo.marker('46');
verify.memberListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.memberListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.memberListContains("i2_l1", "(property) i2.i2_l1: () => void", "i2_l1");
verify.memberListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.memberListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.memberListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.memberListContains("p1", "(property) i2.p1: number", "i2 p1");
verify.memberListContains("f1", "(method) i2.f1(): void", "i2 f1");
verify.memberListContains("l1", "(property) i2.l1: () => void", "i2 l1");
verify.memberListContains("nc_p1", "(property) i2.nc_p1: number", "");
verify.memberListContains("nc_f1", "(method) i2.nc_f1(): void", "");
verify.memberListContains("nc_l1", "(property) i2.nc_l1: () => void", "");
goTo.marker('47');
verify.currentSignatureHelpDocCommentIs("i2_f1");
goTo.marker('48');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('49');
verify.currentSignatureHelpDocCommentIs("i2 f1");
goTo.marker('50');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l47');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l48');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l49');
verify.currentSignatureHelpDocCommentIs("");
goTo.marker('l50');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('47q');
verify.quickInfoIs("(method) i2.i2_f1(): void", "i2_f1");
goTo.marker('48q');
verify.quickInfoIs("(method) i2.i2_nc_f1(): void", "");
goTo.marker('49q');
verify.quickInfoIs("(method) i2.f1(): void", "i2 f1");
goTo.marker('50q');
verify.quickInfoIs("(method) i2.nc_f1(): void", "");
goTo.marker('l47q');
verify.quickInfoIs("(property) i2.i2_l1: () => void", "");
goTo.marker('l48q');
verify.quickInfoIs("(property) i2.i2_nc_l1: () => void", "");
goTo.marker('l49q');
verify.quickInfoIs("(property) i2.l1: () => void", "");
goTo.marker('l50q');
verify.quickInfoIs("(property) i2.nc_l1: () => void", "");

goTo.marker('51');
verify.completionListContains("i2", "interface i2", "");
verify.completionListContains("i2_i", "(var) i2_i: i2", "");
verify.completionListContains("i3", "interface i3", "");
verify.completionListContains("i3_i", "(var) i3_i: i3", "");

goTo.marker('52');
verify.quickInfoIs("(constructor) c5(): c5", "");

goTo.marker('53');
verify.quickInfoIs("class c5", "c5 class");

goTo.marker('54');
verify.quickInfoIs("(property) c5.b: number", "");

goTo.marker('55');
verify.quickInfoIs("(constructor) c2(a: number): c2", "c2 constructor");

goTo.marker('56');
verify.quickInfoIs("(constructor) c3(): c3", "");

goTo.marker('57');
verify.quickInfoIs("(constructor) c6(): c6", "");