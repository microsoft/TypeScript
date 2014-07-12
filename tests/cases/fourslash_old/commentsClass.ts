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

goTo.marker('1');
verify.quickInfoIs(undefined, "This is class c2 without constuctor", "c2", "class");

goTo.marker('2');
verify.quickInfoIs("c2", "", "i2", "var");

goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('4');
verify.quickInfoIs("typeof c2", "", "i2_c", "var");

goTo.marker('5');
verify.quickInfoIs(undefined, "This is class c2 without constuctor", "c2", "class");

goTo.marker('6');
verify.quickInfoIs(undefined, "", "c3", "class");

goTo.marker('7');
verify.quickInfoIs("c3", "", "i3", "var");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("Constructor comment");

goTo.marker('9');
verify.quickInfoIs("typeof c3", "", "i3_c", "var");

goTo.marker('10');
verify.quickInfoIs(undefined, "Constructor comment", "c3", "class");

goTo.marker('11');
verify.quickInfoIs(undefined, "Class comment", "c4", "class");

goTo.marker('12');
verify.quickInfoIs("c4", "", "i4", "var");

goTo.marker('13');
verify.currentSignatureHelpDocCommentIs("Constructor comment");

goTo.marker('14');
verify.quickInfoIs("typeof c4", "", "i4_c", "var");

goTo.marker('15');
verify.quickInfoIs(undefined, "Class comment\nConstructor comment", "c4", "class");

goTo.marker('16');
verify.quickInfoIs(undefined, "Class with statics", "c5", "class");

goTo.marker('17');
verify.quickInfoIs("c5", "", "i5", "var");

goTo.marker('18');
verify.currentSignatureHelpDocCommentIs("");

goTo.marker('19');
verify.quickInfoIs("typeof c5", "", "i5_c", "var");

goTo.marker('20');
verify.quickInfoIs(undefined, "Class with statics", "c5", "class");

goTo.marker('21');
verify.quickInfoIs(undefined, "class with statics and constructor", "c6", "class");

goTo.marker('22');
verify.quickInfoIs("c6", "", "i6", "var");

goTo.marker('23');
verify.currentSignatureHelpDocCommentIs("constructor comment");

goTo.marker('24');
verify.quickInfoIs("typeof c6", "", "i6_c", "var");

goTo.marker('25');
verify.quickInfoIs(undefined, "class with statics and constructor\nconstructor comment", "c6", "class");

goTo.marker('26');
verify.completionListContains("c2", undefined, "This is class c2 without constuctor",  "c2", "class");
verify.completionListContains("i2", "c2", "", "i2", "var");
verify.completionListContains("i2_c", "typeof c2", "", "i2_c", "var");
verify.completionListContains("c3", undefined, "", "c3", "class");
verify.completionListContains("i3", "c3", "", "i3", "var");
verify.completionListContains("i3_c", "typeof c3", "", "i3_c", "var");
verify.completionListContains("c4", undefined, "Class comment", "c4", "class");
verify.completionListContains("i4", "c4", "", "i4", "var");
verify.completionListContains("i4_c", "typeof c4", "", "i4_c", "var");
verify.completionListContains("c5", undefined, "Class with statics", "c5", "class");
verify.completionListContains("i5", "c5", "","i5", "var");
verify.completionListContains("i5_c", "typeof c5", "", "i5_c", "var");
verify.completionListContains("c6", undefined, "class with statics and constructor", "c6", "class");
verify.completionListContains("i6", "c6", "", "i6", "var");
verify.completionListContains("i6_c", "typeof c6", "", "i6_c", "var");

goTo.marker('27');
verify.currentSignatureHelpDocCommentIs("constructor for a");
verify.currentParameterHelpArgumentDocCommentIs("this is my a");

goTo.marker('28');
verify.quickInfoIs("(): c2", "", "c2", "constructor");

goTo.marker('29');
verify.quickInfoIs("(): c3", "Constructor comment", "c3", "constructor");

goTo.marker('30');
verify.quickInfoIs("(): c4", "Constructor comment", "c4", "constructor");

goTo.marker('31');
verify.quickInfoIs("(): c5", "", "c5", "constructor");

goTo.marker('32');
verify.quickInfoIs("(): c6", "constructor comment", "c6", "constructor");

goTo.marker('33');
verify.quickInfoIs("(): m.m2.c1", "constructor comment", "m.m2.c1", "constructor");