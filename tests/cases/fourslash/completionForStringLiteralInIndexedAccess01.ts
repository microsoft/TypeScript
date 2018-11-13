/// <reference path='fourslash.ts'/>

////interface Foo {
////    foo: string;
////    bar: string;
////}
////
////let x: Foo["/*1*/"]

verify.completions({ marker: "1", exact: ["foo", "bar"] });
