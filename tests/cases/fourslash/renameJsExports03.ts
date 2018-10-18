/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class [|{| "isWriteAccess": true, "isDefinition": true |}A|] {
////    [|constructor|]() { }
////}
////module.exports = [|A|];

// @Filename: b.js
////const [|{| "isWriteAccess": true, "isDefinition": true |}A|] = require("./a");
////new [|A|];

const [r0, r1, r2, r3, r4] = test.ranges();
verify.referenceGroups([r0, r2], [
    { definition: "class A", ranges: [r0, r2] },
    { definition: "const A: typeof A", ranges: [r3, r4] }
]);

verify.referenceGroups(r1, [
    { definition: "class A", ranges: [r1] },
    { definition: "const A: typeof A", ranges: [r4] }
]);

verify.referenceGroups(r3, [
    { definition: "const A: typeof A", ranges: [r3, r4] }
]);
verify.referenceGroups(r4, [
    { definition: "const A: typeof A", ranges: [r3, r4] }
]);

