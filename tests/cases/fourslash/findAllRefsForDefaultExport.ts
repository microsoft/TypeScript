/// <reference path="fourslash.ts" />

// @Filename: a.ts
////export default function /*def*/[|{| "isWriteAccess": true, "isDefinition": true |}f|]() {}

// @Filename: b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}g|] from "./a";
/////*ref*/[|g|]();

// @Filename: c.ts
////import { f } from "./a";

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [
    { definition: "function f(): void", ranges: [r0] },
    { definition: "import g", ranges: [r1, r2] }
]);
verify.referenceGroups(r1, [{ definition: "import g", ranges: [r1, r2] }]);
verify.referenceGroups(r2, [{ definition: "(alias) g(): void\nimport g", ranges: [r1, r2] }]);

verify.goToDefinition("ref", "def");
