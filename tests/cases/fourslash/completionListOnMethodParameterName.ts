/// <reference path="fourslash.ts" />

////class A {
////    foo(nu/**/: number) {
////    }
////}

goTo.marker();
// Completion list shouldn't be present in argument name position
verify.completionListIsEmpty();
