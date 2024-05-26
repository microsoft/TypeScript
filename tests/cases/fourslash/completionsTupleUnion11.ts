/// <reference path="fourslash.ts" />
////type ABC = "a" | "b" | "c";
////declare const x: ['abc', ...ABC[]] | ['abc', 'abc', "f"] = ['abc', 'abc', '/**/'];

verify.completions({ marker: "", exact: ["f"] });