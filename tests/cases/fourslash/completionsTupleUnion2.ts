/// <reference path="fourslash.ts" />

////declare const a: "a";
////declare const x: [{ t: "a" }, "b"] | [{ t: "b" }, "c"]  = [{ t: a }, "/**/"]

verify.completions({ marker: "", exact: ["b"] });