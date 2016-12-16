/// <reference path='fourslash.ts'/>

////class A {
////    foo(): string { return ''; }
////}
////
////class B extends A {
////    bar(): string {
////        return '';
////    }
////}
////
////class C<U extends A, T extends A> {
////    x: U;
////    y = this.x./**/ // completion list here
////}


goTo.marker();
verify.completionListContains("foo");
verify.completionListCount(1);
