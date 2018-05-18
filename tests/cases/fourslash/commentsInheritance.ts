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
////var i1/*1iq*/_i: /*16i*/i1;
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
////var i2/*36iq*/_i: /*51i*/i2;
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
verify.completionListContains("i1_p1", "(property) i1.i1_p1: number", "i1_p1");
verify.completionListContains("i1_f1", "(method) i1.i1_f1(): void", "i1_f1");
verify.completionListContains("i1_l1", "(property) i1.i1_l1: () => void", "");
verify.completionListContains("i1_nc_p1", "(property) i1.i1_nc_p1: number", "");
verify.completionListContains("i1_nc_f1", "(method) i1.i1_nc_f1(): void", "");
verify.completionListContains("i1_nc_l1", "(property) i1.i1_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) i1.p1: number", "");
verify.completionListContains("f1", "(method) i1.f1(): void", "");
verify.completionListContains("l1", "(property) i1.l1: () => void", "");
verify.completionListContains("nc_p1", "(property) i1.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) i1.nc_f1(): void", "");
verify.completionListContains("nc_l1", "(property) i1.nc_l1: () => void", "");
verify.signatureHelp(
    { marker: "2", docComment: "i1_f1" },
    { marker: ["3", "4", "5", "l2", "l3", "l4", "l5"], docComment: "" },
);

verify.quickInfos({
    "1iq": "var i1_i: i1",
    "2q": ["(method) i1.i1_f1(): void", "i1_f1"],
    "3q": "(method) i1.i1_nc_f1(): void",
    "4q": "(method) i1.f1(): void",
    "5q": "(method) i1.nc_f1(): void",
    l2q: "(property) i1.i1_l1: () => void",
    l3q: "(property) i1.i1_nc_l1: () => void",
    l4q: "(property) i1.l1: () => void",
    l5q: "(property) i1.nc_l1: () => void"
});

goTo.marker('6');
verify.completionListContains("i1_p1", "(property) c1.i1_p1: number", "i1_p1");
verify.completionListContains("i1_f1", "(method) c1.i1_f1(): void", "i1_f1");
verify.completionListContains("i1_l1", "(property) c1.i1_l1: () => void", "");
verify.completionListContains("i1_nc_p1", "(property) c1.i1_nc_p1: number", "");
verify.completionListContains("i1_nc_f1", "(method) c1.i1_nc_f1(): void", "");
verify.completionListContains("i1_nc_l1", "(property) c1.i1_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) c1.p1: number", "c1_p1");
verify.completionListContains("f1", "(method) c1.f1(): void", "c1_f1");
verify.completionListContains("l1", "(property) c1.l1: () => void", "c1_l1");
verify.completionListContains("nc_p1", "(property) c1.nc_p1: number", "c1_nc_p1");
verify.completionListContains("nc_f1", "(method) c1.nc_f1(): void", "c1_nc_f1");
verify.completionListContains("nc_l1", "(property) c1.nc_l1: () => void", "c1_nc_l1");
verify.signatureHelp(
    { marker: "7", docComment: "i1_f1" },
    { marker: "9", docComment: "c1_f1" },
    { marker: "10", docComment: "c1_nc_f1" },
    { marker: "l9", docComment: "c1_l1" },
    { marker: "l10", docComment: "c1_nc_l1" },
    { marker: ["8", "l7", "l8"], docComment: "" },
);

verify.quickInfos({
    "6iq": "var c1_i: c1",
    "7q": ["(method) c1.i1_f1(): void", "i1_f1"],
    "8q": "(method) c1.i1_nc_f1(): void",
    "9q": ["(method) c1.f1(): void", "c1_f1"],
    "10q": ["(method) c1.nc_f1(): void", "c1_nc_f1"],
    l7q: "(property) c1.i1_l1: () => void",
    l8q: "(property) c1.i1_nc_l1: () => void",
    l9q: ["(property) c1.l1: () => void", "c1_l1"],
    l10q: ["(property) c1.nc_l1: () => void", "c1_nc_l1"],
});

