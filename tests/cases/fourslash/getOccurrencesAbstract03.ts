/// <reference path='fourslash.ts' />

// Tests that we don't crash when encountering an abstract class in these scopes:

////function f() {
////    [|abstract|] class A {
////        [|abstract|] m(): void;
////    }
////    abstract class B {}
////}
////switch (0) {
////    case 0:
////        [|abstract|] class A { [|abstract|] m(): void; }
////    default:
////        [|abstract|] class B { [|abstract|] m(): void; }
////}

verify.baselineDocumentHighlights();
