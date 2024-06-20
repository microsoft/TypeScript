/// <reference path="fourslash.ts" />

////declare const x: ['a', 'v1'] | ['b', 'v2'] = ['b', "v/**/"];

verify.completions({ marker: "", exact: ["v2"] });