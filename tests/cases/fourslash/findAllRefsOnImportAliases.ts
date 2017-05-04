/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|{| "isWriteAccess": true, "isDefinition": true |}Class|] {
////}

//@Filename: b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] } from "./a";
////
////var c = new [|Class|]();

//@Filename: c.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] } from "./a";

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
const classes = { definition: "class Class", ranges: [r0] };
const imports = { definition: "import Class", ranges: [r1, r2] };
const reExports = { definition: "import Class", ranges: [r3] };
verify.referenceGroups(r0, [classes, imports, reExports]);
verify.referenceGroups(r1, [imports, classes, reExports]);
verify.referenceGroups(r2, [
    { definition: "(alias) new Class(): Class\nimport Class", ranges: [r1, r2] },
    classes,
    reExports
]);
