/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class B { }
//// class D extends B {
////     c = 10;
////     constructor([|public override a: string|]) {
////         super();
////     }
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    newRangeContent: "public a: string",
    index: 0
})
