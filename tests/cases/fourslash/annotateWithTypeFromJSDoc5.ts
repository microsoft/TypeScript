/// <reference path='fourslash.ts' />

////class C {
////    /** @type {number | null} */
////    /*1*/p = null
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /** @type {number | null} */
    p: number | null = null;
}`, 'Annotate with type from JSDoc', 'annotate');
