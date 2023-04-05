/// <reference path='fourslash.ts' />

//@moduleResolution: bundler
//@module: esnext

//@Filename: /src/dir2/bar.ts
////import './blah';
////import './blah2';
////const a = 2;
////a;

// @Filename: /src/dir1/a.ts
////// header comment
////
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const y: Date = p + b;|]
////a; y;

// @Filename: /src/dir1/other.ts
////export const b = 1;
////export const a = 2;
////export const alreadyUnused = "unused";

verify.moveToFile({
    newFileContents: {
        "/src/dir1/a.ts":
`// header comment

import { y } from '../dir2/bar';
import './foo';
import { a, alreadyUnused } from './other';
export const p = 0;
a; y;`,

        "/src/dir2/bar.ts":
`import { p } from '../dir1/a';
import { b } from '../dir1/other';
import './blah';
import './blah2';
const a = 2;
a;
export const y: Date = p + b;
`,
    },
    newFile: "/src/dir2/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
