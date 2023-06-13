/// <reference path="fourslash.ts" />

//// type Foo = { a: string; b: number; c: boolean; };
//// type A = Foo["/*1*/"];
//// type AorB = Foo["a" | "/*2*/"];

verify.completions({ marker: ["1"], exact: ["a", "b", "c"] });
verify.completions({ marker: ["2"], exact: ["b", "c"] });
