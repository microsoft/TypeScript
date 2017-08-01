/// <reference path='fourslash.ts'/>

////var x = { "[|{| "isWriteAccess": true, "isDefinition": true |}someProperty|]": 0 }
////x["[|someProperty|]"] = 3;
////x.[|someProperty|] = 5;

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: '(property) "someProperty": number', ranges }]);
verify.referenceGroups([r1, r2], [
    { definition: '(property) "someProperty": number', ranges: [r0] },
    { definition: '(property) "someProperty": number', ranges: [r1, r2] },
]);
