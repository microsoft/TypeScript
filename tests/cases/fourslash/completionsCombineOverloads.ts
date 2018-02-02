/// <reference path="fourslash.ts" />

////interface A { a: number }
////interface B { b: number }
////declare function f(a: A): void;
////declare function f(b: B): void;
////f({ /**/ });

verify.completionsAt("", ["a", "b"]);
