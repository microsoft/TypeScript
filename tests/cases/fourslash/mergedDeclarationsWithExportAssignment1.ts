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
////import /*1*/Foo = require('./mergedDeclarationsWithExportAssignment1_file0');
////var /*3*/z = new /*2*/Foo();
////var /*5*/r2 = Foo./*4*/x;

verify.quickInfoAt("1", [
    "(alias) class Foo",
    "(alias) namespace Foo",
    "import Foo = require('./mergedDeclarationsWithExportAssignment1_file0')"
].join("\n"));

goTo.marker('2');
verify.completionListContains('Foo');

verify.quickInfoAt("3", "var z: Foo");

goTo.marker('4');
verify.completionListContains('x');

verify.quickInfoAt("5", "var r2: number");

