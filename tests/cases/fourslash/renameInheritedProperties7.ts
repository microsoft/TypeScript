/// <reference path='fourslash.ts'/>

//// class C extends D {
////     [|prop1|]: string;
//// }
//// 
//// class D extends C {
////     prop1: string;
//// }
//// 
//// var c: C;
//// c.[|prop1|];

const ranges = test.ranges();
verify.assertHasRanges(ranges);
for (const range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}