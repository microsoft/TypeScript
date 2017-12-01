/// <reference path='fourslash.ts' />

/////**
//// * @param {number} x
//// * @returns {number}
//// */
////var f = /*1*/function (x) {
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @param {number} x
 * @returns {number}
 */
var f = function(x: number): number {
}`, 'Annotate with type from JSDoc', 'annotate');
