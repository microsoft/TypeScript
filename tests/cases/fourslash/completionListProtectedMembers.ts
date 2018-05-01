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

verify.completions(
    { at: "1", are: ["y", "x", "method"] },
    { at: "2", are: ["z", "method1", "y", "x", "method"] },
    { at: "3", are: ["method2", "y", "x", "method"] },
    { at: "4", are: ["method2", "z", "method1", "y", "x", "method"] },
    { at: "5", are: undefined },
);
