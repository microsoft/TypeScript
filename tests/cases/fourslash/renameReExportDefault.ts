/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export { default } from "./b";
////export { default as [|b|] } from "./b";
////export { default as bee } from "./b";
////import { default as [|b|] } from "./b";
////import { default as bee } from "./b";
////import [|b|] from "./b";

// @Filename: /b.ts
////const [|b|] = 0;
////export default [|b|];

const [r0, r1, r2, r3, r4] = test.ranges();
verify.renameLocations(r0, [r0]);
verify.renameLocations(r1, [r1]);
verify.renameLocations(r2, [r2]);
verify.renameLocations([r3, r4], [r0, r1, r2, r3, r4]);
