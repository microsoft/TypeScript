/// <reference path="fourslash.ts" />
////type ABC = "a" | "b" | "c";
////type XYZ = "x" | "y" | "z";
////declare const x: ['abc', ABC] | ['xyz', ...XYZ[]] = ['xyz', 'x', 'x', 'x', 'x', '/**/'];

verify.completions({ marker: "", exact: ["x", "y", "z"] });