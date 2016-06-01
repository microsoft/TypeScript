/// <reference path='fourslash.ts'/>

////type Options = "[|option 1|]" | "option 2";
////let myOption: Options = "[|option 1|]";

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}