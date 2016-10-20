/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private [|privateParam|]: number) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}