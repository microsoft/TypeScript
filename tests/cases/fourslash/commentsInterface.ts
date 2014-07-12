/// <reference path='fourslash.ts' />

/////** this is interface 1*/
////interface i/*1*/1 {
////}
////var i1/*2*/_i: i1;
////interface nc_/*3*/i1 {
////}
////var nc_/*4*/i1_i: nc_i1;
/////** this is interface 2 with memebers*/
////interface i/*5*/2 {
////    /** this is x*/
////    x: number;
////    /** this is foo*/
////    foo: (/**param help*/b: number) => string;
////    /** this is indexer*/
////    [/**string param*/i: string]: number;
////    /**new method*/
////    new (/** param*/i: i1);
////    nc_x: number;
////    nc_foo: (b: number) => string;
////    [i: number]: number;
////    /** this is call signature*/
////    (/**paramhelp a*/a: number,/**paramhelp b*/ b: number) : number;
////    /** this is fnfoo*/
////    fnfoo(/**param help*/b: number): string;
////    nc_fnfoo(b: number): string;
////}
////var i2/*6*/_i: i2;
////var i2_i/*7*/_x = i2_i./*8*/x;
////var i2_i/*9*/_foo = i2_i.f/*10*/oo;
////var i2_i_f/*11*/oo_r = i2_i.f/*12q*/oo(/*12*/30);
////var i2_i_i2_/*13*/si = i2/*13q*/_i["hello"];
////var i2_i_i2/*14*/_ii = i2/*14q*/_i[30];
////var i2_/*15*/i_n = new i2/*16q*/_i(/*16*/i1_i);
////var i2_i/*17*/_nc_x = i2_i.n/*18*/c_x;
////var i2_i_/*19*/nc_foo = i2_i.n/*20*/c_foo;
////var i2_i_nc_f/*21*/oo_r = i2_i.nc/*22q*/_foo(/*22*/30);
////var i2/*23*/_i_r = i2/*24q*/_i(/*24*/10, /*25*/20);
////var i2_i/*26*/_fnfoo = i2_i.fn/*27*/foo;
////var i2_i_/*28*/fnfoo_r = i2_i.fn/*29q*/foo(/*29*/10);
////var i2_i/*30*/_nc_fnfoo = i2_i.nc_fn/*31*/foo;
////var i2_i_nc_/*32*/fnfoo_r = i2_i.nc/*33q*/_fnfoo(/*33*/10);
/////*34*/
////interface i3 {
////    /** Comment i3 x*/
////    x: number;
////    /** Function i3 f*/
////    f(/**number parameter*/a: number): string;
////    /** i3 l*/
////    l: (/**comment i3 l b*/b: number) => string;
////    nc_x: number;
////    nc_f(a: number): string;
////    nc_l: (b: number) => string;
////}
////var i3_i: i3;
////i3_i = {
////    /*35*/f: /**own f*/ (/**i3_i a*/a: number) => "Hello" + /*36*/a,
////    l: this./*37*/f,
////    /** own x*/
////    x: this.f(/*38*/10),
////    nc_x: this.l(/*39*/this.x),
////    nc_f: this.f,
////    nc_l: this.l
////};
/////*40*/i/*40q*/3_i./*41*/f(/*42*/10);
////i3_i./*43q*/l(/*43*/10);
////i3_i.nc_/*44q*/f(/*44*/10);
////i3_i.nc/*45q*/_l(/*45*/10);

goTo.marker('1');
verify.quickInfoIs("i1", "this is interface 1", "i1", "interface");

goTo.marker('2');
verify.quickInfoIs("i1", "", "i1_i", "var");

goTo.marker('3');
verify.quickInfoIs("nc_i1", "", "nc_i1", "interface");

goTo.marker('4');
verify.quickInfoIs("nc_i1", "", "nc_i1_i", "var");

goTo.marker('5');
verify.quickInfoIs("i2", "this is interface 2 with memebers", "i2", "interface");

goTo.marker('6');
verify.quickInfoIs("i2", "", "i2_i", "var");

goTo.marker('7');
verify.quickInfoIs("number", "", "i2_i_x", "var");

