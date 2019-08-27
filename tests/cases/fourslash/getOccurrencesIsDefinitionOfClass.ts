/// <reference path='fourslash.ts' />
////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}|]
////let c = new [|C|]();

verify.singleReferenceGroup("class C", "C");
