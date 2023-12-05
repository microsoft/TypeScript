/// <reference path='fourslash.ts' />

////class C {
////    [|const/**/ructor|]();
////    [|constructor|](x: number);
////    [|constructor|](y: string, x: number);
////    [|constructor|](a?: any, ...r: any[]) {
////        if (a === undefined && r.length === 0) {
////            return;
////        }
////
////        return;
////    }
////}
////
////class D {
////    constructor(public x: number, public y: number) {
////    }
////}

verify.baselineDocumentHighlights();
