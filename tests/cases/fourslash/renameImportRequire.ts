/// <reference path='fourslash.ts' />

////import [|e|] = require("mod4");
////[|e|];
////a = { [|e|] };
////export { [|e|] };

const [r0, r1, r2, r3] = test.ranges();
//TODO: export should have prefix/suffix too
verify.renameLocations([r0, r1, r2, r3], [r0, r1, { range: r2, prefixText: "e: " }, r3]);
