/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////class C {
////    [|get /*g0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}g|](): number { return 0; }|]
////
////    [|set /*s0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}s|](value: number) {}|]
////}
////[|const { /*g1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}g|], /*s1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}s|] } = new C();|]

const [g0Def, g0, s0Def, s0, gs1Def, g1, s1] = test.ranges();
verify.quickInfoAt(g0, "(property) C.g: number");
verify.quickInfoAt(s0, "(property) C.s: number");
verify.baselineFindAllReferences('g0', 'g1', 's0', 's1')
