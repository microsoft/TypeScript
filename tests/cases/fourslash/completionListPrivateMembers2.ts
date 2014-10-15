/// <reference path="fourslash.ts"/>

////class Foo {
////    private y;
////    constructor(private x) {}
////    method() { this./*1*/; }
////}
////var f:Foo;
////f./*2*/

goTo.marker("1");
verify.memberListContains("y");
verify.memberListContains("x");

goTo.marker("2");
verify.not.memberListContains("x");
verify.not.memberListContains("y");