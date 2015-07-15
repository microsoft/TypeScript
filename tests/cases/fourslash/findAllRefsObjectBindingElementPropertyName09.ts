/// <reference path='fourslash.ts'/>

////interface I {
////    /*SHOULD_BE_A_REFERENCE1*/property1: number;
////    property2: string;
////}
////
////function f({ /*SHOULD_BE_A_REFERENCE2*/property1: p1 }: I,
////           { /**/[|property1|] }: I,
////           { property1: p2 }) {
////
////    return [|property1|] + 1;
////}

// NOTE: In the future, the identifiers at
//       SHOULD_BE_A_REFERENCE[1/2] should be in the set of ranges.
goTo.marker();

let ranges = test.ranges();
verify.referencesCountIs(ranges.length);
for (let expectedRange of ranges) {
    verify.referencesAtPositionContains(expectedRange);
}