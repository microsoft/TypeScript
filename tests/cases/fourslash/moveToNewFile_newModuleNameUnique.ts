/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export const x = 0;|]

// @Filename: /x.ts
////

// @Filename: /x0.ts
////

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
``,

        "/x00.ts":
`export const x = 0;`,
    },
});
