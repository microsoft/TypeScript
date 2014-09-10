/// <reference path="fourslash.ts"/>

////class Foo {
////    private x;
////}
////
////class Bar extends Foo {
////    private y;
////    foo() {
////        this./**/
////    }
////}


goTo.marker();
verify.memberListContains("y");
verify.not.memberListContains("x");
