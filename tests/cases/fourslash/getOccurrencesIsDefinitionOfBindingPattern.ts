/// <reference path='fourslash.ts' />
////const { [|{| "isWriteAccess": true, "isDefinition": true |}x|], y } = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 1, y: 2 };
////const z = [|x|];

const [r0, r1, r2] = test.ranges();
verify.referenceGroups([r0, r2], [
    { definition: "const x: number", ranges: [r0, r2] },
    { definition: "(property) x: number", ranges: [r1] },
]);
verify.referenceGroups(r1, [{ definition: "(property) x: number", ranges: [r0, r1, r2] }]);
