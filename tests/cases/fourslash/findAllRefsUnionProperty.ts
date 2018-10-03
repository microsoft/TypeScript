/// <reference path='fourslash.ts'/>

////type T =
////    | { [|{| "isWriteAccess": true, "isDefinition": true |}type|]: "a" }
////    | { [|{| "isWriteAccess": true, "isDefinition": true |}type|]: "b" };
////declare const t: T;
////if (t.[|type|] !== "failure") {
////    t.[|type|];
////}

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(ranges, [
    { definition: '(property) type: "a"', ranges: [r0, r2, r3] }, // TODO: this have type `"a" | "b"`
    { definition: '(property) type: "b"', ranges: [r1] },
]);
