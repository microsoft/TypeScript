/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [|protectedParam|]: number) {
////         let protectedParam = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}