goTo.marker('8');
verify.quickInfoIs("number", "this is x", "i2.x", "property");
verify.memberListContains("x", "number", "this is x", "i2.x", "property");
verify.memberListContains("foo", "(b: number) => string", "this is foo", "i2.foo", "property");
verify.memberListContains("nc_x", "number", "", "i2.nc_x", "property");
verify.memberListContains("nc_foo", "(b: number) => string", "", "i2.nc_foo", "property");
verify.memberListContains("fnfoo", "(b: number): string", "this is fnfoo", "i2.fnfoo", "method");
verify.memberListContains("nc_fnfoo", "(b: number): string", "", "i2.nc_fnfoo", "method");

goTo.marker('9');
verify.quickInfoIs("(b: number) => string", "", "i2_i_foo", "var");

goTo.marker('10');
verify.quickInfoIs("(b: number) => string", "this is foo", "i2.foo", "property");

goTo.marker('11');
verify.quickInfoIs("string", "", "i2_i_foo_r", "var");

goTo.marker('12');
verify.currentSignatureHelpDocCommentIs("this is foo");
verify.currentParameterHelpArgumentDocCommentIs("param help");
goTo.marker('12q');
verify.quickInfoIs("(b: number) => string", "this is foo", "i2.foo", "property");

goTo.marker('13');
verify.quickInfoIs("number", "", "i2_i_i2_si", "var");
goTo.marker('13q');
verify.quickInfoIs("i2", "", "i2_i", "var");

goTo.marker('14');
verify.quickInfoIs("number", "", "i2_i_i2_ii", "var");
goTo.marker('14q');
verify.quickInfoIs("i2", "", "i2_i", "var");

goTo.marker('15');
verify.quickInfoIs("any", "", "i2_i_n", "var");

goTo.marker('16');
verify.currentSignatureHelpDocCommentIs("new method");
verify.currentParameterHelpArgumentDocCommentIs("param");
goTo.marker('16q');
verify.quickInfoIs("(i: i1): any", "new method", "i2", "constructor");

goTo.marker('17');
verify.quickInfoIs("number", "", "i2_i_nc_x", "var");

goTo.marker('18');
verify.quickInfoIs("number", "", "i2.nc_x", "property");

goTo.marker('19');
verify.quickInfoIs("(b: number) => string", "", "i2_i_nc_foo", "var");

goTo.marker('20');
verify.quickInfoIs("(b: number) => string", "", "i2.nc_foo", "property");

goTo.marker('21');
verify.quickInfoIs("string", "", "i2_i_nc_foo_r", "var");

goTo.marker('22');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('22q');
verify.quickInfoIs("(b: number) => string", "", "i2.nc_foo", "property");

goTo.marker('23');
verify.quickInfoIs("number", "", "i2_i_r", "var");

goTo.marker('24');
verify.currentSignatureHelpDocCommentIs("this is call signature");
verify.currentParameterHelpArgumentDocCommentIs("paramhelp a");
goTo.marker('24q');
verify.quickInfoIs("(a: number, b: number): number", "this is call signature", "i2", "function");

goTo.marker('25');
verify.currentSignatureHelpDocCommentIs("this is call signature");
verify.currentParameterHelpArgumentDocCommentIs("paramhelp b");

goTo.marker('26');
verify.quickInfoIs("(b: number) => string", "", "i2_i_fnfoo", "var");

goTo.marker('27');
verify.quickInfoIs("(b: number): string", "this is fnfoo", "i2.fnfoo", "method");

goTo.marker('28');
verify.quickInfoIs("string", "", "i2_i_fnfoo_r", "var");

goTo.marker('29');
verify.currentSignatureHelpDocCommentIs("this is fnfoo");
verify.currentParameterHelpArgumentDocCommentIs("param help");
goTo.marker('29q');
verify.quickInfoIs("(b: number): string", "this is fnfoo", "i2.fnfoo", "method");

goTo.marker('30');
verify.quickInfoIs("(b: number) => string", "", "i2_i_nc_fnfoo", "var");

