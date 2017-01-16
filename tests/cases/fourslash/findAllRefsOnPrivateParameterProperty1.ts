/// <reference path="fourslash.ts" />

////class ABCD {
////    constructor(private x: number, public y: number, private [|z|]: number) {
////    }
////
////    func() {
////        return this.[|z|];
////    }
////}

verify.rangesReferenceEachOther();
