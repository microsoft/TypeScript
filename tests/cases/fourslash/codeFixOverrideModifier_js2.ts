/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitOverride: true
// @filename: a.js
//// class B { }
//// class D extends B {
////     /**
////      * @public
////      * @override
////      */
////     foo (v) {}
//// }

verify.codeFix({
    description: "Remove 'override' modifier",
    index: 0,
    newFileContent:
`class B { }
class D extends B {
    /**
     * 
     */
    foo (v) {}
}`,
})