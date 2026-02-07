/// <reference path='fourslash.ts'/>

// @stableTypeOrdering: true
////interface Foo {
////    foo: string;
////    bar: string;
////}
////
////function f<K extends keyof Foo>(a: K) { };
////f("/*1*/

verify.completions({ marker: "1", exact: ["bar", "foo"] });
