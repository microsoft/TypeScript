/// <reference path='fourslash.ts' />
////class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}
////let c = new [|C|]();

verify.singleReferenceGroup("class C");
