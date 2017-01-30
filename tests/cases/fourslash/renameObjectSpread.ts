/// <reference path='fourslash.ts'/>

////interface A1 { [|a|]: number };
////interface A2 { [|a|]?: number };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a|];
const ranges = test.ranges();
verify.assertHasRanges(ranges);

// A1 unions with A2, so rename A1.a and a12.a
goTo.rangeStart(ranges[0]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[2]]);
// A1 unions with A2, so rename A2.a and a12.a
goTo.rangeStart(ranges[1]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[1], ranges[2]]);
// a12.a unions A1.a and A2.a, so rename A1.a, A2.a and a12.a
goTo.rangeStart(ranges[2]);
verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false, [ranges[0], ranges[1], ranges[2]]);
