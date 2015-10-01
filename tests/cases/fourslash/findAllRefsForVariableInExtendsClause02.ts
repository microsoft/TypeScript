/// <reference path="fourslash.ts"/>

////interface [|Base|] { }
////namespace n {
////    var Base = class { };
////    interface I extends [|Base|] { }
////}

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}