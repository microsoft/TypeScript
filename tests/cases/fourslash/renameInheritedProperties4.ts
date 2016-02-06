/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|doStuff|](): string;
//// }
////
//// var v: interface1;
//// v.[|doStuff|]();

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}