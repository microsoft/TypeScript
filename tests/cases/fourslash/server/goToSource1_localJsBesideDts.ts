/// <reference path="../fourslash.ts" />

// @Filename: /a.js
//// export const [|a|] = "a";

// @Filename: /a.d.ts
//// export declare const a: string;

// @Filename: /index.ts
//// import { a } from "./a";
//// a/*start*/

verify.allRangesAppearInImplementationList("start");
