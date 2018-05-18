/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////console.log("hello");
////[|console.log("goodbye");|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`console.log("hello");
`,

        "/newFile.ts":
`console.log("goodbye");`,
    },
});
