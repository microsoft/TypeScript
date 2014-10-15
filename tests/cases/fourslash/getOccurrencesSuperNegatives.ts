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

test.ranges().forEach(r => {
    goTo.position(r.start);

    verify.occurrencesAtPositionCount(0);
});
