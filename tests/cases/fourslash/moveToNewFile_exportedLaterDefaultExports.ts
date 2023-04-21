/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|const x = 0;|]
////export default x;
// @Filename: /b.ts
////import x from "./a"
////
////x;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { x } from "./x";

export default x;`,

        "/x.ts":
`export const x = 0;
`
    },
});
