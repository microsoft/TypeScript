/// <reference path='fourslash.ts' />
// @strict: true
/////** @type {function(*, ...number, ...boolean): void} */
////var /*1*/x;

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/** @type {function(*, ...number, ...boolean): void} */
var x: (arg0: any, arg1: number[], ...rest: boolean[]) => void;`, 'Annotate with type from JSDoc', 'annotate');
