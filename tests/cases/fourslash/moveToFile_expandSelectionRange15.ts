/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////const a = 1;

// @Filename: /a.ts
////let [|message: string, count: number = 10, functional|]: boolean = true;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`const a = 1;
let message: string, count: number = 10, functional: boolean = true;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});