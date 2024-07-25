/// <reference path='fourslash.ts' />

//@moduleResolution: bundler
//@module: esnext

// @Filename: /src/dir1/a.ts
////import { b } from './other';
////const a = 10;
////[|const y = b + a;|]
////y;

// @Filename: /src/dir1/other.ts
////export const b = 1;

//@Filename: /src/dir2/bar.ts
////

verify.moveToFile({
    newFileContents: {
        "/src/dir1/a.ts":
`import { y } from '../dir2/bar';
export const a = 10;
y;`,

        "/src/dir2/bar.ts":
`import { a } from '../dir1/a';
import { b } from '../dir1/other';


export const y = b + a;
`,
    },
    interactiveRefactorArguments: { targetFile: "/src/dir2/bar.ts" }
});
