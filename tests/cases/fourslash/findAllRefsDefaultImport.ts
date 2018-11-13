/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function [|{| "isWriteAccess": true, "isDefinition": true |}a|]() {}

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}a|], * as ns from "./a";

const [r0, r1] = test.ranges();
const a: FourSlashInterface.ReferenceGroup = { definition: "function a(): void", ranges: [r0] };
const b: FourSlashInterface.ReferenceGroup = { definition: "(alias) function a(): void\nimport a", ranges: [r1] };
verify.referenceGroups(r0, [a, b]);
verify.referenceGroups(r1, [b, a]);
