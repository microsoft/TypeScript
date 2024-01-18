/// <reference path="../fourslash.ts" />

// @Filename: file1.ts
//// export interface Test1 {}
//// export interface Test2 {}
//// export interface Test3 {}
//// export interface Test4 {}

// @Filename: file2.ts
//// import { Test1, Test2, Test3, Test4 } from './file1';
//// interface Testing {
////     test1: Test1;
////     test2: Test2;
////     test3: Test3;
////     test4: Test4;
//// }

// @Filename: file3.ts
//// /*a*/const a = 10;/*b*/

// @Filename: tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "file3.ts"] }

goTo.select("a", "b");
verify.postPasteImportFix({
    targetFile: "file3.ts", 
    pastes: [{
        text: `const a = 10;
        interface Testing {
            test1: Test1;
            test2: Test2;
            test3: Test3;
            test4: Test4;
        }`,
        range: { pos: 13, end: 54 },
    }],
    originalFile: "file2.ts",
});