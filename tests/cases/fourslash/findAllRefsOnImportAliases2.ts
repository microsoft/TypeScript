/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|{| "isWriteAccess": true, "isDefinition": true |}Class|] {
////}

//@Filename: b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] as [|{| "isWriteAccess": true, "isDefinition": true |}C2|] } from "./a";
////
////var c = new [|C2|]();

//@Filename: c.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}Class|] as [|{| "isWriteAccess": true, "isDefinition": true |}C3|] } from "./a";

const ranges = test.rangesByText();
verify.singleReferenceGroup("class Class", ranges.get("Class"));

const c2s = ranges.get("C2");
const [c2_0, c2_1] = c2s;
verify.referenceGroups(c2_0, [{ definition: "import C2", ranges: c2s }]);
verify.referenceGroups(c2_1, [{ definition: "(alias) new C2(): C2\nimport C2", ranges: c2s }]);

verify.singleReferenceGroup("import C3", ranges.get("C3"));
