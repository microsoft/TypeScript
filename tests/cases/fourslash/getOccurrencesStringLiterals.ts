/// <reference path='fourslash.ts' />

////var x = "[|string|]";
////function f(a = "[|initial value|]") { }

const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(1);
}
