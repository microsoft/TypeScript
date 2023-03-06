/// <reference path="fourslash.ts" />

// @Filename: file1.ts
//// export interface Test1 {}
//// export interface Test2 {}
//// export interface Test3 {}
//// export interface Test4 {}

// @Filename: file2.ts
//// import { Test1, Test4 } from './file1';
//// interface Testing {
////     test1: Test1;
////     test2: Test2;
////     test3: Test3;
////     test4: Test4;
//// }

goTo.file("file2.ts");

verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent: 
`import { Test1, Test2, Test3, Test4 } from './file1';
interface Testing {
    test1: Test1;
    test2: Test2;
    test3: Test3;
    test4: Test4;
}`
});