/// <reference path="fourslash.ts" />

////interface A { kind: "a"; a: number; }
////interface B { kind: "b"; b: number; }
////const c: A | B = { kind: "a", /**/ };

verify.completions({ marker: "", exact: ["a"] });
