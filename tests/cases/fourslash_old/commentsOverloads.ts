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

goTo.marker('1');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 1", "f1", "function");
goTo.marker('2');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "f1", "function");
goTo.marker('3');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 1", "f1", "function");
goTo.marker('4q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "f1", "function");
goTo.marker('o4q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 1", "f1", "function");

goTo.marker('4');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('o4');
verify.currentSignatureHelpDocCommentIs("this is signature 1");
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('5');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f2", "function");
goTo.marker('6');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 2", "f2", "function");
goTo.marker('7');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f2", "function");
goTo.marker('8q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 2", "f2", "function");
goTo.marker('o8q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f2", "function");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("this is signature 2");
verify.currentParameterHelpArgumentDocCommentIs("");

goTo.marker('o8');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('9');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f3", "function");
goTo.marker('10');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "f3", "function");
goTo.marker('11');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f3", "function");
goTo.marker('12q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "f3", "function");
goTo.marker('o12q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "f3", "function");

goTo.marker('12');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");

goTo.marker('o12');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");

goTo.marker('13');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 4 - with number parameter", "f4", "function");
goTo.marker('14');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 4 - with string parameter", "f4", "function");
goTo.marker('15');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 4 - with number parameter", "f4", "function");
goTo.marker('16q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 4 - with string parameter", "f4", "function");
goTo.marker('o16q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 4 - with number parameter", "f4", "function");

goTo.marker('16');
verify.currentSignatureHelpDocCommentIs("this is signature 4 - with string parameter");
verify.currentParameterHelpArgumentDocCommentIs("");

goTo.marker('o16');
verify.currentSignatureHelpDocCommentIs("this is signature 4 - with number parameter");
verify.currentParameterHelpArgumentDocCommentIs("param a");

goTo.marker('17');
verify.completionListContains('f1', '(a: number): number (+ 1 overload(s))', 'this is signature 1', "f1", "function");
verify.completionListContains('f2', '(a: number): number (+ 1 overload(s))', '', "f2", "function");
verify.completionListContains('f3', '(a: number): number (+ 1 overload(s))', '', "f3", "function");
verify.completionListContains('f4', '(a: number): number (+ 1 overload(s))', 'this is signature 4 - with number parameter', "f4", "function");

goTo.marker('18');
verify.completionListContains('i1', 'i1', '', "i1", "interface");
verify.completionListContains('i1_i', 'i1', '', "i1_i", "var");
verify.completionListContains('i2', 'i2', '', "i2", "interface");
verify.completionListContains('i2_i', 'i2', '', "i2_i", "var");
verify.completionListContains('i3', 'i3', '', "i3", "interface");
verify.completionListContains('i3_i', 'i3', '', "i3_i","var");
verify.completionListContains('i4', 'i4', '', "i4", "interface");
verify.completionListContains('i4_i', 'i4', '', "i4_i", "var");

goTo.marker('19');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('19q');
verify.quickInfoIs("(b: number): any (+ 1 overload(s))", "", "i1", "constructor");

goTo.marker('20');
verify.currentSignatureHelpDocCommentIs("new 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('20q');
verify.quickInfoIs("(a: string): any (+ 1 overload(s))", "new 1", "i1", "constructor");

goTo.marker('21');
verify.currentSignatureHelpDocCommentIs("this signature 1");
verify.currentParameterHelpArgumentDocCommentIs("param a");
goTo.marker('21q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this signature 1", "i1", "function");

goTo.marker('22');
verify.currentSignatureHelpDocCommentIs("this is signature 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('22q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 2", "i1", "function");

goTo.marker('23');
verify.memberListContains('foo', '(a: number): number (+ 1 overload(s))', 'foo 1', "i1.foo", "method");
verify.memberListContains('foo2', '(a: number): number (+ 1 overload(s))', '', "i1.foo2", "method");
verify.memberListContains('foo3', '(a: number): number (+ 1 overload(s))', '', "i1.foo3", "method");
verify.memberListContains('foo4', '(a: number): number (+ 1 overload(s))', 'foo4 1', "i1.foo4", "method");

goTo.marker('24');
verify.currentSignatureHelpDocCommentIs("foo 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('24q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "foo 1", "i1.foo", "method");

goTo.marker('25');
verify.currentSignatureHelpDocCommentIs("foo 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('25q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "foo 2", "i1.foo", "method");

goTo.marker('26');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('26q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "i1.foo2", "method");

goTo.marker('27');
verify.currentSignatureHelpDocCommentIs("foo2 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('27q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "foo2 2", "i1.foo2", "method");

goTo.marker('28');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('28q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "i1.foo3", "method");

goTo.marker('29');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('29q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "i1.foo3", "method");

goTo.marker('30');
verify.currentSignatureHelpDocCommentIs("foo4 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('30q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "foo4 1", "i1.foo4", "method");

goTo.marker('31');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('31q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "i1.foo4", "method");

goTo.marker('32');
verify.currentSignatureHelpDocCommentIs("new 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('32q');
verify.quickInfoIs("(b: number): any (+ 1 overload(s))", "new 2", "i2", "constructor");

goTo.marker('33');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('33q');
verify.quickInfoIs("(a: string): any (+ 1 overload(s))", "", "i2", "constructor");

goTo.marker('34');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('34q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "i2", "function");

goTo.marker('35');
verify.currentSignatureHelpDocCommentIs("this is signature 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('35q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "this is signature 2", "i2", "function");

goTo.marker('36');
verify.currentSignatureHelpDocCommentIs("new 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('36q');
verify.quickInfoIs("(b: number): any (+ 1 overload(s))", "new 2", "i3", "constructor");

goTo.marker('37');
verify.currentSignatureHelpDocCommentIs("new 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('37q');
verify.quickInfoIs("(a: string): any (+ 1 overload(s))", "new 1", "i3", "constructor");

goTo.marker('38');
verify.currentSignatureHelpDocCommentIs("this is signature 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('38q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "this is signature 1", "i3", "function");

goTo.marker('39');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('39q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "i3", "function");

goTo.marker('40');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('40q');
verify.quickInfoIs("(b: number): any (+ 1 overload(s))", "", "i4", "constructor");

goTo.marker('41');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('41q');
verify.quickInfoIs("(a: string): any (+ 1 overload(s))", "", "i4", "constructor");

goTo.marker('42');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('42q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "i4", "function");

goTo.marker('43');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('43q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "i4", "function");

goTo.marker('44');
verify.memberListContains('prop1', '(a: number): number (+ 1 overload(s))', '', "c.prop1", "method");
verify.memberListContains('prop2', '(a: number): number (+ 1 overload(s))', 'prop2 1', "c.prop2", "method");
verify.memberListContains('prop3', '(a: number): number (+ 1 overload(s))', '', "c.prop3", "method");
verify.memberListContains('prop4', '(a: number): number (+ 1 overload(s))', 'prop4 1', "c.prop4", "method");
verify.memberListContains('prop5', '(a: number): number (+ 1 overload(s))', 'prop5 1', "c.prop5", "method");

goTo.marker('45');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('45q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop1", "method");

goTo.marker('46');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('46q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "c.prop1", "method");

goTo.marker('47');
verify.currentSignatureHelpDocCommentIs("prop2 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('47q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop2 1", "c.prop2", "method");

goTo.marker('48');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('48q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "c.prop2", "method");

goTo.marker('49');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('49q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop3", "method");

goTo.marker('50');
verify.currentSignatureHelpDocCommentIs("prop3 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('50q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop3 2", "c.prop3", "method");

goTo.marker('51');
verify.currentSignatureHelpDocCommentIs("prop4 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('51q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop4 1", "c.prop4", "method");

goTo.marker('52');
verify.currentSignatureHelpDocCommentIs("prop4 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('52q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop4 2", "c.prop4", "method");

goTo.marker('53');
verify.currentSignatureHelpDocCommentIs("prop5 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('53q');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop5 1", "c.prop5", "method");

goTo.marker('54');
verify.currentSignatureHelpDocCommentIs("prop5 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('54q');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop5 2", "c.prop5", "method");

goTo.marker('55');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('55q');
verify.quickInfoIs("(a: number): c1 (+ 1 overload(s))", "", "c1", "constructor");

goTo.marker('56');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('56q');
verify.quickInfoIs("(b: string): c1 (+ 1 overload(s))", "", "c1", "constructor");

goTo.marker('57');
verify.currentSignatureHelpDocCommentIs("c2 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('57q');
verify.quickInfoIs("(a: number): c2 (+ 1 overload(s))", "c2 1", "c2", "constructor");

goTo.marker('58');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('58q');
verify.quickInfoIs("(b: string): c2 (+ 1 overload(s))", "", "c2", "constructor");

goTo.marker('59');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('59q');
verify.quickInfoIs("(a: number): c3 (+ 1 overload(s))", "", "c3", "constructor");

goTo.marker('60');
verify.currentSignatureHelpDocCommentIs("c3 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('60q');
verify.quickInfoIs("(b: string): c3 (+ 1 overload(s))", "c3 2", "c3", "constructor");

goTo.marker('61');
verify.currentSignatureHelpDocCommentIs("c4 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('61q');
verify.quickInfoIs("(a: number): c4 (+ 1 overload(s))", "c4 1", "c4", "constructor");

goTo.marker('62');
verify.currentSignatureHelpDocCommentIs("c4 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('62q');
verify.quickInfoIs("(b: string): c4 (+ 1 overload(s))", "c4 2", "c4", "constructor");

goTo.marker('63');
verify.currentSignatureHelpDocCommentIs("c5 1");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('63q');
verify.quickInfoIs("(a: number): c5 (+ 1 overload(s))", "c5 1", "c5", "constructor");

goTo.marker('64');
verify.currentSignatureHelpDocCommentIs("c5 2");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('64q');
verify.quickInfoIs("(b: string): c5 (+ 1 overload(s))", "c5 2", "c5", "constructor");

goTo.marker('65');
verify.completionListContains("c", undefined, "", "c", "class");
verify.completionListContains("c1", undefined, "", "c1", "class");
verify.completionListContains("c2", undefined, "", "c2", "class");
verify.completionListContains("c3", undefined, "", "c3", "class");
verify.completionListContains("c4", undefined, "", "c4", "class");
verify.completionListContains("c5", undefined, "", "c5", "class");
verify.completionListContains("c_i", "c", "", "c_i", "var");
verify.completionListContains("c1_i_1", "c1", "", "c1_i_1", "var");
verify.completionListContains("c2_i_1", "c2", "", "c2_i_1", "var");
verify.completionListContains("c3_i_1", "c3", "", "c3_i_1", "var");
verify.completionListContains("c4_i_1", "c4", "", "c4_i_1", "var");
verify.completionListContains("c5_i_1", "c5", "", "c5_i_1", "var");
verify.completionListContains("c1_i_2", "c1", "", "c1_i_2", "var");
verify.completionListContains("c2_i_2", "c2", "", "c2_i_2", "var");
verify.completionListContains("c3_i_2", "c3", "", "c3_i_2", "var");
verify.completionListContains("c4_i_2", "c4", "", "c4_i_2", "var");
verify.completionListContains("c5_i_2", "c5", "", "c5_i_2", "var");
verify.completionListContains('multiOverload', '(a: number): string (+ 2 overload(s))', 'This is multiOverload F1 1', "multiOverload", "function");
verify.completionListContains('ambientF1', '(a: number): string (+ 2 overload(s))', 'This is ambient F1 1', "ambientF1", "function");

goTo.marker('66');
verify.quickInfoIs("c1", "", "c1_i_1", "var");
goTo.marker('67');
verify.quickInfoIs("c2", "", "c2_i_2", "var");
goTo.marker('68');
verify.quickInfoIs("c3", "", "c3_i_2", "var");
goTo.marker('69');
verify.quickInfoIs("c4", "", "c4_i_1", "var");
goTo.marker('70');
verify.quickInfoIs("c5", "", "c5_i_1", "var");

goTo.marker('71');
verify.quickInfoIs("(a: number): string (+ 2 overload(s))", "This is multiOverload F1 1", "multiOverload", "function");
goTo.marker('72');
verify.quickInfoIs("(b: string): string (+ 2 overload(s))", "This is multiOverload F1 2", "multiOverload", "function");
goTo.marker('73');
verify.quickInfoIs("(c: boolean): string (+ 2 overload(s))", "This is multiOverload F1 3", "multiOverload", "function");

goTo.marker('74');
verify.quickInfoIs("(a: number): string (+ 2 overload(s))", "This is ambient F1 1", "ambientF1", "function");
goTo.marker('75');
verify.quickInfoIs("(b: string): string (+ 2 overload(s))", "This is ambient F1 2", "ambientF1", "function");
goTo.marker('76');
verify.quickInfoIs("(c: boolean): boolean (+ 2 overload(s))", "This is ambient F1 3", "ambientF1", "function");

goTo.marker('77');
verify.quickInfoIs("i3", "", "aa", "parameter");

goTo.marker('78');
verify.quickInfoIs("(a: number): c1 (+ 1 overload(s))", "", "c1", "constructor");

goTo.marker('79');
verify.quickInfoIs("(b: string): c1 (+ 1 overload(s))", "", "c1", "constructor");

goTo.marker('80');
verify.quickInfoIs("(a: number): c1 (+ 1 overload(s))", "", "c1", "constructor");

goTo.marker('81');
verify.quickInfoIs("(a: number): c2 (+ 1 overload(s))", "c2 1", "c2", "constructor");

goTo.marker('82');
verify.quickInfoIs("(b: string): c2 (+ 1 overload(s))", "", "c2", "constructor");

goTo.marker('83');
verify.quickInfoIs("(a: number): c2 (+ 1 overload(s))", "c2 1", "c2", "constructor");

goTo.marker('84');
verify.quickInfoIs("(a: number): c3 (+ 1 overload(s))", "", "c3", "constructor");

goTo.marker('85');
verify.quickInfoIs("(b: string): c3 (+ 1 overload(s))", "c3 2", "c3", "constructor");

goTo.marker('86');
verify.quickInfoIs("(a: number): c3 (+ 1 overload(s))", "", "c3", "constructor");

goTo.marker('87');
verify.quickInfoIs("(a: number): c4 (+ 1 overload(s))", "c4 1", "c4", "constructor");

goTo.marker('88');
verify.quickInfoIs("(b: string): c4 (+ 1 overload(s))", "c4 2", "c4", "constructor");

goTo.marker('89');
verify.quickInfoIs("(a: number): c4 (+ 1 overload(s))", "c4 1", "c4", "constructor");

goTo.marker('90');
verify.quickInfoIs("(a: number): c5 (+ 1 overload(s))", "c5 1", "c5", "constructor");

goTo.marker('91');
verify.quickInfoIs("(b: string): c5 (+ 1 overload(s))", "c5 2", "c5", "constructor");

goTo.marker('92');
verify.quickInfoIs("(a: number): c5 (+ 1 overload(s))", "c5 1", "c5", "constructor");

goTo.marker('93');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop1", "method");

goTo.marker('94');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "c.prop1", "method");

goTo.marker('95');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop1", "method");

goTo.marker('96');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop2 1", "c.prop2", "method");

goTo.marker('97');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "", "c.prop2", "method");

goTo.marker('98');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop2 1", "c.prop2", "method");

goTo.marker('99');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop3", "method");

goTo.marker('100');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop3 2", "c.prop3", "method");

goTo.marker('101');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "", "c.prop3", "method");

goTo.marker('102');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop4 1", "c.prop4", "method");

goTo.marker('103');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop4 2", "c.prop4", "method");

goTo.marker('104');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop4 1", "c.prop4", "method");

goTo.marker('105');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop5 1", "c.prop5", "method");

goTo.marker('106');
verify.quickInfoIs("(b: string): number (+ 1 overload(s))", "prop5 2", "c.prop5", "method");

goTo.marker('107');
verify.quickInfoIs("(a: number): number (+ 1 overload(s))", "prop5 1", "c.prop5", "method");