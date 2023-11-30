/// <reference path='fourslash.ts' />

// @module: esnext

//@Filename: /a.ts
////[|export function foo() { }
////export function bar() {}|]

// @Filename: /b.ts
////export function baz() { }
////export { foo, bar } from "./a";

verify.moveToFile({
    newFileContents: {
        "/a.ts": "",

        "/b.ts":
`export function baz() { }

export function foo() { }
export function bar() { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});
