/// <reference path='fourslash.ts' />

////import [|a|] from "module";
////export { [|a|] };

const [r0, r1] = test.ranges();
verify.referencesOf(r1, [r0, r1]);
//verify.rangesAreRenameLocations();
