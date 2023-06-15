///<reference path="fourslash.ts" />

////const c = "s";
/////*1*/
////const d = 1
/////*2*/

verify.completions({ marker: ["1"], includes: { name: "c", text: 'const c: "s"', kind: "const" } });
verify.completions({ marker: ["2"], includes: { name: "d", text: 'const d: 1', kind: "const" } });
