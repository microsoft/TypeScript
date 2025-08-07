/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const x = y;
////[|const y = x;|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { y } from "./y";

export const x = y;
`,

        "/y.ts":
`import { x } from "./a";

export const y = x;
`,
    },
});
