/// <reference path='fourslash.ts' />

////class C {
////    /** @type {number | null} */
////    /*1*/p = null
////}

// NOTE: The duplicated comment is unintentional but needs a serious fix in trivia handling
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /** @type {number | null} */
    /** @type {number | null} */
    p: number | null = null;
}`, 'Convert to Typescript type', 'convert');
