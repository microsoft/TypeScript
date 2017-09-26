/// <reference path='fourslash.ts' />

// @Filename: test123.ts
/////** @type {number} */
////var /*1*/x;

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/** @type {number} */
var x: number;`, 'Annotate with type from JSDoc', 'annotate');
