/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////[|[|{| "contextRangeIndex": 0 |}module|].exports = [|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}C|] {}|];|]
////[|module.exports.[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}D|] = [|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}D|] {}|];|]

// @Filename: /b.js
/////** [|@type {import("[|{| "contextRangeIndex": 8 |}./a|]")}|] */
////const x = 0;
/////** [|@type {import("[|{| "contextRangeIndex": 10 |}./a|]").[|D|]}|] */
////const y = 0;

verify.noErrors();

// TODO: GH#24025

const [rModuleDef, rModule, r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3, r4Def, r4, r5] = test.ranges();
verify.referenceGroups([r3, r4], [
    { definition: 'module "/a"', ranges: [r4, rModule] },
    { definition: "(local class) C", ranges: [r0] },
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
verify.referenceGroups(rModule, [{ definition: 'module "/a"', ranges: [r3, r4, rModule] }]);
verify.referenceGroups(r0, [
    { definition: "(local class) C", ranges: [r0] },
    // TODO: This definition is really ugly
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
verify.referenceGroups([r1, r5], [
    { definition: "(alias) (local class) D\nimport D", ranges: [r1, r5] },
]);
verify.referenceGroups(r2, [
    { definition: "(local class) D", ranges: [r2] },
    { definition: "(alias) (local class) D\nimport D", ranges: [r5] },
]);
verify.referenceGroups([r3, r4], [
    { definition: 'module "/a"', ranges: [r4, rModule] },
    //{ definition: "(local class) C", ranges: [r0] },
    //{ definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
