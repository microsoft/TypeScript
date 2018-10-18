/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|{| "isDefinition": true |}next|]?: Recursive;
////    value: any;
////}
////
////function f ({ [|next|]: { [|next|]: x} }: Recursive) {
////}

verify.singleReferenceGroup("(property) Recursive.next?: Recursive");
