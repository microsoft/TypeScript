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

verify.completions({ marker: "", exact: ["y", "foo"] });
