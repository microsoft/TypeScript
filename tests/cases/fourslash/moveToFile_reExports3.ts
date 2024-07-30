/// <reference path='fourslash.ts' />

// @module: esnext

//@Filename: /a.ts
////export function foo() { }
////[|export function bar() {}|]

// @Filename: /b.ts
////export function baz() { }
////export * from "./a";

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`export function foo() { }
`,

        "/b.ts":
`export function baz() { }
export function bar() { }

export * from "./a";`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});
