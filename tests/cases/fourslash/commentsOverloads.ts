/// <reference path='fourslash.ts' />

/////** this is signature 1*/
////function /*1*/f1(/**param a*/a: number): number;
////function /*2*/f1(b: string): number;
////function /*3*/f1(aOrb: any) {
////    return 10;
////}
////f/*4q*/1(/*4*/"hello");
////f/*o4q*/1(/*o4*/10);
////function /*5*/f2(/**param a*/a: number): number;
/////** this is signature 2*/
////function /*6*/f2(b: string): number;
/////** this is f2 var comment*/
////function /*7*/f2(aOrb: any) {
////    return 10;
////}
////f/*8q*/2(/*8*/"hello");
////f/*o8q*/2(/*o8*/10);
////function /*9*/f3(a: number): number;
////function /*10*/f3(b: string): number;
////function /*11*/f3(aOrb: any) {
////    return 10;
////}
////f/*12q*/3(/*12*/"hello");
////f/*o12q*/3(/*o12*/10);
/////** this is signature 4 - with number parameter*/
////function /*13*/f4(/**param a*/a: number): number;
/////** this is signature 4 - with string parameter*/
////function /*14*/f4(b: string): number;
////function /*15*/f4(aOrb: any) {
////    return 10;
////}
////f/*16q*/4(/*16*/"hello");
////f/*o16q*/4(/*o16*/10);
/////*17*/
////interface i1 {
////    /**this signature 1*/
////    (/**param a*/ a: number): number;
////    /**this is signature 2*/
////    (b: string): number;
////    /** foo 1*/
////    foo(a: number): number;
////    /** foo 2*/
////    foo(b: string): number;
////    foo2(a: number): number;
////    /** foo2 2*/
////    foo2(b: string): number;
////    foo3(a: number): number;
////    foo3(b: string): number;
////    /** foo4 1*/
////    foo4(a: number): number;
////    foo4(b: string): number;
////    /** new 1*/
////    new (a: string);
////    new (b: number);
////}
////var i1_i: i1;
////interface i2 {
////    new (a: string);
////    /** new 2*/
////    new (b: number);
////    (a: number): number;
////    /**this is signature 2*/
////    (b: string): number;
////}
////var i2_i: i2;
////interface i3 {
////    /** new 1*/
////    new (a: string);
////    /** new 2*/
////    new (b: number);
////    /**this is signature 1*/
////    (a: number): number;
////    (b: string): number;
////}
////var i3_i: i3;
////interface i4 {
////    new (a: string);
////    new (b: number);
////    (a: number): number;
////    (b: string): number;
////}
////var i4_i: i4;
////new /*18*/i1/*19q*/_i(/*19*/10);
////new i/*20q*/1_i(/*20*/"Hello");
////i/*21q*/1_i(/*21*/10);
////i/*22q*/1_i(/*22*/"hello");
////i1_i./*23*/f/*24q*/oo(/*24*/10);
////i1_i.f/*25q*/oo(/*25*/"hello");
////i1_i.fo/*26q*/o2(/*26*/10);
////i1_i.fo/*27q*/o2(/*27*/"hello");
////i1_i.fo/*28q*/o3(/*28*/10);
////i1_i.fo/*29q*/o3(/*29*/"hello");
////i1_i.fo/*30q*/o4(/*30*/10);
////i1_i.fo/*31q*/o4(/*31*/"hello");
////new i2/*32q*/_i(/*32*/10);
////new i2/*33q*/_i(/*33*/"Hello");
////i/*34q*/2_i(/*34*/10);
////i2/*35q*/_i(/*35*/"hello");
////new i/*36q*/3_i(/*36*/10);
////new i3/*37q*/_i(/*37*/"Hello");
////i3/*38q*/_i(/*38*/10);
////i3/*39q*/_i(/*39*/"hello");
////new i4/*40q*/_i(/*40*/10);
////new i/*41q*/4_i(/*41*/"Hello");
////i4/*42q*/_i(/*42*/10);
////i4/*43q*/_i(/*43*/"hello");
////class c {
////    public /*93*/prop1(a: number): number;
////    public /*94*/prop1(b: string): number;
////    public /*95*/prop1(aorb: any) {
////        return 10;
////    }
////    /** prop2 1*/
////    public /*96*/prop2(a: number): number;
////    public /*97*/prop2(b: string): number;
////    public /*98*/prop2(aorb: any) {
////        return 10;
////    }
////    public /*99*/prop3(a: number): number;
////    /** prop3 2*/
////    public /*100*/prop3(b: string): number;
////    public /*101*/prop3(aorb: any) {
////        return 10;
////    }
////    /** prop4 1*/
////    public /*102*/prop4(a: number): number;
////    /** prop4 2*/
////    public /*103*/prop4(b: string): number;
////    public /*104*/prop4(aorb: any) {
////        return 10;
////    }
////    /** prop5 1*/
////    public /*105*/prop5(a: number): number;
////    /** prop5 2*/
////    public /*106*/prop5(b: string): number;
////    /** Prop5 implementaion*/
////    public /*107*/prop5(aorb: any) {
////        return 10;
////    }
////}
////class c1 {
////    /*78*/constructor(a: number);
////    /*79*/constructor(b: string);
////    /*80*/constructor(aorb: any) {
////    }
////}
////class c2 {
////    /** c2 1*/
////    /*81*/constructor(a: number);
////    /*82*/constructor(b: string);
////    /*83*/constructor(aorb: any) {
////    }
////}
////class c3 {
////    /*84*/constructor(a: number);
////    /** c3 2*/
////    /*85*/constructor(b: string);
////    /*86*/constructor(aorb: any) {
////    }
////}
////class c4 {
////    /** c4 1*/
////    /*87*/constructor(a: number);
////    /** c4 2*/
////    /*88*/constructor(b: string);
////    /*89*/constructor(aorb: any) {
////    }
////}
////class c5 {
////    /** c5 1*/
////    /*90*/constructor(a: number);
////    /** c5 2*/
////    /*91*/constructor(b: string);
////    /** c5 implementation*/
////    /*92*/constructor(aorb: any) {
////    }
////}
////var c_i = new c();
////c_i./*44*/pro/*45q*/p1(/*45*/10);
////c_i.pr/*46q*/op1(/*46*/"hello");
////c_i.pr/*47q*/op2(/*47*/10);
////c_i.pr/*48q*/op2(/*48*/"hello");
////c_i.pro/*49q*/p3(/*49*/10);
////c_i.pr/*50q*/op3(/*50*/"hello");
////c_i.pr/*51q*/op4(/*51*/10);
////c_i.pr/*52q*/op4(/*52*/"hello");
////c_i.pr/*53q*/op5(/*53*/10);
////c_i.pr/*54q*/op5(/*54*/"hello");
////var c1/*66*/_i_1 = new c/*55q*/1(/*55*/10);
////var c1_i_2 = new c/*56q*/1(/*56*/"hello");
////var c2_i_1 = new c/*57q*/2(/*57*/10);
////var c/*67*/2_i_2 = new c/*58q*/2(/*58*/"hello");
////var c3_i_1 = new c/*59q*/3(/*59*/10);
////var c/*68*/3_i_2 = new c/*60q*/3(/*60*/"hello");
////var c4/*69*/_i_1 = new c/*61q*/4(/*61*/10);
////var c4_i_2 = new c/*62q*/4(/*62*/"hello");
////var c/*70*/5_i_1 = new c/*63q*/5(/*63*/10);
////var c5_i_2 = new c/*64q*/5(/*64*/"hello");
/////** This is multiOverload F1 1*/
////function multiOverload(a: number): string;
/////** This is multiOverload F1 2*/
////function multiOverload(b: string): string;
/////** This is multiOverload F1 3*/
////function multiOverload(c: boolean): string;
/////** This is multiOverload Implementation */
////function multiOverload(d): string {
////    return "Hello";
////}
////multiOverl/*71*/oad(10);
////multiOverl/*72*/oad("hello");
////multiOverl/*73*/oad(true);
/////** This is ambient F1 1*/
////declare function ambientF1(a: number): string;
/////** This is ambient F1 2*/
////declare function ambientF1(b: string): string;
/////** This is ambient F1 3*/
////declare function ambientF1(c: boolean): boolean;
/////*65*/
////ambient/*74*/F1(10);
////ambient/*75*/F1("hello");
////ambient/*76*/F1(true);
////function foo(a/*77*/a: i3) {
////}
////foo(null);

