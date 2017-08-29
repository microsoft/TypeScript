/// <reference path='fourslash.ts' />

// @Filename: test123.ts
/////** @type {number} */
////var /*1*/x;

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`var x: number;`, 'Convert to Typescript type', 'convert');
