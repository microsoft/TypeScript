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

verify.completions({
    marker: "2",
    includes: [
        { name: "b", text: "var b: number", documentation: "b's comment" },
        { name: "foo", text: "function foo(): number", documentation: "foo's comment" },
    ],
});

verify.signatureHelp({ marker: "3", docComment: "foo's comment" });
verify.quickInfoAt("3q", "function foo(): number", "foo's comment");

verify.completions(
    { marker: "4", includes: { name: "m1", text: "namespace m1", documentation: "Namespace comment" } },
    {
        marker: "5",
        includes: [
            { name: "b", text: "var m1.b: number", documentation: "b's comment" },
            { name: "fooExport", text: "function m1.fooExport(): number", documentation: "exported function" },
            { name: "m2", text: "namespace m1.m2", documentation: "m2 comments" },
        ],
    },
);

verify.quickInfoAt("5", "function m1.fooExport(): number", "exported function");

verify.signatureHelp({ marker: "6", docComment: "exported function" });

verify.quickInfoAt("7", "var myvar: m1.m2.c");

verify.quickInfoAt("8", "constructor m1.m2.c(): m1.m2.c", "class comment;");
verify.completions(
    {
        marker: "8",
        includes: [
            { name: "c", text: "constructor m1.m2.c(): m1.m2.c", documentation: "class comment;" },
            { name: "i", text: "var m1.m2.i: m1.m2.c", documentation: "i" },
        ],
    }
);

function both(marker: string, name: string, text: string, documentation?: string) {
    verify.completions({ marker, includes: { name, text, documentation } });
    verify.quickInfoAt(marker, text, documentation);
}

both("9", "m2", "namespace m2", "namespace comment of m2.m3");
both("10", "m3", "namespace m2.m3", "namespace comment of m2.m3");
both("11", "c", "constructor m2.m3.c(): m2.m3.c", "Exported class comment");
both("12", "m3", "namespace m3", "namespace comment of m3.m4.m5");
both("13", "m4", "namespace m3.m4", "namespace comment of m3.m4.m5");
both("14", "m5", "namespace m3.m4.m5", "namespace comment of m3.m4.m5");
both("15", "c", "constructor m3.m4.m5.c(): m3.m4.m5.c", "Exported class comment");

both("16", "m4", "namespace m4", "namespace comment of m4.m5.m6");
both("17", "m5", "namespace m4.m5", "namespace comment of m4.m5.m6");
both("18", "m6", "namespace m4.m5.m6", "namespace comment of m4.m5.m6");
both("19", "m7", "namespace m4.m5.m6.m7");

verify.completions({
    marker: "20",
    includes: { name: "c", text: "constructor m4.m5.m6.m7.c(): m4.m5.m6.m7.c", documentation: "Exported class comment" },
});
verify.quickInfoAt("20", "constructor m4.m5.m6.m7.c(): m4.m5.m6.m7.c", "Exported class comment");

both("21", "m5", "namespace m5", "namespace comment of m5.m6.m7");
both("22", "m6", "namespace m5.m6", "namespace comment of m5.m6.m7");
both("23", "m7", "namespace m5.m6.m7", "namespace comment of m5.m6.m7");
both("24", "m8", "namespace m5.m6.m7.m8", "namespace m8 comment");
both("25", "c", "constructor m5.m6.m7.m8.c(): m5.m6.m7.m8.c", "Exported class comment");
both("26", "m6", "namespace m6");
both("27", "m7", "namespace m6.m7");
both("28", "m8", "namespace m6.m7.m8");
both("29", "c", "constructor m6.m7.m8.c(): m6.m7.m8.c", "Exported class comment");
both("30", "m7", "namespace m7");
both("31", "m8", "namespace m7.m8");
both("32", "m9", "namespace m7.m8.m9", "namespace m9 comment");
both("33", "c", "constructor m7.m8.m9.c(): m7.m8.m9.c", "Exported class comment");
both("34", "c", "class c");

verify.quickInfos({
    35: "var myComplexVal: number",
    36: "namespace complexM",
    37: "namespace complexM.m2",
    38: "constructor complexM.m2.c(): complexM.m2.c",
    39: "(method) complexM.m2.c.foo2(): complexM.m1.c",
    40: "(method) complexM.m1.c.foo(): number",
});
