/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const x = y;
////[|const y = x;|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`const x = y;
`,

        "/y.ts":
`const y = x;`,
    },
});
