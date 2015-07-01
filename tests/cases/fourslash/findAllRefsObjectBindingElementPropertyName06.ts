/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////for (let { [|property1|]: p } of <I[]>[]) {
////}
////for (let { [|property1|] } of <I[]>[]) {
////}
////for (var { [|property1|]: p } of <I[]>[]) {
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}