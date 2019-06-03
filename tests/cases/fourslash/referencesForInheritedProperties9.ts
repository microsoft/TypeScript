/// <reference path='fourslash.ts'/>

//// class D extends C {
////     [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}prop1|]: string;|]
//// }
////
//// class C extends D {
////     [|[|{| "isDefinition": true, "declarationRangeIndex": 2 |}prop1|]: string;|]
//// }
////
//// var c: C;
//// c.[|prop1|];

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.singleReferenceGroup("(property) D.prop1: string", [r0]);
verify.singleReferenceGroup("(property) C.prop1: string", [r1, r2]);
