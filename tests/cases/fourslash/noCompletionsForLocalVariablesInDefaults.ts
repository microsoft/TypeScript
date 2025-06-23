/// <reference path='fourslash.ts' />

//// function test1(a: string, b = /*marker*/) {
////   var hoisted
////   let mutable  
////   const readonly = 1
//// }

// Check that parameter 'a' is included but local variables are excluded
verify.completions({
    marker: "marker",
    includes: ["a"],
    excludes: ["hoisted", "mutable", "readonly"],
});