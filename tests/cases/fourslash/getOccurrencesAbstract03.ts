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

const [r0, r1, r2, r3, r4, r5] = test.ranges();
verify.rangesAreDocumentHighlights([r0, r1]);
verify.rangesAreDocumentHighlights([r2, r3]);
verify.rangesAreDocumentHighlights([r4, r5]);
