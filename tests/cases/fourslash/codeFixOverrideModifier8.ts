/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// function ff () {
////     return class {
////         [|override foo () {}|]
////     }
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    newRangeContent: "foo () {}",
    index: 0
})

