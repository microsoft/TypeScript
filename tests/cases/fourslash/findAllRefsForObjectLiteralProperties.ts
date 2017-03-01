/// <reference path='fourslash.ts'/>

////var x = {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property|]: {}
////};
////
////x.[|property|];
////
////let {[|property|]: pVar} = x;

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) property: {}", ranges }]);
verify.referenceGroups([r1, r2], [
    { definition: "(property) property: {}", ranges: [r0] },
    { definition: "(property) property: {}", ranges: [r1, r2] }
]);
