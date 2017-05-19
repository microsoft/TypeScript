/// <reference path='fourslash.ts' />

// @Filename: commentsImportDeclaration_file0.ts
/////** NamespaceComment*/
////export namespace m/*2*/1 {
////    /** b's comment*/
////    export var b: number;
////    /** m2 comments*/
////    export namespace m2 {
////        /** class comment;*/
////        export class c {
////        };
////        /** i*/
////        export var i: c;;
////    }
////    /** exported function*/
////    export function fooExport(): number;
////}

// @Filename: commentsImportDeclaration_file1.ts
///////<reference path='commentsImportDeclaration_file0.ts'/>
/////** Import declaration*/
////import /*3*/extMod = require("./commentsImportDeclaration_file0/*4*/");
////extMod./*6*/m1./*7*/fooEx/*8q*/port(/*8*/);
////var new/*9*/Var = new extMod.m1.m2./*10*/c();

verify.quickInfos({
    2: ["namespace m1", "NamespaceComment"],
    3: ['import extMod = require("./commentsImportDeclaration_file0")', "Import declaration"]
});

goTo.marker('6');
verify.completionListContains("m1", "namespace extMod.m1");

goTo.marker('7');
verify.completionListContains("b", "var extMod.m1.b: number", "b's comment");
verify.completionListContains("fooExport", "function extMod.m1.fooExport(): number", "exported function");
verify.completionListContains("m2", "namespace extMod.m1.m2");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("exported function");
verify.quickInfos({
    "8q": ["function extMod.m1.fooExport(): number", "exported function"],
    9: "var newVar: extMod.m1.m2.c"
});

goTo.marker('10');
verify.completionListContains("c", "constructor extMod.m1.m2.c(): extMod.m1.m2.c", "");
verify.completionListContains("i", "var extMod.m1.m2.i: extMod.m1.m2.c", "i");
