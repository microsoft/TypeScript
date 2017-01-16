/// <reference path='fourslash.ts' />
////interface [|{| "isDefinition": true |}Numbers|] {
////    p: number;
////}
////interface [|{| "isDefinition": true |}Numbers|] {
////    m: number;
////}
////class [|{| "isDefinition": true |}Numbers|] {
////    f(n: number) {
////        return this.p + this.m + n;
////    }
////}
////let i: [|{| "isDefinition": false |}Numbers|] = new [|{| "isDefinition": false |}Numbers|]();
////let x = i.f(i.p + i.m);

verify.rangesReferenceEachOther();
