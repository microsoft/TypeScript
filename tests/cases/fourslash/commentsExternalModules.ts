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

verify.signatureHelp({ marker: "6", docComment: "exported function" });
verify.quickInfoAt("6q", "function m1.fooExport(): number", "exported function");

verify.quickInfoAt("7", "var myvar: m1.m2.c");

goTo.marker('8');
verify.completionListContains("c", "constructor m1.m2.c(): m1.m2.c", "");
verify.completionListContains("i", "var m1.m2.i: m1.m2.c", "i");

goTo.file("commentsExternalModules_file1.ts");
verify.quickInfoAt("9", 'import extMod = require("./commentsExternalModules_file0")', "This is on import declaration");

goTo.marker('10');
verify.completionListContains("extMod", 'import extMod = require("./commentsExternalModules_file0")', "This is on import declaration");

goTo.marker('11');
verify.completionListContains("m1", "namespace extMod.m1");

goTo.marker('12');
verify.completionListContains("b", "var extMod.m1.b: number", "b's comment");
verify.completionListContains("fooExport", "function extMod.m1.fooExport(): number", "exported function");
verify.completionListContains("m2", "namespace extMod.m1.m2");

verify.signatureHelp({ marker: "13", docComment: "exported function" });
verify.quickInfoAt("13q", "function extMod.m1.fooExport(): number", "exported function");

verify.quickInfoAt("14", "var newVar: extMod.m1.m2.c");

goTo.marker('15');
verify.completionListContains("c", "constructor extMod.m1.m2.c(): extMod.m1.m2.c", "");
verify.completionListContains("i", "var extMod.m1.m2.i: extMod.m1.m2.c", "i");
