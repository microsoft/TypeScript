/// <reference path="fourslash.ts" />

////interface A { a: number }
////interface B { b: number }
////declare function f(n: number): A;
////declare function f(s: string): B;
////f()./**/

verify.completions({ marker: "", exact: ["a", "b"] });
