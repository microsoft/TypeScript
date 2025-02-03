/// <reference path='fourslash.ts' />

//@Filename: /b.ts
////export type BaseTest = string;

// @Filename: /a.ts
////import { BaseTest } from "./b";
////
////export type [|Test|] = BaseTest;

verify.moveToFile({
    newFileContents: {
        "/b.ts": `export type BaseTest = string;
export type Test = BaseTest;
`,

        "/a.ts": `
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" }
});
