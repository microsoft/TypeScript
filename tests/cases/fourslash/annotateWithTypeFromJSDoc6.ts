/// <reference path='fourslash.ts' />

////declare class C {
////    /** @type {number | null} */
////    /*1*/p;
////}

// NOTE: The duplicated comment is unintentional but needs a serious fix in trivia handling
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`declare class C {
    /** @type {number | null} */
    /** @type {number | null} */
    p: number | null;
}`, 'Annotate with type from JSDoc', 'annotate');
