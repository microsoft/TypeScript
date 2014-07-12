/// <reference path='fourslash.ts' />

/////** This is comment for c1*/
////class c/*1*/1 {
////    /** p1 is property of c1*/
////    public p/*2*/1: number;
////    /** sum with property*/
////    public p/*3*/2(/** number to add*/b: number) {
////        return this./*4*/p1 + /*5*/b;
////    }
////    /** getter property*/
////    public get p/*6*/3() {
////        return this./*7*/p/*8q*/2(/*8*/this./*9*/p1);
////    }
////    /** setter property*/
////    public set p/*10*/3(/** this is value*/value: number) {
////        this./*11*/p1 = this./*12*/p/*13q*/2(/*13*/value);
////    }
////    /** pp1 is property of c1*/
////    private p/*14*/p1: number;
////    /** sum with property*/
////    private p/*15*/p2(/** number to add*/b: number) {
////        return this./*16*/p1 + /*17*/b;
////    }
////    /** getter property*/
////    private get p/*18*/p3() {
////        return this./*19*/p/*20q*/p2(/*20*/this./*21*/pp1);
////    }
////    /** setter property*/
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
////    /** setter property*/
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

goTo.marker('1');
verify.quickInfoIs(undefined, "This is comment for c1", "c1", "class");

goTo.marker('2');
verify.quickInfoIs("number", "p1 is property of c1", "c1.p1", "property");

goTo.marker('3');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.p2", "method");

goTo.marker('4');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('5');
verify.completionListContains("b", "number", "number to add", "b", "parameter");

goTo.marker('6');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.p3", "property");

goTo.marker('7');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
goTo.marker('8q');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.p2", "method");

goTo.marker('9');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('10');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.p3", "property");