goTo.marker('31');
verify.quickInfoIs("(b: number): string", "", "i2.nc_fnfoo", "method");

goTo.marker('32');
verify.quickInfoIs("string", "", "i2_i_nc_fnfoo_r", "var");

goTo.marker('33');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('33q');
verify.quickInfoIs("(b: number): string", "", "i2.nc_fnfoo", "method");

goTo.marker('34');
verify.completionListContains("i1", "i1", "this is interface 1", "i1", "interface");
verify.completionListContains("i1_i", "i1", "", "i1_i", "var");
verify.completionListContains("nc_i1", "nc_i1", "", "nc_i1", "interface");
verify.completionListContains("nc_i1_i", "nc_i1", "", "nc_i1_i", "var");
verify.completionListContains("i2", "i2", "this is interface 2 with memebers", "i2", "interface");
verify.completionListContains("i2_i", "i2", "", "i2_i", "var");
verify.completionListContains("i2_i_x", "number", "", "i2_i_x", "var");
verify.completionListContains("i2_i_foo", "(b: number) => string", "", "i2_i_foo", "var");
verify.completionListContains("i2_i_foo_r", "string", "", "i2_i_foo_r", "var");
verify.completionListContains("i2_i_i2_si", "number", "", "i2_i_i2_si", "var");
verify.completionListContains("i2_i_i2_ii", "number", "", "i2_i_i2_ii", "var");
verify.completionListContains("i2_i_n", "any", "", "i2_i_n", "var");
verify.completionListContains("i2_i_nc_x", "number", "", "i2_i_nc_x", "var");
verify.completionListContains("i2_i_nc_foo", "(b: number) => string", "", "i2_i_nc_foo", "var");
verify.completionListContains("i2_i_nc_foo_r", "string", "", "i2_i_nc_foo_r", "var");
verify.completionListContains("i2_i_r", "number", "", "i2_i_r", "var");
verify.completionListContains("i2_i_fnfoo", "(b: number) => string", "", "i2_i_fnfoo", "var");
verify.completionListContains("i2_i_fnfoo_r", "string", "", "i2_i_fnfoo_r", "var");
verify.completionListContains("i2_i_nc_fnfoo", "(b: number) => string", "", "i2_i_nc_fnfoo", "var");
verify.completionListContains("i2_i_nc_fnfoo_r", "string", "", "i2_i_nc_fnfoo_r", "var");

goTo.marker('36');
verify.completionListContains("a", "number", "i3_i a", "a", "parameter");

goTo.marker('40q');
verify.quickInfoIs("i3", "", "i3_i", "var");
goTo.marker('40');
verify.completionListContains("i3", "i3", "", "i3", "interface");
verify.completionListContains("i3_i", "i3", "", "i3_i", "var");

goTo.marker('41');
verify.quickInfoIs("(a: number): string", "Function i3 f", "i3.f", "method");
verify.memberListContains("f", "(a: number): string", "Function i3 f", "i3.f", "method");
verify.memberListContains("l", "(b: number) => string", "i3 l", "i3.l", "property");
verify.memberListContains("x", "number", "Comment i3 x", "i3.x", "property");
verify.memberListContains("nc_f", "(a: number): string", "", "i3.nc_f", "method");
verify.memberListContains("nc_l", "(b: number) => string", "", "i3.nc_l", "property");
verify.memberListContains("nc_x", "number", "", "i3.nc_x", "property");

goTo.marker('42');
verify.currentSignatureHelpDocCommentIs("Function i3 f");
verify.currentParameterHelpArgumentDocCommentIs("number parameter");

goTo.marker('43');
verify.currentSignatureHelpDocCommentIs("i3 l");
verify.currentParameterHelpArgumentDocCommentIs("comment i3 l b");
goTo.marker('43q');
verify.quickInfoIs("(b: number) => string", "i3 l", "i3.l", "property");

goTo.marker('44');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('44q');
verify.quickInfoIs("(a: number): string", "", "i3.nc_f", "method");

goTo.marker('45');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('45q');
verify.quickInfoIs("(b: number) => string", "", "i3.nc_l", "property");
