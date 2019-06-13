/// <reference path="fourslash.ts" />

// @Filename: a.ts
////[|export default function /*def*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {}|]

// @Filename: b.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}g|] from "./a";|]
////[|/*ref*/g|]();

// @Filename: c.ts
////import { f } from "./a";

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "function f(): void", ranges: [r0] },
    { definition: "(alias) function g(): void\nimport g", ranges: [r1, r2] }
]);
verify.singleReferenceGroup("(alias) function g(): void\nimport g", [r1, r2]);

verify.goToDefinition("ref", "def");
