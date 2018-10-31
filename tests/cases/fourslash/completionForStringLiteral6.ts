/// <reference path='fourslash.ts'/>

////interface Foo {
////    x: "abc" | "def";
////}
////function bar(f: Foo) { };
////bar({x: "/**/"});

verify.completions({ marker: "", exact: ["abc", "def"] });
