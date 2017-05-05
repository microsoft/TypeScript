/// <reference path='fourslash.ts' />

////const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 1;
////const o = { [|{| "isWriteAccess": true, "isDefinition": true |}x|] };
////{
////    const { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } = o;
////    [|x|];
////}

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [
    { definition: 'const x: 1', ranges: [r0, r1] },
    { definition: '(property) x: 1', ranges: [r1, r2] },
    { definition: 'const x: number', ranges: [r2, r3] },
]);
verify.referenceGroups(r1, [
    { definition: 'const x: 1', ranges: [r0, r1] },
    { definition: '(property) x: 1', ranges: [r1, r2] },
    { definition: 'const x: number', ranges: [r2, r3] },
]);
verify.referenceGroups(r2, [
    { definition: '(property) x: 1', ranges: [r1, r2] },
    { definition: 'const x: number', ranges: [r2, r3] }
    //{ definition: 'const x: 1', ranges: [r0, r1] },
    //{ definition: '(property) x: 1', ranges: [r1, r2] }
]);
verify.referenceGroups(r3, [
    { definition: '(property) x: 1', ranges: [r1, r2] },
    { definition: 'const x: number', ranges: [r2, r3] }
    //{ definition: 'const x: 1', ranges: [r0, r1] },
    //{ definition: '(property) x: 1', ranges: [r1, r2] }
]);