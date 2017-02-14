/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { [|{| "isWriteAccess": true, "isDefinition": true |}add|]: 0, b: "string" };
////x["[|add|]"];
////x.[|add|];
////var y = x;
////y.[|add|];

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) add: number", ranges }]);
verify.referenceGroups([r1, r2, r3], [
    { definition: "(property) add: number", ranges: [r0] },
    { definition: "(property) add: number", ranges: [r1, r2, r3] }
]);
