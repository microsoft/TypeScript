/// <reference path='fourslash.ts' />

/////** This is comment for c1*/
////class c/*1*/1 {
////    /** p1 is property of c1*/
////    public p/*2*/1: number;
////    /** sum with property*/
////    public p/*3*/2(/** number to add*/b: number) {
////        return this./*4*/p1 + /*5*/b;
////    }
////    /** getter property 1*/
////    public get p/*6*/3() {
////        return this./*7*/p/*8q*/2(/*8*/this./*9*/p1);
////    }
////    /** setter property 1*/
////    public set p/*10*/3(/** this is value*/value: number) {
////        this./*11*/p1 = this./*12*/p/*13q*/2(/*13*/value);
////    }
////    /** pp1 is property of c1*/
////    private p/*14*/p1: number;
////    /** sum with property*/
////    private p/*15*/p2(/** number to add*/b: number) {
////        return this./*16*/p1 + /*17*/b;
////    }
////    /** getter property 2*/
////    private get p/*18*/p3() {
////        return this./*19*/p/*20q*/p2(/*20*/this./*21*/pp1);
////    }
////    /** setter property 2*/
////    private set p/*22*/p3( /** this is value*/value: number) {
////        this./*23*/pp1 = this./*24*/p/*25q*/p2(/*25*/value);
////    }
////    /** Constructor method*/
////    constru/*26*/ctor() {
////    }
////    /** s1 is static property of c1*/
////    static s/*27*/1: number;
////    /** static sum with property*/
////    static s/*28*/2(/** number to add*/b: number) {
////        return /*29*/c1./*30*/s1 + /*31*/b;
////    }
////    /** static getter property*/
////    static get s/*32*/3() {
////        return /*33*/c1./*34*/s/*35q*/2(/*35*/c1./*36*/s1);
////    }
////    /** setter property 3*/
////    static set s/*37*/3( /** this is value*/value: number) {
////        /*38*/c1./*39*/s1 = /*40*/c1./*41*/s/*42q*/2(/*42*/value);
////    }
////    public nc_/*43*/p1: number;
////    public nc_/*44*/p2(b: number) {
////        return this.nc_p1 + /*45*/b;
////    }
////    public get nc_/*46*/p3() {
////        return this.nc/*47q*/_p2(/*47*/this.nc_p1);
////    }
////    public set nc/*48*/_p3(value: number) {
////        this.nc_p1 = this.nc/*49q*/_p2(/*49*/value);
////    }
////    private nc/*50*/_pp1: number;
////    private nc_/*51*/pp2(b: number) {
////        return this.nc_pp1 + /*52*/b;
////    }
////    private get nc/*53*/_pp3() {
////        return this.nc_/*54q*/pp2(/*54*/this.nc_pp1);
////    }
////    private set nc_p/*55*/p3(value: number) {
////        this.nc_pp1 = this./*56q*/nc_pp2(/*56*/value);
////    }
////    static nc/*57*/_s1: number;
////    static nc/*58*/_s2(b: number) {
////        return c1.nc_s1 + /*59*/b;
////    }
////    static get nc/*60*/_s3() {
////        return c1.nc/*61q*/_s2(/*61*/c1.nc_s1);
////    }
////    static set nc/*62*/_s3(value: number) {
////        c1.nc_s1 = c1.nc_/*63q*/s2(/*63*/value);
////    }
////}
////var i/*64*/1 = new c/*65q*/1(/*65*/);
////var i1/*66*/_p = i1./*67*/p1;
////var i1/*68*/_f = i1.p/*69*/2;
////var i1/*70*/_r = i1.p/*71q*/2(/*71*/20);
////var i1_p/*72*/rop = i1./*73*/p3;
////i1./*74*/p3 = i1_/*75*/prop;
////var i1_/*76*/nc_p = i1.n/*77*/c_p1;
////var i1/*78*/_ncf = i1.nc_/*79*/p2;
////var i1_/*80*/ncr = i1.nc/*81q*/_p2(/*81*/20);
////var i1_n/*82*/cprop = i1.n/*83*/c_p3;
////i1.nc/*84*/_p3 = i1_/*85*/ncprop;
////var i1_/*86*/s_p = /*87*/c1./*88*/s1;
////var i1_s/*89*/_f = c1./*90*/s2;
////var i1_/*91*/s_r = c1.s/*92q*/2(/*92*/20);
////var i1_s/*93*/_prop = c1.s/*94*/3;
////c1.s/*95*/3 = i1_s/*96*/_prop;
////var i1_s/*97*/_nc_p = c1.n/*98*/c_s1;
////var i1_s_/*99*/ncf = c1.nc/*100*/_s2;
////var i1_s_/*101*/ncr = c1.n/*102q*/c_s2(/*102*/20);
////var i1_s_n/*103*/cprop = c1.nc/*104*/_s3;
////c1.nc/*105*/_s3 = i1_s_nc/*106*/prop;
////var i1/*107*/_c = c/*108*/1;
/////*109*/
////class cProperties {
////    private val: number;
////    /** getter only property*/
////    public get p1() {
////        return this.val;
////    }
////    public get nc_p1() {
////        return this.val;
////    }
////    /**setter only property*/
////    public set p2(value: number) {
////        this.val = value;
////    }
////    public set nc_p2(value: number) {
////        this.val = value;
////    }
////}
////var cProperties_i = new cProperties();
////cProperties_i./*110*/p2 = cProperties_i.p/*111*/1;
////cProperties_i.nc/*112*/_p2 = cProperties_i.nc/*113*/_p1;
////class cWithConstructorProperty {
////    /**
////    * this is class cWithConstructorProperty's constructor
////    * @param a this is first parameter a
////    */
////    /*119*/constructor(/**more info about a*/public a: number) {
////        var b/*118*/bbb = 10;
////        th/*116*/is./*114*/a = /*115*/a + 2 + bb/*117*/bb;
////    }
////}

