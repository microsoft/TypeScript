/// <reference path='fourslash.ts' />

////export const class C {
////    private static [|const|] foo;
////    constructor(public [|const|] foo) {
////    }
////}

test.ranges().forEach(range => {
    goTo.position(range.start);
    verify.occurrencesAtPositionCount(0);
});