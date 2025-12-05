/// <reference path='fourslash.ts' />


// @filename: a.ts
//// const xx: string = "aa";
//// function ff(): void {}

//// export { /*1*/ };

// @filename: exports.ts
//// export const ff: string = "";
//// export const aa = () => {};

// @filename: imports.ts
//// import { /*2*/ } from "./exports";

verify.baselineCompletions();