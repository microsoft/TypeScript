/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
//// import type {} from './a';
////

// @Filename: /a.ts
////export const p = 0;
////export const b = 1;
////[|const y = p + b;|]



verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export const p = 0;
export const b = 1;
`,

        "/bar.ts":
`import { b, p } from './a';
const y = p + b;
`,
    },
    newFile: "/bar.ts",
});
