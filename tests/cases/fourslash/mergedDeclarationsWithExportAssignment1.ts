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

verify.quickInfos({
    1: [
        "(alias) class Foo",
        "(alias) namespace Foo",
        "import Foo = require('./mergedDeclarationsWithExportAssignment1_file0')"
    ].join("\n"),
    3: "var z: Foo",
    5: "var r2: number",
});

verify.completions(
    { marker: "2", includes: "Foo" },
    { marker: "4", includes: "x" },
);
