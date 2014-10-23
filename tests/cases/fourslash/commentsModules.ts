/// <reference path='fourslash.ts' />

/////** Module comment*/
////module m/*1*/1 {
////    /** b's comment*/
////    export var b: number;
////    /** foo's comment*/
////    function foo() {
////        return /*2*/b;
////    }
////    /** m2 comments*/
////    export module m2 {
////        /** class comment;*/
////        export class c {
////        };
////        /** i*/
////        export var i = new c();
////    }
////    /** exported function*/
////    export function fooExport() {
////        return fo/*3q*/o(/*3*/);
////    }
////}
/////*4*/m1./*5*/fooExport(/*6*/);
////var my/*7*/var = new m1.m2./*8*/c();
/////** module comment of m2.m3*/
////module m2.m3 {
////    /** Exported class comment*/
////    export class c {
////    }
////}
////new /*9*/m2./*10*/m3./*11*/c();
/////** module comment of m3.m4.m5*/
////module m3.m4.m5 {
////    /** Exported class comment*/
////    export class c {
////    }
////}
////new /*12*/m3./*13*/m4./*14*/m5./*15*/c();
/////** module comment of m4.m5.m6*/
////module m4.m5.m6 {
////    export module m7 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*16*/m4./*17*/m5./*18*/m6./*19*/m7./*20*/c();
/////** module comment of m5.m6.m7*/
////module m5.m6.m7 {
////    /** module m8 comment*/
////    export module m8 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*21*/m5./*22*/m6./*23*/m7./*24*/m8./*25*/c();
////module m6.m7 {
////    export module m8 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*26*/m6./*27*/m7./*28*/m8./*29*/c();
////module m7.m8 {
////    /** module m9 comment*/
////    export module m9 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*30*/m7./*31*/m8./*32*/m9./*33*/c();
////declare module "quotedM" {
////    export class c {
////    }
////    export var b: /*34*/c;
////}
////module complexM {
////    export module m1 {
////        export class c {
////            public foo() {
////                return 30;
////            }
////        }
////    }
////    export module m2 {
////        export class c {
////            public foo2() {
////                return new complexM.m1.c();
////            }
////        }
////    }
////}
////var myComp/*35*/lexVal = new compl/*36*/exM.m/*37*/2./*38*/c().f/*39*/oo2().f/*40*/oo();

goTo.marker('1');
verify.quickInfoIs("module m1", "Module comment");

goTo.marker('2');
verify.completionListContains("b", "(var) m1.b: number", "b's comment");
verify.completionListContains("foo", "(function) foo(): number", "foo's comment");

goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("foo's comment");
goTo.marker('3q');
verify.quickInfoIs("(function) foo(): number", "foo's comment");

goTo.marker('4');
verify.completionListContains("m1", "module m1", "Module comment");

goTo.marker('5');
verify.memberListContains("b", "(var) m1.b: number", "b's comment");
verify.memberListContains("fooExport", "(function) m1.fooExport(): number", "exported function");
verify.memberListContains("m2", "module m1.m2");
verify.quickInfoIs("(function) m1.fooExport(): number", "exported function");

goTo.marker('6');
verify.currentSignatureHelpDocCommentIs("exported function");

goTo.marker('7');
verify.quickInfoIs("(var) myvar: m1.m2.c", "");

goTo.marker('8');
verify.quickInfoIs("(constructor) m1.m2.c(): m1.m2.c", "");
verify.memberListContains("c", "(constructor) m1.m2.c(): m1.m2.c", "");
verify.memberListContains("i", "(var) m1.m2.i: m1.m2.c", "i");

goTo.marker('9');
verify.completionListContains("m2", "module m2", "");
verify.quickInfoIs("module m2", "");

goTo.marker('10');
verify.memberListContains("m3", "module m2.m3");
verify.quickInfoIs("module m2.m3", "module comment of m2.m3");

goTo.marker('11');
verify.quickInfoIs("(constructor) m2.m3.c(): m2.m3.c", "");
verify.memberListContains("c", "(constructor) m2.m3.c(): m2.m3.c", "");

goTo.marker('12');
verify.completionListContains("m3", "module m3", "");
verify.quickInfoIs("module m3", "");

