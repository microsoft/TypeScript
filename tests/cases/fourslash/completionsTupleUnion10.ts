/// <reference path="fourslash.ts" />
////declare const x: ['a', 'b'] | { '0': 'x', '1': 'y' } | { '1': 'z' } = ['x', '/**/'];

verify.completions({ marker: "", exact: ["y"] });