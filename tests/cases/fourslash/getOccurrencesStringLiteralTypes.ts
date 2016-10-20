/// <reference path='fourslash.ts' />

////function foo(a: "[|option 1|]") { }
////foo("[|option 1|]");

const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}
