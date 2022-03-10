/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = 1;
////[|const b = a + 1;|]
////export { a };

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`const a = 1;
export { a };`,

        "/b.ts":
`import { a } from "./a";

const b = a + 1;
`,
    }
});
