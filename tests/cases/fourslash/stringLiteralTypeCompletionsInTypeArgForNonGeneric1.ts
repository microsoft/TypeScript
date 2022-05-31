/// <reference path="./fourslash.ts" />

////interface Foo {}
////type Bar = {};
////
////let x: Foo<"/*1*/">;
////let y: Bar<"/*2*/">;

verify.completions({ marker: test.markers() });

