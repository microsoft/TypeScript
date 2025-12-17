/// <reference path="fourslash.ts" />

// @strict: true

//// type A = {
////   id: `A:${string}`;
////   a: number;
//// };
////
//// type B = {
////   id: `B:${string}`;
////   b: number;
//// };
////
//// function foo<T extends A | B>(item: T): void {}
////
//// foo({ id: "B:", /**/ });

verify.completions({ marker: "", exact: ["b"] });