verify.quickInfos({
    1: ["function f1(a: number): number (+1 overload)", "this is signature 1"],
    2: "function f1(b: string): number (+1 overload)",
    3: ["function f1(a: number): number (+1 overload)", "this is signature 1"],
    "4q": "function f1(b: string): number (+1 overload)",
    o4q: ["function f1(a: number): number (+1 overload)", "this is signature 1"]
});

verify.signatureHelp({ marker: "4", overloadsCount: 2 });
verify.signatureHelp({ marker: "o4", overloadsCount: 2, docComment: "this is signature 1", parameterDocComment: "param a" });

verify.quickInfos({
    5: "function f2(a: number): number (+1 overload)",
    6: ["function f2(b: string): number (+1 overload)", "this is signature 2"],
    7: "function f2(a: number): number (+1 overload)",
    "8q": ["function f2(b: string): number (+1 overload)", "this is signature 2"],
    o8q: "function f2(a: number): number (+1 overload)"
});

verify.signatureHelp(
    { marker: "8", overloadsCount: 2, docComment: "this is signature 2" },
    { marker: "o8", overloadsCount: 2, parameterDocComment: "param a" },
);

verify.quickInfos({
    9: "function f3(a: number): number (+1 overload)",
    10: "function f3(b: string): number (+1 overload)",
    11: "function f3(a: number): number (+1 overload)",
    "12q": "function f3(b: string): number (+1 overload)",
    o12q: "function f3(a: number): number (+1 overload)"
});

