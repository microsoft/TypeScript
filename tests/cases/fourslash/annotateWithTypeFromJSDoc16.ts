/// <reference path='fourslash.ts' />
// @strict: true
/////** @type {function(*, ...number, ...boolean): void} */
////var /*1*/x = (x, ys, ...zs) => { };

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/** @type {function(*, ...number, ...boolean): void} */
var x: (arg0: any, arg1: number[], ...rest: boolean[]) => void = (x, ys, ...zs) => { };`, 'Annotate with type from JSDoc', 'annotate');
