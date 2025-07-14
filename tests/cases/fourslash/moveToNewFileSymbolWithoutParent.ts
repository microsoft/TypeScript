/// <reference path='fourslash.ts'/>

// Test for move to new file with symbols that don't have a parent but aren't modules
// This reproduces the scenario that caused the debug assertion failure

// @Filename: /a.ts
////export const someVar = 42;
////[|export const anotherVar = 24;|]

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export const someVar = 42;
`,

        "/anotherVar.ts":
`export const anotherVar = 24;
`,
    },
});