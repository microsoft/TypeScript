/// <reference path="fourslash.ts" />

////declare const x: ["a", ["b"], "x", ["y"]] = ["a", ["/**/"]]

verify.completions({ marker: "", exact: ["b"] });