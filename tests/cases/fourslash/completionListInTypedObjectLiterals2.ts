/// <reference path="fourslash.ts" />

////interface Foo {
////    x: { a: number };
////}
////var aaa: Foo;
////aaa = { /*9*/

verify.completions({ marker: "9", exact: "x" });
