/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////

// @Filename: /a.ts
////export [|default class {
////    run()|] {}
////}

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`
export default class {
    run() { }
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});