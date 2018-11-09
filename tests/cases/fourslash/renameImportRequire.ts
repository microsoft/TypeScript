/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import [|e|] = require("mod4");
////[|e|];
////a = { [|e|] };
////export { [|e|] };

// @Filename: /b.ts
////import { [|e|] } from "./a";
////export { [|e|] };

const [r0, r1, r2, r3, r4, r5] = test.ranges();
verify.renameLocations([r0, r1, r2], [r0, r1, { range: r2, prefixText: "e: " }, { range: r3, suffixText: " as e" }]);
verify.renameLocations(r3, [{ range: r3, prefixText: "e as " }, r4, { range: r5, suffixText: " as e" }]);
verify.renameLocations(r4, [{ range: r4, prefixText: "e as " }, { range: r5, suffixText: " as e" }]);
verify.renameLocations(r5, [{ range: r5, prefixText: "e as " }]);
