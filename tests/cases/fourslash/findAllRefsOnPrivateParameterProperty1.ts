/// <reference path="fourslash.ts" />

////class ABCD {
////    constructor(private x: number, public y: number, [|private [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}z|]: number|]) {
////    }
////
////    func() {
////        return this.[|z|];
////    }
////}

verify.singleReferenceGroup("(property) ABCD.z: number", "z");
