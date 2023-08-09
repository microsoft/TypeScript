
/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
////import { d } from './other2';

// @Filename: /a.ts
////import { b } from './other';
////
////const a = 1;
////[|const c = a + b + 6;|]

// @Filename: /other.ts
////export const b = 1;

// @Filename: /other2.ts
////export const d = 1;


verify.moveToFile({
    newFileContents: {
        "/a.ts":
`
export const a = 1;
`,

        "/bar.ts":
`import { a } from './a';
import { b } from './other';
import { d } from './other2';
const c = a + b + 6;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" },
});