goTo.marker('11');
verify.completionListContains("i1_p1", "(property) i1.i1_p1: number", "i1_p1");
verify.completionListContains("i1_f1", "(method) i1.i1_f1(): void", "i1_f1");
verify.completionListContains("i1_l1", "(property) i1.i1_l1: () => void", "");
verify.completionListContains("i1_nc_p1", "(property) i1.i1_nc_p1: number", "");
verify.completionListContains("i1_nc_f1", "(method) i1.i1_nc_f1(): void", "");
verify.completionListContains("i1_nc_l1", "(property) i1.i1_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) i1.p1: number", "");
verify.completionListContains("f1", "(method) i1.f1(): void", "");
verify.completionListContains("l1", "(property) i1.l1: () => void", "");
verify.completionListContains("nc_p1", "(property) i1.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) i1.nc_f1(): void", "");
verify.completionListContains("nc_l1", "(property) i1.nc_l1: () => void", "");
verify.signatureHelp(
    { marker: "12", docComment: "i1_f1" },
    { marker: ["13", "14", "15", "l12", "l13", "l14", "l15"], docComment: "" },
);

verify.quickInfos({
    "12q": ["(method) i1.i1_f1(): void", "i1_f1"],
    "13q": "(method) i1.i1_nc_f1(): void",
    "14q": "(method) i1.f1(): void",
    "15q": "(method) i1.nc_f1(): void",
    l12q: "(property) i1.i1_l1: () => void",
    l13q: "(property) i1.i1_nc_l1: () => void",
    l14q: "(property) i1.l1: () => void",
    l15q: "(property) i1.nc_l1: () => void",
});

goTo.marker('16');
verify.not.completionListContains("i1", "interface i1", "i1 is interface with properties");
verify.completionListContains("i1_i", "var i1_i: i1", "");
verify.completionListContains("c1", "class c1", "");
verify.completionListContains("c1_i", "var c1_i: c1", "");

goTo.marker('16i');
verify.completionListContains("i1", "interface i1", "i1 is interface with properties");

verify.quickInfos({
    "17iq": "var c2_i: c2",
    "18iq": "var c3_i: c3"
});

verify.signatureHelp(
    { marker: "17", docComment: "c2 constructor" },
    { marker: "18", docComment: "" },
);

verify.quickInfos({
    "18sq": ["constructor c2(a: number): c2", "c2 constructor"],

    "18spropq": "class c2",
    "18spropProp": ["(property) c2.c2_p1: number", "c2 c2_p1"],

    "17q": ["constructor c2(a: number): c2", "c2 constructor"],
    "18q": "constructor c3(): c3"
});

goTo.marker('19');
verify.completionListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.completionListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.completionListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.completionListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.completionListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.completionListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number", "");
verify.completionListContains("p1", "(property) c2.p1: number", "c2 p1");
verify.completionListContains("f1", "(method) c2.f1(): void", "c2 f1");
verify.completionListContains("prop", "(property) c2.prop: number", "c2 prop");
verify.completionListContains("nc_p1", "(property) c2.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) c2.nc_f1(): void", "");
verify.completionListContains("nc_prop", "(property) c2.nc_prop: number", "");
verify.signatureHelp(
    { marker: "20", docComment: "c2 c2_f1" },
    { marker: "22", docComment: "c2 f1" },
    { marker: ["21", "23"], docComment: "" },
);

verify.quickInfos({
    "20q": ["(method) c2.c2_f1(): void", "c2 c2_f1"],
    "21q": "(method) c2.c2_nc_f1(): void",
    "22q": ["(method) c2.f1(): void", "c2 f1"],
    "23q": "(method) c2.nc_f1(): void"
});

goTo.marker('24');
verify.completionListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.completionListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.completionListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.completionListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.completionListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.completionListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number", "");
verify.completionListContains("p1", "(property) c3.p1: number", "c3 p1");
verify.completionListContains("f1", "(method) c3.f1(): void", "c3 f1");
verify.completionListContains("prop", "(property) c3.prop: number", "c3 prop");
verify.completionListContains("nc_p1", "(property) c3.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) c3.nc_f1(): void", "");
verify.completionListContains("nc_prop", "(property) c3.nc_prop: number", "");
verify.signatureHelp(
    { marker: "25", docComment: "c2 c2_f1" },
    { marker: "27", docComment: "c3 f1" },
    { marker: ["26", "28"], docComment: "" },
);

