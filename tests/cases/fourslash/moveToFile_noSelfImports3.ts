/// <reference path='fourslash.ts' />

//@Filename: /b.ts
////import { ISomething } from './a';
////
////export function [|func|](something: ISomething) {
////}

// @Filename: /a.ts
////export interface ISomething {
////}

verify.moveToFile({
    newFileContents: {
        "/a.ts": `export interface ISomething {
}
export function func(something: ISomething) {
}
`,

        "/b.ts": `
`,
    },
    interactiveRefactorArguments: { targetFile: "/a.ts" }
});
