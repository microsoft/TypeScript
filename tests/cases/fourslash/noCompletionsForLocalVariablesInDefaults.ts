/// <reference path='fourslash.ts' />

//// function test1(a = /*marker*/) {
////   var hoisted
////   let mutable
////   const readonly = 1
//// }

verify.completions({
    marker: "marker",
    excludes: ["hoisted", "mutable", "readonly"],
});