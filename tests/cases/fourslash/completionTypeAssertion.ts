/// <reference path="fourslash.ts" />

//// var x = this as/*1*/

verify.completions({marker: "1", exact: completion.globalsPlus(["x"]) })
