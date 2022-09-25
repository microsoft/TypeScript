/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true
// @filename: a.js
////class A {
////    /**
////     * comment
////     * @type {string}
////     */
////    a;
////}
////class B {
////    /** @type {string} */
////    a;
////}
////class C {
////    /**
////     * @type {string}
////     */
////    a;
////}

verify.codeFixAll({
    fixId: 'addMissingPropertyUndefinedType',
    fixAllDescription: "Add undefined type to all uninitialized properties",
    newFileContent:
`class A {
    /**
     * comment
     * @type {string | undefined}
     */
    a;
}
class B {
    /** @type {string | undefined} */
    a;
}
class C {
    /**
     * @type {string | undefined}
     */
    a;
}`
});
