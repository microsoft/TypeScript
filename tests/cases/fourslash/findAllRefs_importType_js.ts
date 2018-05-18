/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////module.exports = class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {};
////module.exports.[|{| "isWriteAccess": true, "isDefinition": true |}D|] = class [|{| "isWriteAccess": true, "isDefinition": true |}D|] {};

// @Filename: /b.js
/////** @type {import("[|./a|]")} */
////const x = 0;
/////** @type {import("[|./a|]").[|D|]} */
////const y = 0;

verify.noErrors();

// TODO: GH#24025

const [r0, r1, r2, r3, r4, r5] = test.ranges();
verify.referenceGroups(r0, [
    { definition: "(local class) C", ranges: [r0] },
    // TODO: This definition is really ugly
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
verify.referenceGroups([r1, r5], [
    { definition: "class D\n(property) D: typeof D", ranges: [r1, r5, r5] }, // TODO: should only reference r5 once
]);
verify.referenceGroups(r2, [
    { definition: "(local class) D", ranges: [r2] },
    { definition: "class D\n(property) D: typeof D", ranges: [r5] },
]);
verify.referenceGroups([r3, r4], [
    { definition: 'module "/a"', ranges: [r4] },
    { definition: "(local class) C", ranges: [r0] },
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
