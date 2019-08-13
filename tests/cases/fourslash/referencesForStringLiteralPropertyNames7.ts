/// <reference path='fourslash.ts'/>
// @Filename: foo.js
// @noEmit: true
// @allowJs: true
// @checkJs: true

////var x = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}someProperty|]": 0|] }
////x["[|someProperty|]"] = 3;
////[|x.[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}someProperty|] = 5;|]

const [r0Def, r0, r1, r2Def, r2] = test.ranges();
const ranges = [r0, r1, r2];
verify.referenceGroups(r0, [{ definition: '(property) "someProperty": number', ranges }]);
verify.referenceGroups([r1, r2], [
    { definition: '(property) "someProperty": number', ranges },
]);
