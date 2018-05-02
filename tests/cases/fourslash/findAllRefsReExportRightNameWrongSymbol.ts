/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;

// @Filename: /b.ts
////export const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;

//@Filename: /c.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./b";
////import { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./a";
////[|x|];

// @Filename: /d.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./c";

verify.noErrors();
const [a, b, cFromB, cFromA, cUse, d] = test.ranges();
const cFromARanges = [cFromA, cUse];

const aGroup = { definition: "const x: 0", ranges: [a] };
const cFromAGroup = { definition: "(alias) const x: 0\nimport x", ranges: cFromARanges };

verify.referenceGroups(a, [aGroup, cFromAGroup]);

const bGroup = { definition: "const x: 0", ranges: [b] };
const cFromBGroup = { definition: "(alias) const x: 0\nexport x", ranges: [cFromB] };
const dGroup = { definition: "(alias) const x: 0\nimport x", ranges: [d] };
verify.referenceGroups(b, [bGroup, cFromBGroup, dGroup]);

verify.referenceGroups(cFromB, [cFromBGroup, dGroup, bGroup]);
verify.referenceGroups(cFromARanges, [cFromAGroup, aGroup]);

verify.referenceGroups(d, [dGroup, cFromBGroup, bGroup]);

verify.rangesAreRenameLocations([a, cFromA, cUse]);
verify.rangesAreRenameLocations([b, cFromB, d]);
