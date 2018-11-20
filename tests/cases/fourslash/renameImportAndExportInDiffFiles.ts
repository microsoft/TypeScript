/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export var [|{| "isDefinition": true |}a|];

// @Filename: b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}a|] } from './a';
////export { [|{| "isWriteAccess": true, "isDefinition": true |}a|] };

const [r0, r1, r2] = test.ranges();
const vars = { definition: "var a: any", ranges: [r0] };
const imports = { definition: "(alias) var a: any\nimport a", ranges: [r1, r2] };
verify.referenceGroups(r0, [vars, imports]);
verify.referenceGroups(r1, [imports, vars]);
verify.referenceGroups(r2, [imports, vars]);

verify.renameLocations(r0, [r0, r1, { range: r2, suffixText: " as a" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "a as " }, { range: r2, suffixText: " as a" }]);
verify.renameLocations(r2, [{ range: r2, prefixText: "a as " }]);
