/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// import * as A from "./a";
////
//// [|async function pointToFrameExecutionPoint(point: A.ExecutionPoint) {}|]
////
// @Filename: /point.ts
////

verify.moveToFile({
    newFileContents: {
        "/b.ts": `
`,
        "/point.ts":
`import * as A from "./a";


async function pointToFrameExecutionPoint(point: A.ExecutionPoint) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/point.ts" },
});
