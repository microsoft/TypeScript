/// <reference path='fourslash.ts' />
////const { [|{| "isWriteAccess": true, "isDefinition": true |}x|], y } = { [|{| "isWriteAccess": true, "isDefinition": true |}x|]: 1, y: 2 };
////const z = [|{| "isDefinition": false |}x|];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) x: number", ranges: [r0, r1] },
    { definition: "const x: number", ranges: [r0, r2] }
]);