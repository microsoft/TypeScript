/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

/////**
//// * @param a
//// * @param b
//// */
////function f(a, b) {
////    const x = a;
////}

verify.codeFix({
    description: "Prefix 'b' with an underscore",
    index: 1,
    newFileContent:
`/**
 * @param a
 * @param _b
 */
function f(a, _b) {
    const x = a;
}`,
});
