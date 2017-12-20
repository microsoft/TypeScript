/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @template T
//// * @param {number} a
//// * @param {T} b
//// */
////function /*1*/f(a, b) {
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @template T
 * @param {number} a
 * @param {T} b
 */
function f<T>(a: number, b: T) {
}`, 'Annotate with type from JSDoc', 'annotate');
