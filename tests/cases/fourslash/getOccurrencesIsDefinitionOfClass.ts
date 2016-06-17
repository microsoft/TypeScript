/// <reference path='fourslash.ts' />
////class [|{| "isDefinition": true |}C|] {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}
////let c = new [|{| "isDefinition": false |}C|]();

verify.rangesReferenceEachOther();
