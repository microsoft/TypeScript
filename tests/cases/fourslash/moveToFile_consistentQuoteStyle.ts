
/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
////export const tt = 2;

// @Filename: /a.ts
////import { b } from './other';
////const a = 1;
////[|const c = a + b;|]

// @Filename: /other.ts
////export const b = 2;


verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export const a = 1;
`,

        "/bar.ts":
`import { a } from './a';
import { b } from './other';

export const tt = 2;
const c = a + b;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" },

    preferences: {
        quotePreference: "single",
    }
});
