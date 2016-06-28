/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|next|]?: Recursive;
////    value: any;
////}
////
////function f ({ [|next|]: { [|next|]: x} }: Recursive) {
////}

verify.rangesReferenceEachOther();
