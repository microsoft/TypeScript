/// <reference path="fourslash.ts" />

////class ABCD {
////    constructor(private x: number, public y: number, /*1*/private /*2*/z: number) {
////    }
////
////    func() {
////        return this./*3*/z;
////    }
////}

verify.baselineFindAllReferences('1', '2', '3');
