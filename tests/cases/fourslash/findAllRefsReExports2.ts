/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|](): void {}|]

// @Filename: /b.ts
////[|import { [|{| "contextRangeIndex": 2 |}foo|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}oof|] } from "./a";|]

verify.noErrors();
const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "function foo(): void", ranges: [r0, r1] },
    { definition: "(alias) function oof(): void\nimport oof", ranges: [r2] }
]);
