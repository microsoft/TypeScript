/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////function f({ [|property1|]: p1 }: I,
////           { [|property1|] }: I,
////           { property1: p2 }) {
////
////    return [|property1|] + 1;
////}

verify.rangesReferenceEachOther();
