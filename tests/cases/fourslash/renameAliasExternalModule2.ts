/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////module [|SomeModule|] { export class SomeClass { } }
////export = [|SomeModule|];

// @Filename: b.ts
////import M = require("./a");
////import C = M.SomeClass;

let ranges = test.ranges()
for (let range of ranges) {
    goTo.file(range.fileName);
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}