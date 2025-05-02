/// <reference path='fourslash.ts' />

//@moduleResolution: bundler
//@module: esnext

// @Filename: /src/dir1/a.ts
////import { b } from './other';
////[|const y = b + 10;|]
////y;

// @Filename: /src/dir1/other.ts
////export const b = 1;

//@Filename: /src/dir2/bar.ts
////import './blah';
////const a = 2;

verify.moveToFile({
    newFileContents: {
        "/src/dir1/a.ts":
`import { y } from '../dir2/bar';
y;`,

        "/src/dir2/bar.ts":
`import { b } from '../dir1/other';
import './blah';
const a = 2;
export const y = b + 10;
`,
    },
    interactiveRefactorArguments: { targetFile: "/src/dir2/bar.ts" },
});
