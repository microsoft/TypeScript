/// <reference path='fourslash.ts' />

// @module: node18
// @allowImportingTsExtensions: true
// @noEmit: true

//@Filename: /src/dir2/bar.mts
////import './blah.ts';
////const a = 2;

// @Filename: /src/dir1/a.cts
////import { b } from './other.cts';
////const p = 0;
////[|const y = p + b;|]
////y;

// @Filename: /src/dir1/other.cts
////export const b = 1;

verify.moveToFile({
    newFileContents: {
        "/src/dir1/a.cts":
`import { y } from '../dir2/bar.mts';
export const p = 0;
y;`,

        "/src/dir2/bar.mts":
`import { p } from '../dir1/a.cts';
import { b } from '../dir1/other.cts';
import './blah.ts';
const a = 2;
export const y = p + b;
`,
    },
    interactiveRefactorArguments: { targetFile: "/src/dir2/bar.mts" },
});
