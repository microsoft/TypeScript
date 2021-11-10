/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitOverride: true
// @filename: a.js
//// class B {
////     foo (v) {}
//// }
//// class D extends B {
////     /** @public */
////     foo (v) {}
//// }

verify.codeFix({
    description: "Add 'override' modifier",
    index: 0,
    newFileContent:
`class B {
    foo (v) {}
}
class D extends B {
    /**
     * 
     * @override
     */
    foo (v) {}
}`,
})