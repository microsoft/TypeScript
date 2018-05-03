/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.[|{| "isWriteAccess": true, "isDefinition": true |}A|] = class {};

// @Filename: /b.js
////import { [|{| "isWriteAccess": true, "isDefinition": true |}A|] } from "./a";
////[|A|];

const [r0, r1, r2] = test.ranges();
const defs = { definition: "class A\n(property) A: typeof A", ranges: [r0] };
const imports = { definition: "(alias) class A\n(alias) (property) A: typeof A\nimport A", ranges: [r1, r2] };
verify.referenceGroups([r0], [defs, imports]);
verify.referenceGroups([r1, r2], [imports, defs]);
