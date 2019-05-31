/// <reference path='fourslash.ts'/>

////interface I {
////    [|[|{| "declarationRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////
////var foo: I;
////[|var { [|{| "declarationRangeIndex": 2 |}property1|]: prop1 } = foo;|]


verify.rangesAreRenameLocations(test.rangesByText().get("property1"));
