/// <reference path="fourslash.ts" />

////declare const x: ['a', 'b'] | ['a', 'c'] = ['b', "/**/"];

verify.completions({ marker: "", exact: ["b", "c"] });