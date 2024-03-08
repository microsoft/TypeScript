/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export { default } from "./b";
////[|export { default as [|{| "contextRangeIndex": 0 |}b|] } from "./b";|]
////export { default as bee } from "./b";
////[|import { default as [|{| "contextRangeIndex": 2 |}b|] } from "./b";|]
////import { default as bee } from "./b";
////[|import [|{| "contextRangeIndex": 4 |}b|] from "./b";|]

// @Filename: /b.ts
////[|const [|{| "contextRangeIndex": 6 |}b|] = 0;|]
////[|export default [|{| "contextRangeIndex": 8 |}b|];|]

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4Def, r4] = test.ranges();
verify.baselineRename([r0, r1, r2, r3, r4]);