/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class B {
////     b: string
//// }
//// class D extends B {
////     c = 10;
////     constructor(public a: string, [|public readonly b: string|]) {
////         super();
////     }
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "public override readonly b: string",
    index: 0
})
