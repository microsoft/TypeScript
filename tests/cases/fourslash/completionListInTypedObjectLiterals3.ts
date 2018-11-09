/// <reference path="fourslash.ts" />

////interface Foo {
////    x: { a: number };
////}
////var aaa: Foo;
////aaa.x = { /*10*/

verify.completions({ marker: "10", exact: "a" });
