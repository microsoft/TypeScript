/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// export type ExecutionPoint = { point: string };
////
// @Filename: /c.ts
//// import * as A from "./a";
////
//// [|async function fn1(point: A.ExecutionPoint) {}|]
////
// @Filename: /point.ts
//// import * as A from "./c";
////
//// async function fn2(point: A.ExecutionPoint) {}

verify.moveToFile({
    newFileContents: {
        "/c.ts": `
`,
        "/point.ts":
`import * as A from "./a";
import * as A from "./c";

async function fn2(point: A.ExecutionPoint) {}
async function fn1(point: A.ExecutionPoint) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/point.ts" },
});
