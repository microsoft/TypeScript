/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @typedef Foo
//// * @template L, R
//// */
/////**
//// * @param {function(R): boolean} a
//// * @param {function(R): L} b
//// * @returns {function(R): Foo.<L, R>}
//// * @template L, R
//// */
////function foo(a, b) {
////}

verify.codeFix({
    description: ts.Diagnostics.Annotate_with_type_from_JSDoc.message,
    index: 2,
    newFileContent:
`/**
 * @typedef Foo
 * @template L, R
 */
/**
 * @param {function(R): boolean} a
 * @param {function(R): L} b
 * @returns {function(R): Foo.<L, R>}
 * @template L, R
 */
function foo<L, R>(a: (arg0: R) => boolean, b: (arg0: R) => L): (arg0: R) => Foo<L, R> {
}`,
});
