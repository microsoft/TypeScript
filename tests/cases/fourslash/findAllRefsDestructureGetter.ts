/// <reference path="fourslash.ts" />

////class Test {
////    get [|{| "isDefinition": true, "isWriteAccess": true |}x|]() { return 0; }
////
////    set [|{| "isDefinition": true, "isWriteAccess": true |}y|](a: number) {}
////}
////const { [|{| "isDefinition": true, "isWriteAccess": true |}x|], [|{| "isDefinition": true, "isWriteAccess": true |}y|] } = new Test();
////[|x|]; [|y|];

const [x0, y0, x1, y1, x2, y2] = test.ranges();
verify.referenceGroups(x0, [{ definition: "(property) Test.x: number", ranges: [x0, x1, x2] }]);
verify.referenceGroups([x1, x2], [
    { definition: "(property) Test.x: number", ranges: [x0] },
    { definition: "const x: number", ranges: [x1, x2] },
]);

verify.referenceGroups(y0, [{ definition: "(property) Test.y: number", ranges: [y0, y1, y2] }]);
verify.referenceGroups([y1, y2], [
    { definition: "(property) Test.y: number", ranges: [y0] },
    { definition: "const y: number", ranges: [y1, y2] },
]);
