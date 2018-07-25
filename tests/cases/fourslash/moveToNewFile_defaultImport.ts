/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export default function f() { }
////[|const x = f();|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export default function f() { }
`,

        "/x.ts":
`import f from "./a";
const x = f();`,
    },
});
