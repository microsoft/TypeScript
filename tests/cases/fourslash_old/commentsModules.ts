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
verify.quickInfoIs("m1", "Module comment", "m1", "module");

goTo.marker('2');
verify.completionListContains("b", "number", "b's comment", "m1.b", "var");
verify.completionListContains("foo", "(): number", "foo's comment", "foo", "function");

goTo.marker('3');
verify.currentSignatureHelpDocCommentIs("foo's comment");
goTo.marker('3q');
verify.quickInfoIs("(): number", "foo's comment", "foo", "function");

goTo.marker('4');
verify.completionListContains("m1", "m1", "Module comment", "m1", "module");

goTo.marker('5');
verify.memberListContains("b", "number", "b's comment", "m1.b", "var");
verify.memberListContains("fooExport", "(): number", "exported function", "m1.fooExport", "function");
verify.memberListContains("m2", "m1.m2");
verify.quickInfoIs("(): number", "exported function", "m1.fooExport", "function");

goTo.marker('6');
verify.currentSignatureHelpDocCommentIs("exported function");

goTo.marker('7');
verify.quickInfoIs("m1.m2.c", "", "myvar", "var");

goTo.marker('8');
verify.quickInfoIs("(): m1.m2.c", "", "m1.m2.c", "constructor");
verify.memberListContains("c", undefined, "class comment;", "m1.m2.c", "class");
verify.memberListContains("i", "m1.m2.c", "i", "m1.m2.i", "var");

goTo.marker('9');
verify.completionListContains("m2", "m2", "", "m2", "module");
verify.quickInfoIs("typeof m2", "", "m2", "module");

goTo.marker('10');
verify.memberListContains("m3", "m2.m3");
verify.quickInfoIs("typeof m2.m3", "module comment of m2.m3", "m2.m3", "module");

goTo.marker('11');
verify.quickInfoIs("(): m2.m3.c", "", "m2.m3.c", "constructor");
verify.memberListContains("c", undefined, "Exported class comment", "m2.m3.c", "class");

goTo.marker('12');
verify.completionListContains("m3", "m3", "", "m3", "module");
verify.quickInfoIs("typeof m3", "", "m3", "module");

goTo.marker('13');
verify.memberListContains("m4", "m3.m4", "", "m3.m4", "module");
verify.quickInfoIs("typeof m3.m4", "", "m3.m4", "module");

goTo.marker('14');
verify.memberListContains("m5", "m3.m4.m5");
verify.quickInfoIs("typeof m3.m4.m5", "module comment of m3.m4.m5", "m3.m4.m5", "module");

goTo.marker('15');
verify.memberListContains("c", undefined, "Exported class comment", "m3.m4.m5.c", "class");
verify.quickInfoIs("(): m3.m4.m5.c", "", "m3.m4.m5.c", "constructor");

goTo.marker('16');
verify.completionListContains("m4", "m4", "", "m4", "module");
verify.quickInfoIs("typeof m4", "", "m4", "module");

goTo.marker('17');
verify.memberListContains("m5", "m4.m5", "", "m4.m5");
verify.quickInfoIs("typeof m4.m5", "", "m4.m5", "module");

goTo.marker('18');
verify.memberListContains("m6", "m4.m5.m6");
verify.quickInfoIs("typeof m4.m5.m6", "module comment of m4.m5.m6", "m4.m5.m6", "module");

goTo.marker('19');
verify.memberListContains("m7", "m4.m5.m6.m7");
verify.quickInfoIs("typeof m4.m5.m6.m7", "", "m4.m5.m6.m7", "module");

goTo.marker('20');
verify.memberListContains("c", undefined, "Exported class comment", "m4.m5.m6.m7.c", "class");
verify.quickInfoIs("(): m4.m5.m6.m7.c", "", "m4.m5.m6.m7.c", "constructor");

goTo.marker('21');
verify.completionListContains("m5", "m5");
verify.quickInfoIs("typeof m5", "", "m5", "module");

goTo.marker('22');
verify.memberListContains("m6", "m5.m6");
verify.quickInfoIs("typeof m5.m6", "", "m5.m6", "module");

goTo.marker('23');
verify.memberListContains("m7", "m5.m6.m7");
verify.quickInfoIs("typeof m5.m6.m7", "module comment of m5.m6.m7", "m5.m6.m7", "module");

goTo.marker('24');
verify.memberListContains("m8", "m5.m6.m7.m8");
verify.quickInfoIs("typeof m5.m6.m7.m8", "module m8 comment", "m5.m6.m7.m8", "module");

goTo.marker('25');
verify.memberListContains("c", undefined, "Exported class comment", "m5.m6.m7.m8.c", "class");
verify.quickInfoIs("(): m5.m6.m7.m8.c", "", "m5.m6.m7.m8.c", "constructor");

goTo.marker('26');
verify.completionListContains("m6", "m6");
verify.quickInfoIs("typeof m6", "", "m6", "module");

goTo.marker('27');
verify.memberListContains("m7", "m6.m7");
verify.quickInfoIs("typeof m6.m7", "", "m6.m7", "module");

goTo.marker('28');
verify.memberListContains("m8", "m6.m7.m8");
verify.quickInfoIs("typeof m6.m7.m8", "", "m6.m7.m8", "module");

goTo.marker('29');
verify.memberListContains("c", undefined, "Exported class comment", "m6.m7.m8.c", "class");
verify.quickInfoIs("(): m6.m7.m8.c", "", "m6.m7.m8.c", "constructor");

goTo.marker('30');
verify.completionListContains("m7", "m7");
verify.quickInfoIs("typeof m7", "", "m7", "module");

goTo.marker('31');
verify.memberListContains("m8", "m7.m8");
verify.quickInfoIs("typeof m7.m8", "", "m7.m8", "module");

goTo.marker('32');
verify.memberListContains("m9", "m7.m8.m9");
verify.quickInfoIs("typeof m7.m8.m9", "module m9 comment", "m7.m8.m9", "module");

goTo.marker('33');
verify.memberListContains("c", undefined, "Exported class comment", "m7.m8.m9.c", "class");
verify.quickInfoIs("(): m7.m8.m9.c", "", "m7.m8.m9.c", "constructor");

goTo.marker('34');
verify.completionListContains("c", undefined, "", '"quotedM".c', "class");
verify.quickInfoIs(undefined, "", '"quotedM".c', "class");

goTo.marker('35');
verify.quickInfoIs("number", "", 'myComplexVal', "var");

goTo.marker('36');
verify.quickInfoIs("typeof complexM", "", "complexM", "module");

goTo.marker('37');
verify.quickInfoIs("typeof complexM.m2", "", "complexM.m2", "module");

goTo.marker('38');
verify.quickInfoIs("(): complexM.m2.c", "", 'complexM.m2.c', "constructor");

goTo.marker('39');
verify.quickInfoIs("(): complexM.m1.c", "", 'complexM.m2.c.foo2', "method");

goTo.marker('40');
verify.quickInfoIs("(): number", "", 'complexM.m1.c.foo', "method");