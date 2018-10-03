/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {}
////export const [|{| "isWriteAccess": true, "isDefinition": true |}D|] = [|C|];

// @Filename: /b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}D|] } from "./a";

const [C0, D0, C1, D1] = test.ranges();

verify.singleReferenceGroup("class C", [C0, C1]);

const d0Group = { definition: "const D: typeof C", ranges: [D0] };
const d1Group = { definition: "(alias) const D: typeof C\nimport D", ranges: [D1] };
verify.referenceGroups(D0, [d0Group, d1Group]);
verify.referenceGroups(D1, [d1Group, d0Group]);
