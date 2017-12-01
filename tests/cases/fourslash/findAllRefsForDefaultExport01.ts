/// <reference path='fourslash.ts'/>

////export default class [|{| "isWriteAccess": true, "isDefinition": true |}DefaultExportedClass|] {
////}
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "class DefaultExportedClass", ranges }]);
verify.referenceGroups(r2, [{ definition: "constructor DefaultExportedClass(): DefaultExportedClass", ranges }]);
