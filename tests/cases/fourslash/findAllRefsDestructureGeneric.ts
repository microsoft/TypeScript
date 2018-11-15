/// <reference path='fourslash.ts' />

////interface I<T> {
////    [|{| "isDefinition": true |}x|]: boolean;
////}
////declare const i: I<number>;
////const { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } = i;

const [r0, r1] = test.ranges();

verify.referenceGroups(r0, [{ definition: "(property) I<T>.x: boolean", ranges: [r0, r1] }]);
verify.referenceGroups(r1, [
    { definition: "(property) I<T>.x: boolean", ranges: [r0] },
    { definition: "const x: boolean", ranges: [r1] }
]);
