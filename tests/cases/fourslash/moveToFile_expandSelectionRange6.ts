/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////

// @Filename: /a.ts
////[|function|] f() {
////function inner() {}
////}
////const a = 1;


verify.moveToFile({
    newFileContents: {
        "/a.ts":
`const a = 1;`,

        "/bar.ts":
`
function f() {
    function inner() { }
}
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});