verify.quickInfos({
    "25q": ["(method) c2.c2_f1(): void", "c2 c2_f1"],
    "26q": "(method) c2.c2_nc_f1(): void",
    "27q": ["(method) c3.f1(): void", "c3 f1"],
    "28q": "(method) c3.nc_f1(): void"
});

goTo.marker('29');
verify.completionListContains("c2_p1", "(property) c2.c2_p1: number", "c2 c2_p1");
verify.completionListContains("c2_f1", "(method) c2.c2_f1(): void", "c2 c2_f1");
verify.completionListContains("c2_prop", "(property) c2.c2_prop: number", "c2 c2_prop");
verify.completionListContains("c2_nc_p1", "(property) c2.c2_nc_p1: number", "");
verify.completionListContains("c2_nc_f1", "(method) c2.c2_nc_f1(): void", "");
verify.completionListContains("c2_nc_prop", "(property) c2.c2_nc_prop: number");
verify.completionListContains("p1", "(property) c2.p1: number", "c2 p1");
verify.completionListContains("f1", "(method) c2.f1(): void", "c2 f1");
verify.completionListContains("prop", "(property) c2.prop: number", "c2 prop");
verify.completionListContains("nc_p1", "(property) c2.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) c2.nc_f1(): void", "");
verify.completionListContains("nc_prop", "(property) c2.nc_prop: number", "");
verify.signatureHelp(
    { marker: "30", docComment: "c2 c2_f1" },
    { marker: "32", docComment: "c2 f1" },
    { marker: ["31", "33"], docComment: "" },
);

verify.quickInfos({
    "30q": ["(method) c2.c2_f1(): void", "c2 c2_f1"],
    "31q": "(method) c2.c2_nc_f1(): void",
    "32q": ["(method) c2.f1(): void", "c2 f1"],
    "33q": "(method) c2.nc_f1(): void"
});

verify.signatureHelp({ marker: "34", docComment: "c2 constructor" });
verify.quickInfos({
    "34iq": "var c4_i: c4",
    "34q": ["constructor c4(a: number): c4", "c2 constructor"]
});

goTo.marker('35');
verify.completionListContains("c2", "class c2", "");
verify.completionListContains("c2_i", "var c2_i: c2", "");
verify.completionListContains("c3", "class c3", "");
verify.completionListContains("c3_i", "var c3_i: c3", "");
verify.completionListContains("c4", "class c4", "");
verify.completionListContains("c4_i", "var c4_i: c4", "");

goTo.marker('36');
verify.completionListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.completionListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.completionListContains("i2_l1", "(property) i2.i2_l1: () => void", "");
verify.completionListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.completionListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.completionListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) i2.p1: number", "i2 p1");
verify.completionListContains("f1", "(method) i2.f1(): void", "i2 f1");
verify.completionListContains("l1", "(property) i2.l1: () => void", "");
verify.completionListContains("nc_p1", "(property) i2.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) i2.nc_f1(): void", "");
verify.completionListContains("nc_l1", "(property) i2.nc_l1: () => void", "");
verify.signatureHelp(
    { marker: "37", docComment: "i2_f1" },
    { marker: "39", docComment: "i2 f1" },
    { marker: ["38", "40", "l37", "l37", "l39", "l40"], docComment: "" },
);

verify.quickInfos({
    "36iq": "var i2_i: i2",
    "37iq": "var i3_i: i3",
    "37q": ["(method) i2.i2_f1(): void", "i2_f1"],
    "38q": "(method) i2.i2_nc_f1(): void",
    "39q": ["(method) i2.f1(): void", "i2 f1"],
    "40q": "(method) i2.nc_f1(): void",
    "l37q": "(property) i2.i2_l1: () => void",
    "l38q": "(property) i2.i2_nc_l1: () => void",
    "l39q": "(property) i2.l1: () => void",
    "l40q": "(property) i2.nc_l1: () => void",
});

