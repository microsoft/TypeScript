/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class B {
////     a: string
//// }
//// class D extends B {
////     constructor([|public a: string|], public b: string) {
////         super();
////     }
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "public override a: string",
    index: 0
})