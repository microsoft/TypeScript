/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////0;
////[|1;|]

// @Filename: /tsconfig.json
////{
////    "files": ["/a.ts"]
////}

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`0;
`,

        "/newFile.ts":
`1;`,

        "/tsconfig.json":
`{
    "files": ["/a.ts", "/newFile.ts"]
}`,
    },
});