const publicProperties: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "p1", text: "(property) c1.p1: number", documentation: "p1 is property of c1" },
    { name: "p2", text: "(method) c1.p2(b: number): number", documentation: "sum with property" },
    { name: "p3", text: "(property) c1.p3: number", documentation: "getter property 1\nsetter property 1" },
];
const publicNcProperties: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "nc_p1", text: "(property) c1.nc_p1: number" },
    { name: "nc_p2", text: "(method) c1.nc_p2(b: number): number" },
    { name: "nc_p3", text: "(property) c1.nc_p3: number" },
];
const locals: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry> = [
    { name: "c1", text: "class c1", documentation: "This is comment for c1" },
    { name: "i1", text: "var i1: c1" },
    { name: "i1_p", text: "var i1_p: number" },
    { name: "i1_f", text: "var i1_f: (b: number) => number" },
    { name: "i1_r", text: "var i1_r: number" },
    { name: "i1_prop", text: "var i1_prop: number" },
    { name: "i1_nc_p", text: "var i1_nc_p: number" },
    { name: "i1_ncf", text: "var i1_ncf: (b: number) => number" },
    { name: "i1_ncr", text: "var i1_ncr: number" },
    { name: "i1_ncprop", text: "var i1_ncprop: number" },
    { name: "i1_s_p", text: "var i1_s_p: number" },
    { name: "i1_s_f", text: "var i1_s_f: (b: number) => number" },
    { name: "i1_s_r", text: "var i1_s_r: number" },
    { name: "i1_s_prop", text: "var i1_s_prop: number" },
    { name: "i1_s_nc_p", text: "var i1_s_nc_p: number" },
    { name: "i1_s_ncf", text: "var i1_s_ncf: (b: number) => number" },
    { name: "i1_s_ncr", text: "var i1_s_ncr: number" },
    { name: "i1_s_ncprop", text: "var i1_s_ncprop: number" },
    { name: "i1_c", text: "var i1_c: typeof c1" },
];

