/// <reference path='fourslash.ts'/>

//// class C extends D {
////     [|[|{| "declarationRangeIndex": 0 |}prop1|]: string;|]
//// }
////
//// class D extends C {
////     prop1: string;
//// }
////
//// var c: C;
//// c.[|prop1|];

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
