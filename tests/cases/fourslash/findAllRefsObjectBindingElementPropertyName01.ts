/// <reference path='fourslash.ts'/>

////interface I {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}property1|]: number;|]
////    property2: string;
////}
////
////var foo: I;
////[|var { [|{| "contextRangeIndex": 2 |}property1|]: prop1 } = foo;|]

verify.singleReferenceGroup("(property) I.property1: number", "property1");
