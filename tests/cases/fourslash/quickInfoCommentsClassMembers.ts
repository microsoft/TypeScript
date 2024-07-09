/// <reference path='fourslash.ts' />

/////** This is comment for c1*/
////class c/*1*/1 {
////    /** p1 is property of c1*/
////    public p/*2*/1: number;
////    /** sum with property*/
////    public p/*3*/2(/** number to add*/b: number) {
////        return this.p1 + b;
////    }
////    /** getter property 1*/
////    public get p/*6*/3() {
////        return this.p/*8q*/2(this.p1);
////    }
////    /** setter property 1*/
////    public set p/*10*/3(/** this is value*/value: number) {
////        this.p1 = this.p/*13q*/2(value);
////    }
////    /** pp1 is property of c1*/
////    private p/*14*/p1: number;
////    /** sum with property*/
////    private p/*15*/p2(/** number to add*/b: number) {
////        return this.p1 + b;
////    }
////    /** getter property 2*/
////    private get p/*18*/p3() {
////        return this.p/*20q*/p2(this.pp1);
////    }
////    /** setter property 2*/
////    private set p/*22*/p3( /** this is value*/value: number) {
////        this.pp1 = this.p/*25q*/p2(value);
////    }
////    /** Constructor method*/
////    constru/*26*/ctor() {
////    }
////    /** s1 is static property of c1*/
////    static s/*27*/1: number;
////    /** static sum with property*/
////    static s/*28*/2(/** number to add*/b: number) {
////        return c1.s1 + b;
////    }
////    /** static getter property*/
////    static get s/*32*/3() {
////        return c1.s/*35q*/2(c1.s1);
////    }
////    /** setter property 3*/
////    static set s/*37*/3( /** this is value*/value: number) {
////        c1.s1 = c1.s/*42q*/2(value);
////    }
////    public nc_/*43*/p1: number;
////    public nc_/*44*/p2(b: number) {
////        return this.nc_p1 + b;
////    }
////    public get nc_/*46*/p3() {
////        return this.nc/*47q*/_p2(this.nc_p1);
////    }
////    public set nc/*48*/_p3(value: number) {
////        this.nc_p1 = this.nc/*49q*/_p2(value);
////    }
////    private nc/*50*/_pp1: number;
////    private nc_/*51*/pp2(b: number) {
////        return this.nc_pp1 + b;
////    }
////    private get nc/*53*/_pp3() {
////        return this.nc_/*54q*/pp2(this.nc_pp1);
////    }
////    private set nc_p/*55*/p3(value: number) {
////        this.nc_pp1 = this./*56q*/nc_pp2(value);
////    }
////    static nc/*57*/_s1: number;
////    static nc/*58*/_s2(b: number) {
////        return c1.nc_s1 + b;
////    }
////    static get nc/*60*/_s3() {
////        return c1.nc/*61q*/_s2(c1.nc_s1);
////    }
////    static set nc/*62*/_s3(value: number) {
////        c1.nc_s1 = c1.nc_/*63q*/s2(value);
////    }
////}
////var i/*64*/1 = new c/*65q*/1();
////var i1/*66*/_p = i1.p1;
////var i1/*68*/_f = i1.p/*69*/2;
////var i1/*70*/_r = i1.p/*71q*/2(20);
////var i1_p/*72*/rop = i1./*73*/p3;
////i1./*74*/p3 = i1_/*75*/prop;
////var i1_/*76*/nc_p = i1.n/*77*/c_p1;
////var i1/*78*/_ncf = i1.nc_/*79*/p2;
////var i1_/*80*/ncr = i1.nc/*81q*/_p2(20);
////var i1_n/*82*/cprop = i1.n/*83*/c_p3;
////i1.nc/*84*/_p3 = i1_/*85*/ncprop;
////var i1_/*86*/s_p = /*87*/c1./*88*/s1;
////var i1_s/*89*/_f = c1./*90*/s2;
////var i1_/*91*/s_r = c1.s/*92q*/2(20);
////var i1_s/*93*/_prop = c1.s/*94*/3;
////c1.s/*95*/3 = i1_s/*96*/_prop;
////var i1_s/*97*/_nc_p = c1.n/*98*/c_s1;
////var i1_s_/*99*/ncf = c1.nc/*100*/_s2;
////var i1_s_/*101*/ncr = c1.n/*102q*/c_s2(20);
////var i1_s_n/*103*/cprop = c1.nc/*104*/_s3;
////c1.nc/*105*/_s3 = i1_s_nc/*106*/prop;
////var i1/*107*/_c = c/*108*/1;
////
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

verify.baselineQuickInfo()
