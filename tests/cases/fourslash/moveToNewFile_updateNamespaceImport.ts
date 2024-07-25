/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export const x = 0;|]

// @Filename: /x.ts
//// import * as a from "./a";
//// a.x;

// @Filename: /x.1.ts
////

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
``,

        "/x.ts":
`import * as a from "./a";
import * as x2 from "./x.2";
x2.x;`,

        "/x.2.ts":
`export const x = 0;
`,
    },
});