verify.completions(
    {
        marker: ["4", "7", "9", "11", "12", "16", "19", "21", "23", "24"],
        exact: [
            ...publicProperties,
            { name: "pp1", text: "(property) c1.pp1: number", documentation: "pp1 is property of c1" },
            { name: "pp2", text: "(method) c1.pp2(b: number): number", documentation: "sum with property" },
            { name: "pp3", text: "(property) c1.pp3: number", documentation: "getter property 2\nsetter property 2" },
            ...publicNcProperties,
            { name: "nc_pp1", text: "(property) c1.nc_pp1: number" },
            { name: "nc_pp2", text: "(method) c1.nc_pp2(b: number): number" },
            { name: "nc_pp3", text: "(property) c1.nc_pp3: number" },
        ],
    },
    {
        marker: ["5", "17"],
        includes: { name: "b", text: "(parameter) b: number", documentation: "number to add" },
    },
    {
        marker: ["13", "25"],
        includes: [{ name: "value", text: "(parameter) value: number", documentation: "this is value" }],
        isNewIdentifierLocation: true,
    },
    {
        marker: ["30", "34", "36", "39", "41", "88"],
        exact: [
            "prototype",
            { name: "s1", text: "(property) c1.s1: number", documentation: "s1 is static property of c1" },
            { name: "s2", text: "(method) c1.s2(b: number): number", documentation: "static sum with property" },
            { name: "s3", text: "(property) c1.s3: number", documentation: "static getter property\nsetter property 3" },
            { name: "nc_s1", text: "(property) c1.nc_s1: number" },
            { name: "nc_s2", text: "(method) c1.nc_s2(b: number): number" },
            { name: "nc_s3", text: "(property) c1.nc_s3: number" },
            ...completion.functionMembers,
        ],
    },
    { marker: ["29", "33", "38", "109"], includes: locals },
    { marker: ["35", "40", "87"], includes: locals, isNewIdentifierLocation: true },
    { marker: "31", includes: { name: "b", text: "(parameter) b: number", documentation: "number to add" } },
    { marker: "42", includes: { name: "value", text: "(parameter) value: number", documentation: "this is value" }, isNewIdentifierLocation: true },
    { marker: ["45", "52", "59"], includes: { name: "b", text: "(parameter) b: number" } },
    { marker: ["49", "56", "63"], includes: { name: "value", text: "(parameter) value: number" }, isNewIdentifierLocation: true },
    { marker: "67", exact: [...publicProperties, ...publicNcProperties] },
    {
        marker: "110",
        includes: [
            { name: "p1", text: "(property) cProperties.p1: number", documentation: "getter only property" },
            { name: "p2", text: "(property) cProperties.p2: number", documentation: "setter only property" },
            { name: "nc_p1", text: "(property) cProperties.nc_p1: number" },
            { name: "nc_p2", text: "(property) cProperties.nc_p2: number" },
        ],
    },
    {
        marker: "114",
        includes: {
            name: "a",
            text: "(property) cWithConstructorProperty.a: number",
            documentation: "more info about a\nthis is first parameter a",
            tags: [{ name: "param", text: "a this is first parameter a" }],
        },
    },
    {
        marker: "115",
        includes: {
            name: "a",
            text: "(parameter) a: number",
            documentation: "more info about a\nthis is first parameter a",
            tags: [{ name: "param", text: "a this is first parameter a" }],
        },
        isNewIdentifierLocation: true,
    },
);

verify.signatureHelp(
    { marker: ["8", "13", "20", "25", "71"], docComment: "sum with property", parameterDocComment: "number to add" },
    { marker: ["35", "42", "92"], docComment: "static sum with property", parameterDocComment: "number to add" },
    { marker: ["47", "49", "54", "56", "61", "63", "81", "102"], docComment: "" },
    { marker: "65", docComment: "Constructor method" },
);

