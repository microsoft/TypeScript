/// <reference path='fourslash.ts' />
////let o = { [|{| "isWriteAccess": true, "isDefinition": true |}1|]: 12 };
////let y = o[[|1|]];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) 1: number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(property) 1: number", ranges: [r0] },
    { definition: "(property) 1: number", ranges: [r1] }
]);
