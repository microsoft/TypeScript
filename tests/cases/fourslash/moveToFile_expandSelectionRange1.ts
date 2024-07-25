/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////

// @Filename: /a.ts
////co[|nst a = 1|]23;
////function foo() { }

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`function foo() { }`,

        "/bar.ts":
`
const a = 123;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});