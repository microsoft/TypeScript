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


verify.baselineDocumentHighlights();
