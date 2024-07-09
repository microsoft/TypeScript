/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = 1;
////[|const b = a + 1;|]
////export const c = a + b;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { b } from "./b";

export const a = 1;
export const c = a + b;`,

        "/b.ts":
`import { a } from "./a";

export const b = a + 1;
`,
    }
});

