/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////

// @Filename: /a.ts
//// fun[|ction f() {
////     cons|]t a = 1;
//// }

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`
function f() {
    const a = 1;
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});