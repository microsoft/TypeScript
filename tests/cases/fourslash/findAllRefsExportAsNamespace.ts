/// <reference path='fourslash.ts' />

// `export as namespace` results in global search.

// @Filename: /node_modules/a/index.d.ts
////[|export function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|](): void;|]
////export as namespace A;

// @Filename: /b.ts
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}f|] } from "a";|]

// @Filename: /c.ts
////A.[|f|]();

verify.noErrors();

const [r0Def, r0, r1Def, r1, r2] = test.ranges();

const globals = { definition: "function f(): void", ranges: [r0, r2] };
const imports = { definition: "(alias) function f(): void\nimport f", ranges: [r1] };

verify.referenceGroups([r0, r2], [globals, imports]);
verify.referenceGroups(r1, [imports, globals]);
