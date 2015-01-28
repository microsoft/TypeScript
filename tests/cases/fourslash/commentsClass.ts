/// <reference path='fourslash.ts' />

/////** This is class c2 without constuctor*/
////class c/*1*/2 {
////}
////var i/*2*/2 = new c/*28*/2(/*3*/);
////var i2/*4*/_c = c/*5*/2;
////class c/*6*/3 {
////    /** Constructor comment*/
////    constructor() {
////    }
////}
////var i/*7*/3 = new c/*29*/3(/*8*/);
////var i3/*9*/_c = c/*10*/3;
/////** Class comment*/
////class c/*11*/4 {
////    /** Constructor comment*/
////    constructor() {
////    }
////}
////var i/*12*/4 = new c/*30*/4(/*13*/);
////var i4/*14*/_c = c/*15*/4;
/////** Class with statics*/
////class c/*16*/5 {
////    static s1: number;
////}
////var i/*17*/5 = new c/*31*/5(/*18*/);
////var i5_/*19*/c = c/*20*/5;
/////** class with statics and constructor*/
////class c/*21*/6 {
////    /** s1 comment*/
////    static s1: number;
////    /** constructor comment*/
////    constructor() {
////    }
////}
////var i/*22*/6 = new c/*32*/6(/*23*/);
////var i6/*24*/_c = c/*25*/6;
/////*26*/
////class a {
////    /** 
////    constructor for a
////    @param a this is my a
////    */
////    constructor(a: string) {
////    }
////}
////new a(/*27*/"Hello");
////module m {
////    export module m2 {
////        /** class comment */
////        export class c1 {
////            /** constructor comment*/
////            constructor() {
////            }
////        }
////    }
////}
////var myVar = new m.m2.c/*33*/1();

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');
debugger;
goTo.marker('1');
verify.quickInfoIs("class c2", "This is class c2 without constuctor");

goTo.marker('2');
verify.quickInfoIs("(var) i2: c2", "");

goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('4');
verify.quickInfoIs("(var) i2_c: typeof c2", "");

goTo.marker('5');
verify.quickInfoIs("class c2", "This is class c2 without constuctor");

goTo.marker('6');
verify.quickInfoIs("class c3", "");

goTo.marker('7');
verify.quickInfoIs("(var) i3: c3", "");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("Constructor comment");

goTo.marker('9');
verify.quickInfoIs("(var) i3_c: typeof c3", "");

goTo.marker('10');
verify.quickInfoIs("class c3", "");

goTo.marker('11');
verify.quickInfoIs("class c4", "Class comment");

goTo.marker('12');
verify.quickInfoIs("(var) i4: c4", "");

goTo.marker('13');
verify.currentSignatureHelpDocCommentIs("Constructor comment");

goTo.marker('14');
verify.quickInfoIs("(var) i4_c: typeof c4", "");

goTo.marker('15');
verify.quickInfoIs("class c4", "Class comment");

goTo.marker('16');
verify.quickInfoIs("class c5", "Class with statics");

goTo.marker('17');
verify.quickInfoIs("(var) i5: c5", "");

goTo.marker('18');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('19');
verify.quickInfoIs("(var) i5_c: typeof c5", "");

goTo.marker('20');
verify.quickInfoIs("class c5", "Class with statics");

goTo.marker('21');
verify.quickInfoIs("class c6", "class with statics and constructor");

goTo.marker('22');
verify.quickInfoIs("(var) i6: c6", "");

goTo.marker('23');
verify.currentSignatureHelpDocCommentIs("constructor comment");

goTo.marker('24');
verify.quickInfoIs("(var) i6_c: typeof c6", "");

goTo.marker('25');
verify.quickInfoIs("class c6", "class with statics and constructor");

goTo.marker('26');
verify.completionListContains("c2", "class c2", "This is class c2 without constuctor");
verify.completionListContains("i2", "(var) i2: c2", "");
verify.completionListContains("i2_c", "(var) i2_c: typeof c2", "");
verify.completionListContains("c3", "class c3", "");
verify.completionListContains("i3", "(var) i3: c3", "");
verify.completionListContains("i3_c", "(var) i3_c: typeof c3", "");
verify.completionListContains("c4", "class c4", "Class comment");
verify.completionListContains("i4", "(var) i4: c4", "");
verify.completionListContains("i4_c", "(var) i4_c: typeof c4", "");
verify.completionListContains("c5", "class c5", "Class with statics");
verify.completionListContains("i5", "(var) i5: c5", "");
verify.completionListContains("i5_c", "(var) i5_c: typeof c5");
verify.completionListContains("c6", "class c6", "class with statics and constructor");
verify.completionListContains("i6", "(var) i6: c6", "");
verify.completionListContains("i6_c", "(var) i6_c: typeof c6", "");

goTo.marker('27');
verify.currentSignatureHelpDocCommentIs("constructor for a");
verify.currentParameterHelpArgumentDocCommentIs("this is my a");

goTo.marker('28');
verify.quickInfoIs("(constructor) c2(): c2", "");

goTo.marker('29');
verify.quickInfoIs("(constructor) c3(): c3", "Constructor comment");

goTo.marker('30');
verify.quickInfoIs("(constructor) c4(): c4", "Constructor comment");

goTo.marker('31');
verify.quickInfoIs("(constructor) c5(): c5", "");

goTo.marker('32');
verify.quickInfoIs("(constructor) c6(): c6", "constructor comment");

goTo.marker('33');
verify.quickInfoIs("(constructor) m.m2.c1(): m.m2.c1", "constructor comment");