/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////

// @Filename: /a.ts
////// header comment
////
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const y: Date = p + b;|]
////a; y;

verify.moveToAnotherFile({
    newFileContents: {
        "/a.ts":
`// header comment

import { y } from './bar';
import './foo';
import { a, alreadyUnused } from './other';
export const p = 0;
a; y;`,

        "/bar.ts":
`import { b } from './other';
import { p } from './a';

export const y: Date = p + b;
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
