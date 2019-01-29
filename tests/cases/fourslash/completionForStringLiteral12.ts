/// <reference path='fourslash.ts' />

////function foo(x: "bla"): void;
////function foo(x: "bla"): void;
////function foo(x: string) {}
////foo("/**/")

verify.completions({ marker: "", exact: "bla" });
