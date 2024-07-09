/// <reference path='fourslash.ts' />

// @Filename: commentsExternalModules_file0.ts
/////** Namespace comment*/
////export namespace m/*1*/1 {
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
////        return f/*3q*/oo(/*3*/);
////    }
////}
/////*4*/m1./*5*/fooEx/*6q*/port(/*6*/);
////var my/*7*/var = new m1.m2./*8*/c();

// @Filename: commentsExternalModules_file1.ts
/////**This is on import declaration*/
////import ex/*9*/tMod = require("./commentsExternalModules_file0");
/////*10*/extMod./*11*/m1./*12*/fooExp/*13q*/ort(/*13*/);
////var new/*14*/Var = new extMod.m1.m2./*15*/c();

goTo.file("commentsExternalModules_file0.ts");
verify.quickInfoAt("1", "namespace m1", "Namespace comment");

verify.completions({
    marker: "2",
    includes: [
        { name: "b", text: "var b: number", documentation: "b's comment" },
        { name: "foo", text: "function foo(): number", documentation: "foo's comment" },
    ]
});

verify.signatureHelp({ marker: "3", docComment: "foo's comment" });
verify.quickInfoAt("3q", "function foo(): number", "foo's comment");

verify.completions({
    marker: "4",
    includes: { name: "m1", text: "namespace m1", documentation: "Namespace comment" },
});

verify.completions({
    marker: "5",
    includes: [
        { name: "b", text: "var m1.b: number", documentation: "b's comment" },
        { name: "fooExport", text: "function m1.fooExport(): number", documentation: "exported function" },
        { name: "m2", text: "namespace m1.m2", documentation: "m2 comments" },
    ],
});

verify.signatureHelp({ marker: "6", docComment: "exported function" });
verify.quickInfoAt("6q", "function m1.fooExport(): number", "exported function");

verify.quickInfoAt("7", "var myvar: m1.m2.c");

verify.completions({
    marker: "8",
    includes: [
        { name: "c", text: "constructor m1.m2.c(): m1.m2.c", documentation: "class comment;" },
        { name: "i", text: "var m1.m2.i: m1.m2.c", documentation: "i" },
    ],
});

goTo.file("commentsExternalModules_file1.ts");
verify.quickInfoAt("9", 'import extMod = require("./commentsExternalModules_file0")', "This is on import declaration");

verify.completions(
    {
        marker: "10",
        includes: { name: "extMod", text: 'import extMod = require("./commentsExternalModules_file0")', documentation: "This is on import declaration" },
    },
    {
        marker: "11",
        includes: { name: "m1", text: "namespace extMod.m1", documentation: "Namespace comment" },
    },
    {
        marker: "12",
        includes: [
            { name: "b", text: "var extMod.m1.b: number", documentation: "b's comment" },
            { name: "fooExport", text: "function extMod.m1.fooExport(): number", documentation: "exported function" },
            { name: "m2", text: "namespace extMod.m1.m2", documentation: "m2 comments" },
        ],
    },
);

verify.signatureHelp({ marker: "13", docComment: "exported function" });
verify.quickInfoAt("13q", "function extMod.m1.fooExport(): number", "exported function");

verify.quickInfoAt("14", "var newVar: extMod.m1.m2.c");

verify.completions({
    marker: "15",
    exact: [
        { name: "c", text: "constructor extMod.m1.m2.c(): extMod.m1.m2.c", documentation: "class comment;" },
        { name: "i", text: "var extMod.m1.m2.i: extMod.m1.m2.c", documentation: "i" },
    ],
});
