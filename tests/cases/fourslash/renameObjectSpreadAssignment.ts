/// <reference path='fourslash.ts'/>

////interface A1 { a: number };
////interface A2 { a?: number };
////[|let [|{| "declarationRangeIndex": 0 |}a1|]: A1;|]
////[|let [|{| "declarationRangeIndex": 2 |}a2|]: A2;|]
////let a12 = { ...[|a1|], ...[|a2|] };

const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();
verify.rangesAreRenameLocations([r0, r2]);
verify.rangesAreRenameLocations([r1, r3]);
