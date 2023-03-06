/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = 1, b = 2;
////[|const c = b + 1;|]
////export { a, b };

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`const a = 1, b = 2;
export { a, b };`,

        "/c.ts":
`import { b } from "./a";

const c = b + 1;
`,
    }
});

