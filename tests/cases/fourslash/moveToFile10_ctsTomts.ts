/// <reference path='fourslash.ts' />

// @module: nodenext
// @allowImportingTsExtensions: true
// @noEmit: true

//@Filename: /src/dir2/bar.mts
////import './blah.ts';
////import './blah2.ts';
////const a = 2;
////a;

// @Filename: /src/dir1/a.cts
////// header comment
////
////import { a, b, alreadyUnused } from './other.cts';
////const p = 0;
////[|const y = p + b;|]
////a; y;

// @Filename: /src/dir1/other.cts
////export const b = 1;
////export const a = 2;
////export const alreadyUnused = "unused";

verify.moveToFile({
    newFileContents: {
        "/src/dir1/a.cts":
`// header comment

import { y } from '../dir2/bar.mts';
import { a, alreadyUnused } from './other.cts';
export const p = 0;
a; y;`,

        "/src/dir2/bar.mts":
`import { p } from '../dir1/a.cts';
import { b } from '../dir1/other.cts';
import './blah.ts';
import './blah2.ts';
const a = 2;
a;
export const y = p + b;
`,
    },
    newFile: "/src/dir2/bar.mts",

    preferences: {
        quotePreference: "single",
    }
});
