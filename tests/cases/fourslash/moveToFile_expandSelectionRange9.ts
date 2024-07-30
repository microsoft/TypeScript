/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { b } from './other';
////const t = b;

// @Filename: /a.ts
////const a = 1;[|
////const c = 2;|]

// @Filename: /other.ts
////export const b = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`const a = 1;
`,

        "/bar.ts":
`import { b } from './other';
const t = b;
const c = 2;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});