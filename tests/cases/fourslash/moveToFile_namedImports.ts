
/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
////const q = 0;

// @Filename: /a.ts
////// header comment
////
////import { } from './other';
////import type { } from './other';
////
////export const p = 0;
////export const b = 1;
////[|const y = p + b;|]

// @Filename: /other.ts
////export const t = 2;


verify.moveToFile({
    newFileContents: {
        "/a.ts":
`// header comment

import { } from './other';
import type { } from './other';

export const p = 0;
export const b = 1;
`,

        "/bar.ts":
`import { p, b } from './a';

const q = 0;
const y = p + b;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" },

    preferences: {
        quotePreference: "single",
    }
});
