/// <reference path='fourslash.ts' />

////var proto = { a: 1 }
////var o2 = { __proto__: proto }
////o2./*2*/

verify.completions({ marker: "2", exact: { name: "a", text: "(property) a: number" } });
edit.insert("a = 10;");
verify.quickInfoAt("2", "(property) a: number");
