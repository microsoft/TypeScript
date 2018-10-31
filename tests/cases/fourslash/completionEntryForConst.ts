///<reference path="fourslash.ts" />

////const c = "s";
/////**/

verify.completions({ marker: "", includes: { name: "c", text: 'const c: "s"', kind: "const" } });