verify.signatureHelp({ marker: ["12", "o12"], overloadsCount: 2 });

verify.quickInfos({
    13: ["function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter"],
    14: ["function f4(b: string): number (+1 overload)", "this is signature 4 - with string parameter"],
    15: ["function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter"],
    "16q": ["function f4(b: string): number (+1 overload)", "this is signature 4 - with string parameter"],
    o16q: ["function f4(a: number): number (+1 overload)", "this is signature 4 - with number parameter"]
});

verify.signatureHelp(
    { marker: "16", overloadsCount: 2, docComment: "this is signature 4 - with string parameter" },
    { marker: "o16", overloadsCount: 2, docComment: "this is signature 4 - with number parameter", parameterDocComment: "param a" },
);

goTo.marker('17');
verify.completionListContains('f1', 'function f1(a: number): number (+1 overload)', 'this is signature 1');
verify.completionListContains('f2', 'function f2(a: number): number (+1 overload)', '');
verify.completionListContains('f3', 'function f3(a: number): number (+1 overload)', '');
verify.completionListContains('f4', 'function f4(a: number): number (+1 overload)', 'this is signature 4 - with number parameter');

goTo.marker('18');
verify.not.completionListContains('i1', 'interface i1', '');
verify.completionListContains('i1_i', 'var i1_i: i1\nnew (b: number) => any (+1 overload)', '');
verify.not.completionListContains('i2', 'interface i2', '');
verify.completionListContains('i2_i', 'var i2_i: i2\nnew (a: string) => any (+1 overload)', '');
verify.not.completionListContains('i3', 'interface i3', '');
verify.completionListContains('i3_i', 'var i3_i: i3\nnew (a: string) => any (+1 overload)', 'new 1');
verify.not.completionListContains('i4', 'interface i4', '');
verify.completionListContains('i4_i', 'var i4_i: i4\nnew (a: string) => any (+1 overload)', '');

verify.signatureHelp({ marker: "19", overloadsCount: 2 });
verify.quickInfoAt("19q", "var i1_i: i1\nnew (b: number) => any (+1 overload)");

verify.signatureHelp({ marker: "20", overloadsCount: 2, docComment: "new 1" });
verify.quickInfoAt("20q", "var i1_i: i1\nnew (a: string) => any (+1 overload)", "new 1");

verify.signatureHelp({ marker: "21", overloadsCount: 2, docComment: "this signature 1", parameterDocComment: "param a" });
verify.quickInfoAt("21q", "var i1_i: i1\n(a: number) => number (+1 overload)", "this signature 1");

verify.signatureHelp({ marker: "22", overloadsCount: 2, docComment: "this is signature 2" });
goTo.marker('22q');
verify.quickInfoAt("22q", "var i1_i: i1\n(b: string) => number (+1 overload)", "this is signature 2");

goTo.marker('23');
verify.completionListContains('foo', '(method) i1.foo(a: number): number (+1 overload)', 'foo 1');
verify.completionListContains('foo2', '(method) i1.foo2(a: number): number (+1 overload)', '');
verify.completionListContains('foo3', '(method) i1.foo3(a: number): number (+1 overload)', '');
verify.completionListContains('foo4', '(method) i1.foo4(a: number): number (+1 overload)', 'foo4 1');

