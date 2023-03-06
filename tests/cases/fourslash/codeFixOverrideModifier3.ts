/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class E extends (class {
////     foo () {}
////     bar () {}
//// }) {
////     override foo () {}
////     [|bar () {}|]
////     baz() {}
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "override bar () {}",
    index: 0
})
