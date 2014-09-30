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
////import /*3*/extMod = require("commentsImportDeclaration_file0/*4*/");
////extMod./*6*/m1./*7*/fooEx/*8q*/port(/*8*/);
////var new/*9*/Var = new extMod.m1.m2./*10*/c();

goTo.marker('2');
verify.quickInfoIs("module m1", "ModuleComment");

goTo.marker('3');
verify.quickInfoIs("(alias) extMod", "Import declaration");

goTo.marker('6');
verify.memberListContains("m1", "module extMod.m1");

goTo.marker('7');
verify.memberListContains("b", "(var) extMod.m1.b: number", "b's comment");
verify.memberListContains("fooExport", "(function) extMod.m1.fooExport(): number", "exported function");
verify.memberListContains("m2", "module extMod.m1.m2");

goTo.marker('8');
verify.currentSignatureHelpDocCommentIs("exported function");
goTo.marker('8q');
verify.quickInfoIs("(function) extMod.m1.fooExport(): number", "exported function");

goTo.marker('9');
verify.quickInfoIs("(var) newVar: extMod.m1.m2.c", "");

goTo.marker('10');
verify.memberListContains("c", "class extMod.m1.m2.c", "class comment;");
verify.memberListContains("i", "(var) extMod.m1.m2.i: extMod.m1.m2.c", "i");
