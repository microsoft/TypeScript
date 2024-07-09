/// <reference path='fourslash.ts' />

////let A = class Foo {
////    [|constructor|]();
////    [|constructor|](x: number);
////    [|constructor|](y: string);
////    [|constructor|](a?: any) {
////    }
////}
////
////let B = class D {
////    constructor(x: number) {
////    }
////}

verify.baselineDocumentHighlights();