verify.signatureHelp({ marker: "24", overloadsCount: 2, docComment: "foo 1" });
verify.quickInfoAt("24q", "(method) i1.foo(a: number): number (+1 overload)", "foo 1");

verify.signatureHelp({ marker: "25", overloadsCount: 2, docComment: "foo 2" });
verify.quickInfoAt("25q", "(method) i1.foo(b: string): number (+1 overload)", "foo 2");

verify.signatureHelp({ marker: "26", overloadsCount: 2 });
verify.quickInfoAt("26q", "(method) i1.foo2(a: number): number (+1 overload)");

verify.signatureHelp({ marker: "27", overloadsCount: 2, docComment: "foo2 2" });
verify.quickInfoAt("27q", "(method) i1.foo2(b: string): number (+1 overload)", "foo2 2");

verify.signatureHelp({ marker: "28", overloadsCount: 2 });
verify.quickInfoAt("28q", "(method) i1.foo3(a: number): number (+1 overload)");

verify.signatureHelp({ marker: "29", overloadsCount: 2 });
verify.quickInfoAt("29q", "(method) i1.foo3(b: string): number (+1 overload)");

verify.signatureHelp({ marker: "30", overloadsCount: 2, docComment: "foo4 1" });
verify.quickInfoAt("30q", "(method) i1.foo4(a: number): number (+1 overload)", "foo4 1");

verify.signatureHelp({ marker: "31", overloadsCount: 2 });
verify.quickInfoAt("31q", "(method) i1.foo4(b: string): number (+1 overload)");

verify.signatureHelp({ marker: "32", overloadsCount: 2, docComment: "new 2" });
verify.quickInfoAt("32q", "var i2_i: i2\nnew (b: number) => any (+1 overload)", "new 2");

verify.signatureHelp({ marker: "33", overloadsCount: 2 });
verify.quickInfoAt("33q", "var i2_i: i2\nnew (a: string) => any (+1 overload)");

verify.signatureHelp({ marker: "34", overloadsCount: 2 });
verify.quickInfoAt("34q", "var i2_i: i2\n(a: number) => number (+1 overload)");

verify.signatureHelp({ marker: "35", overloadsCount: 2, docComment: "this is signature 2" });
verify.quickInfoAt("35q", "var i2_i: i2\n(b: string) => number (+1 overload)", "this is signature 2");

verify.signatureHelp({ marker: "36", overloadsCount: 2, docComment: "new 2" });
verify.quickInfoAt("36q", "var i3_i: i3\nnew (b: number) => any (+1 overload)", "new 2");

verify.signatureHelp({ marker: "37", overloadsCount: 2, docComment: "new 1" });
verify.quickInfoAt("37q", "var i3_i: i3\nnew (a: string) => any (+1 overload)", "new 1");

verify.signatureHelp({ marker: "38", overloadsCount: 2, docComment: "this is signature 1" });
verify.quickInfoAt("38q", "var i3_i: i3\n(a: number) => number (+1 overload)", "this is signature 1");

verify.signatureHelp({ marker: "39", overloadsCount: 2 });
verify.quickInfoAt("39q", "var i3_i: i3\n(b: string) => number (+1 overload)");

verify.signatureHelp({ marker: "40", overloadsCount: 2 });
verify.quickInfoAt("40q", "var i4_i: i4\nnew (b: number) => any (+1 overload)");

verify.signatureHelp({ marker: "41", overloadsCount: 2 });
verify.quickInfoAt("41q", "var i4_i: i4\nnew (a: string) => any (+1 overload)");

verify.signatureHelp({ marker: "42", overloadsCount: 2 });
verify.quickInfoAt("42q", "var i4_i: i4\n(a: number) => number (+1 overload)");

verify.signatureHelp({ marker: "43", overloadsCount: 2 });
verify.quickInfoAt("43q", "var i4_i: i4\n(b: string) => number (+1 overload)");

goTo.marker('44');
verify.completionListContains('prop1', '(method) c.prop1(a: number): number (+1 overload)', '');
verify.completionListContains('prop2', '(method) c.prop2(a: number): number (+1 overload)', 'prop2 1');
verify.completionListContains('prop3', '(method) c.prop3(a: number): number (+1 overload)', '');
verify.completionListContains('prop4', '(method) c.prop4(a: number): number (+1 overload)', 'prop4 1');
verify.completionListContains('prop5', '(method) c.prop5(a: number): number (+1 overload)', 'prop5 1');

