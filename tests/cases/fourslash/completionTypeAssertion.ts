/// <reference path="fourslash.ts" />

//// var x = 'something'
//// var y = this as/*1*/

verify.completions({marker: "1", exact: completion.globalsPlus(["x"]) })
