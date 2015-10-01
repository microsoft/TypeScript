/// <reference path="fourslash.ts"/>


////var [|Base|] = class { };
////class C extends [|Base|] { }

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}