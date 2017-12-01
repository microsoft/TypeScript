/// <reference path='fourslash.ts' />

// `export as namespace` results in global search.

// @Filename: /node_modules/a/index.d.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}f|](): void;
////export as namespace A;

// @Filename: /b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}f|] } from "a";

// @Filename: /c.ts
////A.[|f|]();

verify.noErrors();

const ranges = test.ranges();
const [r0, r1, r2] = ranges;

const globals = { definition: "function f(): void", ranges: [r0, r2] };
const imports = { definition: "import f", ranges: [r1] };

verify.referenceGroups([r0, r2], [globals, imports]);
verify.referenceGroups(r1, [imports, globals]);
