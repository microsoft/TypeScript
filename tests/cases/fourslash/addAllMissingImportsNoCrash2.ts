/// <reference path="fourslash.ts" />

// @Filename: file1.ts
//// export { /**/default };

goTo.marker();

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
