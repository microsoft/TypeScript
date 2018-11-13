/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {}

// @Filename: /b.ts
////import { [|foo|] as [|{| "isWriteAccess": true, "isDefinition": true |}oof|] } from "./a";

verify.noErrors();
const [r0, r1, r2] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "function foo(): void", ranges: [r0, r1] },
    { definition: "(alias) function oof(): void\nimport oof", ranges: [r2] }
]);
