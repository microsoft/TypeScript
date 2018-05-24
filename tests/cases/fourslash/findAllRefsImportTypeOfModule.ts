/// <reference path='fourslash.ts' />

// @Filename: /b.ts
////type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;
////export = [|T|];

// @Filename: /a.ts
////const x: import("[|./b|]") = 0;

// TODO: GH#23879 Should be `verify.singleReferenceGroup("type T = number")
const [r0, r1, r2] = test.ranges();
verify.referenceGroups([r0, r1], [{ definition: "type T = number", ranges: [r0, r1] }]);
verify.referenceGroups(r2, [{ definition: 'module "/b"', ranges: [r2] }]);
