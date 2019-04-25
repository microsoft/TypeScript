/// <reference path="fourslash.ts" />

// @Filename: f.ts

////class A {
////    [|constructor|](s: string) {}
////}
////class B extends A { }
////export { [|{| "isWriteAccess": true, "isDefinition": true |}A|], [|{| "isWriteAccess": true, "isDefinition": true |}B|] };

// @Filename: a.ts

////import { [|A|] as A1 } from "./f";
////const a1 = new [|A1|]("a1");
////export default class extends A1 { }
////export { [|B|] as [|{| "isWriteAccess": true, "isDefinition": true |}B1|] } from "./f";

// @Filename: b.ts

////import [|B|], { B1 } from "./a";
////const d = new [|B|]("b");
////const d1 = new [|B1|]("b1");

verify.noErrors();
const [aCtr, aExport, bExport, aImport, a1New, bReExport, b1Export, bDefault, bNew, b1New ] = test.ranges();
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
