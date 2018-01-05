/// <reference path='fourslash.ts' />

/////**
//// * @param {number} x
//// * @returns {number}
//// */
/////*1*/function f(x) {
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @param {number} x
 * @returns {number}
 */
function f(x: number): number {
}`, 'Annotate with type from JSDoc', 'annotate');
