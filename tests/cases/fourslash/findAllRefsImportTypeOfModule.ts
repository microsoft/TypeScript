/// <reference path='fourslash.ts' />

////type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;
////export = [|T|];

////const x: [|import("./b")|] = 0;

// TODO: GH#23879 should just verify.rangesReferenceEachOther();
const [r0, r1, r2] = test.ranges();
verify.referenceGroups([r0, r1], [{ definition: "type T = number", ranges: [r0, r1] }]);
verify.referenceGroups(r2, undefined);
