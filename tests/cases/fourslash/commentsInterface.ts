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
////var i2/*6*/_i: /*34i*/i2;
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
verify.quickInfoIs("interface i1", "this is interface 1");

goTo.marker('2');
verify.quickInfoIs("(var) i1_i: i1", "");

goTo.marker('3');
verify.quickInfoIs("interface nc_i1", "");

goTo.marker('4');
verify.quickInfoIs("(var) nc_i1_i: nc_i1", "");

goTo.marker('5');
verify.quickInfoIs("interface i2", "this is interface 2 with memebers");

goTo.marker('6');
verify.quickInfoIs("(var) i2_i: i2", "");

goTo.marker('7');
verify.quickInfoIs("(var) i2_i_x: number", "");

goTo.marker('8');
verify.quickInfoIs("(property) i2.x: number", "this is x");
verify.memberListContains("x", "(property) i2.x: number", "this is x");
verify.memberListContains("foo", "(property) i2.foo: (b: number) => string", "this is foo");
verify.memberListContains("nc_x", "(property) i2.nc_x: number", "");
verify.memberListContains("nc_foo", "(property) i2.nc_foo: (b: number) => string", "");
verify.memberListContains("fnfoo", "(method) i2.fnfoo(b: number): string", "this is fnfoo");
verify.memberListContains("nc_fnfoo", "(method) i2.nc_fnfoo(b: number): string", "");

goTo.marker('9');
verify.quickInfoIs("(var) i2_i_foo: (b: number) => string", "");

goTo.marker('10');
verify.quickInfoIs("(property) i2.foo: (b: number) => string", "this is foo");

goTo.marker('11');
verify.quickInfoIs("(var) i2_i_foo_r: string", "");

goTo.marker('12');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("param help");
goTo.marker('12q');
verify.quickInfoIs("(property) i2.foo: (b: number) => string", "");

goTo.marker('13');
verify.quickInfoIs("(var) i2_i_i2_si: number", "");
goTo.marker('13q');
verify.quickInfoIs("(var) i2_i: i2", "");

goTo.marker('14');
verify.quickInfoIs("(var) i2_i_i2_ii: number", "");
goTo.marker('14q');
verify.quickInfoIs("(var) i2_i: i2", "");

goTo.marker('15');
verify.quickInfoIs("(var) i2_i_n: any", "");

goTo.marker('16');
verify.currentSignatureHelpDocCommentIs("new method");
verify.currentParameterHelpArgumentDocCommentIs("param");
goTo.marker('16q');
verify.quickInfoIs("(var) i2_i: new i2(i: i1) => any", "new method");

goTo.marker('17');
verify.quickInfoIs("(var) i2_i_nc_x: number", "");

goTo.marker('18');
verify.quickInfoIs("(property) i2.nc_x: number", "");

goTo.marker('19');
verify.quickInfoIs("(var) i2_i_nc_foo: (b: number) => string", "");

goTo.marker('20');
verify.quickInfoIs("(property) i2.nc_foo: (b: number) => string", "");

goTo.marker('21');
verify.quickInfoIs("(var) i2_i_nc_foo_r: string", "");

goTo.marker('22');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('22q');
verify.quickInfoIs("(property) i2.nc_foo: (b: number) => string", "");

goTo.marker('23');
verify.quickInfoIs("(var) i2_i_r: number", "");

goTo.marker('24');
verify.currentSignatureHelpDocCommentIs("this is call signature");
verify.currentParameterHelpArgumentDocCommentIs("paramhelp a");
goTo.marker('24q');
verify.quickInfoIs("(var) i2_i: i2(a: number, b: number) => number", "this is call signature");

goTo.marker('25');
verify.currentSignatureHelpDocCommentIs("this is call signature");
verify.currentParameterHelpArgumentDocCommentIs("paramhelp b");

goTo.marker('26');
verify.quickInfoIs("(var) i2_i_fnfoo: (b: number) => string", "");

goTo.marker('27');
verify.quickInfoIs("(method) i2.fnfoo(b: number): string", "this is fnfoo");

goTo.marker('28');
verify.quickInfoIs("(var) i2_i_fnfoo_r: string", "");

goTo.marker('29');
verify.currentSignatureHelpDocCommentIs("this is fnfoo");
verify.currentParameterHelpArgumentDocCommentIs("param help");
goTo.marker('29q');
verify.quickInfoIs("(method) i2.fnfoo(b: number): string", "this is fnfoo");

