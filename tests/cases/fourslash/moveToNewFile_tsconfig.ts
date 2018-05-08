/// <reference path='fourslash.ts' />

// @Filename: /src/a.ts
////0;
////[|1;|]

// @Filename: /src/tsconfig.json
////{
////    "files": ["./a.ts"]
////}

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/src/a.ts":
`0;
`,

        "/src/newFile.ts":
`1;`,

        "/src/tsconfig.json":
`{
    "files": ["./a.ts", "./newFile.ts"]
}`,
    },
});
