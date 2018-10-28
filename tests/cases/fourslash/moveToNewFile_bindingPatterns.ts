/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export const [x, { p: y }] = [0, { p: 1 }];|]

// @Filename: /b.ts
////import { x, y } from "./a";

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts": "",

        "/x.ts":
`export const [x, { p: y }] = [0, { p: 1 }];
`,

        "/b.ts":
`
import { x, y } from "./x";
`,
    },
});
