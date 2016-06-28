/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(public [|publicParam|]: number) {
////         let publicParam = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}