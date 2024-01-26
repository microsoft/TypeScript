/// <reference path="../fourslash.ts" />

// @Filename: /file1.ts
//// export interface Test1 {}
//// export interface Test2 {}
//// export interface Test3 {}
//// export interface Test4 {}

// @Filename: /file2.ts
//// /*a*/const a = 10;/*b*/

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts"] }

goTo.select("a", "b");
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFix({
    targetFile: "file2.ts", 
    pastes: [{
        text: `const a = 10;
        interface Testing {
            test1: Test1;
            test2: Test2;
            test3: Test3;
            test4: Test4;
        }`,
        range: { pos: 0, end: 12 },
    }],
    newFileContents: {
        "/file2.ts":
`import { Test1, Test2, Test3, Test4 } from './file1'

const a = 10;
interface Testing {
    test1: Test1;
    test2: Test2;
    test3: Test3;
    test4: Test4;
}`
    }
});