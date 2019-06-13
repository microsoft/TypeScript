/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////class C {
////    [|get [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}g|](): number { return 0; }|]
////
////    [|set [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}s|](value: number) {}|]
////}
////[|const { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}g|], [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}s|] } = new C();|]

const [g0Def, g0, s0Def, s0, gs1Def, g1, s1] = test.ranges();
verify.quickInfoAt(g0, "(property) C.g: number");
verify.referenceGroups(g0, [{ definition: "(property) C.g: number", ranges: [g0, g1] }]);
verify.referenceGroups(g1, [
    { definition: "(property) C.g: number", ranges: [g0] },
    { definition: "const g: number", ranges: [g1] },
]);

verify.quickInfoAt(s0, "(property) C.s: number");
verify.referenceGroups(s0, [{ definition: "(property) C.s: number", ranges: [s0, s1] }]);
verify.referenceGroups(s1, [
    { definition: "(property) C.s: number", ranges: [s0] },
    { definition: "const s: number", ranges: [s1] }
]);
