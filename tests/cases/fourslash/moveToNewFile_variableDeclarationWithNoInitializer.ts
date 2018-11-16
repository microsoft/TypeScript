/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////let x;
////[|const y = x;|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export {};
export let x;
`,

        "/y.ts":
`import { x } from "./a";
const y = x;
`,
    },
});
