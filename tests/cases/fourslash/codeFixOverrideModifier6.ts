/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// class B {
////     foo (v: string) {}
////     fooo (v: string) {}
//// }
//// function f () {
////     return class extends B {
////         override foo (v: string) {}
////         [|override bar(v: string) {}|]
////     }
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    newRangeContent: 'bar(v: string) {}',
    index: 0
})

