/// <reference path='fourslash.ts'/>

////interface I {
////    [[|42|]](): void;
////}
////
////class C implements I {
////    [[|42|]]: any;
////}
////
////var x: I = {
////    ["[|42|]"]: function () { }
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}