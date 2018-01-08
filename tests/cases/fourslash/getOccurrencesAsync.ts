/// <reference path='fourslash.ts' />

////[|async|] function f([|async|] p) {}
////[|async|] function g() {}

////[|async|] class C {
////    [|async|] m() {}
////    [|async|] n() {}
////}

const [f, p, g, C, m, n] = test.ranges();
goTo.eachRange([f, g], () => verify.occurrencesAtPositionCount(3));
goTo.eachRange([m, n], () => verify.occurrencesAtPositionCount(2));
goTo.eachRange([p, C], () => verify.occurrencesAtPositionCount(0));