goTo.marker('13');
verify.memberListContains("m4", "module m3.m4", "");
verify.quickInfoIs("module m3.m4", "");

goTo.marker('14');
verify.memberListContains("m5", "module m3.m4.m5");
verify.quickInfoIs("module m3.m4.m5", "module comment of m3.m4.m5");

goTo.marker('15');
verify.quickInfoIs("(constructor) m3.m4.m5.c(): m3.m4.m5.c", "");
verify.memberListContains("c", "(constructor) m3.m4.m5.c(): m3.m4.m5.c", "");

goTo.marker('16');
verify.completionListContains("m4", "module m4", "");
verify.quickInfoIs("module m4", "");

goTo.marker('17');
verify.memberListContains("m5", "module m4.m5", "");
verify.quickInfoIs("module m4.m5", "");

goTo.marker('18');
verify.memberListContains("m6", "module m4.m5.m6");
verify.quickInfoIs("module m4.m5.m6", "module comment of m4.m5.m6");

goTo.marker('19');
verify.memberListContains("m7", "module m4.m5.m6.m7");
verify.quickInfoIs("module m4.m5.m6.m7", "");

goTo.marker('20');
verify.memberListContains("c", "(constructor) m4.m5.m6.m7.c(): m4.m5.m6.m7.c", "");
verify.quickInfoIs("(constructor) m4.m5.m6.m7.c(): m4.m5.m6.m7.c", "");

goTo.marker('21');
verify.completionListContains("m5", "module m5");
verify.quickInfoIs("module m5", "");

goTo.marker('22');
verify.memberListContains("m6", "module m5.m6");
verify.quickInfoIs("module m5.m6", "");

goTo.marker('23');
verify.memberListContains("m7", "module m5.m6.m7");
verify.quickInfoIs("module m5.m6.m7", "module comment of m5.m6.m7");

goTo.marker('24');
verify.memberListContains("m8", "module m5.m6.m7.m8");
verify.quickInfoIs("module m5.m6.m7.m8", "module m8 comment");

goTo.marker('25');
verify.memberListContains("c", "(constructor) m5.m6.m7.m8.c(): m5.m6.m7.m8.c", "");
verify.quickInfoIs("(constructor) m5.m6.m7.m8.c(): m5.m6.m7.m8.c", "");

goTo.marker('26');
verify.completionListContains("m6", "module m6");
verify.quickInfoIs("module m6", "");

goTo.marker('27');
verify.memberListContains("m7", "module m6.m7");
verify.quickInfoIs("module m6.m7", "");

goTo.marker('28');
verify.memberListContains("m8", "module m6.m7.m8");
verify.quickInfoIs("module m6.m7.m8", "");

goTo.marker('29');
verify.memberListContains("c", "(constructor) m6.m7.m8.c(): m6.m7.m8.c", "");
verify.quickInfoIs("(constructor) m6.m7.m8.c(): m6.m7.m8.c", "");

goTo.marker('30');
verify.completionListContains("m7", "module m7");
verify.quickInfoIs("module m7", "");

goTo.marker('31');
verify.memberListContains("m8", "module m7.m8");
verify.quickInfoIs("module m7.m8", "");

goTo.marker('32');
verify.memberListContains("m9", "module m7.m8.m9");
verify.quickInfoIs("module m7.m8.m9", "module m9 comment");

goTo.marker('33');
verify.memberListContains("c", "(constructor) m7.m8.m9.c(): m7.m8.m9.c", "");
verify.quickInfoIs("(constructor) m7.m8.m9.c(): m7.m8.m9.c", "");

goTo.marker('34');
verify.completionListContains("c", 'class c', "");
verify.quickInfoIs('class c', "");

goTo.marker('35');
verify.quickInfoIs("(var) myComplexVal: number", "");

goTo.marker('36');
verify.quickInfoIs("module complexM", "");

goTo.marker('37');
verify.quickInfoIs("module complexM.m2", "");

goTo.marker('38');
verify.quickInfoIs("(constructor) complexM.m2.c(): complexM.m2.c", "");

goTo.marker('39');
verify.quickInfoIs("(method) complexM.m2.c.foo2(): complexM.m1.c", "");

goTo.marker('40');
verify.quickInfoIs("(method) complexM.m1.c.foo(): number", "");