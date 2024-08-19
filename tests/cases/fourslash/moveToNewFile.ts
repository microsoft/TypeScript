/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////// header comment
////
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const y: Date = p + b;|]
////a; y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`// header comment

import './foo';
import { a, alreadyUnused } from './other';
import { y } from './y';
export const p = 0;
a; y;`,

        "/y.ts":
`import { p } from './a';
import { b } from './other';

export const y: Date = p + b;
`,
    },

    preferences: {
        quotePreference: "single",
    }
});
