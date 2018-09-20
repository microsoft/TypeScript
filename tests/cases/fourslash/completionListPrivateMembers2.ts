/// <reference path="fourslash.ts"/>

////class Foo {
////    private y;
////    constructor(private x) {}
////    method() { this./*1*/; }
////}
////var f:Foo;
////f./*2*/

goTo.marker("1");
verify.completionListContains("y");
verify.completionListContains("x");

goTo.marker("2");
verify.not.completionListContains("x");
verify.not.completionListContains("y");