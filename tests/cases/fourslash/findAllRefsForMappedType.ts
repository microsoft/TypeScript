/// <reference path='fourslash.ts'/>

////interface T { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: number };
////type U = { [K in keyof T]: string };
////type V = { [K in keyof U]: boolean };
////const u: U = { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: "" }
////const v: V = { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: true }

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) T.a: number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(property) T.a: number", ranges: [r0, r2] },
    { definition: "(property) a: string", ranges: [r1] }
]);
verify.referenceGroups(r2, [
    { definition: "(property) T.a: number", ranges: [r0, r1] },
    { definition: "(property) a: boolean", ranges: [r2] }
]);
