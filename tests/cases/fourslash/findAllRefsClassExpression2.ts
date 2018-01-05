/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.[|{| "isWriteAccess": true, "isDefinition": true |}A|] = class {};

// @Filename: /b.js
////import { [|{| "isWriteAccess": true, "isDefinition": true |}A|] } from "./a";
////[|A|];

const [r0, r1, r2] = test.ranges();
const defs = { definition: "(property) A: typeof (Anonymous class)", ranges: [r0] };
const imports = { definition: "import A", ranges: [r1, r2] };
verify.referenceGroups([r0], [defs, imports]);
verify.referenceGroups([r1, r2], [imports, defs]);
