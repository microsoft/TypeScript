/// <reference path='fourslash.ts' />

////export const class C {
////    private static [|const|] [|foo|];
////    constructor(public [|const|] foo) {
////    }
////}

const [r0, r1, r2] = test.ranges();
goTo.eachRange([r0, r2], () => verify.occurrencesAtPositionCount(0));
goTo.rangeStart(r1);
verify.occurrencesAtPositionCount(1);
