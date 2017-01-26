/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {};
////export { [|{| "isWriteAccess": true, "isDefinition": true |}f|] as [|{| "isWriteAccess": true, "isDefinition": true |}g|] };

// @Filename: /b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}g|] } from "./a";

verify.noErrors();
const [f0, f1, g0, g1] = test.ranges();

const fs = { definition: "function f(): void", ranges: [f0, f1] };
const gs0 = { definition: "import g", ranges: [g0] };
const gs1 = { definition: "import g", ranges: [g1] };
verify.referenceGroups(f0, [fs, gs0, gs1]);
