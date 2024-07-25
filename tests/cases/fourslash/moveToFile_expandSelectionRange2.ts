/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { b } from './other';
////const t = b;

// @Filename: /a.ts
////co[|nst a = 1;
////cons|]t b = 1;
////function foo() { }

// @Filename: /other.ts
////export const b = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`function foo() { }`,

        "/bar.ts":
`import { b } from './other';
const t = b;
const a = 1;
const b = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});