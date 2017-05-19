/// <reference path='fourslash.ts'/>

////function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {
////    return 100;
////}
////
////export default [|f|];
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////namespace [|{| "isWriteAccess": true, "isDefinition": true |}f|] {
////    var local = 100;
////}

const ranges = test.ranges();
const [r0, r1, r2, r3, r4] = ranges;
verify.referenceGroups([r0, r3], [{ definition: "function f(): number\nnamespace f", ranges }]);
verify.referenceGroups([r1, r2, r4], [{ definition: "namespace f\nfunction f(): number", ranges }]);
