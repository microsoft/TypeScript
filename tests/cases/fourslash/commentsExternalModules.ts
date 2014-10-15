/// <reference path='fourslash.ts' />

// @Filename: commentsExternalModules_file0.ts
/////** Module comment*/
////export module m/*1*/1 {
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
////        return f/*3q*/oo(/*3*/);
////    }
////}
/////*4*/m1./*5*/fooEx/*6q*/port(/*6*/);
////var my/*7*/var = new m1.m2./*8*/c();

// @Filename: commentsExternalModules_file1.ts
/////**This is on import declaration*/
////import ex/*9*/tMod = require("commentsExternalModules_file0");
/////*10*/extMod./*11*/m1./*12*/fooExp/*13q*/ort(/*13*/);
////var new/*14*/Var = new extMod.m1.m2./*15*/c();

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.file("commentsExternalModules_file0.ts");
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

goTo.marker('6');
verify.currentSignatureHelpDocCommentIs("exported function");
goTo.marker('6q');
verify.quickInfoIs("(function) m1.fooExport(): number", "exported function");

goTo.marker('7');
verify.quickInfoIs("(var) myvar: m1.m2.c", "");

goTo.marker('8');
verify.memberListContains("c", "class m1.m2.c", "class comment;");
verify.memberListContains("i", "(var) m1.m2.i: m1.m2.c", "i");

goTo.file("commentsExternalModules_file1.ts");
goTo.marker('9');
verify.quickInfoIs('import extMod = require("commentsExternalModules_file0")', "This is on import declaration");

goTo.marker('10');
verify.completionListContains("extMod", 'import extMod = require("commentsExternalModules_file0")', "This is on import declaration");

goTo.marker('11');
verify.memberListContains("m1", "module extMod.m1");

goTo.marker('12');
verify.memberListContains("b", "(var) extMod.m1.b: number", "b's comment");
verify.memberListContains("fooExport", "(function) extMod.m1.fooExport(): number", "exported function");
verify.memberListContains("m2", "module extMod.m1.m2");

goTo.marker('13');
verify.currentSignatureHelpDocCommentIs("exported function");
goTo.marker('13q');
verify.quickInfoIs("(function) extMod.m1.fooExport(): number", "exported function");

goTo.marker('14');
verify.quickInfoIs("(var) newVar: extMod.m1.m2.c", "");

goTo.marker('15');
verify.memberListContains("c", "class extMod.m1.m2.c", "class comment;");
verify.memberListContains("i", "(var) extMod.m1.m2.i: extMod.m1.m2.c", "i");
