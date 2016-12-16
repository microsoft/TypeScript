/// <reference path='fourslash.ts'/>

////module SomeModule { export class SomeClass { } }
////import [|M|] = SomeModule;
////import C = [|M|].SomeClass;

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}