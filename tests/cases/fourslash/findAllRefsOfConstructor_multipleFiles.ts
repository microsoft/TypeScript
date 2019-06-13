/// <reference path="fourslash.ts" />

// @Filename: f.ts

////class A {
////    [|[|{| "contextRangeIndex": 0 |}constructor|](s: string) {}|]
////}
////class B extends A { }
////[|export { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}A|], [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}B|] };|]

// @Filename: a.ts

////[|import { [|{| "contextRangeIndex": 5 |}A|] as A1 } from "./f";|]
////const a1 = new [|A1|]("a1");
////export default class extends A1 { }
////[|export { [|{| "contextRangeIndex": 8 |}B|] as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}B1|] } from "./f";|]

// @Filename: b.ts

////[|import [|{| "contextRangeIndex": 11 |}B|], { B1 } from "./a";|]
////const d = new [|B|]("b");
////const d1 = new [|B1|]("b1");

verify.noErrors();
const [aCtrDef, aCtr, exportDef, aExport, bExport, aImportDef, aImport, a1New, reExportDef, bReExport, b1Export, bDefaultDef, bDefault, bNew, b1New ] = test.ranges();
verify.referenceGroups(aCtr, [
    { definition: "class A", ranges: [aCtr, aExport] },
    { definition: "class B", ranges: [bExport]},
    { definition: "(alias) class B\nexport B", ranges: [bReExport]},
    { definition: "(alias) class B1\nexport B1", ranges: [b1Export]},
    { definition: "(alias) class B1\nimport B1", ranges: [b1New]},
    { definition: "(alias) class A\nexport A", ranges: [aImport]},
    { definition: "(alias) class A1\nimport A1", ranges: [a1New]},
    { definition: "class default", ranges: []},
    { definition: { text: "import B", range: bDefault }, ranges: [bNew]}]);
