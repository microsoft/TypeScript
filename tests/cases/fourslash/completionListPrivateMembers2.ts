/// <reference path="fourslash.ts"/>

////class Foo {
////    private y;
////    constructor(private x) {}
////    method() { this./*1*/; }
////}
////var f:Foo;
////f./*2*/

verify.completions(
    { marker: "1", exact: ["y", "x", "method"] },
    { marker: "2", exact: "method" },
);