verify.signatureHelp({ marker: "45", overloadsCount: 2 });
verify.quickInfoAt("45q", "(method) c.prop1(a: number): number (+1 overload)");

verify.signatureHelp({ marker: "46", overloadsCount: 2 });
verify.quickInfoAt("46q", "(method) c.prop1(b: string): number (+1 overload)");

verify.signatureHelp({ marker: "47", overloadsCount: 2, docComment: "prop2 1" });
verify.quickInfoAt("47q", "(method) c.prop2(a: number): number (+1 overload)", "prop2 1");

verify.signatureHelp({ marker: "48", overloadsCount: 2 });
verify.quickInfoAt("48q", "(method) c.prop2(b: string): number (+1 overload)");

verify.signatureHelp({ marker: "49", overloadsCount: 2 });
verify.quickInfoAt("49q", "(method) c.prop3(a: number): number (+1 overload)");

verify.signatureHelp({ marker: "50", overloadsCount: 2, docComment: "prop3 2" });
verify.quickInfoAt("50q", "(method) c.prop3(b: string): number (+1 overload)", "prop3 2");

verify.signatureHelp({ marker: "51", overloadsCount: 2, docComment: "prop4 1" });
verify.quickInfoAt("51q", "(method) c.prop4(a: number): number (+1 overload)", "prop4 1");

verify.signatureHelp({ marker: "52", overloadsCount: 2, docComment: "prop4 2" });
verify.quickInfoAt("52q", "(method) c.prop4(b: string): number (+1 overload)", "prop4 2");

verify.signatureHelp({ marker: "53", overloadsCount: 2, docComment: "prop5 1" });
verify.quickInfoAt("53q", "(method) c.prop5(a: number): number (+1 overload)", "prop5 1");

verify.signatureHelp({ marker: "54", overloadsCount: 2, docComment: "prop5 2" });
verify.quickInfoAt("54q", "(method) c.prop5(b: string): number (+1 overload)", "prop5 2");

verify.signatureHelp({ marker: "55", overloadsCount: 2 });
verify.quickInfoAt("55q", "constructor c1(a: number): c1 (+1 overload)");

verify.signatureHelp({ marker: "56", overloadsCount: 2 });
verify.quickInfoAt("56q", "constructor c1(b: string): c1 (+1 overload)");

verify.signatureHelp({ marker: "57", overloadsCount: 2, docComment: "c2 1" });
verify.quickInfoAt("57q", "constructor c2(a: number): c2 (+1 overload)", "c2 1");

verify.signatureHelp({ marker: "58", overloadsCount: 2 });
verify.quickInfoAt("58q", "constructor c2(b: string): c2 (+1 overload)");

verify.signatureHelp({ marker: "59", overloadsCount: 2 });
verify.quickInfoAt("59q", "constructor c3(a: number): c3 (+1 overload)");

verify.signatureHelp({ marker: "60", overloadsCount: 2, docComment: "c3 2" });
verify.quickInfoAt("60q", "constructor c3(b: string): c3 (+1 overload)", "c3 2");

verify.signatureHelp({ marker: "61", overloadsCount: 2, docComment: "c4 1" });
verify.quickInfoAt("61q", "constructor c4(a: number): c4 (+1 overload)", "c4 1");

verify.signatureHelp({ marker: "62", overloadsCount: 2, docComment: "c4 2" });
verify.quickInfoAt("62q", "constructor c4(b: string): c4 (+1 overload)", "c4 2");

verify.signatureHelp({ marker: "63", overloadsCount: 2, docComment: "c5 1" });
verify.quickInfoAt("63q", "constructor c5(a: number): c5 (+1 overload)", "c5 1");

verify.signatureHelp({ marker: "64", overloadsCount: 2, docComment: "c5 2" });
verify.quickInfoAt("64q", "constructor c5(b: string): c5 (+1 overload)", "c5 2");

