/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export const x = 0;|]

// @Filename: /x.ts
////

// @Filename: /x.1.ts
////

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
``,

        "/x.2.ts":
`export const x = 0;`,
    },
});
