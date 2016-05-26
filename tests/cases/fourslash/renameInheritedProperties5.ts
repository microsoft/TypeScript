/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propC: number;
//// }
//// interface D extends C {
////     [|propD|]: string;
//// }
//// var d: D;
//// d.[|propD|];

const ranges = test.ranges();
verify.assertHasRanges(ranges);
for (const range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