verify.quickInfos({
    1: ["class c1", "This is comment for c1"],
    2: ["(property) c1.p1: number", "p1 is property of c1"],
    3: ["(method) c1.p2(b: number): number", "sum with property"],
    6: ["(property) c1.p3: number", "getter property 1"],
    "8q": ["(method) c1.p2(b: number): number", "sum with property"],
    10: ["(property) c1.p3: number", "setter property 1"],
    "13q": ["(method) c1.p2(b: number): number", "sum with property"],
    14: ["(property) c1.pp1: number", "pp1 is property of c1"],
    15: ["(method) c1.pp2(b: number): number", "sum with property"],
    18: ["(property) c1.pp3: number", "getter property 2"],
    "20q": ["(method) c1.pp2(b: number): number", "sum with property"],
    22: ["(property) c1.pp3: number", "setter property 2"],
    "25q": ["(method) c1.pp2(b: number): number", "sum with property"],
    26: ["constructor c1(): c1", "Constructor method"],
    27: ["(property) c1.s1: number", "s1 is static property of c1"],
    28: ["(method) c1.s2(b: number): number", "static sum with property"],
    32: ["(property) c1.s3: number", "static getter property"],
    "35q": ["(method) c1.s2(b: number): number", "static sum with property"],
    37: ["(property) c1.s3: number", "setter property 3"],
    "42q": ["(method) c1.s2(b: number): number", "static sum with property"],
    43: "(property) c1.nc_p1: number",
    44: "(method) c1.nc_p2(b: number): number",
    46: "(property) c1.nc_p3: number",
    "47q": "(method) c1.nc_p2(b: number): number",
    48: "(property) c1.nc_p3: number",
    "49q": "(method) c1.nc_p2(b: number): number",
    50: "(property) c1.nc_pp1: number",
    51: "(method) c1.nc_pp2(b: number): number",
    53: "(property) c1.nc_pp3: number",
    "54q": "(method) c1.nc_pp2(b: number): number",
    55: "(property) c1.nc_pp3: number",
    "56q": "(method) c1.nc_pp2(b: number): number",
    57: "(property) c1.nc_s1: number",
    58: "(method) c1.nc_s2(b: number): number",
    60: "(property) c1.nc_s3: number",
    "61q": "(method) c1.nc_s2(b: number): number",
    62: "(property) c1.nc_s3: number",
    "63q": "(method) c1.nc_s2(b: number): number",
    64: "var i1: c1",
    "65q": ["constructor c1(): c1", "Constructor method"],
    66: "var i1_p: number",
    68: "var i1_f: (b: number) => number",
    69: ["(method) c1.p2(b: number): number", "sum with property"],
    70: "var i1_r: number",
    "71q": ["(method) c1.p2(b: number): number", "sum with property"],
    72: "var i1_prop: number",
    73: ["(property) c1.p3: number", "getter property 1\nsetter property 1"],
    74: ["(property) c1.p3: number", "getter property 1\nsetter property 1"],
    75: "var i1_prop: number",
    76: "var i1_nc_p: number",
    77: "(property) c1.nc_p1: number",
    78: "var i1_ncf: (b: number) => number",
    79: "(method) c1.nc_p2(b: number): number",
    80: "var i1_ncr: number",
    "81q": "(method) c1.nc_p2(b: number): number",
    82: "var i1_ncprop: number",
    83: "(property) c1.nc_p3: number",
    84: "(property) c1.nc_p3: number",
    85: "var i1_ncprop: number",
    86: "var i1_s_p: number",
    87: ["class c1", "This is comment for c1"],
    89: "var i1_s_f: (b: number) => number",
    90: ["(method) c1.s2(b: number): number", "static sum with property"],
    91: "var i1_s_r: number",
    "92q": ["(method) c1.s2(b: number): number", "static sum with property"],
    93: "var i1_s_prop: number",
    94: ["(property) c1.s3: number", "static getter property\nsetter property 3"],
    95: ["(property) c1.s3: number", "static getter property\nsetter property 3"],
    96: "var i1_s_prop: number",
    97: "var i1_s_nc_p: number",
    98: "(property) c1.nc_s1: number",
    99: "var i1_s_ncf: (b: number) => number",
    100: "(method) c1.nc_s2(b: number): number",
    101: "var i1_s_ncr: number",
    "102q": "(method) c1.nc_s2(b: number): number",
    103: "var i1_s_ncprop: number",
    104: "(property) c1.nc_s3: number",
    105: "(property) c1.nc_s3: number",
    106: "var i1_s_ncprop: number",
    107: "var i1_c: typeof c1",
    108: ["class c1", "This is comment for c1"],
    110: ["(property) cProperties.p2: number", "setter only property"],
    111: ["(property) cProperties.p1: number", "getter only property"],
    112: "(property) cProperties.nc_p2: number",
    113: "(property) cProperties.nc_p1: number",
    114: ["(property) cWithConstructorProperty.a: number", "more info about a\nthis is first parameter a"],
    115: ["(parameter) a: number", "more info about a\nthis is first parameter a"],
    116: "this: this",
    117: "(local var) bbbb: number",
    118: "(local var) bbbb: number",
    119: [
        "constructor cWithConstructorProperty(a: number): cWithConstructorProperty",
        "this is class cWithConstructorProperty's constructor"
    ],
});
