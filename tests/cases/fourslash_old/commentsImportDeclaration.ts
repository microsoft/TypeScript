/// <reference path='fourslash.ts' />

// @Filename: commentsImportDeclaration_file0.ts
/////** ModuleComment*/
////export module m/*2*/1 {
////    /** b's comment*/
////    export var b: number;
////    /** m2 comments*/
////    export module m2 {
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
////import extMod/*3*/ = require("commentsImportDeclaration_file0/*4*/");
////extMod./*6*/m1./*7*/fooEx/*8q*/port(/*8*/);
////var new/*9*/Var = new extMod.m1.m2./*10*/c();

goTo.marker('2');
verify.quickInfoIs("m1", "ModuleComment", "m1", "module");

goTo.marker('3');
verify.quickInfoIs("extMod", "Import declaration", "extMod", "module");

goTo.marker('6');
verify.memberListContains("m1", "extMod.m1");

goTo.marker('7');
verify.memberListContains("b", "number", "b's comment", "extMod.m1.b", "var");
verify.memberListContains("fooExport", "(): number", "exported function", "extMod.m1.fooExport", "function");
verify.memberListContains("m2", "extMod.m1.m2");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("exported function");
goTo.marker('8q');
verify.quickInfoIs("(): number", "exported function", "extMod.m1.fooExport", "function");

goTo.marker('9');
verify.quickInfoIs("extMod.m1.m2.c", "", "newVar", "var");

goTo.marker('10');
verify.memberListContains("c", undefined, "class comment;", "extMod.m1.m2.c", "class");
verify.memberListContains("i", "extMod.m1.m2.c", "i", "extMod.m1.m2.i", "var");
