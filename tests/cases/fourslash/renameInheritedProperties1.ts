/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|[|{| "declarationRangeIndex": 0 |}propName|]: string;|]
//// }
////
//// var v: class1;
//// v.[|propName|];

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
