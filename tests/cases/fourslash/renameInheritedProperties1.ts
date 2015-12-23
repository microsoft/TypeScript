/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|propName|]: string;
//// }
////
//// var v: class1;
//// v.[|propName|];

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}