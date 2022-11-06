/// <reference path="fourslash.ts" />

////declare const x: [{ t: "a" }, "b"] | [{ t: "b" }, "c"]  = [{ t: a }, "/**/"]

verify.completions({ marker: "", exact: ["b"] });
