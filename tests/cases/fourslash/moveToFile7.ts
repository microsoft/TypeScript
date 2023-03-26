/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import './blah';
////import './blah2';
////const a = 2;
////a;

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
`import { p } from './a';
import './blah';
import './blah2';
import { b } from './other';
const a = 2;
a;
export const y: Date = p + b;
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
