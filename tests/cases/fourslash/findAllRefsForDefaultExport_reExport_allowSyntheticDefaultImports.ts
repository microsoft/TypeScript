/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /export.ts
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|] = 1;|]
////[|export = [|{| "contextRangeIndex": 2 |}foo|];|]

// @Filename: /re-export.ts
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}default|] } from "./export";|]

// @Filename: /re-export-dep.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}fooDefault|] from "./re-export";|]

verify.noErrors();

const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3] = test.ranges();
verify.referenceGroups([r0, r1], [
    { definition: "const foo: 1", ranges: [r0, r1] },
    { definition: "(alias) const foo: 1\nexport default", ranges: [r2], },
    { definition: "(alias) const fooDefault: 1\nimport fooDefault", ranges: [r3] },
]);
verify.referenceGroups(r2, [
    { definition: "(alias) const foo: 1\nexport default", ranges: [r2] },
    { definition: "(alias) const fooDefault: 1\nimport fooDefault", ranges: [r3] },
    { definition: "const foo: 1", ranges: [r0, r1] },
]);
verify.referenceGroups(r3, [
    { definition: "(alias) const fooDefault: 1\nimport fooDefault", ranges: [r3] },
    { definition: "(alias) const foo: 1\nexport default", ranges: [r2] },
    { definition: "const foo: 1", ranges: [r0, r1] },
]);
