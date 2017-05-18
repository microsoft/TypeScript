/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////module.exports = class [|{| "isWriteAccess": true, "isDefinition": true |}A|] {}

// @Filename: b.js
////const [|{| "isWriteAccess": true, "isDefinition": true |}A|] = require("./a");

const [r0, r1] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(local class) A", ranges: [r0] },
    { definition: "const A: {\n    new (): {};\n    prototype: {};\n}", ranges: [r1] }
]);

verify.singleReferenceGroup("const A: {\n    new (): {};\n    prototype: {};\n}", [r1]);
