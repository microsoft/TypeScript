/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////

// @Filename: /b.ts
//// import * as A from "./a";
////
//// [|async function fn1(point: A.ExecutionPoint) {}|]
////
//// async function fn2(point: A.ExecutionPoint) {}
////

// @Filename: /point.ts
////

verify.moveToFile({
    newFileContents: {
        "/b.ts":
`import * as A from "./a";

async function fn2(point: A.ExecutionPoint) {}
`,
        "/point.ts":
`import * as A from "./a";


async function fn1(point: A.ExecutionPoint) { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/point.ts" },
});