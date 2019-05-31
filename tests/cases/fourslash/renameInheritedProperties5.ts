/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propC: number;
//// }
//// interface D extends C {
////     [|[|{| "declarationRangeIndex": 0 |}propD|]: string;|]
//// }
//// var d: D;
//// d.[|propD|];

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);

