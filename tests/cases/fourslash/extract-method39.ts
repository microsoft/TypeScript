/// <reference path='fourslash.ts' />

////function bar(fn: () => void) {}
////
////class Foo {
////    x: number;
////    foo() {
////        /*start*/bar(() => {});/*end*/
////    }
////}

goTo.select("start", "end");
verify.refactorAvailable("Extract Symbol", "function_scope_1");
verify.refactorAvailable("Extract Symbol", "function_scope_2");
