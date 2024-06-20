/// <reference path="fourslash.ts" />
////type ABC = "a" | "b" | "c";
////declare const x: ['abc', ...ABC[]] | ['abc', "a", "f"] = ['abc', 'a', '/**/'];

verify.completions({ marker: "", exact: ["a", "b", "c", "f"] });