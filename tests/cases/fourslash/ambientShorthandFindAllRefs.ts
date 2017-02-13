/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////import {[|{| "isWriteAccess": true, "isDefinition": true |}x|]} from "jquery";

// @Filename: user2.ts
////import {[|{| "isWriteAccess": true, "isDefinition": true |}x|]} from "jquery";

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [
    { definition: "import x", ranges: [r0] },
    { definition: 'module "jquery"', ranges: [r1] }
]);
verify.referenceGroups(r1, [
    { definition: 'module "jquery"', ranges: [r0] },
    { definition: "import x", ranges: [r1] }
]);
