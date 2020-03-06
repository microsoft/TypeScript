/// <reference path='fourslash.ts'/>

////[|export default function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}DefaultExportedFunction|]() {
////    return [|DefaultExportedFunction|];
////}|]
////
////var x: typeof [|DefaultExportedFunction|];
////
////var y = [|DefaultExportedFunction|]();
////
////[|namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}DefaultExportedFunction|] {
////}|]


const [r0Def, r0, r1, r2, r3, r4Def, r4] = test.ranges();
const fnRanges = [r0, r1, r2, r3];
verify.singleReferenceGroup("function DefaultExportedFunction(): () => typeof DefaultExportedFunction", fnRanges);

// The namespace and function do not merge,
// so the namespace should be all alone.
verify.singleReferenceGroup(`namespace DefaultExportedFunction`, [r4]);
