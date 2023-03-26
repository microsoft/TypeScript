
/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
//// import type {} from './a';
////
////const q = 0;

// @Filename: /a.ts
////// header comment
////
////export const p = 0;
////export const b = 1;
////[|const y = p + b;|]



verify.moveToAnotherFile({
    newFileContents: {
        "/a.ts":
`// header comment

export const p = 0;
export const b = 1;
`,

        "/bar.ts":
` import { b, p } from './a';

const q = 0;
const y = p + b;
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
