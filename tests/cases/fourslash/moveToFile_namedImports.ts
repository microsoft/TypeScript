
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
////[|export const y = p + b;
////export const z = 1;|]

// @Filename: /other.ts
////import { z, y } from './a';
////export const t = 2;
////const u = z + t + y;


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
export const y = p + b;
export const z = 1;
`,

"/other.ts":
`import { z, y } from './bar';
export const t = 2;
const u = z + t + y;`
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" },

    preferences: {
        quotePreference: "single",
    }
});
