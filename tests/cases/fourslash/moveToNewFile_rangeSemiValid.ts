/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|const x = 0;
////
/////** Comm|]ent */
////const y = 0;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`
/** Comment */
const y = 0;`,

        "/x.ts":
`const x = 0;`,
    },
});
