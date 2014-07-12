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
////class C<U extends T, T extends A> {
////    x: U;
////    y = this.x./**/ // completion list here
////}


goTo.marker();
verify.memberListContains("foo");
verify.memberListCount(1);