goTo.marker('41');
verify.completionListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.completionListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.completionListContains("i2_l1", "(property) i2.i2_l1: () => void", "");
verify.completionListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.completionListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.completionListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) i3.p1: number", "i3 p1");
verify.completionListContains("f1", "(method) i3.f1(): void", "i3 f1");
verify.completionListContains("l1", "(property) i3.l1: () => void", "");
verify.completionListContains("nc_p1", "(property) i3.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) i3.nc_f1(): void", "");
verify.completionListContains("nc_l1", "(property) i3.nc_l1: () => void", "");
verify.signatureHelp(
    { marker: "42", docComment: "i2_f1" },
    { marker: "44", docComment: "i3 f1" },
    { marker: ["43", "45", "l42", "l43", "l44", "l45"], docComment: "" },
);

verify.quickInfos({
    "42q": ["(method) i2.i2_f1(): void", "i2_f1"],
    "43q": "(method) i2.i2_nc_f1(): void",
    "44q": ["(method) i3.f1(): void", "i3 f1"],
    "45q": "(method) i3.nc_f1(): void",
    l42q: "(property) i2.i2_l1: () => void",
    l43q: "(property) i2.i2_nc_l1: () => void",
    l44q: "(property) i3.l1: () => void",
    l45q: "(property) i3.nc_l1: () => void"
});

goTo.marker('46');
verify.completionListContains("i2_p1", "(property) i2.i2_p1: number", "i2_p1");
verify.completionListContains("i2_f1", "(method) i2.i2_f1(): void", "i2_f1");
verify.completionListContains("i2_l1", "(property) i2.i2_l1: () => void", "");
verify.completionListContains("i2_nc_p1", "(property) i2.i2_nc_p1: number", "");
verify.completionListContains("i2_nc_f1", "(method) i2.i2_nc_f1(): void", "");
verify.completionListContains("i2_nc_l1", "(property) i2.i2_nc_l1: () => void", "");
verify.completionListContains("p1", "(property) i2.p1: number", "i2 p1");
verify.completionListContains("f1", "(method) i2.f1(): void", "i2 f1");
verify.completionListContains("l1", "(property) i2.l1: () => void", "");
verify.completionListContains("nc_p1", "(property) i2.nc_p1: number", "");
verify.completionListContains("nc_f1", "(method) i2.nc_f1(): void", "");
verify.completionListContains("nc_l1", "(property) i2.nc_l1: () => void", "");
verify.signatureHelp(
    { marker: "47", docComment: "i2_f1" },
    { marker: "49", docComment: "i2 f1" },
    { marker: ["48", "l47", "l48", "l49", "l50"], docComment: "" },
);

verify.quickInfos({
    "47q": ["(method) i2.i2_f1(): void", "i2_f1"],
    "48q": "(method) i2.i2_nc_f1(): void",
    "49q": ["(method) i2.f1(): void", "i2 f1"],
    "50q": "(method) i2.nc_f1(): void",
    l47q: "(property) i2.i2_l1: () => void",
    l48q: "(property) i2.i2_nc_l1: () => void",
    l49q: "(property) i2.l1: () => void",
    l40q: "(property) i2.nc_l1: () => void"
});

goTo.marker('51');
verify.not.completionListContains("i2", "interface i2", "");
verify.completionListContains("i2_i", "var i2_i: i2", "");
verify.not.completionListContains("i3", "interface i3", "");
verify.completionListContains("i3_i", "var i3_i: i3", "");

goTo.marker('51i');
verify.completionListContains("i2", "interface i2", "");
verify.completionListContains("i3", "interface i3", "");

verify.quickInfos({
    52: "constructor c5(): c5",
    53: ["class c5", "c5 class"],
    54: "(property) c5.b: number",
    55: ["constructor c2(a: number): c2", "c2 constructor"],
    56: "constructor c3(): c3",
    57: "constructor c6(): c6"
});
