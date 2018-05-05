/// <reference path='fourslash.ts' />

////[|a/**/sync|] function f() {
//// [|await|] 100;
//// [|await|] [|await|] 200;
//// return [|await|] async function () {
////   await 300;
//// }
////}

verify.rangesAreOccurrences(false);

goTo.marker();
for (const range of test.ranges()) {
    verify.occurrencesAtPositionContains(range, false);
}
