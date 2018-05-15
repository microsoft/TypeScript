/// <reference path='fourslash.ts' />

/////** Namespace comment*/
////namespace m/*1*/1 {
////    /** b's comment*/
////    export var b: number;
////    /** foo's comment*/
////    function foo() {
////        return /*2*/b;
////    }
////    /** m2 comments*/
////    export namespace m2 {
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
/////** namespace comment of m2.m3*/
////namespace m2.m3 {
////    /** Exported class comment*/
////    export class c {
////    }
////}
////new /*9*/m2./*10*/m3./*11*/c();
/////** namespace comment of m3.m4.m5*/
////namespace m3.m4.m5 {
////    /** Exported class comment*/
////    export class c {
////    }
////}
////new /*12*/m3./*13*/m4./*14*/m5./*15*/c();
/////** namespace comment of m4.m5.m6*/
////namespace m4.m5.m6 {
////    export namespace m7 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*16*/m4./*17*/m5./*18*/m6./*19*/m7./*20*/c();
/////** namespace comment of m5.m6.m7*/
////namespace m5.m6.m7 {
////    /** namespace m8 comment*/
////    export namespace m8 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*21*/m5./*22*/m6./*23*/m7./*24*/m8./*25*/c();
////namespace m6.m7 {
////    export namespace m8 {
////        /** Exported class comment*/
////        export class c {
////        }
////    }
////}
////new /*26*/m6./*27*/m7./*28*/m8./*29*/c();
////namespace m7.m8 {
////    /** namespace m9 comment*/
////    export namespace m9 {
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
////namespace complexM {
////    export namespace m1 {
////        export class c {
////            public foo() {
////                return 30;
////            }
////        }
////    }
////    export namespace m2 {
////        export class c {
////            public foo2() {
////                return new complexM.m1.c();
////            }
////        }
////    }
////}
////var myComp/*35*/lexVal = new compl/*36*/exM.m/*37*/2./*38*/c().f/*39*/oo2().f/*40*/oo();

verify.quickInfoAt("1", "namespace m1", "Namespace comment");

goTo.marker('2');
verify.completionListContains("b", "var b: number", "b's comment");
verify.completionListContains("foo", "function foo(): number", "foo's comment");

verify.signatureHelp({ marker: "3", docComment: "foo's comment" });
verify.quickInfoAt("3q", "function foo(): number", "foo's comment");

goTo.marker('4');
verify.completionListContains("m1", "namespace m1", "Namespace comment");

goTo.marker('5');
verify.completionListContains("b", "var m1.b: number", "b's comment");
verify.completionListContains("fooExport", "function m1.fooExport(): number", "exported function");
verify.completionListContains("m2", "namespace m1.m2");
verify.quickInfoIs("function m1.fooExport(): number", "exported function");

verify.signatureHelp({ marker: "6", docComment: "exported function" });

verify.quickInfoAt("7", "var myvar: m1.m2.c");

goTo.marker('8');
verify.quickInfoIs("constructor m1.m2.c(): m1.m2.c");
verify.completionListContains("c", "constructor m1.m2.c(): m1.m2.c", "");
verify.completionListContains("i", "var m1.m2.i: m1.m2.c", "i");

goTo.marker('9');
verify.completionListContains("m2", "namespace m2", "namespace comment of m2.m3");
verify.quickInfoIs("namespace m2", "namespace comment of m2.m3");

goTo.marker('10');
verify.completionListContains("m3", "namespace m2.m3");
verify.quickInfoIs("namespace m2.m3", "namespace comment of m2.m3");

goTo.marker('11');
verify.quickInfoIs("constructor m2.m3.c(): m2.m3.c");
verify.completionListContains("c", "constructor m2.m3.c(): m2.m3.c", "");

goTo.marker('12');
verify.completionListContains("m3", "namespace m3", "namespace comment of m3.m4.m5");
verify.quickInfoIs("namespace m3", "namespace comment of m3.m4.m5");

goTo.marker('13');
verify.completionListContains("m4", "namespace m3.m4", "namespace comment of m3.m4.m5");
verify.quickInfoIs("namespace m3.m4", "namespace comment of m3.m4.m5");

