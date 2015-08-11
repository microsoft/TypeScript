/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [{ [|a|]: p, b }] = [{ [|a|]: 10, b: true }];

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}