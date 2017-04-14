/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|{| "isWriteAccess": true, "isDefinition": true |}next|]?: Recursive;
////    value: any;
////}
////
////function f ({ [|next|]: { [|next|]: x} }: Recursive) {
////}

verify.singleReferenceGroup("(property) Recursive.next: Recursive");
