/// <reference path='fourslash.ts' />

/////** This is comment for c1*/
////class c1 {
////    /** p1 is property of c1*/
////    public p1: number;
////    /** sum with property*/
////    public p2(/** number to add*/b: number) {
////        return this./*4*/p1 + /*5*/b;
////    }
////    /** getter property 1*/
////    public get p3() {
////        return this./*7*/p2(this./*9*/p1);
////    }
////    /** setter property 1*/
////    public set p3(/** this is value*/value: number) {
////        this./*11*/p1 = this./*12*/p2(/*13*/value);
////    }
////    /** pp1 is property of c1*/
////    private pp1: number;
////    /** sum with property*/
////    private pp2(/** number to add*/b: number) {
////        return this./*16*/p1 + /*17*/b;
////    }
////    /** getter property 2*/
////    private get pp3() {
////        return this./*19*/pp2(this./*21*/pp1);
////    }
////    /** setter property 2*/
////    private set pp3( /** this is value*/value: number) {
////        this./*23*/pp1 = this./*24*/pp2(/*25*/value);
////    }
////    /** Constructor method*/
////    constructor() {
////    }
////    /** s1 is static property of c1*/
////    static s1: number;
////    /** static sum with property*/
////    static s2(/** number to add*/b: number) {
////        return /*29*/c1./*30*/s1 + /*31*/b;
////    }
////    /** static getter property*/
////    static get s3() {
////        return /*33*/c1./*34*/s2(/*35*/c1./*36*/s1);
////    }
////    /** setter property 3*/
////    static set s3( /** this is value*/value: number) {
////        /*38*/c1./*39*/s1 = /*40*/c1./*41*/s2(/*42*/value);
////    }
////    public nc_p1: number;
////    public nc_p2(b: number) {
////        return this.nc_p1 + /*45*/b;
////    }
////    public get nc_p3() {
////        return this.nc_p2(this.nc_p1);
////    }
////    public set nc_p3(value: number) {
////        this.nc_p1 = this.nc_p2(/*49*/value);
////    }
////    private nc_pp1: number;
////    private nc_pp2(b: number) {
////        return this.nc_pp1 + /*52*/b;
////    }
////    private get nc_pp3() {
////        return this.nc_pp2(this.nc_pp1);
////    }
////    private set nc_pp3(value: number) {
////        this.nc_pp1 = this.nc_pp2(/*56*/value);
////    }
////    static nc_s1: number;
////    static nc_s2(b: number) {
////        return c1.nc_s1 + /*59*/b;
////    }
////    static get nc_s3() {
////        return c1.nc_s2(c1.nc_s1);
////    }
////    static set nc_s3(value: number) {
////        c1.nc_s1 = c1.nc_s2(/*63*/value);
////    }
////}
////var i1 = new c1();
////var i1_p = i1./*67*/p1;
////var i1_f = i1.p2;
////var i1_r = i1.p2(20);
////var i1_prop = i1.p3;
////i1.p3 = i1_prop;
////var i1_nc_p = i1.nc_p1;
////var i1_ncf = i1.nc_p2;
////var i1_ncr = i1.nc_p2(20);
////var i1_ncprop = i1.nc_p3;
////i1.nc_p3 = i1_ncprop;
////var i1_s_p = /*87*/c1./*88*/s1;
////var i1_s_f = c1.s2;
////var i1_s_r = c1.s2(20);
////var i1_s_prop = c1.s3;
////c1.s3 = i1_s_prop;
////var i1_s_nc_p = c1.nc_s1;
////var i1_s_ncf = c1.nc_s2;
////var i1_s_ncr = c1.nc_s2(20);
////var i1_s_ncprop = c1.nc_s3;
////c1.nc_s3 = i1_s_ncprop;
////var i1_c = c1;
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
////cProperties_i./*110*/p2 = cProperties_i.p1;
////cProperties_i.nc_p2 = cProperties_i.nc_p1;
////class cWithConstructorProperty {
////    /**
////    * this is class cWithConstructorProperty's constructor
////    * @param a this is first parameter a
////    */
////    constructor(/**more info about a*/public a: number) {
////        var bbbb = 10;
////        this./*114*/a = /*115*/a + 2 + bbbb;
////    }
////}
verify.baselineCompletions()
