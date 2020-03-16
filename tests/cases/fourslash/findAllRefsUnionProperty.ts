/// <reference path='fourslash.ts'/>

////type T =
////    | { [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}type|]: "a",|] [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}prop|]: number|] }
////    | { [|[|{| "isDefinition": true, "contextRangeIndex": 4 |}type|]: "b",|] [|[|{| "isDefinition": true, "contextRangeIndex": 6 |}prop|]: string|] };
////const tt: T = {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}type|]: "a"|],
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}prop|]: 0|],
////};
////declare const t: T;
////if (t.[|type|] === "a") {
////    t.[|type|];
////} else {
////    t.[|type|];
////}

const [t0Def, t0, p0Def, p0, t1Def, t1, p1Def, p1, t2Def, t2, p2Def, p2, t3, t4, t5] = test.ranges();

const a = { definition: { text: '(property) type: "a"',  range: t0 }, ranges: [t0, t2, t4] };
const b = { definition: { text: '(property) type: "b"', range: t1 }, ranges: [t1, t5] };
const ab = { definition: { text: '(property) type: "a" | "b"', range: t0 }, ranges: [t3] };
verify.referenceGroups([t0, t1, t3, t4, t5], [a, b, ab]);
verify.referenceGroups(t2, [a, ab]);

const p = { definition: "(property) prop: number", ranges: [p0, p2] };
verify.referenceGroups([p0, p1], [p, { definition: "(property) prop: string", ranges: [p1] }]);
verify.referenceGroups(p2, [p]);