goTo.marker('65');
verify.completionListContains("c", "class c", "");
verify.completionListContains("c1", "class c1", "");
verify.completionListContains("c2", "class c2", "");
verify.completionListContains("c3", "class c3", "");
verify.completionListContains("c4", "class c4", "");
verify.completionListContains("c5", "class c5", "");
verify.completionListContains("c_i", "var c_i: c", "");
verify.completionListContains("c1_i_1", "var c1_i_1: c1", "");
verify.completionListContains("c2_i_1", "var c2_i_1: c2", "");
verify.completionListContains("c3_i_1", "var c3_i_1: c3", "");
verify.completionListContains("c4_i_1", "var c4_i_1: c4", "");
verify.completionListContains("c5_i_1", "var c5_i_1: c5", "");
verify.completionListContains("c1_i_2", "var c1_i_2: c1", "");
verify.completionListContains("c2_i_2", "var c2_i_2: c2", "");
verify.completionListContains("c3_i_2", "var c3_i_2: c3", "");
verify.completionListContains("c4_i_2", "var c4_i_2: c4", "");
verify.completionListContains("c5_i_2", "var c5_i_2: c5", "");
verify.completionListContains('multiOverload', 'function multiOverload(a: number): string (+2 overloads)', 'This is multiOverload F1 1');
verify.completionListContains('ambientF1', 'function ambientF1(a: number): string (+2 overloads)', 'This is ambient F1 1');

verify.quickInfos({
    66: "var c1_i_1: c1",
    67: "var c2_i_2: c2",
    68: "var c3_i_2: c3",
    69: "var c4_i_1: c4",
    70: "var c5_i_1: c5",
    71: ["function multiOverload(a: number): string (+2 overloads)", "This is multiOverload F1 1"],
    72: ["function multiOverload(b: string): string (+2 overloads)", "This is multiOverload F1 2"],
    73: ["function multiOverload(c: boolean): string (+2 overloads)", "This is multiOverload F1 3"],
    74: ["function ambientF1(a: number): string (+2 overloads)", "This is ambient F1 1"],
    75: ["function ambientF1(b: string): string (+2 overloads)", "This is ambient F1 2"],
    76: ["function ambientF1(c: boolean): boolean (+2 overloads)", "This is ambient F1 3"],
    77: "(parameter) aa: i3",
    78: "constructor c1(a: number): c1 (+1 overload)",
    79: "constructor c1(b: string): c1 (+1 overload)",
    80: "constructor c1(a: number): c1 (+1 overload)",
    81: ["constructor c2(a: number): c2 (+1 overload)", "c2 1"],
    82: "constructor c2(b: string): c2 (+1 overload)",
    83: ["constructor c2(a: number): c2 (+1 overload)", "c2 1"],
    84: "constructor c3(a: number): c3 (+1 overload)",
    85: ["constructor c3(b: string): c3 (+1 overload)", "c3 2"],
    86: "constructor c3(a: number): c3 (+1 overload)",
    87: ["constructor c4(a: number): c4 (+1 overload)", "c4 1"],
    88: ["constructor c4(b: string): c4 (+1 overload)", "c4 2"],
    89: ["constructor c4(a: number): c4 (+1 overload)", "c4 1"],
    90: ["constructor c5(a: number): c5 (+1 overload)", "c5 1"],
    91: ["constructor c5(b: string): c5 (+1 overload)", "c5 2"],
    92: ["constructor c5(a: number): c5 (+1 overload)", "c5 1"],
    93: "(method) c.prop1(a: number): number (+1 overload)",
    94: "(method) c.prop1(b: string): number (+1 overload)",
    95: "(method) c.prop1(a: number): number (+1 overload)",
    96: ["(method) c.prop2(a: number): number (+1 overload)", "prop2 1"],
    97: "(method) c.prop2(b: string): number (+1 overload)",
    98: ["(method) c.prop2(a: number): number (+1 overload)", "prop2 1"],
    99: "(method) c.prop3(a: number): number (+1 overload)",
    100: ["(method) c.prop3(b: string): number (+1 overload)", "prop3 2"],
    101: "(method) c.prop3(a: number): number (+1 overload)",
    102: ["(method) c.prop4(a: number): number (+1 overload)", "prop4 1"],
    103: ["(method) c.prop4(b: string): number (+1 overload)", "prop4 2"],
    104: ["(method) c.prop4(a: number): number (+1 overload)", "prop4 1"],
    105: ["(method) c.prop5(a: number): number (+1 overload)", "prop5 1"],
    106: ["(method) c.prop5(b: string): number (+1 overload)", "prop5 2"],
    107: ["(method) c.prop5(a: number): number (+1 overload)", "prop5 1"]
});
