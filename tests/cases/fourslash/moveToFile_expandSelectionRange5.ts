/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { b } from './other';
////const t = b;

// @Filename: /a.ts
////fu[|nction f|]oo() { }

// @Filename: /other.ts
////export const b = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`import { b } from './other';
const t = b;
function foo() { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});