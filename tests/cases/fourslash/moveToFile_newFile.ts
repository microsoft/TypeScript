/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|interface ka {
////    name: string;
////}|]

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`interface ka {
    name: string;
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
