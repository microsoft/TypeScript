/// <reference path='fourslash.ts' />

////function* f() {
//// [|yield|] 100;
//// [|y/**/ield|] [|yield|] 200;
////  class Foo {
////      *memberFunction() {
////          return yield 1;
////      }
////  }
////  return function* g() {
////    yield 1;
////  }
////}


verify.rangesAreOccurrences(false);

goTo.marker();
for (const range of test.ranges()) {
    verify.occurrencesAtPositionContains(range, false);
}
