/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////export function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {}

// @Filename: b.ts
////export { [|f|] as [|{| "isWriteAccess": true, "isDefinition": true |}g|] } from "./a";
////import { [|{| "isWriteAccess": true, "isDefinition": true |}f|] } from "./a";
////import { [|{| "isWriteAccess": true, "isDefinition": true |}g|] } from "./b";

verify.noErrors();

const [f0, f1, g0, f2, g1] = test.ranges();

const af = { definition: "function f(): void", ranges: [f0, f1] };
const g0Group = { definition: "import g", ranges: [g0] };
const g1Group = { definition: "import g", ranges: [g1] };
const bf = { definition: "import f", ranges: [f2] };

verify.referenceGroups([f0, f1], [af, g0Group, g1Group, bf]);
verify.referenceGroups(g0, [g0Group, g1Group]);
verify.referenceGroups(g1, [g1Group, g0Group]);
verify.referenceGroups(f2, [bf, af, g0Group, g1Group]);

verify.rangesWithSameTextAreRenameLocations();
