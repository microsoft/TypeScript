/// <reference path='fourslash.ts' />
////class C {
////    /** @param {number} value */
////    set c(/*1*/value) { return 12 }
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /** @param {number} value */
    set c(value: number) { return 12; }
}`, 'Annotate with type from JSDoc', 'annotate');
