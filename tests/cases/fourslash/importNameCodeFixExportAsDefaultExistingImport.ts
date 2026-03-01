/// <reference path="fourslash.ts" />

//// import [|{ v1, v2, v3 }|] from "./module";
//// v4/*0*/();

// @Filename: module.ts
//// const v4 = 5;
//// export { v4 as default };
//// export const v1 = 5;
//// export const v2 = 5;
//// export const v3 = 5;

verify.importFixAtPosition([`v4, { v1, v2, v3 }`]);
