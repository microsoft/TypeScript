/// <reference path='fourslash.ts' />

// @module: esnext

//@Filename: /a.ts
////export function a() { }

//@Filename: /b.ts
////export function foo() { }
////[|export function bar() {}|]

// @Filename: /c.ts
////export function baz() { }
////export * from "./a";
////export {
////    bar,
////} from "./b";

verify.moveToFile({
    newFileContents: {
        "/b.ts":
`export function foo() { }
`,
        "/c.ts":
`export function baz() { }
export function bar() { }

export * from "./a";
`,
    },
    interactiveRefactorArguments: { targetFile: "/c.ts" },
});
