/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|{| "isWriteAccess": true, "isDefinition": true |}Class|] {
////}

//@Filename: b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] } from "./a";
////
////var c = new [|Class|]();

//@Filename: c.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] } from "./a";

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups([r0, r1, r3], [{ definition: "class Class", ranges }]);
verify.referenceGroups(r2, [{ definition: "constructor Class(): Class", ranges }]);
