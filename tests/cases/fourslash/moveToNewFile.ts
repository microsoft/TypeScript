/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const y: Date = p + b;|]
////a; y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { y } from './y';

import './foo';
import { a, alreadyUnused } from './other';
export const p = 0;
a; y;`,

        "/y.ts":
`import { b } from './other';
import { p } from './a';
export const y: Date = p + b;`,
    },

    preferences: {
        quotePreference: "single",
    }
});
