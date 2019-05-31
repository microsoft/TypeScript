/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|[|{| "declarationRangeIndex": 0 |}doStuff|](): string;|]
//// }
////
//// var v: interface1;
//// v.[|doStuff|]();

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
