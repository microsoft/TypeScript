/// <reference path="fourslash.ts" />

//@Filename: a.ts
////[|export class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Class|] {}|]

//@Filename: b.ts
////[|import { [|{| "contextRangeIndex": 2 |}Class|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}C2|] } from "./a";|]
////var c = new [|C2|]();

//@Filename: c.ts
////[|export { [|{| "contextRangeIndex": 6 |}Class|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}C3|] } from "./a";|]

const ranges = test.rangesByText();
const classRanges = ranges.get("Class");
const [class0, class1, class2] = classRanges;
const c2Ranges = ranges.get("C2");
const [c2_0, c2_1] = c2Ranges;
const c3Ranges = ranges.get("C3");
const classes = { definition: "class Class", ranges: classRanges };
const c2s =  { definition: "(alias) class C2\nimport C2", ranges: c2Ranges };
const c3s = { definition: "(alias) class C3\nexport C3", ranges: c3Ranges };

verify.referenceGroups(classRanges, [classes, c2s, c3s]);

verify.referenceGroups(c2Ranges, [c2s])

verify.referenceGroups(c3Ranges, [c3s]);

verify.rangesWithSameTextAreRenameLocations("Class", "C2", "C3");
