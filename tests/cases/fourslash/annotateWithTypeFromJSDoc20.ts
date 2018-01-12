/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @param {number} a
//// * @param {T} b
//// */
////function /*1*/f<T>(a, b) {
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @param {number} a
 * @param {T} b
 */
function f<T>(a: number, b: T) {
}`, 'Annotate with type from JSDoc', 'annotate');
