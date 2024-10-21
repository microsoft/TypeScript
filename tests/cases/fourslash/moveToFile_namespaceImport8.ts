/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// import * as A from "./a";
////
//// [|async function fn1(point: A.ExecutionPoint) {}|]
////
// @Filename: /point.ts
//// type A = {};
//// export {};

verify.moveToFile({
    newFileContents: {
        "/b.ts": `
`,
        "/point.ts":
`import * as A from "./a";

type A = {};
export {};
async function fn1(point: A.ExecutionPoint) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/point.ts" },
});
