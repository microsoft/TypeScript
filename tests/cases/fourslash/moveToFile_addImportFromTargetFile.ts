/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import './blah';
////
////const a = 2;

// @Filename: /a.ts
////import { b } from './other';
////
////[|const y = b + 10;|]
////y;

// @Filename: /other.ts
////export const b = 1;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`import { y } from './bar';

y;`,

        "/bar.ts":
`import './blah';
import { b } from './other';

const a = 2;
export const y = b + 10;
`,
    },
    interactiveRefactorArguments: {targetFile: "/bar.ts"},
});
