/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// import * as P from "./a";
////
//// [|async function fn(point: typeof P) {}|]
////
// @Filename: /c.ts
////

verify.moveToFile({
    newFileContents: {
        "/b.ts": `
`,
        "/c.ts":
`import * as P from "./a";


async function fn(point: typeof P) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/c.ts" },
});
