/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|](): void {}|]

// @Filename: /b.ts
////export * from "./a";

// @Filename: /c.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}foo|] } from "./b";|]

verify.noErrors();
const ranges = test.ranges();
const [r0Def, r0, r1Def, r1] = ranges;
const a = { definition: "function foo(): void", ranges: [r0] };
const c = { definition: "(alias) function foo(): void\nimport foo", ranges: [r1] };
verify.referenceGroups(r0, [a, c]);
verify.referenceGroups(r1, [c, a]);
