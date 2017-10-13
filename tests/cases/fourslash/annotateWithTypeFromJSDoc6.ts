/// <reference path='fourslash.ts' />

////declare class C {
////    /** @type {number | null} */
////    /*1*/p;
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`declare class C {
    /** @type {number | null} */
    p: number | null;
}`, 'Annotate with type from JSDoc', 'annotate');
