/// <reference path='fourslash.ts' />
////class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    n: number;
////    constructor() {
////        this.n = 12;
////    }
////}
////let c = new [|C|]();

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "class C", ranges }]);
verify.referenceGroups(r1, [{ definition: "constructor C(): C", ranges }]);
