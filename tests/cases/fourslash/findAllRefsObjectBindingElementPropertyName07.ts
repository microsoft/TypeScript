/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [{ [|{| "isWriteAccess": true, "isDefinition": true |}a|]: p, b }] = [{ [|{| "isWriteAccess": true, "isDefinition": true |}a|]: 10, b: true }];

const ranges = test.ranges();
verify.referenceGroups(ranges, [
    { definition: "(property) a: number", ranges: ranges }
]);
