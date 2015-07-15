/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////function f({ /**/[|property1|]: p1 }: I,
////           { /*SHOULD_BE_A_REFERENCE*/property1 }: I,
////           { property1: p2 }) {
////
////    return property1 + 1;
////}

// NOTE: In the future, the identifier at
//       SHOULD_BE_A_REFERENCE should be in the set of ranges.
goTo.marker();

let ranges = test.ranges();
verify.referencesCountIs(ranges.length);
for (let expectedRange of ranges) {
    verify.referencesAtPositionContains(expectedRange);
}