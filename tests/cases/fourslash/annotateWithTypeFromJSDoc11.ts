/// <reference path='fourslash.ts' />

/////**
//// * @param {?} x
//// * @returns {number}
//// */
////var f = /*1*/(/*2*/x) => x

verify.applicableRefactorAvailableAtMarker('2');
verify.fileAfterApplyingRefactorAtMarker('2',
`/**
 * @param {?} x
 * @returns {number}
 */
var f = (x: any): number => x`, 'Annotate with type from JSDoc', 'annotate');
