/// <reference path='fourslash.ts'/>

////type T =
////    | { [|{| "isWriteAccess": true, "isDefinition": true |}type|]: "a" }
////    | { [|{| "isWriteAccess": true, "isDefinition": true |}type|]: "b" };
////declare const t: T;
////if (t.[|type|] === "a") {
////    t.[|type|];
////} else {
////    t.[|type|];
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.referenceGroups(ranges, [
    { definition: { text: '(property) type: "a"',  range: r0 }, ranges: [r0, r3] },
    { definition: { text: '(property) type: "b"', range: r1 }, ranges: [r1, r4] },
    { definition: { text: '(property) type: "a" | "b"', range: r0 }, ranges: [r2] },
]);
