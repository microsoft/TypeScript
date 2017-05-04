/// <reference path='fourslash.ts' />
// @noLib: true

////declare module "a" {
////    export class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {}
////}
////declare module "b" {
////    export { [|{| "isWriteAccess": true, "isDefinition": true |}C|] } from "a";
////}
////declare module "c" {
////    import { [|{| "isWriteAccess": true, "isDefinition": true |}C|] } from "b";
////    export function f(c: [|C|]): void;
////}

verify.noErrors();

verify.rangesAreRenameLocations();

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
const importRanges = [r2, r3];
const classes = { definition: "class C", ranges: [r0] };
const bs = { definition: "import C", ranges: [r1] };
const imports = { definition: "import C", ranges: importRanges };
verify.referenceGroups(r0, [classes, bs, imports]);
verify.referenceGroups(r1, [bs, imports, classes]);
verify.referenceGroups(importRanges, [imports, bs, classes]);
