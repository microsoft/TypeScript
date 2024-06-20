/// <reference path="fourslash.ts" />
////type ABC = "a" | "b" | "c";
////type XYZ = "x" | "y" | "z";
////declare const x: ['abc', ...ABC[]] | ['xyz', ...XYZ[]] = ['abc', 'a', 'b', 'c', 'a', '/**/'];

verify.completions({ marker: "", exact: ["a", "b", "c"] });