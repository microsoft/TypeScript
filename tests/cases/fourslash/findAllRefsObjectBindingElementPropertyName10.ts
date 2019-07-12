/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}next|]?: Recursive;|]
////    value: any;
////}
////
////function f ([|{ [|{| "contextRangeIndex": 2 |}next|]: { [|{| "contextRangeIndex": 2 |}next|]: x} }: Recursive|]) {
////}

verify.singleReferenceGroup("(property) Recursive.next?: Recursive", "next");
