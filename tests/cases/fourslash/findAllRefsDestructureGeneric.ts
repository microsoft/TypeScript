/// <reference path='fourslash.ts' />

////interface I<T> {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}x|]: boolean;|]
////}
////declare const i: I<number>;
////[|const { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|] } = i;|]

const [r0Def, r0, r1Def, r1] = test.ranges();

verify.referenceGroups(r0, [{ definition: "(property) I<T>.x: boolean", ranges: [r0, r1] }]);
verify.referenceGroups(r1, [
    { definition: "(property) I<T>.x: boolean", ranges: [r0] },
    { definition: "const x: boolean", ranges: [r1] }
]);
