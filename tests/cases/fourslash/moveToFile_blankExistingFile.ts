/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
//////

// @Filename: /a.ts
////import { b } from './other';
////const p = 0;
////[|const y: Date = p + b;|]

// @Filename: /other.ts
////export const b = 1;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export const p = 0;
`,

        "/bar.ts":
`//
import { p } from './a';
import { b } from './other';


const y: Date = p + b;
`,
    },
    interactiveRefactorArguments: {targetFile: "/bar.ts"},
});