goTo.marker('14');
verify.completionListContains("m5", "namespace m3.m4.m5");
verify.quickInfoIs("namespace m3.m4.m5", "namespace comment of m3.m4.m5");

goTo.marker('15');
verify.quickInfoIs("constructor m3.m4.m5.c(): m3.m4.m5.c");
verify.completionListContains("c", "constructor m3.m4.m5.c(): m3.m4.m5.c", "");

goTo.marker('16');
verify.completionListContains("m4", "namespace m4", "namespace comment of m4.m5.m6");
verify.quickInfoIs("namespace m4", "namespace comment of m4.m5.m6");

goTo.marker('17');
verify.completionListContains("m5", "namespace m4.m5", "namespace comment of m4.m5.m6");
verify.quickInfoIs("namespace m4.m5", "namespace comment of m4.m5.m6");

goTo.marker('18');
verify.completionListContains("m6", "namespace m4.m5.m6");
verify.quickInfoIs("namespace m4.m5.m6", "namespace comment of m4.m5.m6");

goTo.marker('19');
verify.completionListContains("m7", "namespace m4.m5.m6.m7");
verify.quickInfoIs("namespace m4.m5.m6.m7");

goTo.marker('20');
verify.completionListContains("c", "constructor m4.m5.m6.m7.c(): m4.m5.m6.m7.c", "");
verify.quickInfoIs("constructor m4.m5.m6.m7.c(): m4.m5.m6.m7.c");

goTo.marker('21');
verify.completionListContains("m5", "namespace m5");
verify.quickInfoIs("namespace m5", "namespace comment of m5.m6.m7");

goTo.marker('22');
verify.completionListContains("m6", "namespace m5.m6");
verify.quickInfoIs("namespace m5.m6", "namespace comment of m5.m6.m7");

goTo.marker('23');
verify.completionListContains("m7", "namespace m5.m6.m7");
verify.quickInfoIs("namespace m5.m6.m7", "namespace comment of m5.m6.m7");

goTo.marker('24');
verify.completionListContains("m8", "namespace m5.m6.m7.m8");
verify.quickInfoIs("namespace m5.m6.m7.m8", "namespace m8 comment");

goTo.marker('25');
verify.completionListContains("c", "constructor m5.m6.m7.m8.c(): m5.m6.m7.m8.c", "");
verify.quickInfoIs("constructor m5.m6.m7.m8.c(): m5.m6.m7.m8.c");

goTo.marker('26');
verify.completionListContains("m6", "namespace m6");
verify.quickInfoIs("namespace m6");

goTo.marker('27');
verify.completionListContains("m7", "namespace m6.m7");
verify.quickInfoIs("namespace m6.m7");

goTo.marker('28');
verify.completionListContains("m8", "namespace m6.m7.m8");
verify.quickInfoIs("namespace m6.m7.m8");

goTo.marker('29');
verify.completionListContains("c", "constructor m6.m7.m8.c(): m6.m7.m8.c", "");
verify.quickInfoIs("constructor m6.m7.m8.c(): m6.m7.m8.c");

goTo.marker('30');
verify.completionListContains("m7", "namespace m7");
verify.quickInfoIs("namespace m7");

goTo.marker('31');
verify.completionListContains("m8", "namespace m7.m8");
verify.quickInfoIs("namespace m7.m8");

goTo.marker('32');
verify.completionListContains("m9", "namespace m7.m8.m9");
verify.quickInfoIs("namespace m7.m8.m9", "namespace m9 comment");

goTo.marker('33');
verify.completionListContains("c", "constructor m7.m8.m9.c(): m7.m8.m9.c", "");
verify.quickInfoIs("constructor m7.m8.m9.c(): m7.m8.m9.c");

goTo.marker('34');
verify.completionListContains("c", 'class c', "");
verify.quickInfoIs('class c');

verify.quickInfos({
    35: "var myComplexVal: number",
    36: "namespace complexM",
    37: "namespace complexM.m2",
    38: "constructor complexM.m2.c(): complexM.m2.c",
    39: "(method) complexM.m2.c.foo2(): complexM.m1.c",
    40: "(method) complexM.m1.c.foo(): number",
});
