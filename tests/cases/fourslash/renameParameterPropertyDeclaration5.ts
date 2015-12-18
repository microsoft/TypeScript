/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [ [|protectedParam|] ]) {
////         let myProtectedParam = [|protectedParam|];
////     }
//// }

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}