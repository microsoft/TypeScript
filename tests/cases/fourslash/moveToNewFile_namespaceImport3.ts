/// <reference path='fourslash.ts' />

// @Filename: /a.ts
//// export type ExecutionPoint = string;
////
// @Filename: /b.ts
//// import * as A from "./a";
////
//// [|async function fn(a: typeof A) {}|]
////

verify.moveToNewFile({
    newFileContents: {
        "/b.ts":
`
`,
        "/fn.ts":
`import * as A from "./a";


async function fn(a: typeof A) { }
`,
    },
});
