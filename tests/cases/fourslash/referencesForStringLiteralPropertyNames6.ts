/// <reference path='fourslash.ts'/>

////const x = function () { return 111111; }
////x.[|{| "isWriteAccess": true, "isDefinition": true |}someProperty|] = 5;
////x["[|someProperty|]"] = 3;

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) x.someProperty: number', ranges }]);
verify.referenceGroups([r1], [
    { definition: '(property) x.someProperty: number', ranges: [r0, r1] },
]);
