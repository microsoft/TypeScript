/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { b } from './other';
////const t = b;

// @Filename: /a.ts
////[|const a = 1;
//// |]const b = 2;

// @Filename: /other.ts
////export const b = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
` const b = 2;`,

        "/bar.ts":
`import { b } from './other';
const t = b;
const a = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});