/// <reference path='fourslash.ts'/>

//// interface C extends D {
////     propD: number;
//// }
//// interface D extends C {
////     [|[|{| "declarationRangeIndex": 0 |}propC|]: number;|]
//// }
//// var d: D;
//// d.[|propC|];

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
