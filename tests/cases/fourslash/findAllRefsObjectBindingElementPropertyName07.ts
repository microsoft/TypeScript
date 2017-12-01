/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [{ [|{| "isWriteAccess": true, "isDefinition": true |}a|]: p, b }] = [{ [|{| "isWriteAccess": true, "isDefinition": true |}a|]: 10, b: true }];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) a: any", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(property) a: any", ranges: [r0] },
    { definition: "(property) a: number", ranges: [r1] }
]);
