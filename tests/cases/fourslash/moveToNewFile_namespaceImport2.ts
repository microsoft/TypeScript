/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// import * as A from "./a";
////
//// [|async function pointToFrameExecutionPoint(point: A.ExecutionPoint) {}|]
////

verify.moveToNewFile({
    newFileContents: {
        "/b.ts": `
`,
        "/pointToFrameExecutionPoint.ts":
`import * as A from "./a";


async function pointToFrameExecutionPoint(point: A.ExecutionPoint) { }
`,
    },
});
