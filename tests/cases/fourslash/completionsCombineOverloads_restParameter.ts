/// <reference path="fourslash.ts" />

////interface A { a: number }
////interface B { b: number }
////interface C { c: number }
////declare function f(a: A): void;
////declare function f(...bs: B[]): void;
////declare function f(...cs: C[]): void;
////f({ /*1*/ });
////f({ a: 1 }, { /*2*/ });

verify.completionsAt("1", ["a", "b", "c"]);
verify.completionsAt("2", ["b", "c"]);
