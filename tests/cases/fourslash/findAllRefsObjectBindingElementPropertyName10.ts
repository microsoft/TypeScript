/// <reference path='fourslash.ts'/>

////interface Recursive {
////    [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}next|]?: Recursive;|]
////    value: any;
////}
////
////function f ([|{ [|{| "declarationRangeIndex": 2 |}next|]: { [|{| "declarationRangeIndex": 2 |}next|]: x} }: Recursive|]) {
////}

verify.singleReferenceGroup("(property) Recursive.next?: Recursive", "next");
