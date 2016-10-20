/// <reference path='fourslash.ts'/>

//// class C implements D {
////     [|prop1|]: string;
//// }
//// 
//// interface D extends C {
////     [|prop1|]: string;
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