goTo.marker('30');
verify.quickInfoIs("(var) i2_i_nc_fnfoo: (b: number) => string", "");

goTo.marker('31');
verify.quickInfoIs("(method) i2.nc_fnfoo(b: number): string", "");

goTo.marker('32');
verify.quickInfoIs("(var) i2_i_nc_fnfoo_r: string", "");

goTo.marker('33');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('33q');
verify.quickInfoIs("(method) i2.nc_fnfoo(b: number): string", "");

goTo.marker('34');
verify.completionListContains("i1", "interface i1", "this is interface 1");
verify.completionListContains("i1_i", "(var) i1_i: i1", "");
verify.completionListContains("nc_i1", "interface nc_i1", "");
verify.completionListContains("nc_i1_i", "(var) nc_i1_i: nc_i1", "");
verify.completionListContains("i2", "interface i2", "this is interface 2 with memebers");
verify.completionListContains("i2_i", "(var) i2_i: i2", "");
verify.completionListContains("i2_i_x", "(var) i2_i_x: number", "");
verify.completionListContains("i2_i_foo", "(var) i2_i_foo: (b: number) => string", "");
verify.completionListContains("i2_i_foo_r", "(var) i2_i_foo_r: string", "");
verify.completionListContains("i2_i_i2_si", "(var) i2_i_i2_si: number", "");
verify.completionListContains("i2_i_i2_ii", "(var) i2_i_i2_ii: number", "");
verify.completionListContains("i2_i_n", "(var) i2_i_n: any", "");
verify.completionListContains("i2_i_nc_x", "(var) i2_i_nc_x: number", "");
verify.completionListContains("i2_i_nc_foo", "(var) i2_i_nc_foo: (b: number) => string", "");
verify.completionListContains("i2_i_nc_foo_r", "(var) i2_i_nc_foo_r: string", "");
verify.completionListContains("i2_i_r", "(var) i2_i_r: number", "");
verify.completionListContains("i2_i_fnfoo", "(var) i2_i_fnfoo: (b: number) => string", "");
verify.completionListContains("i2_i_fnfoo_r", "(var) i2_i_fnfoo_r: string", "");
verify.completionListContains("i2_i_nc_fnfoo", "(var) i2_i_nc_fnfoo: (b: number) => string", "");
verify.completionListContains("i2_i_nc_fnfoo_r", "(var) i2_i_nc_fnfoo_r: string", "");

goTo.marker('34i');
verify.completionListContains("i1", "interface i1", "this is interface 1");
verify.completionListContains("nc_i1", "interface nc_i1", "");
verify.completionListContains("i2", "interface i2", "this is interface 2 with memebers");

goTo.marker('36');
verify.completionListContains("a", "(parameter) a: number", "i3_i a");

goTo.marker('40q');
verify.quickInfoIs("(var) i3_i: i3", "");
goTo.marker('40');
verify.completionListContains("i3", "interface i3", "");
verify.completionListContains("i3_i", "(var) i3_i: i3", "");

goTo.marker('41');
verify.quickInfoIs("(method) i3.f(a: number): string", "Function i3 f");
verify.memberListContains("f", "(method) i3.f(a: number): string", "Function i3 f");
verify.memberListContains("l", "(property) i3.l: (b: number) => string", "i3 l");
verify.memberListContains("x", "(property) i3.x: number", "Comment i3 x");
verify.memberListContains("nc_f", "(method) i3.nc_f(a: number): string", "");
verify.memberListContains("nc_l", "(property) i3.nc_l: (b: number) => string", "");
verify.memberListContains("nc_x", "(property) i3.nc_x: number", "");

goTo.marker('42');
verify.currentSignatureHelpDocCommentIs("Function i3 f");
verify.currentParameterHelpArgumentDocCommentIs("number parameter");

goTo.marker('43');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("comment i3 l b");
goTo.marker('43q');
verify.quickInfoIs("(property) i3.l: (b: number) => string", "");

goTo.marker('44');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('44q');
verify.quickInfoIs("(method) i3.nc_f(a: number): string", "");

goTo.marker('45');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('45q');
verify.quickInfoIs("(property) i3.nc_l: (b: number) => string", "");
