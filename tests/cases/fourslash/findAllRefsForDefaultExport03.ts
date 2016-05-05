/// <reference path='fourslash.ts'/>

////function [|f|]() {
////    return 100;
////}
////
////export default [|f|];
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////namespace [|f|] {
////    var local = 100;
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}