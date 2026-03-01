/// <reference path='fourslash.ts'/>

//// [|interface [|{| "contextRangeIndex": 0 |}A|] {}|]
//// /**
////  * @see {[|A|]}
////  */
//// declare const a: [|A|]


const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges, { findInComments: true });

