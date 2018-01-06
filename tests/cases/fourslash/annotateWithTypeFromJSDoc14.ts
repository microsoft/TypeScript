/// <reference path='fourslash.ts' />
/////** @return {number} */
////function f() {
////    /*1*/return 12;
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/** @return {number} */
function f(): number {
    return 12;
}`, 'Annotate with type from JSDoc', 'annotate');
