/// <reference path='fourslash.ts' />

////class C {
////    constructor();
////    constructor(x: number);
////    constructor(y: string, x: number);
////    constructor(a?: any, ...r: any[]) {
////        if (a === undefined && r.length === 0) {
////            return;
////        }
////
////        return;
////    }
////}
////
////class D {
////    [|con/**/structor|](public x: number, public y: number) {
////    }
////}

verify.baselineDocumentHighlights();
