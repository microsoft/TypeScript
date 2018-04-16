/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export { default } from "./b";
////export { default as b } from "./b";
////import { default as b } from "./b";
////import [|b|] from "./b";

// @Filename: /b.ts
////const [|b|] = 0;
////export default [|b|];

const [r0, r1, r2] = test.ranges();
verify.renameLocations(r0, [r0]);
verify.renameLocations([r1, r2], [r0, r1, r2]);
