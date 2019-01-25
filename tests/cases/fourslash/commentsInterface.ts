/// <reference path='fourslash.ts' />

/////** this is interface 1*/
////interface i/*1*/1 {
////}
////var i1/*2*/_i: i1;
////interface nc_/*3*/i1 {
////}
////var nc_/*4*/i1_i: nc_i1;
/////** this is interface 2 with members*/
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

verify.quickInfos({
    1: ["interface i1", "this is interface 1"],
    2: "var i1_i: i1",
    3: "interface nc_i1",
    4: "var nc_i1_i: nc_i1",
    5: ["interface i2", "this is interface 2 with members"],
    6: "var i2_i: i2",
    7: "var i2_i_x: number"
});

verify.quickInfoAt("8", "(property) i2.x: number", "this is x");
verify.completions({
    marker: "8",
    exact: [
        { name: "x", text: "(property) i2.x: number", documentation: "this is x" },
        { name: "foo", text: "(property) i2.foo: (b: number) => string", documentation: "this is foo" },
        { name: "nc_x", text: "(property) i2.nc_x: number" },
        { name: "nc_foo", text: "(property) i2.nc_foo: (b: number) => string" },
        { name: "fnfoo", text: "(method) i2.fnfoo(b: number): string", documentation: "this is fnfoo" },
        { name: "nc_fnfoo", text: "(method) i2.nc_fnfoo(b: number): string" },
        ...completion.functionMembersWithPrototype,
    ],
    isNewIdentifierLocation: true,
});

verify.quickInfos({
    9: "var i2_i_foo: (b: number) => string",
    10: ["(property) i2.foo: (b: number) => string", "this is foo"],
    11: "var i2_i_foo_r: string"
});

verify.signatureHelp({ marker: "12", docComment: "", parameterDocComment: "param help" });

verify.quickInfos({
    "12q": ["(property) i2.foo: (b: number) => string", "this is foo"],

    13: "var i2_i_i2_si: number",
    "13q": "var i2_i: i2",

    14: "var i2_i_i2_ii: number",
    "14q": "var i2_i: i2",

    15: "var i2_i_n: any"
});

verify.signatureHelp({ marker: "16", docComment: "new method", parameterDocComment: "param" });
verify.quickInfos({
    "16q": ["var i2_i: i2\nnew (i: i1) => any", "new method"],

    17: "var i2_i_nc_x: number",
    18: "(property) i2.nc_x: number",
    19: "var i2_i_nc_foo: (b: number) => string",
    20: "(property) i2.nc_foo: (b: number) => string",
    21: "var i2_i_nc_foo_r: string"
});

verify.signatureHelp({ marker: "22", docComment: "" });
verify.quickInfos({
    "22q": "(property) i2.nc_foo: (b: number) => string",
    23: "var i2_i_r: number"
});

verify.signatureHelp({ marker: "24", docComment: "this is call signature", parameterDocComment: "paramhelp a" });
verify.quickInfoAt("24q", "var i2_i: i2\n(a: number, b: number) => number", "this is call signature");

verify.signatureHelp({ marker: "25", docComment: "this is call signature", parameterDocComment: "paramhelp b" });

verify.quickInfos({
    26: "var i2_i_fnfoo: (b: number) => string",
    27: ["(method) i2.fnfoo(b: number): string", "this is fnfoo"],
    28: "var i2_i_fnfoo_r: string"
});

verify.signatureHelp({ marker: "29", docComment: "this is fnfoo", parameterDocComment: "param help" });

verify.quickInfos({
    "29q": ["(method) i2.fnfoo(b: number): string", "this is fnfoo"],

    30: "var i2_i_nc_fnfoo: (b: number) => string",
    31: "(method) i2.nc_fnfoo(b: number): string",
    32: "var i2_i_nc_fnfoo_r: string"
});

verify.signatureHelp({ marker: "33", docComment: "" });
verify.quickInfoAt("33q", "(method) i2.nc_fnfoo(b: number): string");

verify.completions(
    {
        marker: "34",
        includes: [
            { name: "i1_i", text: "var i1_i: i1" },
            { name: "nc_i1_i", text: "var nc_i1_i: nc_i1", documentation: "" },
            { name: "i2_i", text: "var i2_i: i2" },
            { name: "i2_i_x", text: "var i2_i_x: number" },
            { name: "i2_i_foo", text: "var i2_i_foo: (b: number) => string" },
            { name: "i2_i_foo_r", text: "var i2_i_foo_r: string" },
            { name: "i2_i_i2_si", text: "var i2_i_i2_si: number" },
            { name: "i2_i_i2_ii", text: "var i2_i_i2_ii: number" },
            { name: "i2_i_n", text: "var i2_i_n: any" },
            { name: "i2_i_nc_x", text: "var i2_i_nc_x: number" },
            { name: "i2_i_nc_foo", text: "var i2_i_nc_foo: (b: number) => string" },
            { name: "i2_i_nc_foo_r", text: "var i2_i_nc_foo_r: string" },
            { name: "i2_i_r", text: "var i2_i_r: number" },
            { name: "i2_i_fnfoo", text: "var i2_i_fnfoo: (b: number) => string" },
            { name: "i2_i_fnfoo_r", text: "var i2_i_fnfoo_r: string" },
            { name: "i2_i_nc_fnfoo", text: "var i2_i_nc_fnfoo: (b: number) => string" },
            { name: "i2_i_nc_fnfoo_r", text: "var i2_i_nc_fnfoo_r: string" },
        ],
        excludes: ["i1", "nc_i1", "i2"],
    },
    {
        marker: "34i",
        includes: [
            { name: "i1", text: "interface i1", documentation: "this is interface 1" },
            { name: "nc_i1", text: "interface nc_i1" },
            { name: "i2", text: "interface i2", documentation: "this is interface 2 with members" },
        ],
    },
    {
        marker: "36", includes: { name: "a", text: "(parameter) a: number", documentation: "i3_i a" },
    }
);

verify.quickInfoAt("40q", "var i3_i: i3");
verify.completions({ marker: "40", includes: { name: "i3_i", text: "var i3_i: i3" }, excludes: "i3" });

goTo.marker('41');
verify.quickInfoIs("(method) i3.f(a: number): string", "Function i3 f");
verify.completions({
    marker: "41",
    exact: [
        { name: "x", text: "(property) i3.x: number", documentation: "Comment i3 x" },
        { name: "f", text: "(method) i3.f(a: number): string", documentation: "Function i3 f" },
        { name: "l", text: "(property) i3.l: (b: number) => string", documentation: "i3 l" },
        { name: "nc_x", text: "(property) i3.nc_x: number" },
        { name: "nc_f", text: "(method) i3.nc_f(a: number): string" },
        { name: "nc_l", text: "(property) i3.nc_l: (b: number) => string" },
    ],
});

verify.signatureHelp({ marker: "42", docComment: "Function i3 f", parameterDocComment: "number parameter" });

verify.signatureHelp({ marker: "43", docComment: "", parameterDocComment: "comment i3 l b" });
verify.quickInfoAt("43q", "(property) i3.l: (b: number) => string", "i3 l");

verify.signatureHelp({ marker: "44", docComment: "" });
verify.quickInfoAt("44q", "(method) i3.nc_f(a: number): string");

verify.signatureHelp({ marker: "45", docComment: "" });
verify.quickInfoAt("45q", "(property) i3.nc_l: (b: number) => string");
