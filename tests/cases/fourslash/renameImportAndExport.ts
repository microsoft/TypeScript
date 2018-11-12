/// <reference path='fourslash.ts' />

////import [|a|] from "module";
////export { [|a|] };

const [r0, r1] = test.ranges();
verify.renameLocations(r0, [r0, { range: r1, suffixText: " as a" }]);
verify.renameLocations(r1, [{ range: r1, prefixText: "a as " }]);
