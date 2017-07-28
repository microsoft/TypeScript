/// <reference path="fourslash.ts" />

////class Test {
////    get [|{| "isDefinition": true, "isWriteAccess": true |}x|]() { return 0; }
////}
////const { [|{| "isDefinition": true, "isWriteAccess": true |}x|] } = new Test();
////[|x|];

const [r0, r1, r2] = test.ranges();
verify.referenceGroups(r0, [{ definition: "(property) Test.x: number", ranges: [r0, r1, r2] }]);
verify.referenceGroups([r1, r2], [
    { definition: "(property) Test.x: number", ranges: [r0] },
    { definition: "const x: number", ranges: [r1, r2] }
]);
