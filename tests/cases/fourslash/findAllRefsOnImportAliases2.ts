/// <reference path="fourslash.ts" />

//@Filename: a.ts
////export class [|{| "isWriteAccess": true, "isDefinition": true |}Class|] {}

//@Filename: b.ts
////import { [|Class|] as [|{| "isWriteAccess": true, "isDefinition": true |}C2|] } from "./a";
////var c = new [|C2|]();

//@Filename: c.ts
////export { [|Class|] as [|{| "isWriteAccess": true, "isDefinition": true |}C3|] } from "./a";

const ranges = test.rangesByText();
const classRanges = ranges.get("Class");
const [class0, class1, class2] = classRanges;
const c2Ranges = ranges.get("C2");
const [c2_0, c2_1] = c2Ranges;
const c3Ranges = ranges.get("C3");
const classes = { definition: "class Class", ranges: classRanges };
const c2s =  { definition: "(alias) class C2\nimport C2", ranges: c2Ranges };
const c3s = { definition: "(alias) class C3\nimport C3", ranges: c3Ranges };

verify.referenceGroups(classRanges, [classes, c2s, c3s]);

verify.referenceGroups(c2Ranges, [c2s])

verify.referenceGroups(c3Ranges, [c3s]);

verify.rangesWithSameTextAreRenameLocations();
