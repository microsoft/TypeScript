/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propD: number;
//// }
//// interface D extends C {
////     [|propC|]: number;
//// }
//// var d: D;
//// d.[|propC|];

const ranges = test.ranges();
verify.assertHasRanges(ranges);
for (const range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}