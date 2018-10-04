/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {}

// @Filename: /b.ts
////export * from "./a";

// @Filename: /c.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}foo|] } from "./b";

verify.noErrors();
const ranges = test.ranges();
const [r0, r1] = ranges;
const a = { definition: "function foo(): void", ranges: [r0] };
const c = { definition: "(alias) function foo(): void\nimport foo", ranges: [r1] };
verify.referenceGroups(r0, [a, c]);
verify.referenceGroups(r1, [c, a]);
