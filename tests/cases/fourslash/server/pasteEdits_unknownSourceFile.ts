/// <reference path="../fourslash.ts" />

// @Filename: /file2.ts
//// const a = 10;
//// const b = 10;
//// [||]const c = 10;

// @Filename: /file1.ts
//// export interface Test1 {}
//// export interface Test2 {}
//// export interface Test3 {}
//// export interface Test4 {}

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `interface Testing {
            test1: Test1;
            test2: Test2;
            test3: Test3;
            test4: Test4;
        }`],
    pasteLocations: [range[0]],
    },
    newFileContents: {
        "/file2.ts":
`import { Test1, Test2, Test3, Test4 } from "./file1";

const a = 10;
const b = 10;
interface Testing {
            test1: Test1;
            test2: Test2;
            test3: Test3;
            test4: Test4;
        }const c = 10;`
    },
    fixId: "providePostPasteEdits"
});