/// <reference path='fourslash.ts'/>

// @Filename: mergedDeclarationsWithExportAssignment1_file0.ts
////class Foo {
////    doStuff(x: number): number;
////}
////module Foo {
////    export var x: number;
////}
////export = Foo;

// @Filename: mergedDeclarationsWithExportAssignment1_file1.ts
///////<reference path='mergedDeclarationsWithExportAssignment1_file0.ts'/>
////import /*1*/Foo = require('mergedDeclarationsWithExportAssignment1_file0');
////var /*3*/z = new /*2*/Foo();
////var /*5*/r2 = Foo./*4*/x;

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('1');
verify.quickInfoIs("import Foo = require('mergedDeclarationsWithExportAssignment1_file0')");

goTo.marker('2');
verify.completionListContains('Foo');

goTo.marker('3');
verify.quickInfoIs('(var) z: Foo');

goTo.marker('4');
verify.completionListContains('x');

goTo.marker('5');
verify.quickInfoIs('(var) r2: number');