goTo.marker('11');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('12');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('13');
verify.currentSignatureHelpDocCommentIs("sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
verify.completionListContains("value", "number", "this is value", "value", "parameter");
goTo.marker('13q');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.p2", "method");

goTo.marker('14');
verify.quickInfoIs("number", "pp1 is property of c1", "c1.pp1", "property");

goTo.marker('15');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.pp2", "method");

goTo.marker('16');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('17');
verify.completionListContains("b", "number", "number to add", "b", "parameter");

goTo.marker('18');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.pp3", "property");

goTo.marker('19');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('20');
verify.currentSignatureHelpDocCommentIs("sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
goTo.marker('20q');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.pp2", "method");

goTo.marker('21');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('22');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.pp3", "property");

goTo.marker('23');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('24');
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("pp1", "number", "pp1 is property of c1", "c1.pp1", "property");
verify.memberListContains("pp2", "(b: number): number", "sum with property", "c1.pp2", "method");
verify.memberListContains("pp3", "number", "getter property\nsetter property", "c1.pp3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");
verify.memberListContains("nc_pp1", "number", "", "c1.nc_pp1", "property");
verify.memberListContains("nc_pp2", "(b: number): number", "", "c1.nc_pp2", "method");
verify.memberListContains("nc_pp3", "number", "", "c1.nc_pp3", "property");

goTo.marker('25');
verify.currentSignatureHelpDocCommentIs("sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
verify.completionListContains("value", "number", "this is value", "value", "parameter");
goTo.marker('25q');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.pp2", "method");

goTo.marker('26');
verify.quickInfoIs("(): c1", "Constructor method", "c1", "constructor");

goTo.marker('27');
verify.quickInfoIs("number", "s1 is static property of c1", "c1.s1", "property");

goTo.marker('28');
verify.quickInfoIs("(b: number): number", "static sum with property", "c1.s2", "method");

goTo.marker('29');
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");

goTo.marker('30');
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('31');
verify.completionListContains("b", "number", "number to add", "b", "parameter");

goTo.marker('32');
verify.quickInfoIs("number", "static getter property\nsetter property", "c1.s3", "property");

goTo.marker('33');
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");

goTo.marker('34');
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('35');
verify.currentSignatureHelpDocCommentIs("static sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");
goTo.marker('35q');
verify.quickInfoIs("(b: number): number", "static sum with property", "c1.s2", "method");

goTo.marker('36');
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('37');
verify.quickInfoIs("number", "static getter property\nsetter property", "c1.s3", "property");

goTo.marker('38');
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");

goTo.marker('39');
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('40');
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");

goTo.marker('41');
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('42');
verify.currentSignatureHelpDocCommentIs("static sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
verify.completionListContains("value", "number", "this is value", "value", "parameter");
goTo.marker('42q');
verify.quickInfoIs("(b: number): number", "static sum with property", "c1.s2", "method");

goTo.marker('43');
verify.quickInfoIs("number", "", "c1.nc_p1", "property");

goTo.marker('44');
verify.quickInfoIs("(b: number): number", "", "c1.nc_p2", "method");

goTo.marker('45');
verify.completionListContains("b", "number", "", "b", "parameter");

goTo.marker('46');
verify.quickInfoIs("number", "", "c1.nc_p3", "property");

goTo.marker('47');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('47q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_p2", "method");

goTo.marker('48');
verify.quickInfoIs("number", "", "c1.nc_p3", "property");

goTo.marker('49');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
verify.completionListContains("value", "number", "", "value", "parameter");
goTo.marker('49q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_p2", "method");

goTo.marker('50');
verify.quickInfoIs("number", "", "c1.nc_pp1", "property");

goTo.marker('51');
verify.quickInfoIs("(b: number): number", "", "c1.nc_pp2", "method");

goTo.marker('52');
verify.completionListContains("b", "number", "", "b", "parameter");

goTo.marker('53');
verify.quickInfoIs("number", "", "c1.nc_pp3", "property");

goTo.marker('54');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('54q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_pp2", "method");

goTo.marker('55');
verify.quickInfoIs("number", "", "c1.nc_pp3", "property");

goTo.marker('56');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
verify.completionListContains("value", "number", "", "value", "parameter");
goTo.marker('56q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_pp2", "method");

goTo.marker('57');
verify.quickInfoIs("number", "", "c1.nc_s1", "property");

goTo.marker('58');
verify.quickInfoIs("(b: number): number", "", "c1.nc_s2", "method");

goTo.marker('59');
verify.completionListContains("b", "number", "", "b", "parameter");

goTo.marker('60');
verify.quickInfoIs("number", "", "c1.nc_s3", "property");

goTo.marker('61');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('61q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_s2", "method");

goTo.marker('62');
verify.quickInfoIs("number", "", "c1.nc_s3", "property");

goTo.marker('63');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
verify.completionListContains("value", "number", "", "value", "parameter");
goTo.marker('63q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_s2", "method");

goTo.marker('64');
verify.quickInfoIs("c1", "", "i1", "var");

goTo.marker('65');
verify.currentSignatureHelpDocCommentIs("Constructor method");
goTo.marker('65q');
verify.quickInfoIs("(): c1", "Constructor method", "c1", "constructor");

goTo.marker('66');
verify.quickInfoIs("number", "", "i1_p", "var");

goTo.marker('67');
verify.quickInfoIs("number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p1", "number", "p1 is property of c1", "c1.p1", "property");
verify.memberListContains("p2", "(b: number): number", "sum with property", "c1.p2", "method");
verify.memberListContains("p3", "number", "getter property\nsetter property", "c1.p3", "property");
verify.memberListContains("nc_p1", "number", "", "c1.nc_p1", "property");
verify.memberListContains("nc_p2", "(b: number): number", "", "c1.nc_p2", "method");
verify.memberListContains("nc_p3", "number", "", "c1.nc_p3", "property");

goTo.marker('68');
verify.quickInfoIs("(b: number) => number", "", "i1_f", "var");

goTo.marker('69');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.p2", "method");

goTo.marker('70');
verify.quickInfoIs("number", "", "i1_r", "var");

goTo.marker('71');
verify.currentSignatureHelpDocCommentIs("sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
goTo.marker('71q');
verify.quickInfoIs("(b: number): number", "sum with property", "c1.p2", "method");

goTo.marker('72');
verify.quickInfoIs("number", "", "i1_prop", "var");
goTo.marker('73');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.p3", "property");
goTo.marker('74');
verify.quickInfoIs("number", "getter property\nsetter property", "c1.p3", "property");
goTo.marker('75');
verify.quickInfoIs("number", "", "i1_prop", "var");

goTo.marker('76');
verify.quickInfoIs("number", "", "i1_nc_p", "var");

goTo.marker('77');
verify.quickInfoIs("number", "", "c1.nc_p1", "property");

goTo.marker('78');
verify.quickInfoIs("(b: number) => number", "", "i1_ncf", "var");

goTo.marker('79');
verify.quickInfoIs("(b: number): number", "", "c1.nc_p2", "method");

goTo.marker('80');
verify.quickInfoIs("number", "", "i1_ncr", "var");

goTo.marker('81');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('81q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_p2", "method");

goTo.marker('82');
verify.quickInfoIs("number", "", "i1_ncprop", "var");
goTo.marker('83');
verify.quickInfoIs("number", "", "c1.nc_p3", "property");
goTo.marker('84');
verify.quickInfoIs("number", "", "c1.nc_p3", "property");
goTo.marker('85');
verify.quickInfoIs("number", "", "i1_ncprop", "var");

goTo.marker('86');
verify.quickInfoIs("number", "", "i1_s_p", "var");

goTo.marker('87');
verify.quickInfoIs(undefined, "This is comment for c1\nConstructor method", "c1", "class");
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");

goTo.marker('88');
verify.quickInfoIs("number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s1", "number", "s1 is static property of c1", "c1.s1", "property");
verify.memberListContains("s2", "(b: number): number", "static sum with property", "c1.s2", "method");
verify.memberListContains("s3", "number", "static getter property\nsetter property", "c1.s3", "property");
verify.memberListContains("nc_s1", "number", "", "c1.nc_s1", "property");
verify.memberListContains("nc_s2", "(b: number): number", "", "c1.nc_s2", "method");
verify.memberListContains("nc_s3", "number", "", "c1.nc_s3", "property");

goTo.marker('89');
verify.quickInfoIs("(b: number) => number", "", "i1_s_f", "var");

goTo.marker('90');
verify.quickInfoIs("(b: number): number", "static sum with property", "c1.s2", "method");

goTo.marker('91');
verify.quickInfoIs("number", "", "i1_s_r", "var");

goTo.marker('92');
verify.currentSignatureHelpDocCommentIs("static sum with property");
verify.currentParameterHelpArgumentDocCommentIs("number to add");
goTo.marker('92q');
verify.quickInfoIs("(b: number): number", "static sum with property", "c1.s2", "method");

goTo.marker('93');
verify.quickInfoIs("number", "", "i1_s_prop", "var");
goTo.marker('94');
verify.quickInfoIs("number", "static getter property\nsetter property", "c1.s3", "property");
goTo.marker('95');
verify.quickInfoIs("number", "static getter property\nsetter property", "c1.s3", "property");
goTo.marker('96');
verify.quickInfoIs("number", "", "i1_s_prop", "var");

goTo.marker('97');
verify.quickInfoIs("number", "", "i1_s_nc_p", "var");

goTo.marker('98');
verify.quickInfoIs("number", "", "c1.nc_s1", "property");

goTo.marker('99');
verify.quickInfoIs("(b: number) => number", "", "i1_s_ncf", "var");

goTo.marker('100');
verify.quickInfoIs("(b: number): number", "", "c1.nc_s2", "method");

goTo.marker('101');
verify.quickInfoIs("number", "", "i1_s_ncr", "var");

goTo.marker('102');
verify.currentSignatureHelpDocCommentIs("");
verify.currentParameterHelpArgumentDocCommentIs("");
goTo.marker('102q');
verify.quickInfoIs("(b: number): number", "", "c1.nc_s2", "method");

goTo.marker('103');
verify.quickInfoIs("number", "", "i1_s_ncprop", "var");
goTo.marker('104');
verify.quickInfoIs("number", "", "c1.nc_s3", "property");
goTo.marker('105');
verify.quickInfoIs("number", "", "c1.nc_s3", "property");
goTo.marker('106');
verify.quickInfoIs("number", "", "i1_s_ncprop", "var");

goTo.marker('107');
verify.quickInfoIs("typeof c1", "", "i1_c", "var");

goTo.marker('108');
verify.quickInfoIs(undefined, "This is comment for c1\nConstructor method", "c1", "class");

goTo.marker('109');
verify.completionListContains("c1", undefined, "This is comment for c1", "c1", "class");
verify.completionListContains("i1", "c1", "", "i1", "var");
verify.completionListContains("i1_p", "number", "", "i1_p", "var");
verify.completionListContains("i1_f", "(b: number) => number", "", "i1_f", "var");
verify.completionListContains("i1_r", "number", "", "i1_r", "var");
verify.completionListContains("i1_prop", "number", "", "i1_prop", "var");
verify.completionListContains("i1_nc_p", "number", "", "i1_nc_p", "var");
verify.completionListContains("i1_ncf", "(b: number) => number", "", "i1_ncf", "var");
verify.completionListContains("i1_ncr", "number", "", "i1_ncr", "var");
verify.completionListContains("i1_ncprop", "number", "", "i1_ncprop", "var");
verify.completionListContains("i1_s_p", "number", "", "i1_s_p", "var");
verify.completionListContains("i1_s_f", "(b: number) => number", "", "i1_s_f", "var");
verify.completionListContains("i1_s_r", "number", "", "i1_s_r", "var");
verify.completionListContains("i1_s_prop", "number", "", "i1_s_prop", "var");
verify.completionListContains("i1_s_nc_p", "number", "", "i1_s_nc_p", "var");
verify.completionListContains("i1_s_ncf", "(b: number) => number", "", "i1_s_ncf", "var");
verify.completionListContains("i1_s_ncr", "number", "", "i1_s_ncr", "var");
verify.completionListContains("i1_s_ncprop", "number", "", "i1_s_ncprop", "var");

verify.completionListContains("i1_c", "typeof c1", "", "i1_c", "var");

goTo.marker('110');
verify.quickInfoIs("number", "setter only property", "cProperties.p2", "property");
verify.memberListContains("p1", "number", "getter only property", "cProperties.p1", "property");
verify.memberListContains("p2", "number", "setter only property", "cProperties.p2", "property");
verify.memberListContains("nc_p1", "number", "", "cProperties.nc_p1", "property");
verify.memberListContains("nc_p2", "number", "", "cProperties.nc_p2", "property");

goTo.marker('111');
verify.quickInfoIs("number", "getter only property", "cProperties.p1", "property");
goTo.marker('112');
verify.quickInfoIs("number", "", "cProperties.nc_p2", "property");
goTo.marker('113');
verify.quickInfoIs("number", "", "cProperties.nc_p1", "property");

goTo.marker('114');
verify.memberListContains("a", "number", "more info about a", "cWithConstructorProperty.a", "property");
verify.quickInfoIs("number", "more info about a", "cWithConstructorProperty.a", "property");

goTo.marker('115');
verify.completionListContains("a", "number", "this is first parameter a\nmore info about a", "a", "parameter");
verify.quickInfoIs("number", "this is first parameter a\nmore info about a", "a", "parameter");

goTo.marker('116');
verify.quickInfoIs("cWithConstructorProperty", "", "cWithConstructorProperty", "class");

goTo.marker('117');
verify.quickInfoIs("number", "", "bbbb", "local var");

goTo.marker('118');
verify.quickInfoIs("number", "", "bbbb", "local var");

goTo.marker('119');
verify.quickInfoIs("(a: number): cWithConstructorProperty", "this is class cWithConstructorProperty's constructor", "cWithConstructorProperty", "constructor");