/// <reference path='fourslash.ts' />

////function f(x = [|super|]) {
////    [|super|];
////}
////
////module M {
////    [|super|];
////    function f(x = [|super|]) {
////    [|super|];
////    }
////
////    class A {
////    }
////
////    class B extends A {
////        constructor() {
////            super();
////        }
////    }
////}

verify.baselineDocumentHighlights();
