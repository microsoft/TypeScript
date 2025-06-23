/// <reference path='fourslash.ts' />

//// function test1(a = /*marker*/) {
////   var hoisted
////   let mutable
////   const readonly = 1
//// }

// Just check that local variables are not in completions
verify.completions({
    marker: "marker",
    excludes: ["hoisted", "mutable", "readonly"],
});