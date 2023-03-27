/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import './someFile';
////
////const q = 20;

// @Filename: /a.ts
////// header comment
////
////import './foo';
////import { a, b } from './other';
////const p = 0;
////[|const y: Date = p + b;|]

// @Filename: /other.ts
////export const b = 2;
////export const a = 1;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`// header comment

import './foo';
import { a } from './other';
export const p = 0;
`,

        "/bar.ts":
`import { p } from './a';
import { b } from './other';
import './someFile';

const q = 20;
const y: Date = p + b;
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
