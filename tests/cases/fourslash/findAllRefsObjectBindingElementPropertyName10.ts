/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|next|]?: Recursive;
////    value: any;
////}
////
////function f ({ [|next|]: { [|next|]: x} }: Recursive) {
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}