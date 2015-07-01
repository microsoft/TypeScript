/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////function f({ [|property1|]: p1 }: I,
////           { [|property1|] }: I,
////           { property1: p2 }) {
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}