///<reference path="fourslash.ts" />

////const c = "s";
/////*1*/
////const d = 1
////d/*2*/
////const e = 1
/////*3*/

verify.completions({ marker: ["1"], includes: { name: "c", text: 'const c: "s"', kind: "const" } });
verify.completions({ marker: ["2"], includes: { name: "d", text: 'const d: 1', kind: "const" } });
verify.completions({ marker: ["3"], includes: { name: "e", text: 'const e: 1', kind: "const" } });
