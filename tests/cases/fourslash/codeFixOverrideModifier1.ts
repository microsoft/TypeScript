/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// class B {
////     foo (v: string) {}
////     fooo (v: string) {}
//// }
//// class D extends B {
////     override foo (v: string) {}
////     [|fooo (v: string) {}|]
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "override fooo (v: string) {}",
    index: 0
})
