/// <reference path='fourslash.ts'/>


////interface I {
////    ["[|prop1|]"]: () => void;
////}
////
////class C implements I {
////    ["[|prop1|]"]: any;
////}
////
////var x: I = {
////    ["[|prop1|]"]: function () { },
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}