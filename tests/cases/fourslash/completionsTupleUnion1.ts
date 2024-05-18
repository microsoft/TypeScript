/// <reference path="fourslash.ts" />

////declare const a: "a";
////declare const x: ['a', 'b'] | ['a', 'c'] | ['d', 'e'] = [a, "/**/"];

verify.completions({ marker: "", exact: ["b", "c"] });