/// <reference path="fourslash.ts"/>

////class Base {
////    protected y;
////    constructor(protected x) {}
////    method() { this./*1*/; }
////}
////class D1 extends Base {
////    protected z;
////    method1() { this./*2*/; }
////}
////class D2 extends Base {
////    method2() { this./*3*/; }
////}
////class D3 extends D1 {
////    method2() { this./*4*/; }
////}
////var b: Base;
////f./*5*/

goTo.marker("1");
verify.completionListContains("y");
verify.completionListContains("x");
verify.not.completionListContains("z");

goTo.marker("2");
verify.completionListContains("y");
verify.completionListContains("x");
verify.completionListContains("z");

goTo.marker("3");
verify.completionListContains("y");
verify.completionListContains("x");
verify.not.completionListContains("z");

goTo.marker("4");
verify.completionListContains("y");
verify.completionListContains("x");
verify.completionListContains("z");

goTo.marker("5");
verify.not.completionListContains("x");
verify.not.completionListContains("y");
verify.not.completionListContains("z");
